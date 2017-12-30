#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif

#include "MakeItSoPawn.h"
#include "HelmSystem.h"

bool UHelmSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "yawLeft "))
	{
		yawLeft = ExtractFloat(msg, sizeof("yawLeft "));
	}
	else if (STARTS_WITH(msg, "yawRight "))
	{
		yawRight = ExtractFloat(msg, sizeof("yawRight "));
	}
	else if (STARTS_WITH(msg, "pitchUp "))
	{
		pitchUp = ExtractFloat(msg, sizeof("pitchUp "));
	}
	else if (STARTS_WITH(msg, "pitchDown "))
	{
		pitchDown = ExtractFloat(msg, sizeof("pitchDown "));
	}
	else if (STARTS_WITH(msg, "rollLeft "))
	{
		rollLeft = ExtractFloat(msg, sizeof("rollLeft "));
	}
	else if (STARTS_WITH(msg, "rollRight "))
	{
		rollRight = ExtractFloat(msg, sizeof("rollRight "));
	}
	else if (STARTS_WITH(msg, "moveForward "))
	{
		moveForward = ExtractFloat(msg, sizeof("moveForward "));
	}
	else if (STARTS_WITH(msg, "moveBackward "))
	{
		moveBackward = ExtractFloat(msg, sizeof("moveBackward "));
	}
	else if (STARTS_WITH(msg, "strafeLeft "))
	{
		strafeLeft = ExtractFloat(msg, sizeof("strafeLeft "));
	}
	else if (STARTS_WITH(msg, "strafeRight "))
	{
		strafeRight = ExtractFloat(msg, sizeof("strafeRight "));
	}
	else if (STARTS_WITH(msg, "strafeUp "))
	{
		strafeUp = ExtractFloat(msg, sizeof("strafeUp "));
	}
	else if (STARTS_WITH(msg, "strafeDown "))
	{
		strafeDown = ExtractFloat(msg, sizeof("strafeDown "));
	}
	else if (MATCHES(msg, "+rotStop"))
	{
		stopRotation = true;
	}
	else if (MATCHES(msg, "-rotStop"))
	{
		stopRotation = false;
	}
	else if (MATCHES(msg, "+strafeStop"))
	{
		stopStrafing = true;
	}
	else if (MATCHES(msg, "-strafeStop"))
	{
		stopStrafing = false;
	}
	else if (MATCHES(msg, "+forwardBackStop"))
	{
		stopForwardBack = true;
	}
	else if (MATCHES(msg, "-forwardBackStop"))
	{
		stopForwardBack = false;
	}
	else
		return false;

	return true;
}

#define PI 3.14159265359f

void UHelmSystem::ResetData()
{
	rotationAccel = 22.5f; strafeAccel = 50; forwardAccelMax = 500;
	pitchDown = pitchUp = yawLeft = yawRight = rollLeft = rollRight = 0.f;
	moveForward = moveBackward = strafeLeft = strafeRight = strafeUp = strafeDown = 0.f;
	stopRotation = stopStrafing = stopForwardBack = false;

	pitchRateMax = yawRateMax = rollRateMax = 90.f;
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

	auto rotationSpeed = pawn == nullptr ? FRotator::ZeroRotator : pawn->AngularVelocity;
	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_rotation_rates %.4f %.4f %.4f",
		rotationSpeed.Pitch, rotationSpeed.Yaw, rotationSpeed.Roll);

	auto velocity = pawn == nullptr ? FVector::ZeroVector : pawn->LocalVelocity;
	crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_translation_rates %.4f %.4f %.4f",
		velocity.X, velocity.Y, velocity.Z);
}

