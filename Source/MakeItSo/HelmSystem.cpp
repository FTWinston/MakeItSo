#ifndef WEB_SERVER_TEST
#include "HelmSystem.h"
#else
#include "stdafx.h"
#include "HelmSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"

const float helmSendInterval = 0.05f;

UHelmSystem::UHelmSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
}

bool UHelmSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "yawLeft "))
	{
		yawLeft = ExtractFloat(msg, sizeof("yawLeft ")); // TODO: these values should be clamped to -1 to 1
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

#ifdef WEB_SERVER_TEST
#define PI 3.14159265359f
#endif

void UHelmSystem::ResetData()
{
	rotationAccel = 22.5f; strafeAccel = 50; forwardAccelMax = 500;
	pitchDown = pitchUp = yawLeft = yawRight = rollLeft = rollRight = 0.f;
	moveForward = moveBackward = strafeLeft = strafeRight = strafeUp = strafeDown = 0.f;
	stopRotation = stopStrafing = stopForwardBack = false;

	pitchRateMax = yawRateMax = rollRateMax = 90.f;
	sideMoveRateMax = verticalMoveRateMax = 500;
	forwardMoveRateMax = 5000; backwardMoveRateMax = 2500;

	nextSendSeconds = helmSendInterval;
}

void UHelmSystem::SendAllData_Implementation()
{
	// these first two don't currently change
	crewManager->SendSystem(UShipSystem::ESystem::Helm, "helm_manoever_limits %.4f %.4f %.4f %.4f %.4f",
		pitchRateMax, yawRateMax, rollRateMax, sideMoveRateMax, verticalMoveRateMax);

	crewManager->SendSystem(UShipSystem::ESystem::Helm, "helm_speed_limits %.4f %.4f",
		forwardMoveRateMax, backwardMoveRateMax);
	
	auto pawn = crewManager->GetShipPawn();
	lastSentOrientation = pawn == nullptr ? FRotator::ZeroRotator : pawn->GetActorRotation();
	lastSentAngularVelocity = pawn == nullptr ? FRotator::ZeroRotator : pawn->AngularVelocity;
	crewManager->SendSystem(UShipSystem::ESystem::UseShipOrientation, "ship_rot %.2f %.2f %.2f %.2f %.2f %.2f",
		lastSentOrientation.Pitch, lastSentOrientation.Yaw, lastSentOrientation.Roll,
		lastSentAngularVelocity.Pitch, lastSentAngularVelocity.Yaw, lastSentAngularVelocity.Roll);

	lastSentPosition = pawn == nullptr ? FVector::ZeroVector : pawn->GetActorLocation();
	auto velocity = pawn == nullptr ? FVector::ZeroVector : pawn->LocalVelocity;
	crewManager->SendSystem(UShipSystem::ESystem::UseShipPosition, "ship_pos %.2f %.2f %.2f %.2f %.2f %.2f",
		lastSentPosition.X, lastSentPosition.Y, lastSentPosition.Z,
		velocity.X, velocity.Y, velocity.Z);

	nextSendSeconds = helmSendInterval;
}

void UHelmSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	auto pawn = crewManager->GetShipPawn();

	// update rotation rates
	auto angularVelocity = pawn->AngularVelocity;

	// TODO: should be using quaternions here!
	float adjustmentAmount = rotationAccel * DeltaTime;
	if (stopRotation)
	{
		angularVelocity.Pitch = TowardsZero(angularVelocity.Pitch, adjustmentAmount);
		angularVelocity.Yaw = TowardsZero(angularVelocity.Yaw, adjustmentAmount);
		angularVelocity.Roll = TowardsZero(angularVelocity.Roll, adjustmentAmount);
	}
	else
	{
		angularVelocity.Pitch = AdjustAndClamp(angularVelocity.Pitch, pitchDown * adjustmentAmount, pitchUp * adjustmentAmount, -pitchRateMax, pitchRateMax);
		angularVelocity.Yaw = AdjustAndClamp(angularVelocity.Yaw, yawLeft * adjustmentAmount, yawRight * adjustmentAmount, -yawRateMax, yawRateMax);
		angularVelocity.Roll = AdjustAndClamp(angularVelocity.Roll, rollLeft * adjustmentAmount, rollRight * adjustmentAmount, -rollRateMax, rollRateMax);
	}
	pawn->AngularVelocity = angularVelocity;


	// update strafing and movement rates
	FVector velocity = pawn->LocalVelocity; // TODO: save this locally, so that if something outwith the system updates it, change is still sent
	FVector position = pawn->GetActorLocation();

	adjustmentAmount = strafeAccel * DeltaTime;
	if (stopStrafing)
	{
		velocity.Y = TowardsZero(velocity.Y, adjustmentAmount);
		velocity.Z = TowardsZero(velocity.Z, adjustmentAmount);
	}
	else
	{
		velocity.Y = AdjustAndClamp(velocity.Y, strafeLeft * adjustmentAmount, strafeRight * adjustmentAmount, -sideMoveRateMax, sideMoveRateMax);
		velocity.Z = AdjustAndClamp(velocity.Z, strafeDown * adjustmentAmount, strafeUp * adjustmentAmount, -verticalMoveRateMax, verticalMoveRateMax);
	}

	adjustmentAmount = forwardAccelMax * DeltaTime;
	if (stopForwardBack)
	{
		velocity.X = TowardsZero(velocity.X, adjustmentAmount);
	}
	else
	{
		velocity.X = AdjustAndClamp(velocity.X, moveBackward * adjustmentAmount, moveForward * adjustmentAmount, -backwardMoveRateMax, forwardMoveRateMax);
	}

	pawn->LocalVelocity = velocity;

	
	nextSendSeconds -= DeltaTime;
	if (nextSendSeconds > 0.f)
		return; // don't try to send data too frequently

	nextSendSeconds += helmSendInterval;
	if (nextSendSeconds < 0) // if framerate is too low, don't force it to send every frame
		nextSendSeconds = helmSendInterval;

	FRotator orientation = pawn->GetActorRotation();
	if (orientation != lastSentOrientation || angularVelocity != lastSentAngularVelocity)
	{
		lastSentAngularVelocity = angularVelocity;
		lastSentOrientation = orientation;
		crewManager->SendSystem(UShipSystem::ESystem::UseShipOrientation, "ship_rot %.2f %.2f %.2f %.2f %.2f %.2f",
			orientation.Pitch, orientation.Yaw, orientation.Roll,
			angularVelocity.Pitch, angularVelocity.Yaw, angularVelocity.Roll);
	}

	if (position != lastSentPosition)
	{
		lastSentPosition = position;
		crewManager->SendSystem(UShipSystem::ESystem::UseShipPosition, "ship_pos %.2f %.2f %.2f %.2f %.2f %.2f",
			lastSentPosition.X, lastSentPosition.Y, lastSentPosition.Z,
			velocity.X, velocity.Y, velocity.Z);
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