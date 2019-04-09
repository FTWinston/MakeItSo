#ifndef WEB_SERVER_TEST
#include "ViewscreenSystem.h"
#else
#include "stdafx.h"
#include "ViewscreenSystem.h"
#endif

#include "CrewManager.h"
#include "UIConnectionInfo.h"
#include "MakeItSoPawn.h"

const float viewAngleStep = 15, viewZoomStep = 1.5f, minZoomFactor = 1, maxZoomFactor = 1000000, minChaseDist = 10, maxChaseDist = 10000;

bool UViewscreenSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "viewdir "))
	{
		char buffer[2];
		EXTRACT(msg, buffer, "viewdir ");

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
	else if (STARTS_WITH(msg, "viewtarget "))
	{
		char buffer[20];
		EXTRACT(msg, buffer, "viewtarget ");
		DetermineViewTarget(buffer);
	}
	else if (MATCHES(msg, "viewup"))
		AdjustAngle(viewAngleStep, 0);
	else if (MATCHES(msg, "viewdown"))
		AdjustAngle(-viewAngleStep, 0);
	else if (MATCHES(msg, "viewleft"))
		AdjustAngle(0, -viewAngleStep);
	else if (MATCHES(msg, "viewright"))
		AdjustAngle(0, viewAngleStep);
	else if (MATCHES(msg, "viewin"))
		AdjustZoom(true);
	else if (MATCHES(msg, "viewout"))
		AdjustZoom(false);
	else if (MATCHES(msg, "+viewchase"))
	{
		SetChase(true);
	}
	else if (MATCHES(msg, "-viewchase"))
	{
		SetChase(false);
	}
	/*
	else if (MATCHES(msg, "+viewcomms"))
	{
		viewComms = true;
		crewManager->SendAllFixed("comms on");
	}
	else if (MATCHES(msg, "-viewcomms"))
	{
		viewComms = false;
		crewManager->SendAllFixed("comms off");
	}
	*/
	else
		return false;

	return true;
}

void UViewscreenSystem::SendAllData_Implementation()
{
	SendViewAngles();
	SendViewZoom();
	SendChase();

	// TODO: send target ID or "clear target"
}

void UViewscreenSystem::DetermineViewTarget(const char* targetIdentifier)
{
	// TODO: lookup target
	viewTarget = nullptr;
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
	crewManager->SendAll("view %i %i", (int)viewAngle.Pitch, (int)viewAngle.Yaw);
}

void UViewscreenSystem::SendViewZoom()
{
	if (viewChase)
	{
		crewManager->SendAll("dist %i", (int)viewChaseDist);
	}
	else
	{
		crewManager->SendAll("zoom %.2f", viewZoom);
	}
}

void UViewscreenSystem::SendChase()
{
	crewManager->SendAll(viewChase ? "view_chase 1" : "view_chase 0");
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

void UViewscreenSystem::LockOnTarget_Implementation(FString identifier)
{
	// TODO: lock onto target and indicate the identifier of the locked target

	// TODO: send target ID
}

void UViewscreenSystem::ClearTarget_Implementation()
{
	viewTarget = nullptr;
	
	// TODO: send "clear target"
}

void UViewscreenSystem::Reset_Implementation()
{
	viewTarget = nullptr;
	viewAngle.Pitch = 0;
	viewAngle.Yaw = 0;
	viewZoom = 1;

	if (ISCLIENT())
		SendAllData();
}