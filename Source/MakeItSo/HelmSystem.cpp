#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "HelmSystem.h"

bool UHelmSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	if (MATCHES(msg, "+yawLeft"))
	{
		yawAccel = -rotationAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::A, true);
#endif
	}
	else if (MATCHES(msg, "-yawLeft"))
	{
		yawAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::A, false);
#endif
	}
	else if (MATCHES(msg, "+yawRight"))
	{
		yawAccel = rotationAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::D, true);
#endif
	}
	else if (MATCHES(msg, "-yawRight"))
	{
		yawAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::D, false);
#endif
	}
	else if (MATCHES(msg, "+pitchUp"))
	{
		pitchAccel = -rotationAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::S, true);
#endif
	}
	else if (MATCHES(msg, "-pitchUp"))
	{
		pitchAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::S, false);
#endif
	}
	else if (MATCHES(msg, "+pitchDown"))
	{
		pitchAccel = rotationAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::W, true);
#endif
	}
	else if (MATCHES(msg, "-pitchDown"))
	{
		pitchAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::W, false);
#endif
	}
	else if (MATCHES(msg, "+rollLeft"))
	{
		rollAccel = -rotationAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::Q, true);
#endif
	}
	else if (MATCHES(msg, "-rollLeft"))
	{
		rollAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::Q, false);
#endif
	}
	else if (MATCHES(msg, "+rollRight"))
	{
		rollAccel = rotationAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::E, true);
#endif
	}
	else if (MATCHES(msg, "-rollRight"))
	{
		rollAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::E, false);
#endif
	}
	else if (MATCHES(msg, "+rotStop"))
	{
		pitchAccel = yawAccel = rollAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::X, true);
#endif
	}
	else if (MATCHES(msg, "-rotStop"))
	{
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::X, false);
#endif
	}
	else if (STARTS_WITH(msg, "yaw "))
	{
		int32 iYaw = ExtractInt(msg, sizeof("yaw "));
		float yaw = iYaw / 100.f;
#ifndef WEB_SERVER_TEST
		crewManager->InputAxis(EKeys::Gamepad_LeftX, yaw);
#endif
	}
	else if (STARTS_WITH(msg, "pitch "))
	{
		int32 iPitch = ExtractInt(msg, sizeof("pitch "));
		float pitch = iPitch / 100.f;
#ifndef WEB_SERVER_TEST
		crewManager->InputAxis(EKeys::Gamepad_LeftY, pitch);
#endif
	}
	else if (STARTS_WITH(msg, "roll "))
	{
		int32 iRoll = ExtractInt(msg, sizeof("roll "));
		float roll = iRoll / 100.f;
#ifndef WEB_SERVER_TEST
		crewManager->InputAxis(EKeys::Gamepad_LeftZ, roll);
#endif
	}
	else if (MATCHES(msg, "speed -2"))
	{
		forwardAccel = forwardAccelMax / -2;
#ifndef WEB_SERVER_TEST
		// TODO: set speed usefully
		crewManager->InputKey(EKeys::1, true);
		crewManager->InputKey(EKeys::1, false);
#endif
	}
	else if (MATCHES(msg, "speed -1"))
	{
		forwardAccel = forwardAccelMax / -4;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::2, true);
		crewManager->InputKey(EKeys::2, false);
#endif
	}
	else if (MATCHES(msg, "speed 0"))
	{
		forwardAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::3, true);
		crewManager->InputKey(EKeys::3, false);
#endif
	}
	else if (MATCHES(msg, "speed 1"))
	{
		forwardAccel = forwardAccelMax / 4;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::4, true);
		crewManager->InputKey(EKeys::4, false);
#endif
	}
	else if (MATCHES(msg, "speed 2"))
	{
		forwardAccel = forwardAccelMax / 2;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::5, true);
		crewManager->InputKey(EKeys::5, false);
#endif
	}
	else if (MATCHES(msg, "speed 3"))
	{
		forwardAccel = 3 * forwardAccelMax / 4;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::6, true);
		crewManager->InputKey(EKeys::6, false);
#endif
	}
	else if (MATCHES(msg, "speed 4"))
	{
		forwardAccel = forwardAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::7, true);
		crewManager->InputKey(EKeys::7, false);
#endif
	}
	else if (MATCHES(msg, "+strafeLeft"))
	{
		sideAccel = -strafeAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::J, true);
#endif
	}
	else if (MATCHES(msg, "-strafeLeft"))
	{
		sideAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::J, false);
#endif
	}
	else if (MATCHES(msg, "+strafeRight"))
	{
		sideAccel = strafeAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::L, true);
#endif
	}
	else if (MATCHES(msg, "-strafeRight"))
	{
		sideAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::L, false);
#endif
	}
	else if (MATCHES(msg, "+strafeUp"))
	{
		verticalAccel = -strafeAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::I, true);
