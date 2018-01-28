#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "CrewManager.h"
#include "SensorSystem.Generated.h"

/**
 * 
 */

UCLASS()
class MAKEITSO_API USensorSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	virtual void SendAllData() override;
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) override;
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Sensors; }
};
