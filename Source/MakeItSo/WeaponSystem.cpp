#ifndef WEB_SERVER_TEST
#include "WeaponSystem.h"
#else
#include "stdafx.h"
#include "WeaponSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

UWeaponSystem::UWeaponSystem()
{
	PrimaryComponentTick.bCanEverTick = false;
}

void UWeaponSystem::ResetData()
{
	selectedTargetID = 0;
	selectedTargetingSolution = ETargetingSolution::None;
	CLEAR(targetingSolutions);
	ClearPuzzle();
}

bool UWeaponSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "wpn_target "))
	{
		uint8 targetID = ExtractInt(msg, sizeof("wpn_target "));
		SelectTarget(targetID);
	}

	if (STARTS_WITH(msg, "wpn_solution "))
	{
		ETargetingSolution solution = (ETargetingSolution)ExtractInt(msg, sizeof("wpn_solution "));
		SelectTargetingSolution(solution);
	}
	else if (STARTS_WITH(msg, "wpn_fire "))
	{
		// TODO: parse parameters, populate solutionSteps
		TArray<FWeaponPuzzleData::EDirection> solutionSteps;

		Fire(solutionSteps);
	}
	else
		return false;

	return true;
}

void UWeaponSystem::SendAllData_Implementation()
{
	SendSelectedTarget();
	SendTargetingSolutions();
	SendSelectedTargetingSolution();

	if (selectedTargetID != 0 && selectedTargetingSolution != ETargetingSolution::None)
		SendPuzzle();
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

	for (auto solution : targetingSolutions)
	{
		output += TEXT(" ");
		APPENDINT(output, (uint8)solution);
	}

	SendSystem(output);
}

void UWeaponSystem::SendSelectedTargetingSolution_Implementation()
{
	FString output = TEXT("wpn_solution ");

	APPENDINT(output, (uint8)selectedTargetingSolution);

	SendSystem(output);
}

void UWeaponSystem::SendPuzzle_Implementation()
{
	FString output = TEXT("wpn_puzzle ");

	APPENDINT(output, targetingPuzzle.width);
	output += TEXT(" ");
	APPENDINT(output, targetingPuzzle.startCell);

	for (auto cell : targetingPuzzle.cells)
	{
		output += cell ? TEXT(" 1") : TEXT(" 0");
	}

	SendSystem(output);
}


void UWeaponSystem::SelectTarget_Implementation(uint16 targetID)
{
	selectedTargetID = targetID;
	selectedTargetingSolution = ETargetingSolution::None;

	DetermineTargetingSolutions();

	if (ISCLIENT())
	{
		SendSelectedTarget();
		SendTargetingSolutions();
	}
}

void UWeaponSystem::SelectTargetingSolution_Implementation(ETargetingSolution solution)
{
	if (selectedTargetID == 0 || !SETCONTAINS(targetingSolutions, solution))
		return; // invalid value, or invalid time

	selectedTargetingSolution = solution;
	if (ISCLIENT())
		SendSelectedTargetingSolution();

	if (solution != ETargetingSolution::None)
	{
		GeneratePuzzle();
		if (ISCLIENT())
			SendPuzzle();
	}
}

void UWeaponSystem::Fire_Implementation(TArray<FWeaponPuzzleData::EDirection> puzzleSolution)
{
	if (selectedTargetID == 0 || selectedTargetingSolution == 0 || targetingPuzzle.width == 0)
		return;

	if (!IsValidSolution(puzzleSolution))
		return;

	auto targetSystem = GetSystemForSolution(selectedTargetingSolution);
	auto damage = GetDamageForSolution(selectedTargetingSolution);

	// TODO: actually fire ... deal damage to targetSystem

	ClearPuzzle();
}

void UWeaponSystem::DetermineTargetingSolutions()
{
	CLEAR(targetingSolutions);

	if (selectedTargetID = 0)
		return;

	// TODO: decide available targeting solutions based on target type and sensor data
	// TODO: in particular, sensors needs to make vulnerabilities available here 
	SETADD(targetingSolutions, ETargetingSolution::Engines);
	SETADD(targetingSolutions, ETargetingSolution::Warp);
	SETADD(targetingSolutions, ETargetingSolution::Weapons);
	SETADD(targetingSolutions, ETargetingSolution::Sensors);
	SETADD(targetingSolutions, ETargetingSolution::PowerManagement);
	SETADD(targetingSolutions, ETargetingSolution::DamageControl);
	SETADD(targetingSolutions, ETargetingSolution::Communications);
}

