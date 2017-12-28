#include "CrewManager.h"
#include "WarpSystem.Generated.h"

#pragma once

/**
 * 
 */
UCLASS()
class MAKEITSO_API UWarpSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData() override;
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Warp; }
};