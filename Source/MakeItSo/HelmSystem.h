#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "HelmSystem.Generated.h"

UCLASS()
class MAKEITSO_API UHelmSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	virtual void SendAllData() override;
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void FakeTickReplaceMe(float DeltaSeconds);// override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Helm; }
private:
	float TowardsZero(float value, float amount);
	float AdjustAndClamp(float value, float decrease, float increase, float minMalue, float maxValue);

	float rotationAccel, strafeAccel, forwardAccelMax;
	float pitchDown, pitchUp, yawLeft, yawRight, rollLeft, rollRight;
	float moveForward, moveBackward, strafeLeft, strafeRight, strafeUp, strafeDown;
	bool stopRotation, stopStrafing, stopForwardBack;

	FVector lastSentVelocity;
	FRotator lastSentOrientation, lastSentAngularVelocity;
	float nextSendSeconds;

	// TODO: these values should presumably not be stored separately here, and instead the physical ship object should be used
	float pitchRateMax, yawRateMax, rollRateMax;
	float sideMoveRateMax, verticalMoveRateMax;
	float forwardMoveRateMax, backwardMoveRateMax;
};