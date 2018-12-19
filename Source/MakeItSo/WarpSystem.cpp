#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#include "UnrealNetwork.h"
#include "Engine/Engine.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"

#include <algorithm>    // std::shuffle
#include <random>       // std::default_random_engine
#include <chrono>       // std::chrono::system_clock
#endif

#include "CrewManager.h"
#include "MakeItSoPawn.h"
#include "WarpJump.h"

#define JUMP_CHARGE_FULL_POWER_HEALTH_GENERATION_RATE 1

#define LOCATION_UPDATE_THRESHOLD 5
#define LOCATION_UPDATE_THRESHOLD_SQ LOCATION_UPDATE_THRESHOLD * LOCATION_UPDATE_THRESHOLD

UWarpSystem::UWarpSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.5f;
	PrimaryComponentTick.SetTickFunctionEnable(true);

	jumpState = EJumpState::Idle;
	lastSentLocation = FVector::ZeroVector;
	jumpCharge = 0;
	jumpRequiredCharge = 0;

	jumpStartPosition = FVector::ZeroVector;
	jumpTargetPosition = FVector::ZeroVector;
	actualJumpDestination = FVector::ZeroVector;

	puzzle.width = 0;
}

void UWarpSystem::ResetData()
{
	jumpState = EJumpState::Idle;
	jumpCharge = 0;
	jumpRequiredCharge = 0;

	CLEAR(puzzle.cellGroups);
	CLEAR(puzzle.groupTargets);
	CLEAR(puzzle.groupOperators);

	jumpStartPosition = FVector::ZeroVector;
	jumpTargetPosition = FVector::ZeroVector;
	actualJumpDestination = FVector::ZeroVector;

	puzzle.width = 0;
}

void UWarpSystem::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME_CONDITION(UWarpSystem, jumpStartPosition, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, jumpTargetPosition, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, jumpRequiredCharge, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, jumpState, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, jumpCharge, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, puzzleWidth, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, puzzleCellGroups, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, puzzleGroupTargets, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, puzzleGroupOperators, COND_OwnerOnly);
}

bool UWarpSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "warp_plot "))
	{
		// warp_plot toX toY toZ
		TArray<FString> parts = SplitParts(msg, sizeof("warp_plot "));

		if (SIZENUM(parts) < 3)
			return false;

		FVector targetPos = FVector(STOF(parts[0]), STOF(parts[1]), STOF(parts[2]));

		CalculateJump(targetPos);
		return true;
	}
	else if (MATCHES(msg, "warp_cancel"))
	{
		CancelJump();
		return true;
	}
	else if (STARTS_WITH(msg, "warp_jump "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("warp_jump "));

		TArray<uint8> solution;

		for (auto part : parts)
			SETADD(solution, (uint8)STOI(part));

		PerformWarpJump(solution);
		return true;
	}

	return false;
}

void UWarpSystem::SendAllData_Implementation()
{
	SendJumpState();

	SendJumpCharge();

	if (jumpState != EJumpState::Idle)
	{
		SendJumpPositions(jumpStartPosition, jumpTargetPosition);

		if (jumpState != EJumpState::Jumping)
		{
			SendPuzzleData();
		}
	}
}



#ifdef WEB_SERVER_TEST
void UWarpSystem::CalculateJump(FVector targetPos) { CalculateJump_Implementation(targetPos); }
#endif

void UWarpSystem::CalculateJump_Implementation(FVector targetPos)
{
	if (jumpState != EJumpState::Idle)
		return;

	jumpStartPosition = crewManager->GetShipPawn()->GetActorLocation();
	jumpTargetPosition = targetPos;

	SendJumpPositions(jumpStartPosition, jumpTargetPosition);

	CalculatePuzzle();

	if (ISCLIENT())
		SendPuzzleData();

	jumpState = EJumpState::Charging;

	if (ISCLIENT())
		SendJumpState();
}


#ifdef WEB_SERVER_TEST
void UWarpSystem::CancelJump() { CancelJump_Implementation(); }
#endif

