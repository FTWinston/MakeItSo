#include "CrewManager.h"

#pragma once

/**
 * 
 */

//UCLASS()
class MAKEITSO_API UViewscreenSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::ViewScreen; }
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