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

#define JUMP_CHARGE_GENERATED_PER_TICK 1
#define JUMP_CHARGE_CONSUMPTION_PER_TICK 4

UWarpSystem::UWarpSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 0.2f;
	PrimaryComponentTick.SetTickFunctionEnable(false);

	calculationStepsRemaining = 0;
	calculationStartPower = 0;
	calculationCurrentVelocity = FVector::ZeroVector;

	tickMode = TickMode::Tick_Calculating;
	nextJumpID = 1;
	activeJumpID = 0;
	jumpCharge = 0;
}

void UWarpSystem::ResetData()
{
	CleanupAfterCalculation();

	tickMode = TickMode::Tick_Calculating;
	nextJumpID = 1;
	activeJumpID = 0;
	jumpCharge = 0;

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
		// warp_plot fromX fromY fromZ yaw pitch power
		TArray<FString> parts = SplitParts(msg, sizeof("warp_plot "));

		if (SIZENUM(parts) < 6)
			return false;

		FVector startPos = FVector(STOF(parts[0]), STOF(parts[1]), STOF(parts[2]));
		FRotator direction = FRotator(STOF(parts[4]), STOF(parts[3]), 0);
		float power = STOF(parts[5]);
		StartJumpCalculation(startPos, direction, power);
		return true;
	}
	else if (MATCHES(msg, "warp_plot_cancel"))
	{
		CleanupAfterCalculation();
		SendPathDeletion(nextJumpID, false);
		return true;
	}
	else if (STARTS_WITH(msg, "warp_delete "))
	{
		int32 jumpID = ExtractInt(msg, sizeof("warp_delete "));
		DeleteJump(jumpID);
		return true;
	}
	else if (STARTS_WITH(msg, "warp_prepare_jump "))
	{
		int32 jumpID = ExtractInt(msg, sizeof("warp_prepare_jump "));
		PrepareWarpJump(jumpID);
		return true;
	}
	else if (MATCHES(msg, "warp_jump_cancel"))
	{
		if (activeJumpID != 0)
		{
			CancelWarpJump();
		}
		return true;
	}
	else if (MATCHES(msg, "warp_jump"))
	{
		if (activeJumpID != 0)
		{
			PerformWarpJump();
		}
		return true;
	}
	
	return false;
}

void UWarpSystem::SendAllData_Implementation()
{
	SendSystemFixed("warp_clear");

	for (auto pathInfo : calculatedJumps)
	{
		auto path = PAIRVALUE(pathInfo);
		SendPath(PAIRKEY(pathInfo), JumpPathStatus::Plotted, path->JumpPower, path->PositionSteps);
	}

	if (activeJumpID != 0)
	{	
		if (tickMode == TickMode::Tick_Jumping)
			SendJumpInProgress();
		else if (tickMode == TickMode::Tick_Charging)
			DetermineAndSendJumpCharge();
	}
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::StartJumpCalculation(FVector startPos, FRotator direction, float power) { if (StartJumpCalculation_Validate(startPos, direction, power)) StartJumpCalculation_Implementation(startPos, direction, power); }
void UWarpSystem::DeleteJump(int32 jumpID) { if (DeleteJump_Validate(jumpID)) DeleteJump_Implementation(jumpID); }
void UWarpSystem::PrepareWarpJump(int32 jumpID) { if (PrepareWarpJump_Validate(jumpID)) PrepareWarpJump_Implementation(jumpID); }
void UWarpSystem::CancelWarpJump() { CancelWarpJump_Implementation(); }
void UWarpSystem::PerformWarpJump() { if (PerformWarpJump_Validate()) PerformWarpJump_Implementation(); }
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

	if (ISCLIENT())
	{
		CalculationStepsAdded(0);
	}

	calculationStartPower = power;
	calculationCurrentVelocity = direction.Vector() * power;
	calculationStepsRemaining = NUM_WARP_JUMP_STEPS - 1;

	tickMode = TickMode::Tick_Calculating;
	PrimaryComponentTick.SetTickFunctionEnable(true);
}

void UWarpSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	switch (tickMode) {
	case TickMode::Tick_Calculating:
		TickCalculating(DeltaTime); break;
	case TickMode::Tick_Charging:
		TickCharging(DeltaTime); break;
	case TickMode::Tick_Jumping:
		TickJumping(DeltaTime); break;
	}
}

