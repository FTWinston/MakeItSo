#include "CrewManager.h"
#include "SensorSystem.Generated.h"

#pragma once

/**
 * 
 */

UCLASS()
class MAKEITSO_API USensorSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) override;
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Sensors; }
};
