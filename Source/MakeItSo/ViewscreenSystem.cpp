#ifndef WEB_SERVER_TEST
#include "ViewscreenSystem.h"
#else
#include "stdafx.h"
#include "ViewscreenSystem.h"
#endif

#include "CrewManager.h"
#include "UIConnectionInfo.h"
#include "MakeItSoPawn.h"
#include "SensorSystem.h"

const float viewAngleStep = 15, viewZoomStep = 1.5f, minZoomFactor = 1, maxZoomFactor = 1000000, minChaseDist = 10, maxChaseDist = 10000;

void UViewscreenSystem::ResetData()
{
	viewTarget = nullptr;
	viewTargetID = 0;
	viewAngle.Pitch = 0;
	viewAngle.Yaw = 0;
	viewZoom = 1;
	viewChaseDist = 100;
}

bool UViewscreenSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "view_dir "))
	{
		char buffer[2];
		EXTRACT(msg, buffer, "view_dir ");

		char dir = buffer[0];
		if (dir == 'f')
			SetAngle(0, 0);
		else if (dir == 'b')
			SetAngle(0, 180);
		else if (dir == 'l')
			SetAngle(0, 270);
		else if (dir == 'r')
			SetAngle(0, 90);
		else if (dir == 'u')
			SetAngle(90, 0);
		else if (dir == 'd')
			SetAngle(-90, 0);

		viewTarget = nullptr;
		SendViewAngles();
	}
	else if (STARTS_WITH(msg, "view_rot "))
	{
		char buffer[2];
		EXTRACT(msg, buffer, "view_rot ");

		char dir = buffer[0];
		if (dir == 'u')
			AdjustAngle(viewAngleStep, 0);
		else if (dir == 'd')
			AdjustAngle(-viewAngleStep, 0);
		else if (dir == 'l')
			AdjustAngle(0, -viewAngleStep);
		else if (dir == 'r')
			AdjustAngle(0, viewAngleStep);
	}
	else if (MATCHES(msg, "view_cleartarget"))
		ClearTarget();
	else if (STARTS_WITH(msg, "view_target "))
	{
		uint16 targetID = ExtractInt(msg, sizeof("view_target "));
		LockOnTarget(targetID);
	}
	else if (MATCHES(msg, "view_zoom 1"))
		AdjustZoom(true);
	else if (MATCHES(msg, "view_zoom 0"))
		AdjustZoom(false);
	else if (MATCHES(msg, "view_chase 1"))
		SetChase(true);
	else if (MATCHES(msg, "view_chase 0"))
		SetChase(false);
	else if (MATCHES(msg, "view_reset"))
		Reset();
	else
		return false;

	return true;
}

void UViewscreenSystem::SendAllData_Implementation()
{
	SendViewAngles();
	SendViewZoom();
	SendChase();
	SendTarget();
}

void UViewscreenSystem::DetermineTargetAngles()
{
	// TODO: calculate angle to viewTarget
	viewAngle.Pitch = 22;
	viewAngle.Yaw = 137;
	viewZoom = 22.5;
}

void UViewscreenSystem::SendViewAngles()
{
	FString output = TEXT("view_angle ");
	APPENDINT(output, (uint8)viewAngle.Pitch);
	output += TEXT(" ");
	APPENDINT(output, (uint8)viewAngle.Yaw);

	crewManager->SendAll(output);
}

void UViewscreenSystem::SendViewZoom()
{
	FString output = TEXT("view_zoom ");
	APPENDINT(output, (uint32)viewZoom);
	crewManager->SendAll(output);
}

void UViewscreenSystem::SendChase()
{
	crewManager->SendAll(viewChase ? "view_chase 1" : "view_chase 0");
}

void UViewscreenSystem::SendTarget()
{
	if (viewTargetID == 0)
	{
		crewManager->SendAll("view_target");
		return;
	}

	FString output = TEXT("view_target ");
	APPENDINT(output, viewTargetID);
	crewManager->SendAll(output);
}


void UViewscreenSystem::AdjustAngle_Implementation(float pitch, float yaw)
{
	viewAngle.Pitch += pitch;
	viewAngle.Yaw += yaw;

	if (ISCLIENT())
		SendViewAngles();
}

void UViewscreenSystem::SetAngle_Implementation(float pitch, float yaw)
{
	viewAngle.Pitch = pitch;
	viewAngle.Yaw = yaw;

	if (ISCLIENT())
		SendViewAngles();
}

void UViewscreenSystem::AdjustZoom_Implementation(bool in)
{
	if (in)
	{
		if (viewChase)
		{
			viewChaseDist *= viewZoomStep;
			if (viewChaseDist > maxChaseDist)
				viewChaseDist = maxChaseDist;
		}
		else
		{
			viewZoom *= viewZoomStep;
			if (viewZoom > maxZoomFactor)
				viewZoom = maxZoomFactor;
		}
	}
	else
	{
		if (viewChase)
		{
			viewChaseDist /= viewZoomStep;
			if (viewChaseDist < minChaseDist)
				viewChaseDist = minChaseDist;
		}
		else
		{
			viewZoom /= viewZoomStep;
			if (viewZoom < minZoomFactor)
				viewZoom = minZoomFactor;
		}
	}

	if (ISCLIENT())
		SendViewZoom();
}

void UViewscreenSystem::SetZoom_Implementation(float magnification)
{
	viewZoom = magnification;

	if (ISCLIENT())
		SendViewZoom();
}

void UViewscreenSystem::SetChase_Implementation(bool chase)
{
	if (viewChase == chase)
		return;

	viewChase = chase;

	if (ISCLIENT())
		SendChase();

	if (!chase)
	{
		viewZoom = 1;

		if (ISCLIENT())
			SendViewZoom();
	}
}

void UViewscreenSystem::LockOnTarget_Implementation(uint16 identifier)
{
	if (identifier == 0)
	{
		viewTarget = nullptr;
	}
	else
	{
		auto sensorSystem = crewManager->GetSystem(UShipSystem::ESystem::Sensors);

		viewTarget = sensorSystem == nullptr
			? nullptr
			: ((USensorSystem*)sensorSystem)->GetTarget(identifier)->actor;
	}

	viewTargetID = identifier;

	if (ISCLIENT())
		SendTarget();
}

void UViewscreenSystem::ClearTarget_Implementation()
{
	viewTarget = nullptr;
	viewTargetID = 0;

	if (ISCLIENT())
		SendTarget();
}

void UViewscreenSystem::Reset_Implementation()
{
	ResetData();

	if (ISCLIENT())
		SendAllData();
}