uint8 UWeaponSystem::DeterminePuzzleSize()
{
	uint8 puzzleSize;

	if (selectedTargetingSolution == ETargetingSolution::None)
		puzzleSize = 0;
	else if (selectedTargetingSolution == ETargetingSolution::Misc)
		puzzleSize = 3;
	else if (selectedTargetingSolution == ETargetingSolution::MiscVulnerability)
		puzzleSize = 7;
	else if (selectedTargetingSolution >= ETargetingSolution::MIN_STANDARD_SYSTEM && selectedTargetingSolution <= ETargetingSolution::MAX_STANDARD_SYSTEM)
		puzzleSize = 6;
	else if (selectedTargetingSolution >= ETargetingSolution::MIN_SYSTEM_VULNERABILITY && selectedTargetingSolution <= ETargetingSolution::MAX_SYSTEM_VULNERABILITY)
		puzzleSize = 6;
	else
		puzzleSize = 2;

	auto health = GetHealthLevel();
	if (health == 0)
		puzzleSize = 0; // cannot fire
	else if (health < 10)
		puzzleSize += 6;
	else if (health < 30)
		puzzleSize += 5;
	else if (health < 50)
		puzzleSize += 4;
	else if (health < 70)
		puzzleSize += 3;
	else if (health < 90)
		puzzleSize += 2;
	else if (health < 100)
		puzzleSize += 1;

	return puzzleSize;
}

void UWeaponSystem::GeneratePuzzle()
{
	targetingPuzzle.width = DeterminePuzzleSize();
	CLEAR(targetingPuzzle.cells);

	// TODO: generate a proper puzzle ... this is a placeholder
	uint8 numCells = targetingPuzzle.width * targetingPuzzle.width;
	targetingPuzzle.startCell = FMath::RandRange(0, numCells - 1);
	for (uint8 i = 0; i < numCells; i++)
		SETADD(targetingPuzzle.cells, FMath::RandRange(0, 10) == 0);
}

void UWeaponSystem::ClearPuzzle()
{
	targetingPuzzle.width = 0;
	CLEAR(targetingPuzzle.cells);
	targetingPuzzle.startCell = 0;
}

bool UWeaponSystem::IsValidSolution(TArray<FWeaponPuzzleData::EDirection> puzzleSolution)
{
	if (targetingPuzzle.width == 0)
		return false; // Cannot fire if we have no targeting solution

	// TODO: solve this
	return false;
}

UShipSystem::ESystem UWeaponSystem::GetSystemForSolution(ETargetingSolution solution)
{
	switch (solution)
	{
	case Misc:
	case MiscVulnerability:
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

	case Engines:
	case EngineVulnerability:
		return UShipSystem::Helm;

	case Warp:
	case WarpVulnerability:
		return UShipSystem::Warp;

	case Weapons:
	case WeaponVulnerability:
		return UShipSystem::Weapons;

	case Sensors:
	case SensorVulnerability:
		return UShipSystem::Sensors;

	case PowerManagement:
	case PowerVulnerability:
		return UShipSystem::PowerManagement;

	case DamageControl:
	case DamageControlVulnerability:
		return UShipSystem::DamageControl;

	case Communications:
		return UShipSystem::Communications;

	default:
		// TODO: determine how to handle targeting non-ships. Still use "misc" solution, but don't pick an actual ship system?
		return UShipSystem::ESystem::None;
	}
}

uint8 UWeaponSystem::GetDamageForSolution(ETargetingSolution solution)
{
	uint8 damage = 0; 

	if (solution == ETargetingSolution::Misc)
		damage = FMath::RandRange(15, 30);
	else if (solution == ETargetingSolution::MiscVulnerability)
		damage = FMath::RandRange(35, 55);
	else if (solution >= ETargetingSolution::MIN_STANDARD_SYSTEM && solution <= ETargetingSolution::MAX_STANDARD_SYSTEM)
		damage = FMath::RandRange(20, 40);
	else if (solution >= ETargetingSolution::MIN_SYSTEM_VULNERABILITY && solution <= ETargetingSolution::MAX_SYSTEM_VULNERABILITY)
		damage = FMath::RandRange(55, 75);

	// scale damage should by system power
	return damage * GetPowerLevel() / 100;
}