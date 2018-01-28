#ifndef WEB_SERVER_TEST
#include "WarpSystem.h"
#else
#include "stdafx.h"
#include "WarpSystem.h"
#endif

bool UWarpSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	return false;
}

void UWarpSystem::SendAllData()
{
	
}