#endif
	}
	else if (MATCHES(msg, "-strafeUp"))
	{
		verticalAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::I, false);
#endif
	}
	else if (MATCHES(msg, "+strafeDown"))
	{
		verticalAccel = strafeAccelMax;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::K, true);
#endif
	}
	else if (MATCHES(msg, "-strafeDown"))
	{
		verticalAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::K, false);
#endif
	}
	else if (MATCHES(msg, "+strafeStop"))
	{
		sideAccel = 0;
		verticalAccel = 0;
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::M, true);
#endif
	}
	else if (MATCHES(msg, "-strafeStop"))
	{
#ifndef WEB_SERVER_TEST
		crewManager->InputKey(EKeys::M, false);
#endif
	}
	else
		return false;

	return true;
}

#define PI 3.14159265359f

void UHelmSystem::ResetData()
{
	rotationAccelMax = PI / 8; strafeAccelMax = 50; forwardAccelMax = 500;
	pitchAccel = yawAccel = rollAccel = 0;
	sideAccel = verticalAccel = forwardAccel = 0;

	pitch = yaw = roll = 0;
	pitchRate = yawRate = rollRate = 0;
	pitchRateMax = yawRateMax = rollRateMax = PI / 2;

	sideMoveRate = verticalMoveRate = forwardMoveRate = 0;
	sideMoveRateMax = verticalMoveRateMax = 500;
	forwardMoveRateMax = 5000; backwardMoveRateMax = 2500;
}

void UHelmSystem::SendAllData()
{
	// these first two don't currently change
	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_manoever_limits %.4f %.4f %.4f %.4f %.4f",
		pitchRateMax, yawRateMax, rollRateMax, sideMoveRateMax, verticalMoveRateMax);

	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_speed_limits %.4f %.4f",
		forwardMoveRateMax, backwardMoveRateMax);
	
	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_orientation %.4f %.4f %.4f",
		pitch, yaw, roll);

	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_rotation_rates %.4f %.4f %.4f",
		pitchRate, yawRate, rollRate);

	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_translation_rates %.4f %.4f %.4f",
		sideMoveRate, verticalMoveRate, forwardMoveRate);
}

void UHelmSystem::Tick(float DeltaSeconds)
{
	// update all the variables
	float oldPitchRate = pitchRate, oldYawRate = yawRate, oldRollRate = rollRate;
	pitchRate = FMath::Max(FMath::Min(pitchRate + pitchAccel * DeltaSeconds, pitchRateMax), -pitchRateMax);
	yawRate = FMath::Max(FMath::Min(yawRate + yawAccel * DeltaSeconds, yawRateMax), -yawRateMax);
	rollRate = FMath::Max(FMath::Min(rollRate + rollAccel * DeltaSeconds, rollRateMax), -rollRateMax);
	bool rotationRateChanged = oldPitchRate != pitchRate || oldYawRate != yawRate || oldRollRate != rollRate;

	float oldPitch = pitch, oldYaw = yaw, oldRoll = roll;

	pitch += pitchRate * DeltaSeconds;
	if (pitch > PI)
		pitch -= PI * 2;
	else if (pitch < -PI)
		pitch += PI * 2;

	yaw += yawRate * DeltaSeconds;
	if (yaw > PI)
		yaw -= PI * 2;
	else if (yaw < -PI)
		yaw += PI * 2;

	roll += rollRate * DeltaSeconds;
	if (roll > PI)
		roll -= PI * 2;
	else if (roll < -PI)
		roll += PI * 2;

	bool rotationChanged = oldPitch != pitch || oldYaw != yaw || oldRoll != roll;

	float oldSideRate = sideMoveRate, oldVerticalRate = verticalMoveRate, oldForwardRate = forwardMoveRate;
	sideMoveRate = FMath::Max(FMath::Min(sideMoveRate + sideAccel * DeltaSeconds, sideMoveRateMax), -sideMoveRateMax);
	verticalMoveRate = FMath::Max(FMath::Min(verticalMoveRate + verticalAccel * DeltaSeconds, verticalMoveRateMax), -verticalMoveRateMax);
	forwardMoveRate = FMath::Max(FMath::Min(forwardMoveRate + forwardAccel * DeltaSeconds, forwardMoveRateMax), -backwardMoveRateMax);

	bool translationRateChanged = oldSideRate != sideMoveRate || oldVerticalRate != verticalMoveRate || oldForwardRate != forwardMoveRate;

	// send the updated variables to the crew
	if (rotationChanged) {
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_orientation %.4f %.4f %.4f",
			pitch, yaw, roll);
	}
	
	if (rotationRateChanged) {
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_rotation_rates %.4f %.4f %.4f",
			pitchRate, yawRate, rollRate);
	}

	if (translationRateChanged) {
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_translation_rates %.2f %.2f %.2f",
			sideMoveRate, verticalMoveRate, forwardMoveRate);
	}
}