#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "CommunicationSystem.h"

bool UCommunicationSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	return false;
}
