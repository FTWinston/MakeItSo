#pragma once
#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "CrewManager.h"
#include "CommunicationSystem.Generated.h"

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
