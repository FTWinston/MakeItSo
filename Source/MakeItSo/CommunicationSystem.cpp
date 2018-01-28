#ifndef WEB_SERVER_TEST
#include "CommunicationSystem.h"
#else
#include "stdafx.h"
#include "CommunicationSystem.h"
#endif

bool UCommunicationSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	return false;
}
