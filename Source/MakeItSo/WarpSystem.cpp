#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#include "UnrealNetwork.h"
#include "Engine/Engine.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"
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

	puzzleWidth = 0;
}

void UWarpSystem::ResetData()
{
	jumpState = EJumpState::Idle;
	jumpCharge = 0;
	jumpRequiredCharge = 0;

	CLEAR(puzzleCellGroups);
	CLEAR(puzzleGroupTargets);
	CLEAR(puzzleGroupOperators);

	jumpStartPosition = FVector::ZeroVector;
	jumpTargetPosition = FVector::ZeroVector;
	actualJumpDestination = FVector::ZeroVector;

	puzzleWidth = 0;
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
	else if (STARTS_WITH(msg, "warp_cancel "))
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
			// TODO: send all puzzle data ... puzzleSize, puzzleCellGroups, puzzleGroupOperators, puzzleGroupTargets
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
	
	puzzleWidth = DeterminePuzzleSize();

	CalculatePuzzle();

	// TODO: send all puzzle data ... puzzleSize, puzzleCellGroups, puzzleGroupOperators, puzzleGroupTargets
}


#ifdef WEB_SERVER_TEST
void UWarpSystem::CancelJump() { CancelJump_Implementation(); }
#endif

void UWarpSystem::CancelJump_Implementation()
{
	if (jumpState != EJumpState::Idle)
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

	if (SIZENUM(solution) != puzzleWidth * puzzleWidth)
		return;

	auto groupResults = ResolveSolution(solution);

	SendPuzzleResults(groupResults);

	uint8 numWrongGroups = 0;
	for (auto i = SIZENUM(groupResults) - 1; i >= 0; i--)
		if (groupResults[i] != puzzleGroupTargets[i])
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
	auto numGroups = SIZENUM(puzzleCellGroups);
	TArray<bool> groupResults;

#ifndef WEB_SERVER_TEST
	groupResults.AddZeroed(numGroups);
#else
	groupResults.assign(numGroups, 0);
#endif

	for (auto iGroup = 0; iGroup < numGroups; iGroup++)
	{
		auto groupOperator = puzzleGroupOperators[iGroup];
		auto groupTarget = puzzleGroupTargets[iGroup];

		int16 groupTotal = 0;
		
		// TODO: apply operator to numbers, see if they reach the target

		groupResults[iGroup] = groupTotal == puzzleGroupTargets[iGroup];
	}

	return groupResults;
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
	if (jumpDistSq < 10)
		return 2;
	if (jumpDistSq < 100)
		return 3;
	if (jumpDistSq < 1000)
		return 4;
	if (jumpDistSq < 10000)
		return 5;
	if (jumpDistSq < 100000)
		return 6;
	if (jumpDistSq < 1000000)
		return 7;
	if (jumpDistSq < 10000000)
		return 8;
	
	return 9;
}

void UWarpSystem::CalculatePuzzle()
{
	CLEAR(puzzleCellGroups);
	CLEAR(puzzleGroupOperators);
	CLEAR(puzzleGroupTargets);

	auto numCells = puzzleWidth * puzzleWidth;

#ifndef WEB_SERVER_TEST
	puzzleCellGroups.AddZeroed(numCells);
#else
	puzzleCellGroups.assign(numCells, 0);
#endif

	// TODO: populate the following, for a grid of puzzleSize:

	// puzzleCellGroups
	// puzzleGroupOperators
	// puzzleGroupTargets


	// this is just placeholder data
	SETADD(puzzleGroupOperators, EOperator::Add);
	SETADD(puzzleGroupOperators, EOperator::Multiply);
	SETADD(puzzleGroupTargets, 47);
	SETADD(puzzleGroupTargets, 72);
	for (auto i = 0; i < numCells; i++)
		puzzleCellGroups[i] = i % 2;
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