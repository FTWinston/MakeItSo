#include "CrewManager.h"

#pragma once

/**
 * 
 */

//UCLASS()
class MAKEITSO_API UWeaponSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Weapons; }
};