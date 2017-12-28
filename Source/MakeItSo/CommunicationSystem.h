#include "CrewManager.h"
#include "CommunicationSystem.Generated.h"

#pragma once

/**
 * 
 */

UCLASS()
class MAKEITSO_API UCommunicationSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) override;
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Communications; }
};