void UWarpSystem::TickCalculating(float DeltaTime)
{
	if (calculationStepsRemaining <= 0)
		return;

	float jumpStepTimeInterval = 0.2f;
	FVector nextPoint = CalculateNextPosition(LASTITEM(calculationStepPositions), calculationCurrentVelocity, jumpStepTimeInterval);

#ifndef WEB_SERVER_TEST
	calculationStepPositions.Add(nextPoint);
#else
	calculationStepPositions.insert(calculationStepPositions.end(), nextPoint);
#endif

	if (ISCLIENT())
	{// account for replication not affecting local client
		CalculationStepsAdded(SIZENUM(calculationStepPositions) - 1);
	}

	if (!IsSafeJumpPosition(nextPoint))
	{
		// jump calculation has reached an unpassable point, and must be aborted
		SendPathDeletion(nextJumpID, true);

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

		if (ISCLIENT())
		{// account for replication not affecting local client
			SendPath(nextJumpID - 1, JumpPathStatus::Plotted, jump->JumpPower, jump->PositionSteps);
		}

		CleanupAfterCalculation();
	}
}

void UWarpSystem::TickCharging(float DeltaTime)
{
	jumpCharge += JUMP_CHARGE_GENERATED_PER_TICK;
	int requiredCharge = DetermineAndSendJumpCharge();

	if (jumpCharge < requiredCharge)
	{
		return;
	}

	PrimaryComponentTick.SetTickFunctionEnable(false);
	jumpCharge = requiredCharge;
}

int UWarpSystem::DetermineAndSendJumpCharge()
{
	int requiredCharge = calculatedJumps[activeJumpID]->JumpPower;

	int32 chargeSecsRemaining = (int32)(PrimaryComponentTick.TickInterval * (requiredCharge - jumpCharge) / JUMP_CHARGE_GENERATED_PER_TICK);

	FString output = TEXT("warp_charge_jump ");
#ifndef WEB_SERVER_TEST
	output.AppendInt(activeJumpID);
#else
	output += std::to_wstring(activeJumpID);
#endif
	output += TEXT(" ");

#ifndef WEB_SERVER_TEST
	output.AppendInt(chargeSecsRemaining);
#else
	output += std::to_wstring(chargeSecsRemaining);
#endif

	output += TEXT(" ");

	int32 progress = FMath::Min(100, 100 * jumpCharge / requiredCharge);
#ifndef WEB_SERVER_TEST
	output.AppendInt(progress);
#else
	output += std::to_wstring(progress);
#endif

	SendSystem(output);

	return requiredCharge;
}

void UWarpSystem::TickJumping(float DeltaTime)
{
	jumpCharge -= JUMP_CHARGE_CONSUMPTION_PER_TICK;
	if (jumpCharge > 0)
	{
		return;
	}

	PrimaryComponentTick.SetTickFunctionEnable(false);
	jumpCharge = 0;

	SendSystemFixed("warp_cancel_jump");
	crewManager->GetShipPawn()->FinishWarpJump(calculatedJumps[activeJumpID]);

	// TODO: delete the jump that was just done
	activeJumpID = 0;
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
	// https://en.wikipedia.org/wiki/Runge-Kutta_methods#Usage

	return position + velocity * timeStep;
}

bool UWarpSystem::IsSafeJumpPosition(FVector position)
{
	// TODO: check this isn't inside a planet or star
	return true;
}

void UWarpSystem::OnReplicated_CalculationStepPositions(TArray<FVector> beforeChange)
{
	int32 prevSize = SIZENUM(beforeChange);
	CalculationStepsAdded(prevSize);
}

void UWarpSystem::CalculationStepsAdded(int32 prevSize)
{
	if (prevSize == 0)
	{
		SendPath(nextJumpID, JumpPathStatus::Calculating, calculationStartPower, calculationStepPositions);
		prevSize = 1;
	}

	int32 newSize = SIZENUM(calculationStepPositions);
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
			SendPathDeletion(id, false);
	}

	// send any paths that have been newly added
	for (auto pathInfo : calculatedJumps)
	{
		int32 id = PAIRKEY(pathInfo);

		if (!MAPCONTAINS(beforeChange, id))
		{
			auto path = PAIRVALUE(pathInfo);
			SendPath(id, JumpPathStatus::Plotted, path->JumpPower, path->PositionSteps);
		}
	}
}

