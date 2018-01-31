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

void UWarpSystem::SendAllData()
{
	
}

void UWarpSystem::AddCalculationStep(FVector newPoint)
{
	// TODO: send warp_ext_path id x y z

	// TODO: update local calculating path
}

void UWarpSystem::FinishCalculation(FVector endPoint, bool isSafe)
{
	// TODO: send warp_ext_path id x y z
	// TODO: send warp_upd_path id status

	// where status in Calculating = 0, Invalid = 1, Plotted = 2, InRange = 3
}