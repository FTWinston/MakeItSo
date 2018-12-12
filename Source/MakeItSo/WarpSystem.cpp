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

		// TODO: convert parts to numbers, pass them into PerformWarpJump

		PerformWarpJump(solution);
		return true;
	}

	return false;
}

void UWarpSystem::SendAllData_Implementation()
{
	SendJumpState();

	SendJumpCharge();

	// TODO: depending on state, also send jump source, jump target and puzzle data
}



#ifdef WEB_SERVER_TEST
void UWarpSystem::CalculateJump(FVector targetPos) { CalculateJump_Implementation(targetPos); }
#endif

void UWarpSystem::CalculateJump_Implementation(FVector targetPos)
{
	if (jumpState != EJumpState::Idle)
		return;

	jumpStartPosition = crewManager->GetShipPawn()->GetActorLocation();

	// TODO: calculate puzzle data, send it to client
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

	actualJumpDestination = DetermineJumpDestination(solution);

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

FVector UWarpSystem::DetermineJumpDestination(TArray<uint8> solution)
{
	FVector destination = jumpTargetPosition;

	// TODO: add an offset based on how correct the solution is

	// add an offset equivalent to the ship's current offset from the calculated jump start position
	destination += (crewManager->GetShipPawn()->GetActorLocation() - jumpStartPosition);

	// TODO: add an offset based on system health level

	return jumpTargetPosition;
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