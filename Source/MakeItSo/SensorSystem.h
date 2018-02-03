#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "SensorSystem.Generated.h"

UCLASS()
class MAKEITSO_API USensorSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	virtual void SendAllData_Implementation() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Sensors; }
};
