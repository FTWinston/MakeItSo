#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "WeaponSystem.h"

bool UWeaponSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	return false;
}

void UWeaponSystem::SendAllData()
{
	// TODO: send all weapon targets
}
