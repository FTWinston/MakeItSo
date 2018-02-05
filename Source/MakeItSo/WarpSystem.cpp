#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#include "UnrealNetwork.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"
#endif

#include "CrewManager.h"
#include "WarpJump.h"

void UWarpSystem::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME_CONDITION(UWarpSystem, currentJumpCalculation, COND_OwnerOnly);
	DOREPLIFETIME_CONDITION(UWarpSystem, calculatedJumps, COND_OwnerOnly);
}

bool UWarpSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "warp_plot "))
	{
		// `warp_plot ${ from.x } ${ from.y } ${ from.z } ${ yaw } ${ pitch } ${ power }`

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

		// TODO: call server delete RPC
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

void UWarpSystem::AddCalculationStep(FVector newPoint)
{
	FString output = TEXT("warp_ext_path ");

#ifndef WEB_SERVER_TEST
	//output.AppendInt(currentEditingJump.ID);
#else
	//output += currentEditingJump.ID;
#endif
	AddPointToOutput(output, newPoint);

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

void UWarpSystem::SendAllData_Implementation()
{
	
}

bool UWarpSystem::StartJumpCalculation_Validate(FVector startPos, FRotator direction, float power)
{
	if (power < 0 || power > 100)
		return false;

	return true;
}

void UWarpSystem::StartJumpCalculation_Implementation(FVector startPos, FRotator direction, float power)
{
	// TODO: create a JumpCalculation object, reference it as currentJumpCalculation

	// every tick (or whatever interval), calculate another step for it

	// call JumpCalculationStep with the updated "end" point
}

/*
void UWarpSystem::JumpCalculationStep_Implementation(FVector newPoint)
{
	AddCalculationStep(newPoint);
}

void UWarpSystem::FinishJumpCalculation_Implementation(FVector endPoint, bool isSafe)
{
	AddCalculationStep(endPoint);

	FString output = TEXT("warp_upd_path ");

#ifndef WEB_SERVER_TEST
	//output.AppendInt(currentEditingJump.ID);
	output += TEXT(" ");
	output.AppendInt(isSafe ? 1 : 0);
#else
	//output += currentEditingJump.ID;
	output += TEXT(" ");
	output += isSafe ? 1 : 0;
#endif

	SendSystem(output);
}
*/

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