void UWarpSystem::CancelJump_Implementation()
{
	if (jumpState == EJumpState::Idle)
		return;

	ResetData();

	if (ISCLIENT())
	{
		SendJumpState();
		SendJumpCharge();
	}
}


#ifdef WEB_SERVER_TEST
void UWarpSystem::PerformWarpJump(TArray<uint8> solution) { PerformWarpJump_Implementation(solution); }
#endif

void UWarpSystem::PerformWarpJump_Implementation(TArray<uint8> solution)
{
	if (jumpState != EJumpState::Ready)
		return;

	if (SIZENUM(solution) != puzzle.width * puzzle.width)
		return;

	auto groupResults = ResolveSolution(solution);

	SendPuzzleResults(groupResults);

	uint8 numWrongGroups = 0;
	for (auto groupResult : groupResults)
		if (!groupResult)
			numWrongGroups++;

	actualJumpDestination = DetermineJumpDestination(numWrongGroups);

	// TODO: set jump end time

	jumpState = EJumpState::Jumping;
	if (ISCLIENT())
		SendJumpState();

	crewManager->GetShipPawn()->StartWarpJump(actualJumpDestination);
}

void UWarpSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	switch (jumpState) {
	case EJumpState::Charging:
		TickCharging(DeltaTime);
		break;
	case EJumpState::Jumping:
		TickJumping(DeltaTime);
		return; // Don't bother sending the ship location.
	}

	auto shipLocation = crewManager->GetShipPawn()->GetActorLocation();
	if (FVector::DistSquared(lastSentLocation, shipLocation) > LOCATION_UPDATE_THRESHOLD_SQ)
	{
		SendShipLocation();
		lastSentLocation = shipLocation;
	}
}

void UWarpSystem::TickCharging(float DeltaTime)
{
	jumpCharge += JUMP_CHARGE_FULL_POWER_HEALTH_GENERATION_RATE * DeltaTime * GetPowerLevel() * GetHealthLevel() / (100.f * 100.f);

	if (jumpCharge >= jumpRequiredCharge)
	{
		jumpState = EJumpState::Ready;

		if (ISCLIENT())
			SendJumpState();

		jumpCharge = jumpRequiredCharge;
	}

	if (ISCLIENT())
		SendJumpCharge();
}

void UWarpSystem::TickJumping(float DeltaTime)
{
	// TODO: Wait until jump end time has been reached


	crewManager->GetShipPawn()->FinishWarpJump(actualJumpDestination);

	ResetData();

	if (ISCLIENT())
	{
		SendJumpState();
		SendJumpCharge();
	}
}

TArray<bool> UWarpSystem::ResolveSolution(TArray<uint8> solution)
{
	auto numGroups = SIZENUM(puzzle.groupTargets);
	auto numCells = SIZENUM(puzzle.cellGroups);
	TArray<bool> groupResults;

#ifndef WEB_SERVER_TEST
	groupResults.AddZeroed(numGroups);
#else
	groupResults.assign(numGroups, 0);
#endif

	for (uint32 iGroup = 0; iGroup < numGroups; iGroup++)
	{
		auto groupOperator = puzzle.groupOperators[iGroup];
		auto groupTarget = puzzle.groupTargets[iGroup];

		auto groupCells = puzzle.groupCells[iGroup];

		groupResults[iGroup] = IsGroupValid(solution, groupCells, groupOperator, groupTarget);
	}

	return groupResults;
}

bool UWarpSystem::IsGroupValid(TArray<uint8> solution, TArray<uint8> group, FKenKenData::EOperator groupOperator, int16 groupTarget)
{
	int16 groupTotal;

	if (ResolveGroup(solution, group, groupOperator, groupTotal) && groupTotal == groupTarget)
		return true;

	if (groupOperator > FKenKenData::MAX_UNORDERED_OPERATOR)
	{
		// TODO: try every permutation of group
	}

	return false;
}

