#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#include "CrewManager.h"
#include "ShipPlayerController.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"
#endif

bool UWarpSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
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
		crewManager->GetController()->PerformWarpJump(jumpID);
#endif
		return true;
	}

	return false;
}

void UWarpSystem::AddPointToOutput(FString output, FVector point)
{
#ifndef WEB_SERVER_TEST
	output += TEXT(" ");
	output.AppendFloat(point.X);
	output += TEXT(" ");
	output.AppendFloat(point.Y);
	output += TEXT(" ");
	output.AppendFloat(point.Z);
#else
	output += TEXT(" ");
	output += point.X;
	output += TEXT(" ");
	output += point.Y;
	output += TEXT(" ");
	output += point.Z;
#endif
}

void UWarpSystem::SendAllData()
{
	
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

void UWarpSystem::FinishCalculation(FVector endPoint, bool isSafe)
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