void UWarpSystem::AddCalculationStep(FVector newPoint)
{
	FString output = TEXT("warp_ext_path ");

#ifndef WEB_SERVER_TEST
	output.AppendInt(nextJumpID);
#else
	output += std::to_wstring(nextJumpID);
#endif
	AddPointToOutput(output, newPoint);

	SendSystem(output);
}

void UWarpSystem::SendPath(int32 pathID, JumpPathStatus pathStatus, float jumpPower, TArray<FVector> positionSteps)
{
	FString output = TEXT("warp_add_path ");
#ifndef WEB_SERVER_TEST
	output.AppendInt(pathID);
	output.Append(TEXT(" "));
	output.AppendInt((int32)pathStatus);
	output.Append(TEXT(" "));
	output.AppendInt((int32)jumpPower);
#else
	output += std::to_wstring(pathID);
	output += TEXT(" ");
	output += std::to_wstring((int32)pathStatus);
	output += TEXT(" ");
	output += std::to_wstring((int32)jumpPower);
#endif

	for (auto point : positionSteps)
		AddPointToOutput(output, point);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UWarpSystem::SendPathDeletion(int32 pathID, bool displayInvalid) { SendPathDeletion_Implementation(pathID, displayInvalid); }
#endif
void UWarpSystem::SendPathDeletion_Implementation(int32 pathID, bool displayInvalid)
{
	FString output = TEXT("warp_rem_path ");
#ifndef WEB_SERVER_TEST
	output.AppendInt(pathID);
#else
	output += std::to_wstring(pathID);
#endif
	output += displayInvalid ? TEXT(" 1") : TEXT(" 0");

	SendSystem(output);
}

void UWarpSystem::AddPointToOutput(FString &output, FVector point)
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
	output += std::to_wstring((int)point.X);
	output += TEXT(" ");
	output += std::to_wstring((int)point.Y);
	output += TEXT(" ");
	output += std::to_wstring((int)point.Z);
#endif
}

bool UWarpSystem::DeleteJump_Validate(int32 jumpID)
{
	return MAPCONTAINS(calculatedJumps, jumpID);
}

void UWarpSystem::DeleteJump_Implementation(int32 jumpID)
{
	MAPREMOVE(calculatedJumps, jumpID);

	if (ISCLIENT())
	{
		SendPathDeletion(jumpID, false);
	}
}

bool UWarpSystem::PrepareWarpJump_Validate(int32 jumpID)
{
	return MAPCONTAINS(calculatedJumps, jumpID);
}

void UWarpSystem::PrepareWarpJump_Implementation(int32 jumpID)
{
	activeJumpID = jumpID;
	tickMode = TickMode::Tick_Charging;
	PrimaryComponentTick.SetTickFunctionEnable(true);
	
	DetermineAndSendJumpCharge();
}

void UWarpSystem::CancelWarpJump_Implementation()
{
	activeJumpID = 0;
	jumpCharge = 0;
	PrimaryComponentTick.SetTickFunctionEnable(false);

	SendSystemFixed("warp_cancel_jump");
}

bool UWarpSystem::PerformWarpJump_Validate()
{
	return activeJumpID != 0;
}

void UWarpSystem::PerformWarpJump_Implementation()
{
	tickMode = TickMode::Tick_Jumping;
	PrimaryComponentTick.SetTickFunctionEnable(true);

	crewManager->GetShipPawn()->StartWarpJump(calculatedJumps[activeJumpID]);

	SendJumpInProgress();
}

void UWarpSystem::SendJumpInProgress()
{
	int32 jumpSecsRemaining = (int32)(PrimaryComponentTick.TickInterval * jumpCharge / JUMP_CHARGE_CONSUMPTION_PER_TICK);

	FString output = TEXT("warp_jump ");
#ifndef WEB_SERVER_TEST
	output.AppendInt(activeJumpID);
#else
	output += std::to_wstring(activeJumpID);
#endif
	output += TEXT(" ");

#ifndef WEB_SERVER_TEST
	output.AppendInt(jumpSecsRemaining);
#else
	output += std::to_wstring(jumpSecsRemaining);
#endif

	SendSystem(output);
}