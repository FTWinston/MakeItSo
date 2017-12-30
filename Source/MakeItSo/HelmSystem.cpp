#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif

#include "MakeItSoPawn.h"
#include "HelmSystem.h"

bool UHelmSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	if (MATCHES(msg, "+yawLeft"))
	{
		yawLeft = true;
	}
	else if (MATCHES(msg, "-yawLeft"))
	{
		yawLeft = false;
	}
	else if (MATCHES(msg, "+yawRight"))
	{
		yawRight = true;
	}
	else if (MATCHES(msg, "-yawRight"))
	{
		yawRight = false;
	}
	else if (MATCHES(msg, "+pitchUp"))
	{
		pitchUp = true;
	}
	else if (MATCHES(msg, "-pitchUp"))
	{
		pitchUp = false;
	}
	else if (MATCHES(msg, "+pitchDown"))
	{
		pitchDown = true;
	}
	else if (MATCHES(msg, "-pitchDown"))
	{
		pitchDown = false;
	}
	else if (MATCHES(msg, "+rollLeft"))
	{
		rollLeft = true;
	}
	else if (MATCHES(msg, "-rollLeft"))
	{
		rollLeft = false;
	}
	else if (MATCHES(msg, "+rollRight"))
	{
		rollRight = true;
	}
	else if (MATCHES(msg, "-rollRight"))
	{
		rollRight = false;
	}
	else if (MATCHES(msg, "+rotStop"))
	{
		stopRotation = true;
	}
	else if (MATCHES(msg, "-rotStop"))
	{
		stopRotation = false;
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
		crewManager->InputAxis(EKeys::Gamepad_LeftTriggerAxis, roll); // TODO: better axis needed
#endif
	}
	else if (MATCHES(msg, "+moveForward"))
	{
		moveForward = true;
	}
	else if (MATCHES(msg, "-moveForward"))
	{
		moveForward = false;
	}
	else if (MATCHES(msg, "+moveBackward"))
	{
		moveBackward = true;
	}
	else if (MATCHES(msg, "-moveBackward"))
	{
		moveBackward = false;
	}
	else if (MATCHES(msg, "+forwardBackStop"))
	{
		stopForwardBack = true;
	}
	else if (MATCHES(msg, "-forwardBackStop"))
	{
		stopForwardBack = false;
	}
	else if (MATCHES(msg, "+strafeLeft"))
	{
		strafeLeft = true;
	}
	else if (MATCHES(msg, "-strafeLeft"))
	{
		strafeLeft = false;
	}
	else if (MATCHES(msg, "+strafeRight"))
	{
		strafeRight = true;
	}
	else if (MATCHES(msg, "-strafeRight"))
	{
		strafeRight = false;
	}
	else if (MATCHES(msg, "+strafeUp"))
	{
		strafeUp = true;
	}
	else if (MATCHES(msg, "-strafeUp"))
	{
		strafeUp = false;
	}
	else if (MATCHES(msg, "+strafeDown"))
	{
		strafeDown = true;
	}
	else if (MATCHES(msg, "-strafeDown"))
	{
		strafeDown = false;
	}
	else if (MATCHES(msg, "+strafeStop"))
	{
		stopStrafing = true;
	}
	else if (MATCHES(msg, "-strafeStop"))
	{
		stopStrafing = false;
	}
	else
		return false;

	return true;
}

#define PI 3.14159265359f

void UHelmSystem::ResetData()
{
	rotationAccel = 22.5f; strafeAccel = 50; forwardAccelMax = 500;
	pitchDown = pitchUp = yawLeft = yawRight = rollLeft = rollRight = false;
	moveForward = moveBackward = strafeLeft = strafeRight = strafeUp = strafeDown = false;
	stopRotation = stopStrafing = stopForwardBack = false;

	pitchRateMax = yawRateMax = rollRateMax = 90.f;
	
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
	
	auto pawn = crewManager->GetShipPawn();
	FRotator orientation = pawn == nullptr ? FRotator::ZeroRotator : pawn->GetActorRotation();
	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_orientation %.2f %.2f %.2f",
		orientation.Pitch, orientation.Yaw, orientation.Roll);

	auto rotationSpeed = pawn == nullptr ? FRotator::ZeroRotator : pawn->RotationSpeed;
	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_rotation_rates %.4f %.4f %.4f",
		rotationSpeed.Pitch, rotationSpeed.Yaw, rotationSpeed.Roll);

	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_translation_rates %.4f %.4f %.4f",
		sideMoveRate, verticalMoveRate, forwardMoveRate);
}

