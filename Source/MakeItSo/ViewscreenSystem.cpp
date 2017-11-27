#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "ViewscreenSystem.h"


bool UViewscreenSystem::ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "viewdir "))
	{
		char buffer[2];
		EXTRACT(msg, buffer, "viewdir ");

		char dir = buffer[0];
		if (dir == 'f')
		{
			viewPitch = 0;
			viewYaw = 0;
		}
		else if (dir == 'b')
		{
			viewPitch = 0;
			viewYaw = 180;
		}
		else if (dir == 'l')
		{
			viewPitch = 0;
			viewYaw = 270;
		}
		else if (dir == 'r')
		{
			viewPitch = 0;
			viewYaw = 90;
		}
		else if (dir == 'u')
		{
			viewPitch = 90;
			viewYaw = 0;
		}
		else if (dir == 'd')
		{
			viewPitch = -90;
			viewYaw = 0;
		}
		else
		{
			viewPitch = 42;
			viewYaw = 42;
		}

		viewTarget = nullptr;
		SendViewAngles();
	}
	else if (STARTS_WITH(msg, "viewtarget "))
	{
		char buffer[20];
		EXTRACT(msg, buffer, "viewtarget ");
		DetermineViewTarget(buffer);
		DetermineTargetAngles();
		SendViewAngles();
		SendViewZoomDist();
	}
	else if (MATCHES(msg, "viewup"))
	{
		viewPitch += viewAngleStep;
		if (viewPitch > 90)
			viewPitch = 90;
		SendViewAngles();
	}
	else if (MATCHES(msg, "viewdown"))
	{
		viewPitch -= viewAngleStep;
		if (viewPitch < -90)
			viewPitch = -90;
		SendViewAngles();
	}
	else if (MATCHES(msg, "viewleft"))
	{
		viewYaw -= viewAngleStep;
		if (viewYaw < 0)
			viewYaw += 360;
		SendViewAngles();
	}
	else if (MATCHES(msg, "viewright"))
	{
		viewYaw += viewAngleStep;
		if (viewYaw >= 360)
			viewYaw -= 360;
		SendViewAngles();
	}
	else if (MATCHES(msg, "viewin"))
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

		SendViewZoomDist();
	}
	else if (MATCHES(msg, "viewout"))
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

		SendViewZoomDist();
	}
	else if (MATCHES(msg, "+viewchase"))
	{
		viewChase = true;
		SendCrewMessage(TEXT("chase on"));
	}
	else if (MATCHES(msg, "-viewchase"))
	{
		viewChase = false;
		SendCrewMessage(TEXT("chase off"));
	}
	else if (MATCHES(msg, "+viewcomms"))
	{
		viewComms = true;
		SendCrewMessage(TEXT("comms on"));
	}
	else if (MATCHES(msg, "-viewcomms"))
	{
		viewComms = false;
		SendCrewMessage(TEXT("comms off"));
	}
	else
		return false;

	return true;
}

void UViewscreenSystem::SendAllData()
{
	SendViewAngles();
	SendViewZoomDist();
	// TODO: send all viewscreen targets
}

void UViewscreenSystem::DetermineViewTarget(const char* targetIdentifier)
{
	// TODO: lookup target
	viewTarget = nullptr;
}

void UViewscreenSystem::DetermineTargetAngles()
{
	// TODO: calculate angle to viewTarget
	viewPitch = 22;
	viewYaw = 137;
	viewZoom = 22.5;
}

void UViewscreenSystem::SendViewAngles()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("view %i %i"), (int)viewYaw, (int)viewPitch);
	SendCrewMessage(CHARARR(message));
#else
	TCHAR buffer[16];
	swprintf(buffer, sizeof(buffer), L"view %i %i", (int)viewYaw, (int)viewPitch);
	SendCrewMessage(buffer);
#endif
}

void UViewscreenSystem::SendViewZoomDist()
{
	if (viewChase)
	{
#ifndef WEB_SERVER_TEST
		auto message = FString::Printf(TEXT("dist %i"), (int)viewChaseDist);
		SendCrewMessage(CHARARR(message));
#else
		TCHAR buffer[16];
		swprintf(buffer, sizeof(buffer), L"dist %i", (int)viewChaseDist);
		SendCrewMessage(buffer);
#endif
	}
	else
	{
#ifndef WEB_SERVER_TEST
		auto message = FString::Printf(TEXT("zoom %.2f"), viewZoom);
		SendCrewMessage(CHARARR(message));
#else
		TCHAR buffer[24];
		swprintf(buffer, sizeof(buffer), L"zoom %.2f", viewZoom);
		SendCrewMessage(buffer);
#endif
	}
}