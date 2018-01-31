#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "CrewManager.h"
#include "WarpSystem.Generated.h"

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
	
	void AddCalculationStep(FVector newPoint);
	void FinishCalculation(FVector endPoint, bool isSafe);
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Warp; }
};