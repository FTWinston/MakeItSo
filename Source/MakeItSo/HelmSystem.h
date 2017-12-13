#include "CrewManager.h"

#pragma once

/**
 * 
 */

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
	float AdjustAndClamp(float value, bool decrease, bool increase, float amount, float maxValue);

	float rotationAccel, strafeAccel, forwardAccelMax;
	bool pitchDown, pitchUp, yawLeft, yawRight, rollLeft, rollRight;
	bool strafeLeft, strafeRight, strafeUp, strafeDown;
	bool stopRotation, stopStrafing;
	float forwardAccel;

	// TODO: these values should presumably not be stored separately here, and instead the physical ship object should be used
	float pitch, yaw, roll;
	float pitchRate, yawRate, rollRate;
	float pitchRateMax, yawRateMax, rollRateMax;

	float sideMoveRate, verticalMoveRate, forwardMoveRate;
	float sideMoveRateMax, verticalMoveRateMax;
	float forwardMoveRateMax, backwardMoveRateMax;
};