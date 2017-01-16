#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "WeaponSystem.h"

void UWeaponSystem::Init(UCrewManager *manager)
{
	UCrewSystem::Init(manager);

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

bool UWeaponSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (STARTS_WITH(info, "wpnroll "))
	{
		if (timesRolled >= MAX_REROLLS)
			return true; // don't re-roll beyond the limit

		timesRolled++;

		char buffer[8];
		EXTRACT(info, buffer, "wpnroll ");

		// update lock, roll non-locked dice
		for (int i = 0; i < NUM_DICE; i++)
		{
			bool locked = buffer[i] == '1';
			lockedDice[i] = locked;

			if (!locked)
				dice[i] = Roll();
		}

		SendDice();
	}
	else if (MATCHES(info, "wpnfire"))
	{
		// TODO: actually fire or something

		timesRolled = 0;
		for (int i = 0; i < NUM_DICE; i++)
		{
			dice[i] = 0;
			lockedDice[i] = false;
		}
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

void UWeaponSystem::SendDice()
{
	// send dice
	FString output = TEXT("dice ");

	// send re-roll number
#ifndef WEB_SERVER_TEST
	output.Append(timesRerolled);
#else
	output += std::to_wstring(timesRolled);
#endif

	// send dice values
	for (int i = 0; i < NUM_DICE; i++)
	{
#ifndef WEB_SERVER_TEST
		output.Append(dice[i]);
#else
		output += std::to_wstring(dice[i]);
#endif
	}

	// send lock state
	for (int i = 0; i < NUM_DICE; i++)
	{
#ifndef WEB_SERVER_TEST
		output.AppendChar(lockedDice[i] ? '1' : '0');
#else
		output += lockedDice[i] ? '1' : '0';
#endif
	}

	SendCrewMessage(CHARARR(output));
}

uint8 UWeaponSystem::Roll()
{
	return FMath::RandRange(1, 6);
}

bool UWeaponSystem::ProcessSystemMessage(FString message)
{
	return false;
}
