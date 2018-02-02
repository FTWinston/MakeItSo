#ifndef WEB_SERVER_TEST
#include "WeaponSystem.h"
#else
#include "stdafx.h"
#include "WeaponSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

void UWeaponSystem::ClientInit(UCrewManager *manager)
{
	UShipSystem::ClientInit(manager);

	ResetDice();
}

void UWeaponSystem::ResetData()
{
	ResetDice();
}

void UWeaponSystem::ResetDice()
{
	for (int32 i = 0; i < NUM_DICE; i++)
		dice[i] = 0;
}

bool UWeaponSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "wpnroll "))
	{
		if (timesRolled >= MAX_REROLLS)
			return true; // don't re-roll beyond the limit

		timesRolled++;

		char buffer[8];
		EXTRACT(msg, buffer, "wpnroll ");

		// update lock, roll non-locked dice
		for (int32 i = 0; i < NUM_DICE; i++)
		{
			bool locked = buffer[i] == '1';
			lockedDice[i] = locked;

			if (!locked)
				dice[i] = Roll();
		}

		SendDice();
	}
	else if (MATCHES(msg, "wpnunroll")) {
		ClearDice();
		SendDice();
	}
	else if (MATCHES(msg, "wpnfire"))
	{
		// TODO: actually fire or something

		ClearDice();
		SendDice();
	}
	else
		return false;

	return true;
}

void UWeaponSystem::SendAllData()
{
	// TODO: send all weapon targets

	SendDice();
}

void UWeaponSystem::ClearDice()
{
	timesRolled = 0;
	for (int32 i = 0; i < NUM_DICE; i++) {
		dice[i] = 0;
		lockedDice[i] = false;
	}
}

void UWeaponSystem::SendDice()
{
	// send dice
	FString output = TEXT("dice ");

	// send re-roll number
#ifndef WEB_SERVER_TEST
	output.AppendInt(timesRolled);
#else
	output += std::to_wstring(timesRolled);
#endif

	// send dice values
	for (int32 i = 0; i < NUM_DICE; i++)
	{
#ifndef WEB_SERVER_TEST
		output.AppendInt(dice[i]);
#else
		output += std::to_wstring(dice[i]);
#endif
	}

	// send lock state
	for (int32 i = 0; i < NUM_DICE; i++)
	{
#ifndef WEB_SERVER_TEST
		output.AppendChar(lockedDice[i] ? '1' : '0');
#else
		output += lockedDice[i] ? '1' : '0';
#endif
	}

	crewManager->SendAll(output);
}

uint8 UWeaponSystem::Roll()
{
	return FMath::RandRange(1, 6);
}

bool UWeaponSystem::ProcessSystemMessage(FString message)
{
	return false;
}
