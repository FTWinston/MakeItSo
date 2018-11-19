#ifndef WEB_SERVER_TEST
#include "SensorSystem.h"
#else
#include "stdafx.h"
#include "SensorSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

void USensorSystem::SendAllData_Implementation()
{
	// TODO: get sensor data from game objects
	SendAllFixed("sensor_target 1 200 100 50 * #ffd 25 45"); // star
	SendAllFixed("sensor_target 2 200 150 50 o #69c 5"); // planets
	SendAllFixed("sensor_target 3 100 100 20 o #c69 8");
	SendAllFixed("sensor_target 4 250 75 -30 o #9c6 6");
	SendAllFixed("sensor_target 5 110 104 15 + 2"); // station
	SendAllFixed("sensor_target 6 106 108 15 v 3 5 -1 3"); // ships
	SendAllFixed("sensor_target 7 220 65 -15 v 1 2 2 3");
}

bool USensorSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	return false;
}

void USensorSystem::AddTarget(USensorTargetInfo *target)
{
	SETADD(sensorTargets, target);
}

void USensorSystem::RemoveTarget(USensorTargetInfo *target)
{
	SETREMOVEVAL(sensorTargets, target);
}

bool USensorSystem::ReplicateSubobjects(UActorChannel *Channel, FOutBunch *Bunch, FReplicationFlags *RepFlags)
{
	bool wroteSomething = Super::ReplicateSubobjects(Channel, Bunch, RepFlags);

	auto limit = SIZENUM(sensorTargets);
	for (int32 i = 0; i < limit; i++)
		wroteSomething |= Channel->ReplicateSubobject(sensorTargets[i], Bunch, RepFlags);

	return wroteSomething;
}