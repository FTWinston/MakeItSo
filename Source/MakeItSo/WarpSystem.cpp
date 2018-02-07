#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#include "UnrealNetwork.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"
#endif

#include "CrewManager.h"
#include "WarpJump.h"

UWarpSystem::UWarpSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 1.f;
	PrimaryComponentTick.SetTickFunctionEnable(false);

	calculationStepsRemaining = 0;
	calculationStartPower = 0;
	calculationCurrentVelocity = FVector::ZeroVector;

	nextJumpID = 1;
}

void UWarpSystem::ResetData()
{
	CleanupAfterCalculation();
	nextJumpID = 1;

#ifndef WEB_SERVER_TEST
	calculatedJumps.Empty();
#else
	calculatedJumps.clear();
#endif
}

void UWarpSystem::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME_CONDITION(UWarpSystem, calculationStartPower, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, calculationStepPositions, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, calculatedJumps, COND_OwnerOnly);
}

bool UWarpSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "warp_plot "))
	{
		// warp_plot fromX fromY fromZ yaw pitch power`
		TArray<FString> parts = SplitParts(msg, sizeof("warp_plot "));

		if (SIZENUM(parts) < 6)
			return false;

		FVector startPos = FVector(STOF(parts[0]), STOF(parts[1]), STOF(parts[2]));
		FRotator direction = FRotator(STOF(parts[4]), STOF(parts[3]), 0);
		float power = STOF(parts[5]);
		StartJumpCalculation(startPos, direction, power);
		return true;
	}
	else if (STARTS_WITH(msg, "warp_delete "))
	{
		int32 jumpID = ExtractInt(msg, sizeof("warp_delete "));
		DeleteJump(jumpID);
		return true;
	}
	else if (STARTS_WITH(msg, "warp_jump "))
	{
		int32 jumpID = ExtractInt(msg, sizeof("warp_jump "));
		PerformWarpJump(jumpID);
		return true;
	}

	return false;
}

void UWarpSystem::SendAllData_Implementation()
{
	SendSystemFixed("warp_clear");

	for (auto path : calculatedJumps)
	{
		SendPath(PAIRKEY(path), PAIRVALUE(path));
	}
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::StartJumpCalculation(FVector startPos, FRotator direction, float power) { if (StartJumpCalculation_Validate(startPos, direction, power)) StartJumpCalculation_Implementation(startPos, direction, power); }
void UWarpSystem::DeleteJump(int32 jumpID) { if (DeleteJump_Validate(jumpID)) DeleteJump_Implementation(jumpID); }
void UWarpSystem::PerformWarpJump(int32 jumpID) { if (PerformWarpJump_Validate(jumpID)) PerformWarpJump_Implementation(jumpID); }
#endif

bool UWarpSystem::StartJumpCalculation_Validate(FVector startPos, FRotator direction, float power)
{
	if (power < 0 || power > 100)
		return false;

	return true;
}

#define NUM_WARP_JUMP_STEPS 50

void UWarpSystem::StartJumpCalculation_Implementation(FVector startPos, FRotator direction, float power)
{
#ifndef WEB_SERVER_TEST
	calculationStepPositions.Reset(NUM_WARP_JUMP_STEPS);
	calculationStepPositions.Add(startPos);
#else
	calculationStepPositions.clear();
	calculationStepPositions.push_back(startPos);
#endif

	calculationStartPower = power;
	calculationCurrentVelocity = direction.Vector() * power;
	calculationStepsRemaining = NUM_WARP_JUMP_STEPS - 1;

	PrimaryComponentTick.SetTickFunctionEnable(true);
}

void UWarpSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	if (calculationStepsRemaining <= 0)
		return;

	FVector nextPoint = CalculateNextPosition(LASTITEM(calculationStepPositions), calculationCurrentVelocity, DeltaTime);

#ifndef WEB_SERVER_TEST
	calculationStepPositions.Add(nextPoint);
#else
	calculationStepPositions.insert(calculationStepPositions.end(), nextPoint);
#endif

	if (!IsSafeJumpPosition(nextPoint))
	{
		// jump calculation has reached an unpassable point, and must be aborted

		// TODO: possibly display error first, then send deletion shortly after
		SendPathDeletion(nextJumpID);

		CleanupAfterCalculation();
	}
	else if (--calculationStepsRemaining <= 0)
	{
		// have safely reached the end of the jump calculation
		auto jump = MAKENEW(UWarpJump);
		jump->JumpPower = calculationStartPower;
		jump->PositionSteps = TArray<FVector>(calculationStepPositions);
#ifndef WEB_SERVER_TEST
		calculatedJumps.Add(nextJumpID++, jump);
#else
		calculatedJumps.insert(std::pair<int, UWarpJump*>(nextJumpID++, jump));
#endif

		CleanupAfterCalculation();
	}
}

