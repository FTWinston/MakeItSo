#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "ShieldSystem.h"

bool UShieldSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (MATCHES(info, "+shields"))
	{
		shieldsUp = true;
		SendCrewMessage(TEXT("on"));
	}
	else if (MATCHES(info, "-shields"))
	{
		shieldsUp = false;
		SendCrewMessage(TEXT("off"));
	}
	else if (STARTS_WITH(info, "shieldFoc "))
	{
		char buffer[2];
		EXTRACT(info, buffer, "shieldFoc ");

		char focus = buffer[0];
		shieldFocus = focus - '0';
		SendShieldFocus();
	}
	else
		return false;

	return true;
}

void UShieldSystem::SendAllData()
{
	// TODO: send shield data
	SendCrewMessage(shieldsUp ? TEXT("on") : TEXT("off"));
	SendShieldFocus();
}

void UShieldSystem::SendShieldFocus()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("focus %i"), shieldFocus);
	SendCrewMessage(CHARARR(message));
#else
	TCHAR buffer[10];
	swprintf(buffer, sizeof(buffer), L"focus %i", shieldFocus);
	SendCrewMessage(buffer);
#endif
}