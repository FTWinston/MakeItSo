#ifndef WEB_SERVER_TEST
#include "CommunicationSystem.h"
#else
#include "stdafx.h"
#include "CommunicationSystem.h"
#endif

#include "UIConnectionInfo.h"

bool UCommunicationSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	return false;
}
