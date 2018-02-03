#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "ViewscreenSystem.Generated.h"

UCLASS()
class MAKEITSO_API UViewscreenSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::ViewScreen; }
private:
	void DetermineViewTarget(const char* targetIdentifier);
	void DetermineTargetAngles();
	void SendViewAngles();
	void SendViewZoomDist();
	float viewPitch, viewYaw, viewZoom, viewChaseDist;
	bool viewComms, viewChase;
	UObject *viewTarget;
	const float viewAngleStep = 15, viewZoomStep = 1.5f, minZoomFactor = 1, maxZoomFactor = 1000000, minChaseDist = 10, maxChaseDist = 10000;
};