bool UWarpSystem::ResolveGroup(TArray<uint8> solution, TArray<uint8> group, FKenKenData::EOperator groupOperator, int16 &result)
{
	result = 0;

	switch (groupOperator)
	{
	case FKenKenData::EOperator::Add:
		for (auto cellIndex : group)
			result += solution[cellIndex];
		break;

	case FKenKenData::EOperator::Subtract:
		result = solution[group[0]];

		for (auto i = SIZENUM(group) - 1; i >= 1; i--)
			result -= solution[group[i]];
		break;

	case FKenKenData::EOperator::Multiply:
		result = 1;
		for (auto cellIndex : group)
			result *= solution[cellIndex];
		break;

	case FKenKenData::EOperator::Divide:
		result = solution[group[0]];

		for (auto i = SIZENUM(group) - 1; i >= 1; i--)
		{
			auto value = solution[group[i]];

			if (value == 0)
				return false; // avoid divide by zero, just in case

			if (result % value != 0)
				return false; // There might still be another order this works in.

			result /= value;
		}
		break;
	}

	return true;
}

FVector UWarpSystem::DetermineJumpDestination(uint8 numWrongGroups)
{
	FVector destination = jumpTargetPosition;

	// TODO: add an offset based on numWrongGroups

	// add an offset equivalent to the ship's current offset from the calculated jump start position
	destination += (crewManager->GetShipPawn()->GetActorLocation() - jumpStartPosition);

	// TODO: add an offset based on system health level

	return jumpTargetPosition;
}

uint8 UWarpSystem::DeterminePuzzleSize()
{
	auto jumpDistSq = FVector::DistSquared(jumpStartPosition, jumpTargetPosition);

	if (jumpDistSq < 1000)
		return 3;
	if (jumpDistSq < 10000)
		return 4;
	if (jumpDistSq < 100000)
		return 5;
	if (jumpDistSq < 1000000)
		return 6;
	if (jumpDistSq < 10000000)
		return 7;
	if (jumpDistSq < 100000000)
		return 8;
	
	return 9;
}

void UWarpSystem::CalculatePuzzle()
{
	puzzle.width = DeterminePuzzleSize();

	CLEAR(puzzle.cellGroups);
	CLEAR(puzzle.groupOperators);
	CLEAR(puzzle.groupTargets);

	uint16 numCells = puzzle.width * puzzle.width;

	TArray<uint8> solution;

#ifndef WEB_SERVER_TEST
	puzzleCellGroups.AddZeroed(numCells);
	solution.AddZeroed(numCells);
#else
	puzzle.cellGroups.assign(numCells, 0);
	solution.assign(numCells, 0);
#endif
	
	CreateLatinSquare(solution);
	puzzle.groupCells = AllocateCellGroups();

	for (auto cellGroup : puzzle.groupCells)
	{
		auto groupSize = SIZENUM(cellGroup);

		auto groupOperator = groupSize == 1
			? FKenKenData::EOperator::Add
			: (FKenKenData::EOperator)FMath::RandRange(FKenKenData::MIN_OPERATOR, FKenKenData::MAX_OPERATOR);

		int16 groupTarget;
		if (!TryPickTarget(cellGroup, solution, groupOperator, groupTarget))
		{
			groupOperator = (FKenKenData::EOperator)FMath::RandRange(FKenKenData::MIN_OPERATOR, FKenKenData::MAX_UNORDERED_OPERATOR);

			TryPickTarget(cellGroup, solution, groupOperator, groupTarget);
		}
		
		SETADD(puzzle.groupOperators, groupOperator);
		SETADD(puzzle.groupTargets, groupTarget);
	}
}

