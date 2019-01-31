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

	// update targeting solutions
	targetingSolutions = targetInfo->targetingSolutions;

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

	for (auto solution : targetingSolutions)
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
		
		APPENDINT(output, (uint8)solution.type);
		output += TEXT(" ");
		APPENDINT(output, (uint8)solution.baseDifficulty);
		output += TEXT(" ");
		APPENDINT(output, (int8)solution.bestFacing);
		
		for (auto symbol : solution.symbolSequence)
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

void UWeaponSystem::SendFire_Implementation(bool success)
{
	SendSystemFixed(success ? "wpn_fire 1" : "wpn_fire 0");
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
	bool anyFullMatch = false;

	for (auto solution : targetingSolutions)
	{
		auto difficulty = DetermineDifficulty(solution.baseDifficulty, solution.bestFacing);

		if (difficulty == FWeaponTargetingSolution::ESolutionDifficulty::Impossible)
			continue;

		// Determine whether this solution is a full or partial match for the current input
		uint8 sequenceMatchLength = (uint8)difficulty;
		uint8 partialMatchLength = FMath::Min((uint8)SIZENUM(targetingElementInput), sequenceMatchLength);

		bool isPartialMatch = true;
		bool isFullMatch;
		
		for (uint8 i = 0; i < partialMatchLength; i++)
			if (targetingElementInput[i] != solution.symbolSequence[i])
			{
				isPartialMatch = false;
				break;
			}

		if (isPartialMatch)
			isFullMatch = partialMatchLength == sequenceMatchLength;
		else
			isFullMatch = false;

		anyPartialMatch |= isPartialMatch;
		anyFullMatch |= isFullMatch;

		if (!isFullMatch)
			continue;

		// Only continue if this is a full match
		CLEAR(targetingElementInput);

		auto targetSystem = GetSystemForSolution(solution.type);
		auto damage = GetDamageForSolution(solution.type);
		
		if (solution.type >= FWeaponTargetingSolution::MIN_VULNERABILITY)
		{
			// Vulnerabilities are consumed when they are used
			RemoveTargetingSolution(solution.type);
		}
		else
		{
			// Other solutions just need a new sequence allocated
			AllocateSequence(solution);
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

	// If there's no partial match, this was an invalid input. Abort and reset
	if (!anyPartialMatch && !anyFullMatch)
	{
		// TODO: fire a "miss" at the target

		CLEAR(targetingElementInput);
	}

	SendFire(anyFullMatch); // Tell the client that we fired, and whether it was successful or not
}

void UWeaponSystem::RemoveTargetingSolution(FWeaponTargetingSolution::ETargetingSolutionType solutionType)
{
	auto targetInfo = GetSelectedTarget();

	if (targetInfo == nullptr)
		return;

	for (auto iSolution = 0; iSolution < SIZENUM(targetInfo->targetingSolutions); iSolution++)
		if (targetInfo->targetingSolutions[iSolution].type == solutionType)
		{
			SETREMOVEAT(targetInfo->targetingSolutions, iSolution);
			break;
		}
	
	targetingSolutions = targetInfo->targetingSolutions;
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
	
	if (targetInfo == nullptr)
		return;

	targetingSolutions = targetInfo->targetingSolutions;

	for (auto solution : targetingSolutions)
		AllocateSequence(solution);
}

void UWeaponSystem::AllocateSequence(FWeaponTargetingSolution solution)
{
	CLEAR(solution.symbolSequence);

	for (auto i = 0; i < FWeaponTargetingSolution::ESolutionDifficulty::MAX_POSSIBLE_DIFFICULTY; i++)
	{
		uint8 symbol;

		do
		{
			symbol = FMath::RandRange(0, NUM_TARGETING_SYMBOL_OPTIONS - 1);
		} while (SETCONTAINS(solution.symbolSequence, symbol));

		SETADD(solution.symbolSequence, symbol);
	}
}

FWeaponTargetingSolution::ESolutionDifficulty UWeaponSystem::DetermineDifficulty(FWeaponTargetingSolution::ESolutionDifficulty baseDifficulty, FWeaponTargetingSolution::ETargetingFace bestFacing)
{
	uint8 iDifficulty = baseDifficulty;

	// Adjust difficulty to account for the target's best / worst face being the one pointed at the ship
	if (bestFacing == currentlyFacing)
	{
		if (iDifficulty > FWeaponTargetingSolution::VeryEasy)
			iDifficulty --;
	}
	else if (bestFacing == -currentlyFacing) {
		iDifficulty += 2;
	}

	// Adjust difficulty based on health
	auto health = GetHealthLevel();
	if (health == 0)
		iDifficulty = FWeaponTargetingSolution::Impossible; // cannot fire
	else if (health < 10)
		iDifficulty += 4;
	else if (health < 35)
		iDifficulty += 3;
	else if (health < 75)
		iDifficulty += 2;
	else if (health < 90)
		iDifficulty += 1;

	if (iDifficulty > FWeaponTargetingSolution::MAX_POSSIBLE_DIFFICULTY)
		return FWeaponTargetingSolution::Impossible;

	return (FWeaponTargetingSolution::ESolutionDifficulty)iDifficulty;
}

UShipSystem::ESystem UWeaponSystem::GetSystemForSolution(FWeaponTargetingSolution::ETargetingSolutionType solution)
{
	switch (solution)
	{
	case FWeaponTargetingSolution::Misc:
	case FWeaponTargetingSolution::MiscVulnerability:
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

	case FWeaponTargetingSolution::Engines:
	case FWeaponTargetingSolution::EngineVulnerability:
		return UShipSystem::Helm;

	case FWeaponTargetingSolution::Warp:
	case FWeaponTargetingSolution::WarpVulnerability:
		return UShipSystem::Warp;

	case FWeaponTargetingSolution::Weapons:
	case FWeaponTargetingSolution::WeaponVulnerability:
		return UShipSystem::Weapons;

	case FWeaponTargetingSolution::Sensors:
	case FWeaponTargetingSolution::SensorVulnerability:
		return UShipSystem::Sensors;

	case FWeaponTargetingSolution::PowerManagement:
	case FWeaponTargetingSolution::PowerVulnerability:
		return UShipSystem::PowerManagement;

	case FWeaponTargetingSolution::DamageControl:
	case FWeaponTargetingSolution::DamageControlVulnerability:
		return UShipSystem::DamageControl;

	case FWeaponTargetingSolution::Communications:
		return UShipSystem::Communications;

	default:
		// TODO: determine how to handle targeting non-ships. Still use "misc" solution, but don't pick an actual ship system?
		return UShipSystem::ESystem::None;
	}
}

uint8 UWeaponSystem::GetDamageForSolution(FWeaponTargetingSolution::ETargetingSolutionType solution)
{
	float damage = 0; 

	if (solution == FWeaponTargetingSolution::Misc)
		damage = FMath::FRandRange(15, 30);
	else if (solution == FWeaponTargetingSolution::MiscVulnerability)
		damage = FMath::FRandRange(35, 55);
	else if (solution >= FWeaponTargetingSolution::MIN_STANDARD_SYSTEM && solution <= FWeaponTargetingSolution::MAX_STANDARD_SYSTEM)
		damage = FMath::FRandRange(20, 40);
	else if (solution >= FWeaponTargetingSolution::MIN_SYSTEM_VULNERABILITY && solution <= FWeaponTargetingSolution::MAX_SYSTEM_VULNERABILITY)
		damage = FMath::FRandRange(55, 75);

	// scale damage should by system power
	return (uint8)(damage * GetPowerLevel() / 100.f);
}