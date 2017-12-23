#include "CrewManager.h"

#pragma once

/**
 * 
 */
//UCLASS()
class MAKEITSO_API UWarpSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Warp; }
};