#ifndef WEB_SERVER_TEST
#include "WeaponSystem.h"
#else
#include "stdafx.h"
#include "WeaponSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

#define NUM_DICE 5
#define MAX_REROLLS 3

UWeaponSystem::UWeaponSystem()
{
	PrimaryComponentTick.bCanEverTick = false;

#ifndef WEB_SERVER_TEST
	dice.AddZeroed(NUM_DICE);
#else
	dice.assign(NUM_DICE, 0);
#endif
}

void UWeaponSystem::ResetData()
{
	ResetDice();
	EMPTY(currentTargetCodes);
}

bool UWeaponSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "wpn_roll "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("wpn_roll "));

		if (SIZENUM(parts) == 5)
		{
			bool roll1 = STOI(parts[0]) == 1;
			bool roll2 = STOI(parts[1]) == 1;
			bool roll3 = STOI(parts[2]) == 1;
			bool roll4 = STOI(parts[3]) == 1;
			bool roll5 = STOI(parts[4]) == 1;
			RollDice(roll1, roll2, roll3, roll4, roll5);
		}
	}
	else if (MATCHES(msg, "wpn_unroll"))
	{
		ResetDice();
	}
	else if (MATCHES(msg, "wpn_fire"))
	{
		Fire();
	}
	else
		return false;

	return true;
}

void UWeaponSystem::SendAllData_Implementation()
{
	// TODO: send all weapon targets?

	SendDice();
	SendRollsRemaining();
	SendTargetCodes();
}

#ifdef WEB_SERVER_TEST
void UWeaponSystem::SendDice() { SendDice_Implementation(); }
#endif

void UWeaponSystem::SendDice_Implementation()
{
	FString output = TEXT("wpn_dice");

	for (auto val : dice)
	{
		output += TEXT(" ");
		APPENDINT(output, val);
	}

	SendSystem(output);
}


#ifdef WEB_SERVER_TEST
void UWeaponSystem::SendRollsRemaining() { SendRollsRemaining_Implementation(); }
#endif

void UWeaponSystem::SendRollsRemaining_Implementation()
{
	FString output = TEXT("wpn_rolls ");
	APPENDINT(output, rollsRemaining);
	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UWeaponSystem::SendTargetCodes() { SendTargetCodes_Implementation(); }
#endif

void UWeaponSystem::SendTargetCodes_Implementation()
{
	FString output = TEXT("wpn_codes");

	for (auto code : currentTargetCodes)
	{
		output += TEXT(" ");
		APPENDINT(output, code);
	}

	SendSystem(output);
}


void UWeaponSystem::OnReplicated_Dice(TArray<uint8> beforeChange)
{
	SendDice();
}

void UWeaponSystem::OnReplicated_RollsRemaining(uint8 beforeChange)
{
	SendRollsRemaining();
}

void UWeaponSystem::OnReplicated_CurrentTargetCodes(TArray<uint16> beforeChanges)
{
	SendTargetCodes();
}


#ifdef WEB_SERVER_TEST
void UWeaponSystem::RollDice(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5) { RollDice_Implementation(roll1, roll2, roll3, roll4, roll5); }
#endif
void UWeaponSystem::RollDice_Implementation(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5)
{
	if (rollsRemaining == 0)
		return;

	rollsRemaining--;

	if (roll1)
		dice[0] = Roll();
	if (roll2)
		dice[1] = Roll();
	if (roll3)
		dice[2] = Roll();
	if (roll4)
		dice[3] = Roll();
	if (roll5)
		dice[4] = Roll();

	if (ISCLIENT())
	{
		SendRollsRemaining();
		SendDice();
	}
}

#ifdef WEB_SERVER_TEST
void UWeaponSystem::ResetDice() { ResetDice_Implementation(); }
#endif
void UWeaponSystem::ResetDice_Implementation()
{
	rollsRemaining = MAX_REROLLS;
	for (uint8 i = 0; i < NUM_DICE; i++)
		dice[i] = 0;

	if (ISCLIENT())
	{
		SendRollsRemaining();
		SendDice();
	}
}

#ifdef WEB_SERVER_TEST
void UWeaponSystem::Fire() { Fire_Implementation(); }
#endif
void UWeaponSystem::Fire_Implementation()
{
	ResetDice();

	// TODO: actually fire
}


uint8 UWeaponSystem::Roll()
{
	return FMath::RandRange(1, 6);
}

TArray<uint8> UWeaponSystem::GetDiceFromCode(uint16 code)
{
	TArray<uint8> dice;
	auto val = code;

	do
	{
		SETADD(dice, (val % 6) + 1);
		val = val / 6;
	} while (val > 0);

	return dice;
}

uint16 UWeaponSystem::GetCodeFromDice(TArray<uint8> dice)
{
	// dice.sort();

	uint16 code = 0;

	for (auto i = 0; i < SIZENUM(dice); i++)
	{
		code += (dice[i] - 1) * FMath::Pow(6, i);
	}

	return code;
}