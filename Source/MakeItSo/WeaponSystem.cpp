#ifndef WEB_SERVER_TEST
#include "WeaponSystem.h"
#else
#include "stdafx.h"
#include "WeaponSystem.h"

#include <algorithm>    // std::shuffle
#include <random>       // std::default_random_engine
#include <chrono>       // std::chrono::system_clock
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"
#include "SensorSystem.h"

#define NUM_TARGETING_SYMBOL_OPTIONS 72
#define MIN_TARGETING_SEQUENCE_LENGTH 2
#define MAX_TARGETING_SEQUENCE_LENGTH 8

UWeaponSystem::UWeaponSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.2f;
	PrimaryComponentTick.SetTickFunctionEnable(true);
}

void UWeaponSystem::ResetData()
{
	selectedTargetID = 0;
	currentlyFacing = FWeaponTargetingSolution::ETargetingFace::NoFace;
	CLEAR(targetingElements);
	CLEAR(targetingElementInput);
	CLEAR(targetingSolutions);

	for (uint8 i = 0; i < NUM_TARGETING_SYMBOL_OPTIONS; i++)
		SETADD(targetingElements, i);
}

void UWeaponSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	auto targetInfo = GetSelectedTarget();
	auto target = targetInfo == nullptr ? nullptr : WEAK_PTR_GET(targetInfo->actor);

	if (target == nullptr)
	{
		selectedTargetID = 0;
		if (ISCLIENT())
			SendSelectedTarget();
		return;
	}

	// Add any new targeting solutions
	for (auto& solution : targetInfo->targetingSolutions)
	{
		auto identifier = PAIRKEY(solution);
		if (!MAPCONTAINS(targetingSolutions, identifier))
			AddTargetingSolution(identifier, PAIRVALUE(solution));
	}

	// Remove any removed ones
