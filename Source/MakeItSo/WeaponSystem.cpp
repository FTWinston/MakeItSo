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
	// TODO: make this tick and recalculate currentlyFacing when there's a target
	PrimaryComponentTick.bCanEverTick = false;
}

void UWeaponSystem::ResetData()
{
	selectedTargetID = 0;
	selectedTargetingSolution = -1;
	currentlyFacing = FWeaponTargetingSolution::ETargetingFace::NoFace;
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
		int8 solutionIndex = ExtractInt(msg, sizeof("wpn_solution "));
		SelectTargetingSolution(solutionIndex);
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
	SendFacing();

	if (selectedTargetID != 0 && selectedTargetingSolution != -1)
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
		APPENDINT(output, (uint8)solution.type);
		output += TEXT(" ");
		APPENDINT(output, (uint8)solution.baseDifficulty);
		output += TEXT(" ");
		APPENDINT(output, (int8)solution.bestFacing);
	}

	SendSystem(output);
}

void UWeaponSystem::SendSelectedTargetingSolution_Implementation()
{
	FString output = TEXT("wpn_solution ");

	APPENDINT(output, (int8)selectedTargetingSolution);

	SendSystem(output);
}

void UWeaponSystem::SendPuzzle_Implementation()
{
	FString output = TEXT("wpn_puzzle ");

	APPENDINT(output, targetingPuzzle.width);
	output += TEXT(" ");
	APPENDINT(output, targetingPuzzle.height);
	output += TEXT(" ");
	APPENDINT(output, targetingPuzzle.startCell);

	for (auto cell : targetingPuzzle.cells)
	{
		output += cell ? TEXT(" 1") : TEXT(" 0");
	}

	SendSystem(output);
}

void UWeaponSystem::SendFacing_Implementation()
{
	FString output = TEXT("wpn_facing ");

	APPENDINT(output, (int8)currentlyFacing);

	SendSystem(output);
}


void UWeaponSystem::SelectTarget_Implementation(uint16 targetID)
{
	selectedTargetID = targetID;
	selectedTargetingSolution = -1;

	DetermineTargetingSolutions();

	if (ISCLIENT())
	{
		SendSelectedTarget();
		SendSelectedTargetingSolution();
		SendTargetingSolutions();
	}
}

void UWeaponSystem::SelectTargetingSolution_Implementation(int8 solutionIndex)
{
	if (selectedTargetID == 0 || solutionIndex < -1 || solutionIndex >= SIZENUM(targetingSolutions))
		return; // invalid value, or invalid time

	selectedTargetingSolution = solutionIndex;
	if (ISCLIENT())
		SendSelectedTargetingSolution();

	if (solutionIndex > -1)
	{
		auto solution = targetingSolutions[solutionIndex];

		auto difficulty = DetermineDifficulty(solution.baseDifficulty, solution.bestFacing);

		GeneratePuzzle(difficulty);
		if (ISCLIENT())
			SendPuzzle();
	}
}

void UWeaponSystem::Fire_Implementation(TArray<FWeaponPuzzleData::EDirection> puzzleSolution)
{
	if (selectedTargetID == 0
		|| selectedTargetingSolution < 0
		|| selectedTargetingSolution >= SIZENUM(targetingSolutions)
		|| targetingPuzzle.width == 0
		|| !IsValidSolution(puzzleSolution)
	)
		return;

	auto solution = targetingSolutions[selectedTargetingSolution];

	auto targetSystem = GetSystemForSolution(solution.type);
	auto damage = GetDamageForSolution(solution.type);

	// TODO: actually fire ... deal damage to targetSystem

	ClearPuzzle();
}

void UWeaponSystem::DetermineTargetingSolutions()
{
	CLEAR(targetingSolutions);

	if (selectedTargetID == 0)
		return;

	// TODO: decide available targeting solutions based on target type and sensor data
	// TODO: in particular, sensors needs to make vulnerabilities available here 

	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::Misc, FWeaponTargetingSolution::Easy, FWeaponTargetingSolution::NoFace));

	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::Engines, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Rear));
	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::Warp, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Bottom));
	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::Weapons, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Front));
	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::Sensors, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Left));
	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::PowerManagement, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Top));
	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::DamageControl, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Right));
	SETADD(targetingSolutions, FWeaponTargetingSolution(FWeaponTargetingSolution::Communications, FWeaponTargetingSolution::Medium, FWeaponTargetingSolution::Right));
}