void UWarpSystem::CleanupAfterCalculation()
{
	PrimaryComponentTick.SetTickFunctionEnable(false);

	calculationStepsRemaining = 0;
	calculationStartPower = 0;
	calculationCurrentVelocity = FVector::ZeroVector;

#ifndef WEB_SERVER_TEST
	calculationStepPositions.Reset(0);
#else
	calculationStepPositions.clear();
#endif
}

FVector UWarpSystem::CalculateNextPosition(FVector position, FVector velocity, float timeStep)
{
	// TODO: RK4 gravity simulation. May require multiple smaller steps, I guess?
	// https://en.wikipedia.org/wiki/Runge–Kutta_methods#Usage

	return position + velocity * timeStep;
}

bool UWarpSystem::IsSafeJumpPosition(FVector position)
{
	// TODO: check this isn't inside a planet or star
	return true;
}

void UWarpSystem::OnReplicated_CalculationStepPositions(TArray<FVector> beforeChange)
{
	int32 prevSize = beforeChange.size(), newSize = calculationStepPositions.size();

	for (auto i = prevSize; i < newSize; i++) {
		AddCalculationStep(calculationStepPositions[i]);
	}
}

void UWarpSystem::OnReplicated_CalculatedJumps(TMap<int32, UWarpJump*> beforeChange)
{
	// send deletion of any paths that have been removed
	for (auto path : beforeChange)
	{
		int32 id = PAIRKEY(path);

		if (!MAPCONTAINS(calculatedJumps, id))
			SendPathDeletion(id);
	}

	// send any paths that have been newly added
	for (auto path : calculatedJumps)
	{
		int32 id = PAIRKEY(path);

		if (!MAPCONTAINS(beforeChange, id))
			SendPath(id, PAIRVALUE(path));
	}
}

void UWarpSystem::AddCalculationStep(FVector newPoint)
{
	FString output = TEXT("warp_ext_path ");

#ifndef WEB_SERVER_TEST
	output.AppendInt(nextJumpID);
#else
	output += nextJumpID;
#endif
	AddPointToOutput(output, newPoint);

	SendSystem(output);
}

void UWarpSystem::SendPath(int32 pathID, UWarpJump *path)
{
	FString output = TEXT("warp_add_path ");
#ifndef WEB_SERVER_TEST
	output.AppendInt(pathID);
	output.Append(TEXT(" 1 ")); // indicate path is "safe"
	output.AppendInt((int32)path->JumpPower);
#else
	output += pathID;
	output += TEXT(" 1 "); // indicate path is "safe"
	output += (int32)path->JumpPower;
#endif

	for (auto point : path->PositionSteps)
		AddPointToOutput(output, point);

	SendSystem(output);
}

void UWarpSystem::SendPathDeletion(int32 pathID)
{
	FString output = TEXT("warp_rem_path ");
#ifndef WEB_SERVER_TEST
	output.AppendInt(pathID);
#else
	output += pathID;
#endif

	SendSystem(output);
}

void UWarpSystem::AddPointToOutput(FString output, FVector point)
{
#ifndef WEB_SERVER_TEST
	output += TEXT(" ");
	output.AppendInt((int32)point.X);
	output += TEXT(" ");
	output.AppendInt((int32)point.Y);
	output += TEXT(" ");
	output.AppendInt((int32)point.Z);
#else
	output += TEXT(" ");
	output += (int)point.X;
	output += TEXT(" ");
	output += (int)point.Y;
	output += TEXT(" ");
	output += (int)point.Z;
#endif
}

bool UWarpSystem::DeleteJump_Validate(int32 jumpID)
{
	return MAPCONTAINS(calculatedJumps, jumpID);
}

void UWarpSystem::DeleteJump_Implementation(int32 jumpID)
{
	MAPREMOVE(calculatedJumps, jumpID);
}

bool UWarpSystem::PerformWarpJump_Validate(int32 jumpID)
{
	return MAPCONTAINS(calculatedJumps, jumpID);
}

void UWarpSystem::PerformWarpJump_Implementation(int32 jumpID)
{
	// TODO: actually perform jump
}