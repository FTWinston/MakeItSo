#include "CrewManager.h"
#include "HelmSystem.Generated.h"

#pragma once

/**
 * 
 */

struct FQuat;

UCLASS()
class MAKEITSO_API UHelmSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	virtual void SendAllData() override;
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) override;
	virtual void Tick(float DeltaSeconds) override;
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Helm; }
private:
	float TowardsZero(float value, float amount);
	float AdjustAndClamp(float value, bool decrease, bool increase, float amount, float minMalue, float maxValue);

	float rotationAccel, strafeAccel, forwardAccelMax;
	bool pitchDown, pitchUp, yawLeft, yawRight, rollLeft, rollRight;
	bool moveForward, moveBackward, strafeLeft, strafeRight, strafeUp, strafeDown;
	bool stopRotation, stopStrafing, stopForwardBack;

	// TODO: these values should presumably not be stored separately here, and instead the physical ship object should be used
	float pitchRateMax, yawRateMax, rollRateMax;

	float sideMoveRate, verticalMoveRate, forwardMoveRate;
	float sideMoveRateMax, verticalMoveRateMax;
	float forwardMoveRateMax, backwardMoveRateMax;
};