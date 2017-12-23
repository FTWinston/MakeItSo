#include "CrewManager.h"

#pragma once

/**
 * 
 */

//UCLASS()
class MAKEITSO_API UCommunicationSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Communications; }
};