void UWeaponSystem::GeneratePuzzle(FWeaponTargetingSolution::ESolutionDifficulty difficulty)
{
	CLEAR(targetingPuzzle.cells);

	switch (difficulty)
	{
	case FWeaponTargetingSolution::VeryEasy:
		targetingPuzzle.width = 3;
		targetingPuzzle.height = 3;

		for (auto y = 0; y<targetingPuzzle.height; y++)
			for (auto x = 0; x < targetingPuzzle.width; x++)
				SETADD(targetingPuzzle.cells, true);

		switch (FMath::RandRange(1, 4))
		{
		case 1:
			targetingPuzzle.cells[0] = false;
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.startCell = 2;
			return;
		case 2:
			targetingPuzzle.cells[0] = false;
			targetingPuzzle.cells[8] = false;
			targetingPuzzle.startCell = 5;
			return;
		case 3:
			targetingPuzzle.cells[2] = false;
			targetingPuzzle.startCell = 8;
			return;
		case 4:
			targetingPuzzle.cells[0] = false;
			targetingPuzzle.cells[2] = false;
			targetingPuzzle.startCell = 6;
			return;
		// TODO: more variants
		}
	case FWeaponTargetingSolution::Easy:
		targetingPuzzle.width = 4;
		targetingPuzzle.height = 3;

		for (auto y = 0; y<targetingPuzzle.height; y++)
			for (auto x = 0; x < targetingPuzzle.width; x++)
				SETADD(targetingPuzzle.cells, true);

		switch (FMath::RandRange(1, 3))
		{
		case 1:
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.cells[7] = false;
			targetingPuzzle.cells[8] = false;
			targetingPuzzle.startCell = 4;
			return;
		case 2:
			targetingPuzzle.cells[9] = false;
			targetingPuzzle.cells[10] = false;
			targetingPuzzle.startCell = 8;
			return;
		case 3:
			targetingPuzzle.cells[2] = false;
			targetingPuzzle.startCell = 1;
			return;
		// TODO: more variants
		}
	case FWeaponTargetingSolution::Medium:
		targetingPuzzle.width = 4;
		targetingPuzzle.height = 4;

		for (auto y = 0; y<targetingPuzzle.height; y++)
			for (auto x = 0; x < targetingPuzzle.width; x++)
				SETADD(targetingPuzzle.cells, true);

		switch (FMath::RandRange(1, 6))
		{
		case 1:
			targetingPuzzle.cells[0] = false;
			targetingPuzzle.cells[1] = false;
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.startCell = 9;
			return;
		case 2:
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.cells[4] = false;
			targetingPuzzle.cells[7] = false;
			targetingPuzzle.startCell = 8;
			return;
		case 3:
			targetingPuzzle.cells[12] = false;
			targetingPuzzle.cells[13] = false;
			targetingPuzzle.cells[15] = false;
			targetingPuzzle.startCell = 3;
			return;
		case 4:
			targetingPuzzle.cells[7] = false;
			targetingPuzzle.cells[9] = false;
			targetingPuzzle.startCell = 10;
			return;
		case 5:
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.cells[8] = false;
			targetingPuzzle.startCell = 0;
			return;
		case 6:
			targetingPuzzle.cells[1] = false;
			targetingPuzzle.startCell = 13;
			return;
		// TODO: more variants
		}
	case FWeaponTargetingSolution::Hard:
		targetingPuzzle.width = 5;
		targetingPuzzle.height = 4;

		for (auto y = 0; y<targetingPuzzle.height; y++)
			for (auto x = 0; x < targetingPuzzle.width; x++)
				SETADD(targetingPuzzle.cells, true);

		switch (FMath::RandRange(1, 3))
		{
		case 1:
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.cells[4] = false;
			targetingPuzzle.cells[9] = false;
			targetingPuzzle.cells[14] = false;
			targetingPuzzle.cells[16] = false;
			targetingPuzzle.startCell = 15;
			return;
		case 2:
			targetingPuzzle.cells[0] = false;
			targetingPuzzle.cells[4] = false;
			targetingPuzzle.cells[9] = false;
			targetingPuzzle.cells[10] = false;
			targetingPuzzle.cells[15] = false;
			targetingPuzzle.startCell = 13;
			return;
		case 3:
			targetingPuzzle.cells[5] = false;
			targetingPuzzle.cells[10] = false;
			targetingPuzzle.cells[11] = false;
			targetingPuzzle.cells[15] = false;
			targetingPuzzle.cells[16] = false;
			targetingPuzzle.startCell = 14;
			return;
		// TODO: more variants
		}
	case FWeaponTargetingSolution::VeryHard:
		targetingPuzzle.width = 5;
		targetingPuzzle.height = 5;

		for (auto y = 0; y<targetingPuzzle.height; y++)
			for (auto x = 0; x < targetingPuzzle.width; x++)
				SETADD(targetingPuzzle.cells, true);

		switch (FMath::RandRange(1, 2))
		{
		case 1: // 1-96
			targetingPuzzle.cells[3] = false;
			targetingPuzzle.cells[4] = false;
			targetingPuzzle.cells[18] = false;
			targetingPuzzle.cells[19] = false;
			targetingPuzzle.cells[24] = false;
			targetingPuzzle.startCell = 12;
			return;
		case 2: // 1-97
			targetingPuzzle.cells[2] = false;
			targetingPuzzle.cells[8] = false;
			targetingPuzzle.cells[17] = false;
			targetingPuzzle.cells[23] = false;
			targetingPuzzle.cells[24] = false;
			targetingPuzzle.startCell = 22;
			return;
		// TODO: more variants
		}
	case FWeaponTargetingSolution::Impossible:
	default:
		targetingPuzzle.width = 0;
		targetingPuzzle.height = 0;
		targetingPuzzle.startCell = 0;
		return;
	}
}

FWeaponTargetingSolution::ESolutionDifficulty UWeaponSystem::DetermineDifficulty(FWeaponTargetingSolution::ESolutionDifficulty baseDifficulty, FWeaponTargetingSolution::ETargetingFace bestFacing)
{
	uint8 iDifficulty = baseDifficulty;

	// Adjust difficulty to account for facing in the right / wrong direction
	if (bestFacing == currentlyFacing)
	{
		if (iDifficulty > FWeaponTargetingSolution::VeryEasy)
			iDifficulty --;
	}
	else if (bestFacing == -currentlyFacing) {
		iDifficulty++;
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

	if (iDifficulty >= FWeaponTargetingSolution::Impossible)
		return FWeaponTargetingSolution::Impossible;

	return (FWeaponTargetingSolution::ESolutionDifficulty)iDifficulty;
}

void UWeaponSystem::ClearPuzzle()
{
	targetingPuzzle.width = 0;
	targetingPuzzle.height = 0;
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