void UWarpSystem::CreateLatinSquare(TArray<uint8> &cells)
{
#define CELLINDEX(x, y) (y * puzzle.width + x)

	// Apply numbers from 1 to puzzleWidth in a standard pattern
	for (uint8 x = 0; x < puzzle.width; x++)
		for (uint8 y = 0; y < puzzle.width; y++)
		{
			uint8 val = x + y + 1;
			if (val > puzzle.width)
				val -= puzzle.width;

			cells[CELLINDEX(x, y)] = val;
		}
	
	// shuffle rows
	for (uint8 y = 0; y < puzzle.width; y++)
	{
		auto newY = FMath::RandRange(0, puzzle.width - 1);

		uint8 tmp;

		for (uint8 x = 0; x < puzzle.width; x++)
		{
			auto index1 = CELLINDEX(x, y);
			auto index2 = CELLINDEX(x, newY);

			tmp = cells[index1];
			cells[index1] = cells[index2];
			cells[index2] = tmp;
		}
	}

	// shuffle columns
	for (uint8 x = 0; x < puzzle.width; x++)
	{
		auto newX = FMath::RandRange(0, puzzle.width - 1);

		uint8 tmp;

		for (uint8 y = 0; y < puzzle.width; y++)
		{
			auto index1 = CELLINDEX(x, y);
			auto index2 = CELLINDEX(newX, y);

			tmp = cells[index1];
			cells[index1] = cells[index2];
			cells[index2] = tmp;
		}
	}
}

TArray<TArray<uint8>> UWarpSystem::AllocateCellGroups()
{
	TArray<TArray<uint8>> groupCells;
	TSet<uint8> allocatedCells;
	bool allowSize1 = true;
	uint8 iNextGroup = 0;

	uint8 numCells = puzzle.width * puzzle.width;
	for (uint8 iCell = 0; iCell < numCells; iCell++)
	{
		if (SETCONTAINS(allocatedCells, iCell))
			continue;
		
		auto targetGroupSize = FMath::RandRange(allowSize1 ? 1 : 2, 4);

		if (targetGroupSize == 1)
			allowSize1 = false; // only allow a single size 1 group ... though we might end up with an extra one for the last cell anyway

		TArray<uint8> group;
		SETADD(group, iCell);
		SETADD(allocatedCells, iCell);
		puzzle.cellGroups[iCell] = iNextGroup;

		auto groupSize = 1;
		TArray<uint8> unoccupiedNeighbours;

		AddUnallocatedNeighbouringCellIndices(iCell, unoccupiedNeighbours, allocatedCells);

		while (groupSize < targetGroupSize)
		{
			auto numNeighbours = SIZENUM(unoccupiedNeighbours);
			if (numNeighbours == 0)
				break;

			uint8 expandToCell = unoccupiedNeighbours[FMath::RandRange(0, numNeighbours - 1)];
			SETREMOVEVAL(unoccupiedNeighbours, expandToCell);
			SETADD(allocatedCells, expandToCell);
			SETADD(group, expandToCell);
			groupSize++;

			puzzle.cellGroups[expandToCell] = iNextGroup;

			AddUnallocatedNeighbouringCellIndices(expandToCell, unoccupiedNeighbours, allocatedCells);
		}

		SETADD(groupCells, group);

		iNextGroup++;
	}

	return groupCells;
}

void UWarpSystem::AddUnallocatedNeighbouringCellIndices(uint8 cellIndex, TArray<uint8> &output, TSet<uint8> allocatedCells)
{
	if (cellIndex >= puzzle.width)
	{
		uint8 testIndex = cellIndex - puzzle.width;
		if (!SETCONTAINS(allocatedCells, testIndex))
			SETADD(output, testIndex);
	}

	if (cellIndex < puzzle.width * puzzle.width - puzzle.width)
	{
		uint8 testIndex = cellIndex + puzzle.width;
		if (!SETCONTAINS(allocatedCells, testIndex))
			SETADD(output, testIndex);
	}

	uint8 cellX = cellIndex % puzzle.width;

	if (cellX > 0)
	{
		uint8 testIndex = cellIndex - 1;
		if (!SETCONTAINS(allocatedCells, testIndex))
			SETADD(output, testIndex);
	}

	if (cellX < puzzle.width - 1)
	{
		uint8 testIndex = cellIndex + 1;
		if (!SETCONTAINS(allocatedCells, testIndex))
			SETADD(output, testIndex);
	}
}