void UHelmSystem::Tick(float DeltaSeconds)
{
	auto pawn = crewManager->GetShipPawn();

	// update rotation rates
	auto prevRotationSpeed = pawn->RotationSpeed;

	float adjustmentAmount = rotationAccel * DeltaSeconds;
	FRotator newRotationSpeed;
	if (stopRotation)
	{
		newRotationSpeed = FRotator(
			TowardsZero(prevRotationSpeed.Pitch, adjustmentAmount),
			TowardsZero(prevRotationSpeed.Yaw, adjustmentAmount),
			TowardsZero(prevRotationSpeed.Roll, adjustmentAmount)
		);
	}
	else
	{
		newRotationSpeed = FRotator(
			AdjustAndClamp(prevRotationSpeed.Pitch, pitchDown, pitchUp, adjustmentAmount, -pitchRateMax, pitchRateMax),
			AdjustAndClamp(prevRotationSpeed.Yaw, yawLeft, yawRight, adjustmentAmount, -yawRateMax, yawRateMax),
			AdjustAndClamp(prevRotationSpeed.Roll, rollLeft, rollRight, adjustmentAmount, -rollRateMax, rollRateMax)
		);
	}
	pawn->RotationSpeed = newRotationSpeed;

	if (newRotationSpeed != prevRotationSpeed)
	{
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_rotation_rates %.4f %.4f %.4f",
			newRotationSpeed.Pitch, newRotationSpeed.Yaw, newRotationSpeed.Roll);
	}
	
	// update orientation
	if (prevRotationSpeed != FRotator::ZeroRotator)
	{
		FRotator orientation = pawn->GetActorRotation();

		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_orientation %.2f %.2f %.2f",
			orientation.Pitch, orientation.Yaw, orientation.Roll);
	}

	// update strafing and movement rates
	float oldSideRate = sideMoveRate, oldVerticalRate = verticalMoveRate, oldForwardRate = forwardMoveRate;

	adjustmentAmount = strafeAccel * DeltaSeconds;
	if (stopStrafing)
	{
		sideMoveRate = TowardsZero(sideMoveRate, adjustmentAmount);
		verticalMoveRate = TowardsZero(verticalMoveRate, adjustmentAmount);
	}
	else
	{
		sideMoveRate = AdjustAndClamp(sideMoveRate, strafeLeft, strafeRight, adjustmentAmount, -sideMoveRateMax, sideMoveRateMax);
		verticalMoveRate = AdjustAndClamp(verticalMoveRate, strafeDown, strafeUp, adjustmentAmount, -verticalMoveRateMax, verticalMoveRateMax);
	}

	adjustmentAmount = forwardAccelMax * DeltaSeconds;
	if (stopForwardBack)
	{
		forwardMoveRate = TowardsZero(forwardMoveRate, adjustmentAmount);
	}
	else
	{
		forwardMoveRate = AdjustAndClamp(forwardMoveRate, moveBackward, moveForward, adjustmentAmount, -backwardMoveRateMax, forwardMoveRateMax);
	}
	
	bool translationRateChanged = oldSideRate != sideMoveRate || oldVerticalRate != verticalMoveRate || oldForwardRate != forwardMoveRate;
	if (translationRateChanged)
	{
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_translation_rates %.2f %.2f %.2f",
			sideMoveRate, verticalMoveRate, forwardMoveRate);
	}
}

float UHelmSystem::TowardsZero(float value, float maxAdjustment)
{
	if (value > 0)
		return FMath::Max(0.f, value - maxAdjustment);
	else
		return FMath::Min(0.f, value + maxAdjustment);
}

float UHelmSystem::AdjustAndClamp(float value, bool decrease, bool increase, float amount, float minValue, float maxValue)
{
	if (increase == decrease)
		return value; // neither set, or both set and cancel each other out

	if (increase)
		return FMath::Min(value + amount, maxValue);
	else
		return FMath::Max(value - amount, minValue);
}