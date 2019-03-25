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
	CLEAR(targetingSolutions);
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
	for (auto identifier : targetInfo->targetingSolutions)
	{
		if (MAPCONTAINS(targetingSolutions, identifier))
			continue;

		AddTargetingSolution(identifier);
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

		if (SETCONTAINS(targetInfo->targetingSolutions, identifier))
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
	else if (STARTS_WITH(msg, "wpn_fire "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("wpn_fire "));

		if (SIZENUM(parts) >= 5)
		{
			auto identifier = (ETargetingSolutionIdentifier)STOI(parts[0]);
			uint8 x1 = STOI(parts[1]);
			uint8 y1 = STOI(parts[2]);
			uint8 x2 = STOI(parts[3]);
			uint8 y2 = STOI(parts[4]);

			FireSolution(identifier, x1, y1, x2, y2);
		}
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

		// read by parseSolution
		auto details = PAIRVALUE(solution);

		APPENDINT(output, (uint8)PAIRKEY(solution));
		output += TEXT(" ");
		APPENDINT(output, details.baseDifficulty);
		output += TEXT(" ");
		APPENDINT(output, (int8)details.bestFacing);

		for (auto polygon : details.polygons)
		{
			output += TEXT("|");

			// read by parsePolygon
			for (uint8 coord : polygon) {
				output += TEXT(" ");
				APPENDINT(output, coord);
			}
		}
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
	DetermineTargetingSolutions();

	if (ISCLIENT())
	{
		SendSelectedTarget();
		SendTargetingSolutions();
	}
}

void UWeaponSystem::FireSolution_Implementation(ETargetingSolutionIdentifier identifier, uint8 x1, uint8 y1, uint8 x2, uint8 y2)
{
	if (selectedTargetID == 0 || !MAPCONTAINS(targetingSolutions, identifier))
		return;

	auto solution = targetingSolutions[identifier];
	auto polygon = GetPolygonForCurrentlyFacing(solution);

	float segmentPercentage = BisectPolygon(polygon, x1, y1, x2, y2);

	auto targetSystem = GetSystemForSolution(identifier);
	auto damageToDeal = GetDamageForSolution(identifier, segmentPercentage);

	if (identifier >= ETargetingSolutionIdentifier::MIN_VULNERABILITY)
	{
		// Vulnerabilities are consumed when they are used
		RemoveTargetingSolution(identifier);
	}
	else
	{
		// Regular solutions just need new shapes to be calculated
		// TODO: allocate a new sequence for this solution identifier
	}


	if (ISCLIENT())
		SendTargetingSolutions(); // TODO: replace this with specific calls to add/remove ... yeah? is that worth having if it can't affect non-local clients?


	auto targetInfo = GetSelectedTarget();
	if (targetInfo == nullptr)
		return;

	auto target = WEAK_PTR_GET(targetInfo->actor);
	if (target == nullptr)
		return;

	// TODO: actually fire ... deal damage to targetSystem of target ... probably need a "targetable thing" base class between AActor and AMakeItSoShipPawn

}

void UWeaponSystem::RemoveTargetingSolution(ETargetingSolutionIdentifier identifier)
{
	MAPREMOVE(targetingSolutions, identifier);

	auto targetInfo = GetSelectedTarget();

	if (targetInfo == nullptr)
		return;

	SETREMOVEVAL(targetInfo->targetingSolutions, identifier);
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

void UWeaponSystem::DetermineTargetingSolutions()
{
	CLEAR(targetingSolutions);

	auto targetInfo = GetSelectedTarget();

	if (targetInfo != nullptr)
		for (auto identifier : targetInfo->targetingSolutions)
			AddTargetingSolution(identifier);
}

void UWeaponSystem::AddTargetingSolution(ETargetingSolutionIdentifier identifier)
{
	FWeaponTargetingSolution solution;
	solution.baseDifficulty = GetSolutionDifficulty(identifier);
	solution.bestFacing = GetSolutionBestFace(identifier);
	CreatePolygons(solution);

	MAPADD(targetingSolutions, identifier, solution, ETargetingSolutionIdentifier, FWeaponTargetingSolution);
}

void UWeaponSystem::CreatePolygons(FWeaponTargetingSolution &solution)
{
	// TODO: this
}

TArray<uint8> UWeaponSystem::GetPolygonForCurrentlyFacing(FWeaponTargetingSolution &solution)
{
	auto numPolygons = SIZENUM(solution.polygons);

	if (numPolygons < 2 || solution.bestFacing == FWeaponTargetingSolution::ETargetingFace::NoFace || currentlyFacing == solution.bestFacing)
		return solution.polygons[0];

	if (currentlyFacing == -solution.bestFacing && numPolygons > 2)
		return solution.polygons[2];

	return solution.polygons[1];
}

float UWeaponSystem::BisectPolygon(TArray<uint8> points, uint8 x1, uint8 y1, uint8 x2, uint8 y2)
{
	// TODO: this
	return 50.f;
}

FWeaponTargetingSolution::ETargetingFace UWeaponSystem::GetSolutionBestFace(ETargetingSolutionIdentifier solution)
{
	switch (solution)
	{
	case ETargetingSolutionIdentifier::Engines:
	case ETargetingSolutionIdentifier::EngineVulnerability:
		return FWeaponTargetingSolution::Rear;
	case ETargetingSolutionIdentifier::Warp:
	case ETargetingSolutionIdentifier::WarpVulnerability:
		return FWeaponTargetingSolution::Bottom;
	case ETargetingSolutionIdentifier::Weapons:
	case ETargetingSolutionIdentifier::WeaponVulnerability:
		return FWeaponTargetingSolution::Front;
	case ETargetingSolutionIdentifier::Sensors:
	case ETargetingSolutionIdentifier::SensorVulnerability:
		return FWeaponTargetingSolution::Left;
	case ETargetingSolutionIdentifier::PowerManagement:
	case ETargetingSolutionIdentifier::PowerVulnerability:
		return FWeaponTargetingSolution::Top;
	case ETargetingSolutionIdentifier::DamageControl:
	case ETargetingSolutionIdentifier::DamageControlVulnerability:
		return FWeaponTargetingSolution::Right;
	case ETargetingSolutionIdentifier::Communications:
	case ETargetingSolutionIdentifier::CommunicationVulnerability:
		return FWeaponTargetingSolution::Right;
	default:
		return FWeaponTargetingSolution::NoFace;
	}
}

int8 UWeaponSystem::GetSolutionDifficulty(ETargetingSolutionIdentifier solution)
{
	if (solution >= ETargetingSolutionIdentifier::MIN_SYSTEM_VULNERABILITY && solution <= ETargetingSolutionIdentifier::MAX_SYSTEM_VULNERABILITY)
		return 7;

	if (solution >= ETargetingSolutionIdentifier::MIN_STANDARD_SYSTEM && solution <= ETargetingSolutionIdentifier::MAX_STANDARD_SYSTEM)
		return 4;

	if (solution == ETargetingSolutionIdentifier::MiscVulnerability)
		return 5;

	if (solution == ETargetingSolutionIdentifier::Misc)
		return 3;

	return 0;
}

/*
uint8 UWeaponSystem::DetermineDifficulty(uint8 baseDifficulty, FWeaponTargetingSolution::ETargetingFace bestFacing)
{
	uint8 difficulty = baseDifficulty;

	// Adjust difficulty to account for the target's best / worst face being the one pointed at the ship
	if (bestFacing == currentlyFacing)
	{
		if (difficulty > MIN_TARGETING_SEQUENCE_LENGTH)
			difficulty -= 2;
	}
	else if (bestFacing == -currentlyFacing) {
		difficulty += 2;
	}

	if (difficulty > MAX_TARGETING_SEQUENCE_LENGTH)
		return 0;

	if (difficulty < MIN_TARGETING_SEQUENCE_LENGTH)
		return MIN_TARGETING_SEQUENCE_LENGTH;

	return difficulty;
}
*/

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

uint8 UWeaponSystem::GetDamageForSolution(ETargetingSolutionIdentifier solution, float firstHalfPercentage)
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

	// TODO: account (non-linearly) for how close firstHalfPercentage is to 50

	// TODO: possibly reduce the scale of the randomness here?

	// scale damage should by system power
	return (uint8)(damage * GetPowerLevel() / 100.f);
}