bool UWarpSystem::TryPickTarget(TArray<uint8> group, TArray<uint8> values, FKenKenData::EOperator groupOperator, int16 &groupTarget)
{
	if (groupOperator > FKenKenData::MAX_UNORDERED_OPERATOR)
	{
#ifdef WEB_SERVER_TEST
		unsigned int seed = (unsigned int)std::chrono::system_clock::now().time_since_epoch().count();
		std::shuffle(group.begin(), group.end(), std::default_random_engine(seed));
#else
		group.Sort([this](const uint8 item1, const uint8 item2) {
			return FMath::FRand() < 0.5f;
		});
#endif
	}

	return ResolveGroup(values, group, groupOperator, groupTarget);
}


#ifdef WEB_SERVER_TEST
void UWarpSystem::SendShipLocation() { SendShipLocation_Implementation(); }
#endif
void UWarpSystem::SendShipLocation_Implementation()
{
	FString output = TEXT("warp_ship_pos ");
	auto loc = crewManager->GetShipPawn()->GetActorLocation();

	APPENDINT(output, loc.X);
	output += TEXT(" ");
	APPENDINT(output, loc.Y);
	output += TEXT(" ");
	APPENDINT(output, loc.Z);

	SendSystem(output);
}

void UWarpSystem::OnReplicated_JumpCharge(float beforeChange)
{
	SendJumpCharge();
}

void UWarpSystem::OnReplicated_Puzzle(FKenKenData beforeChange)
{
	SendPuzzleData();
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::SendJumpCharge() { SendJumpCharge_Implementation(); }
#endif
void UWarpSystem::SendJumpCharge_Implementation()
{
	uint8 progress = (uint8)(100 * jumpCharge / jumpRequiredCharge);

	FString output = TEXT("warp_charge ");
	APPENDINT(output, progress);
	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::SendJumpPositions(FVector start, FVector target) { SendJumpPositions_Implementation(start, target); }
#endif
void UWarpSystem::SendJumpPositions_Implementation(FVector start, FVector target)
{
	FString output = TEXT("warp_positions ");

	APPENDINT(output, start.X);
	output += TEXT(" ");
	APPENDINT(output, start.Y);
	output += TEXT(" ");
	APPENDINT(output, start.Z);
	output += TEXT(" ");
	APPENDINT(output, target.X);
	output += TEXT(" ");
	APPENDINT(output, target.Y);
	output += TEXT(" ");
	APPENDINT(output, target.Z);

	SendSystem(output);
}

void UWarpSystem::OnReplicated_JumpState(EJumpState beforeChange)
{
	SendJumpState();
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::SendJumpState() { SendJumpState_Implementation(); }
#endif
void UWarpSystem::SendJumpState_Implementation()
{
	FString output = TEXT("warp_state ");
	APPENDINT(output, (uint8)jumpState);
	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::SendPuzzleData() { SendPuzzleData_Implementation(); }
#endif
void UWarpSystem::SendPuzzleData_Implementation()
{
	FString output = TEXT("warp_puzzle ");

	APPENDINT(output, puzzle.width);

	output += TEXT("/");


	bool first = true;

	for (auto group : puzzle.cellGroups)
	{
		if (first)
			first = false;
		else
			output += TEXT(" ");
		APPENDINT(output, group);
	}

	output += TEXT("/");


	first = true;

	for (auto groupOperator : puzzle.groupOperators)
	{
		if (first)
			first = false;
		else
			output += TEXT(" ");
		APPENDINT(output, (uint8)groupOperator);
	}

	output += TEXT("/");


	first = true;

	for (auto groupTarget : puzzle.groupTargets)
	{
		if (first)
			first = false;
		else
			output += TEXT(" ");
		APPENDINT(output, groupTarget);
	}

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::SendPuzzleResults(TArray<bool> results) { SendPuzzleResults_Implementation(results); }
#endif
void UWarpSystem::SendPuzzleResults_Implementation(TArray<bool> results)
{
	FString output = TEXT("warp_results");
	
	for (auto result : results)
	{
		output += result ? TEXT(" 1") : TEXT(" 0");
	}

	SendSystem(output);
}