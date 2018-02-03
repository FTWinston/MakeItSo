#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#include "CrewManager.h"
#include "UnrealNetwork.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"
#endif

#include "WarpJump.h"

void UWarpSystem::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UWarpSystem, currentJumpCalculation/*, COND_OwnerOnly*/);
	DOREPLIFETIME(UWarpSystem, calculatedJumps/*, COND_OwnerOnly*/);
}

bool UWarpSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "warp_plot "))
	{
		// TODO: extract relevant params, make server RPC call
		// `warp_plot ${ from.x } ${ from.y } ${ from.z } ${ yaw } ${ pitch } ${ power }`
#ifndef WEB_SERVER_TEST
		//crewManager->GetController()->StartJumpCalculation(...params)
#endif
		return true;
	}
	else if (STARTS_WITH(msg, "warp_delete "))
	{
		int32 jumpID = ExtractInt(msg, sizeof("warp_delete "));

		// TODO: send delete RPC to server
		return true;
	}
	else if (STARTS_WITH(msg, "warp_jump "))
	{
		int32 jumpID = ExtractInt(msg, sizeof("warp_jump "));
#ifndef WEB_SERVER_TEST
		PerformWarpJump(jumpID);
#endif
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

	// TODO: update local calculating path??
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
	if (power <= 0 || power > 100)
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

bool UWarpSystem::PerformWarpJump_Validate(int32 jumpID)
{
	return calculatedJumps.Contains(jumpID);
}

void UWarpSystem::PerformWarpJump_Implementation(int32 jumpID)
{
	// TODO: actually perform jump
}