#ifdef WEB_SERVER_TEST
	for (auto it = targetingSolutions.cbegin(); it != targetingSolutions.cend(); )
	{
		auto identifier = it->first;
#else
	for (auto it = targetingSolutions.CreateIterator(); it;)
	{
		auto identifier = PAIRKEY(it);
#endif

		if (MAPCONTAINS(targetInfo->targetingSolutions, identifier))
			++it;
		else
#ifdef WEB_SERVER_TEST
			it = targetingSolutions.erase(it);
#else
			it.RemoveCurrent();
#endif
	}

	// update the angle of the target we are currently facing
	auto towardsTarget = (target->GetActorLocation() - crewManager->GetShipPawn()->GetActorLocation());
	towardsTarget.Normalize(1);

	auto facingTarget = towardsTarget.ToOrientationQuat();
	// TODO: should this be the other way around?
	targetOrientation = (facingTarget - target->GetActorQuat())
		.Rotator();

	auto prevFacing = currentlyFacing;
	// TODO: ensure these aren't all the wrong way round
	if (targetOrientation.Pitch > 45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Bottom;
	else if (targetOrientation.Pitch < -45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Top;
	else if (targetOrientation.Yaw < -135.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Front;
	else if (targetOrientation.Yaw < -45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Left;
	else if (targetOrientation.Yaw < 45.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Rear;
	else if (targetOrientation.Yaw < 135.f)
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Right;
	else
		currentlyFacing = FWeaponTargetingSolution::ETargetingFace::Front;

	if (ISCLIENT())
	{
		if (prevFacing != currentlyFacing)
			SendFacing();

		SendOrientation();

		SendTargetingSolutions();
	}
}

bool UWeaponSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "wpn_target "))
	{
		uint8 targetID = ExtractInt(msg, sizeof("wpn_target "));
		SelectTarget(targetID);
	}
	else if (STARTS_WITH(msg, "wpn_input "))
	{
		uint8 value = ExtractInt(msg, sizeof("wpn_input "));
		InputValue(value);
	}
	else
		return false;

	return true;
}

void UWeaponSystem::SendAllData_Implementation()
{
	SendSelectedTarget();
	SendTargetingSolutions();
	SendFacing();

	if (selectedTargetID != 0)
		SendTargetingElements();
}


void UWeaponSystem::SendSelectedTarget_Implementation()
{
	FString output = TEXT("wpn_target ");

	APPENDINT(output, selectedTargetID);

	SendSystem(output);
}

void UWeaponSystem::SendTargetingSolutions_Implementation()
{
	FString output = TEXT("wpn_solutions");

	bool first = true;

	for (auto& solution : targetingSolutions)
	{
		if (first)
		{
			first = false;
			output += TEXT(" ");
		}
		else
		{
			output += TEXT("/");
		}
		
		APPENDINT(output, (uint8)PAIRKEY(solution));
		output += TEXT(" ");

		auto details = PAIRVALUE(solution);
		APPENDINT(output, details.baseSequenceLength);
		output += TEXT(" ");
		APPENDINT(output, (int8)details.bestFacing);
		
		for (auto symbol : details.symbolSequence)
		{
			output += TEXT(" ");
			APPENDINT(output, symbol);
		}
	}

	SendSystem(output);
}

void UWeaponSystem::SendTargetingElements_Implementation()
{
	FString output = TEXT("wpn_targeting");

	for (auto element : targetingElements)
	{
		output += TEXT(" ");
		APPENDINT(output, element);
	}

	SendSystem(output);
}

void UWeaponSystem::SendFacing_Implementation()
{
	FString output = TEXT("wpn_facing ");

	APPENDINT(output, (int8)currentlyFacing);

	SendSystem(output);
}

void UWeaponSystem::SendOrientation_Implementation()
{
	FString output = TEXT("wpn_orientation ");

	APPENDINT(output, targetOrientation.Pitch);
	output += TEXT(" ");
	APPENDINT(output, targetOrientation.Yaw);
	output += TEXT(" ");
	APPENDINT(output, targetOrientation.Roll);

	SendSystem(output);
}

void UWeaponSystem::SendFire_Implementation(ETargetingSolutionIdentifier solution)
{
	FString output = TEXT("wpn_fire ");
	APPENDINT(output, (uint8)solution);
	SendSystem(output);
}

void UWeaponSystem::SelectTarget_Implementation(uint16 targetID)
{
	selectedTargetID = targetID;
	AllocateTargetingElements();

	DetermineTargetingSolutions();

	if (ISCLIENT())
	{
		SendSelectedTarget();
		SendTargetingElements();
		SendTargetingSolutions();
	}
}

void UWeaponSystem::InputValue_Implementation(uint8 elementIndex)
{
	if (selectedTargetID == 0 || elementIndex >= NUM_TARGETING_SYMBOL_OPTIONS)
		return;

	auto elementValue = targetingElements[elementIndex];

	SETADD(targetingElementInput, elementValue);

	bool anyPartialMatch = false;
	ETargetingSolutionIdentifier fullMatchIdentifier = ETargetingSolutionIdentifier::None;

	for (auto& solution : targetingSolutions)
	{
		auto identifier = PAIRKEY(solution);
		auto details = PAIRVALUE(solution);

		auto sequenceLength = DetermineSequenceLength(details.baseSequenceLength, details.bestFacing);

		if (sequenceLength == 0)
			continue;

		// Determine whether this solution is a full or partial match for the current input
		uint8 sequenceMatchLength = (uint8)sequenceLength;
		uint8 partialMatchLength = FMath::Min((uint8)SIZENUM(targetingElementInput), sequenceMatchLength);

		bool isPartialMatch = true;
		bool isFullMatch;
		
		for (uint8 i = 0; i < partialMatchLength; i++)
			if (targetingElementInput[i] != details.symbolSequence[i])
			{
				isPartialMatch = false;
				break;
			}

		if (isPartialMatch)
			isFullMatch = partialMatchLength == sequenceMatchLength;
		else
			isFullMatch = false;

		anyPartialMatch |= isPartialMatch;
		
		if (!isFullMatch)
			continue;

		if (fullMatchIdentifier == ETargetingSolutionIdentifier::None)
			fullMatchIdentifier = identifier;

		// Only continue if this is a full match
		CLEAR(targetingElementInput);

		auto targetSystem = GetSystemForSolution(identifier);
		auto damage = GetDamageForSolution(identifier);
		
		if (identifier >= ETargetingSolutionIdentifier::MIN_VULNERABILITY)
		{
			// Vulnerabilities are consumed when they are used
			RemoveTargetingSolution(identifier);
		}
		else
		{
			// Other solutions just need a new sequence allocated
			AllocateSequence(details); // TODO: this won't work, as this local copy will be overwritten by the target info's copy
		}

		if (ISCLIENT())
			SendTargetingSolutions();

		auto targetInfo = GetSelectedTarget();
		if (targetInfo == nullptr)
			continue;

		auto target = WEAK_PTR_GET(targetInfo->actor);
		if (target == nullptr)
			continue;

		// TODO: actually fire ... deal damage to targetSystem of target ... probably need a "targetable thing" base class between AActor and AMakeItSoShipPawn
	}

	if (fullMatchIdentifier != ETargetingSolutionIdentifier::None)
	{
		SendFire(fullMatchIdentifier); // Tell the client to reset the sequence input
	}
	else if (!anyPartialMatch)
	{
		// If there's no partial match, this was an invalid input. Abort and reset

		// TODO: fire a "miss" at the target

		SendFire(ETargetingSolutionIdentifier::None); // Tell the client to reset the sequence input

		CLEAR(targetingElementInput);
	}
}

void UWeaponSystem::RemoveTargetingSolution(ETargetingSolutionIdentifier identifier)
{
	MAPREMOVE(targetingSolutions, identifier);

	auto targetInfo = GetSelectedTarget();

	if (targetInfo == nullptr)
		return;

	MAPREMOVE(targetInfo->targetingSolutions, identifier);
}

USensorTargetInfo *UWeaponSystem::GetSelectedTarget()
{
	if (selectedTargetID == 0)
		return nullptr;

	auto sensorSystem = crewManager->GetSystem(UShipSystem::ESystem::Sensors);
	if (sensorSystem == nullptr)
		return nullptr;

	return ((USensorSystem*)sensorSystem)->GetTarget(selectedTargetID);
}

void UWeaponSystem::AllocateTargetingElements()
{
	SHUFFLE(targetingElements, uint8);
}

void UWeaponSystem::DetermineTargetingSolutions()
{
	CLEAR(targetingSolutions);

	auto targetInfo = GetSelectedTarget();
	
	if (targetInfo != nullptr)
		for (auto& solution : targetInfo->targetingSolutions)
			AddTargetingSolution(PAIRKEY(solution), PAIRVALUE(solution));
}

void UWeaponSystem::AddTargetingSolution(ETargetingSolutionIdentifier identifier, FWeaponTargetingSolution &solution)
{
	FWeaponTargetingSolutionDetail details;
	details.baseSequenceLength = solution.baseSequenceLength;
	details.bestFacing = solution.bestFacing;

	AllocateSequence(details);

	MAPADD(targetingSolutions, identifier, details, ETargetingSolutionIdentifier, FWeaponTargetingSolutionDetail);
}

void UWeaponSystem::AllocateSequence(FWeaponTargetingSolutionDetail &solution)
{
	CLEAR(solution.symbolSequence);

	for (auto i = 0; i < MAX_TARGETING_SEQUENCE_LENGTH; i++)
	{
		uint8 symbol;

		do
		{
			symbol = FMath::RandRange(0, NUM_TARGETING_SYMBOL_OPTIONS - 1);
		} while (SETCONTAINS(solution.symbolSequence, symbol));

		SETADD(solution.symbolSequence, symbol);
	}
}

uint8 UWeaponSystem::DetermineSequenceLength(uint8 baseSequenceLength, FWeaponTargetingSolution::ETargetingFace bestFacing)
{
	uint8 sequenceLength = baseSequenceLength;

	// Adjust difficulty to account for the target's best / worst face being the one pointed at the ship
	if (bestFacing == currentlyFacing)
	{
		if (sequenceLength > MIN_TARGETING_SEQUENCE_LENGTH)
			sequenceLength -= 2;
	}
	else if (bestFacing == -currentlyFacing) {
		sequenceLength += 2;
	}

	if (sequenceLength > MAX_TARGETING_SEQUENCE_LENGTH)
		return 0;

	if (sequenceLength < MIN_TARGETING_SEQUENCE_LENGTH)
		return MIN_TARGETING_SEQUENCE_LENGTH;

	return sequenceLength;
}

UShipSystem::ESystem UWeaponSystem::GetSystemForSolution(ETargetingSolutionIdentifier solution)
{
	switch (solution)
	{
	case ETargetingSolutionIdentifier::Misc:
	case ETargetingSolutionIdentifier::MiscVulnerability:
		switch (FMath::RandRange(1, 7))
		{
		case 1:
			return UShipSystem::Helm;
		case 2:
			return UShipSystem::Warp;
		case 3:
			return UShipSystem::Weapons;
		case 4:
			return UShipSystem::Sensors;
		case 5:
			return UShipSystem::PowerManagement;
		case 6:
			return UShipSystem::DamageControl;
		case 7:
			return UShipSystem::Communications;
		default:
			return UShipSystem::ESystem::None;
		}

	case ETargetingSolutionIdentifier::Engines:
	case ETargetingSolutionIdentifier::EngineVulnerability:
		return UShipSystem::Helm;

	case ETargetingSolutionIdentifier::Warp:
	case ETargetingSolutionIdentifier::WarpVulnerability:
		return UShipSystem::Warp;

	case ETargetingSolutionIdentifier::Weapons:
	case ETargetingSolutionIdentifier::WeaponVulnerability:
		return UShipSystem::Weapons;

	case ETargetingSolutionIdentifier::Sensors:
	case ETargetingSolutionIdentifier::SensorVulnerability:
		return UShipSystem::Sensors;

	case ETargetingSolutionIdentifier::PowerManagement:
	case ETargetingSolutionIdentifier::PowerVulnerability:
		return UShipSystem::PowerManagement;

	case ETargetingSolutionIdentifier::DamageControl:
	case ETargetingSolutionIdentifier::DamageControlVulnerability:
		return UShipSystem::DamageControl;

	case ETargetingSolutionIdentifier::Communications:
		return UShipSystem::Communications;

	default:
		// TODO: determine how to handle targeting non-ships. Still use "misc" solution, but don't pick an actual ship system?
		return UShipSystem::ESystem::None;
	}
}

uint8 UWeaponSystem::GetDamageForSolution(ETargetingSolutionIdentifier solution)
{
	float damage = 0; 

	if (solution == ETargetingSolutionIdentifier::Misc)
		damage = FMath::FRandRange(15, 30);
	else if (solution == ETargetingSolutionIdentifier::MiscVulnerability)
		damage = FMath::FRandRange(35, 55);
	else if (solution >= ETargetingSolutionIdentifier::MIN_STANDARD_SYSTEM && solution <= ETargetingSolutionIdentifier::MAX_STANDARD_SYSTEM)
		damage = FMath::FRandRange(20, 40);
	else if (solution >= ETargetingSolutionIdentifier::MIN_SYSTEM_VULNERABILITY && solution <= ETargetingSolutionIdentifier::MAX_SYSTEM_VULNERABILITY)
		damage = FMath::FRandRange(55, 75);

	// scale damage should by system power
	return (uint8)(damage * GetPowerLevel() / 100.f);
}