void UHelmSystem::Tick(float DeltaSeconds)
{
	auto pawn = crewManager->GetShipPawn();

	// update rotation rates
	auto prevAngularVelocity = pawn->AngularVelocity; // TODO: save this locally, so that if something outwith teh system updates it, change is still sent

	float adjustmentAmount = rotationAccel * DeltaSeconds;
	FRotator newAngularVelocity;
	if (stopRotation)
	{
		newAngularVelocity = FRotator(
			TowardsZero(prevAngularVelocity.Pitch, adjustmentAmount),
			TowardsZero(prevAngularVelocity.Yaw, adjustmentAmount),
			TowardsZero(prevAngularVelocity.Roll, adjustmentAmount)
		);
	}
	else
	{
		newAngularVelocity = FRotator(
			AdjustAndClamp(prevAngularVelocity.Pitch, pitchDown * adjustmentAmount, pitchUp * adjustmentAmount, -pitchRateMax, pitchRateMax),
			AdjustAndClamp(prevAngularVelocity.Yaw, yawLeft * adjustmentAmount, yawRight * adjustmentAmount, -yawRateMax, yawRateMax),
			AdjustAndClamp(prevAngularVelocity.Roll, rollLeft * adjustmentAmount, rollRight * adjustmentAmount, -rollRateMax, rollRateMax)
		);
	}
	pawn->AngularVelocity = newAngularVelocity;

	if (newAngularVelocity != prevAngularVelocity)
	{
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_rotation_rates %.4f %.4f %.4f",
			newAngularVelocity.Pitch, newAngularVelocity.Yaw, newAngularVelocity.Roll);
	}
	
	// update orientation
	if (prevAngularVelocity != FRotator::ZeroRotator)
	{
		FRotator orientation = pawn->GetActorRotation();

		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_orientation %.2f %.2f %.2f",
			orientation.Pitch, orientation.Yaw, orientation.Roll);
	}

	// update strafing and movement rates
	FVector prevVelocity = pawn->LocalVelocity; // TODO: save this locally, so that if something outwith teh system updates it, change is still sent

	adjustmentAmount = strafeAccel * DeltaSeconds;
	FVector newVelocity = prevVelocity;
	if (stopStrafing)
	{
		newVelocity.Y = TowardsZero(prevVelocity.Y, adjustmentAmount);
		newVelocity.Z = TowardsZero(prevVelocity.Z, adjustmentAmount);
	}
	else
	{
		newVelocity.Y = AdjustAndClamp(prevVelocity.Y, strafeLeft * adjustmentAmount, strafeRight * adjustmentAmount, -sideMoveRateMax, sideMoveRateMax);
		newVelocity.Z = AdjustAndClamp(prevVelocity.Z, strafeDown * adjustmentAmount, strafeUp * adjustmentAmount, -verticalMoveRateMax, verticalMoveRateMax);
	}

	adjustmentAmount = forwardAccelMax * DeltaSeconds;
	if (stopForwardBack)
	{
		newVelocity.X = TowardsZero(prevVelocity.X, adjustmentAmount);
	}
	else
	{
		newVelocity.X = AdjustAndClamp(prevVelocity.X, moveBackward * adjustmentAmount, moveForward * adjustmentAmount, -backwardMoveRateMax, forwardMoveRateMax);
	}

	pawn->LocalVelocity = newVelocity;
	
	if (newVelocity != prevVelocity)
	{
		crewManager->SendSystem(UCrewManager::ESystem::Helm, "helm_translation_rates %.2f %.2f %.2f",
			newVelocity.X, newVelocity.Y, newVelocity.Z);
	}
}

float UHelmSystem::TowardsZero(float value, float maxAdjustment)
{
	if (value > 0)
		return FMath::Max(0.f, value - maxAdjustment);
	else
		return FMath::Min(0.f, value + maxAdjustment);
}

float UHelmSystem::AdjustAndClamp(float value, float decrease, float increase, float minValue, float maxValue)
{
	if ((increase == 0.f && decrease == 0.f) || (increase > 0.f && decrease > 0.f))
		return value; // neither set, or both set and cancel each other out

	if (increase != 0.f)
		return FMath::Min(value + increase, maxValue);
	else
		return FMath::Max(value - decrease, minValue);
}