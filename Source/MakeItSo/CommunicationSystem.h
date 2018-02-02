#pragma once
#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "CommunicationSystem.Generated.h"

UCLASS()
class MAKEITSO_API UCommunicationSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Communications; }
};
