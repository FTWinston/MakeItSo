#include "CrewManager.h"

#pragma once

/**
 * 
 */

struct FQuat;

//UCLASS()
class MAKEITSO_API UHelmSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	void SendAllData();
	void ResetData();
	bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg);
	void Tick(float DeltaSeconds);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Helm; }
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