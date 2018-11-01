#ifndef WEB_SERVER_TEST
#include "DamageControlSystem.h"
#else
#include "stdafx.h"
#include <sstream>
#include "DamageControlSystem.h"
#endif

#include "CrewManager.h"
#include "UIConnectionInfo.h"

#define NUM_DICE 5
#define MAX_REROLLS 3

UDamageControlSystem::UDamageControlSystem()
{
	PrimaryComponentTick.bCanEverTick = false;

#ifndef WEB_SERVER_TEST
	dice.AddZeroed(NUM_DICE);
	systemHealth.AddZeroed(MAX_DAMAGE_SYSTEMS);
	systemCombos.AddZeroed(MAX_DAMAGE_SYSTEMS);
#else
	dice.assign(NUM_DICE, 0);
	systemHealth.assign(NUM_DAMAGE_SYSTEMS, 0);
	systemCombos.assign(NUM_DAMAGE_SYSTEMS, Dice_None);
#endif
}

void UDamageControlSystem::ResetData()
{
	ResetDice();

	for (uint8 i = 0; i < NUM_DAMAGE_SYSTEMS; i++)
	{
		auto system = LookupSystem((EDamageSystem)i);
		auto health = system != nullptr ? system->GetHealthLevel() : 0;

		systemHealth[i] = health;
		systemCombos[i] = system == nullptr ? Dice_None : SelectCombo(systemCombos[i], health);
	}
}

bool UDamageControlSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "dmg_roll "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("dmg_roll "));

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
	else if (MATCHES(msg, "dmg_discard"))
	{
		ResetDice();
	}
	else if (STARTS_WITH(msg, "dmg_system "))
	{
		uint8 systemNum = ExtractInt(msg, sizeof("dmg_system "));
		ApplyDiceToSystem((EDamageSystem)systemNum);
	}
	else
		return false;

	return true;
}


void UDamageControlSystem::SendAllData_Implementation()
{
	SendDice();
	SendRollsRemaining();

	for (uint8 i = 0; i < NUM_DAMAGE_SYSTEMS; i++)
	{
		SendSystemState((EDamageSystem)i, systemHealth[i], systemCombos[i]);
	}
}


void UDamageControlSystem::SetSystemHealth(UShipSystem::ESystem system, uint8 health)
{
	auto damageSystem = GetDamageSystem(system);
	if (damageSystem == Damage_None)
		return;

	auto combo = SelectCombo(systemCombos[damageSystem], health);
	systemHealth[damageSystem] = health;
	systemCombos[damageSystem] = combo;

	SendSystemState(damageSystem, health, combo);
}


void UDamageControlSystem::OnReplicated_Dice(TArray<uint8> beforeChange)
{
	SendDice();
}


#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendDice() { SendDice_Implementation(); }
#endif

void UDamageControlSystem::SendDice_Implementation()
{
	FString output = TEXT("dmg_dice");

	for (uint8 i = 0; i < NUM_DICE; i++)
	{
		output += TEXT(" ");
		APPENDINT(output, dice[i]);
	}

	SendSystem(output);
}


#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendRollsRemaining() { SendRollsRemaining_Implementation(); }
#endif

void UDamageControlSystem::SendRollsRemaining_Implementation()
{
	FString output = TEXT("dmg_rolls ");
	APPENDINT(output, rollsRemaining);
	SendSystem(output);
}


#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendSystemState(EDamageSystem system, uint8 health, EDiceCombo combo) { SendSystemState_Implementation(system, health, combo); }
#endif

void UDamageControlSystem::SendSystemState_Implementation(EDamageSystem system, uint8 health, EDiceCombo combo)
{
	FString output = TEXT("dmg_system ");
	APPENDINT(output, system);
	output += TEXT(" ");
	APPENDINT(output, health);
	output += TEXT(" ");
	APPENDINT(output, combo);
	SendSystem(output);
}



#ifdef WEB_SERVER_TEST
void UDamageControlSystem::RollDice(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5) { RollDice_Implementation(roll1, roll2, roll3, roll4, roll5); }
#endif
void UDamageControlSystem::RollDice_Implementation(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5)
{
	if (rollsRemaining == 0 || !(roll1 || roll2 || roll3 || roll4 || roll5)) {
		return;
	}

	rollsRemaining--;

	if (roll1 || dice[0] == 0)
		dice[0] = Roll();
	if (roll2 || dice[1] == 0)
		dice[1] = Roll();
	if (roll3 || dice[2] == 0)
		dice[2] = Roll();
	if (roll4 || dice[3] == 0)
		dice[3] = Roll();
	if (roll5 || dice[4] == 0)
		dice[4] = Roll();

	if (ISCLIENT())
	{
		SendDice();
		SendRollsRemaining();
	}
}

uint8 UDamageControlSystem::Roll()
{
	return FMath::RandRange(1, 6);
}

uint8 UDamageControlSystem::GetDiceScore(EDiceCombo combo)
{
	if (dice[0] == 0) {
		return 0;
	}

	switch (combo) {
	case Dice_Aces:
		return SumOfNumber(1);
	
	case Dice_Twos:
		return SumOfNumber(2);
	
	case Dice_Threes:
		return SumOfNumber(3);
	
	case Dice_Fours:
		return SumOfNumber(4);
	
	case Dice_Fives:
		return SumOfNumber(5);
	
	case Dice_Sixes:
		return SumOfNumber(6);
	
	case Dice_ThreeOfAKind: {
		return SumOfAKind(3);
	}
	case Dice_FourOfAKind: {
		return SumOfAKind(4);
	}
	case Dice_FullHouse: {
		uint8 first = dice[0];
		uint8 numFirst = 1;
		uint8 second = 0;
		uint8 numSecond = 0;

		for (uint8 i = 1; i < NUM_DICE; i++) {
			auto die = dice[i];

			if (die == first)
				numFirst++;
			else if (second == 0)
			{
				second = die;
				numSecond++;
			}
			else if (die == second)
				numSecond++;
			else
				return 0;
		}

		return numFirst > 2 && numSecond > 2
			? 25
			: 0;
	}
	case Dice_SmallStraight: {
		uint8 numOnes = 0;
		uint8 numTwos = 0;
		uint8 numThrees = 0;
		uint8 numFours = 0;
		uint8 numFives = 0;
		uint8 numSixes = 0;
		for (auto die : dice)
		{
			if (die == 1)
				numOnes++;
			else if (die == 2)
				numTwos++;
			else if (die == 3)
				numThrees++;
			else if (die == 4)
				numFours++;
			else if (die == 5)
				numFives++;
			else if (die == 6)
				numSixes++;
		}

		if (numThrees > 0 && numFours > 0 && (
			(numOnes > 0 && numTwos > 0)
			|| (numTwos > 0 && numFives > 0)
			|| (numFives > 0 && numSixes > 0)
		))
			return 30;

		return 0;
	}
	case Dice_LargeStraight: {
		uint8 numOnes = 0;
		uint8 numTwos = 0;
		uint8 numThrees = 0;
		uint8 numFours = 0;
		uint8 numFives = 0;
		uint8 numSixes = 0;
		for (auto die : dice)
		{
			if (die == 1)
				numOnes++;
			else if (die == 2)
				numTwos++;
			else if (die == 3)
				numThrees++;
			else if (die == 4)
				numFours++;
			else if (die == 5)
				numFives++;
			else if (die == 6)
				numSixes++;
		}

		if (numTwos > 0 && numThrees > 0 && numFours > 0 && numFives > 0 && (numOnes > 0 || numSixes > 0))
			return 40;

		return 0;
	}
	case Dice_Yahtzee: {
		auto first = dice[0];

		for (auto die : dice)
			if (die != first)
				return 0;

		return 50;
	}
	case Dice_Chance: {
		uint8 sum = 0;

		for (auto die : dice)
			sum += die;

		return sum;
	}
	default:
		return 0;
	}
}

uint8 UDamageControlSystem::SumOfNumber(uint8 value)
{
	uint8 sum = 0;

	for (auto die : dice)
		if (die == value)
			sum += value;

	return sum;
}

uint8 UDamageControlSystem::SumOfAKind(uint8 number)
{
	uint8 numOnes = 0;
	uint8 numTwos = 0;
	uint8 numThrees = 0;
	uint8 numFours = 0;
	uint8 numFives = 0;
	uint8 numSixes = 0;
	uint8 sum = 0;
	for (auto die : dice)
	{
		sum += die;
		if (die == 1)
			numOnes++;
		else if (die == 2)
			numTwos++;
		else if (die == 3)
			numThrees++;
		else if (die == 4)
			numFours++;
		else if (die == 5)
			numFives++;
		else if (die == 6)
			numSixes++;
	}

	return numOnes >= number || numTwos >= number || numThrees >= number
		|| numFours >= number || numFives >= number || numSixes >= number
		? sum
		: 0;
}


#ifdef WEB_SERVER_TEST
void UDamageControlSystem::ResetDice() { ResetDice_Implementation(); }
#endif
void UDamageControlSystem::ResetDice_Implementation()
{
	rollsRemaining = MAX_REROLLS;
	for (uint8 i = 0; i < NUM_DICE; i++)
		dice[i] = 0;

	if (ISCLIENT())
	{
		SendDice();
		SendRollsRemaining();
	}
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::ApplyDiceToSystem(EDamageSystem system) { ApplyDiceToSystem_Implementation(system); }
#endif
void UDamageControlSystem::ApplyDiceToSystem_Implementation(EDamageSystem system)
{
	auto combo = systemCombos[system];
	uint8 healingAmount = GetDiceScore(combo);

	// To ensure that we don't stick with the current combo solely because it's still valid for the new damage level, clear it.
	systemCombos[system] = Dice_None;

	ResetDice();

	RestoreDamage(system, healingAmount);
}


UShipSystem *UDamageControlSystem::LookupSystem(EDamageSystem system)
{
	switch (system)
	{
	case Damage_Power:
		return crewManager->GetSystem(UShipSystem::ESystem::PowerManagement);
	case Damage_Helm:
		return crewManager->GetSystem(UShipSystem::ESystem::Helm);
	case Damage_Warp:
		return crewManager->GetSystem(UShipSystem::ESystem::Warp);
	case Damage_Weapons:
		return crewManager->GetSystem(UShipSystem::ESystem::Weapons);
	case Damage_Sensors:
		return crewManager->GetSystem(UShipSystem::ESystem::Sensors);
	//case Damage_Shields:
	//	return crewManager->GetSystem(UShipSystem::ESystem::Shields);
	case Damage_Comms:
		return crewManager->GetSystem(UShipSystem::ESystem::Communications);
	default:
		return nullptr;
	}
}

UDamageControlSystem::EDamageSystem UDamageControlSystem::GetDamageSystem(UShipSystem::ESystem system)
{
	switch (system)
	{
	case UShipSystem::ESystem::PowerManagement:
		return Damage_Power;
	case UShipSystem::ESystem::Helm:
		return Damage_Helm;
	case UShipSystem::ESystem::Warp:
		return Damage_Warp;
	case UShipSystem::ESystem::Weapons:
		return Damage_Weapons;
	case UShipSystem::ESystem::Sensors:
		return Damage_Sensors;
	//case UShipSystem::ESystem::Shields:
	//	return Damage_Shields;
	case UShipSystem::ESystem::Communications:
		return Damage_Comms;
	default:
		return Damage_None;
	}
}

bool UDamageControlSystem::RestoreDamage(EDamageSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr || targetSystem->GetHealthLevel() >= MAX_SYSTEM_HEALTH)
		return false;

	targetSystem->RestoreDamage(amount);
	auto health = targetSystem->GetHealthLevel();
	systemHealth[system] = health;

	return true;
}

UDamageControlSystem::EDiceCombo UDamageControlSystem::SelectCombo(EDiceCombo currentCombo, uint8 systemHealth)
{
	if (systemHealth >= 100)
		return Dice_None;

	if (systemHealth == 0)
		return Dice_Yahtzee;
	
	// Determine if the current combo is valid for the current system health value.
	// Combos are valid for a wider "health" range than they are selectable for,
	// to avoid frequently changing combos that the user is trying to get.

	// Note that all the health range numbers used here are derived from the following:
	// https://docs.google.com/spreadsheets/d/1za88_ZAMghhpvxSFiYDpOpMLkk5pqCQaZE8nFel_yQA/edit?usp=sharing

	switch (currentCombo)
	{
		case Dice_Aces:
			if (systemHealth >= 70)
				return currentCombo;
			break;
		case Dice_Twos:
			if (systemHealth >= 65)
				return currentCombo;
			break;
		case Dice_Threes:
			if (systemHealth >= 60)
				return currentCombo;
			break;
		case Dice_Fours:
			if (systemHealth >= 50)
				return currentCombo;
			break;
		case Dice_Fives:
			if (systemHealth >= 40)
				return currentCombo;
			break;
		case Dice_Sixes:
			if (systemHealth >= 30)
				return currentCombo;
			break;
		case Dice_ThreeOfAKind:
			if (systemHealth >= 25)
				return currentCombo;
			break;
		case Dice_FourOfAKind:
			if (systemHealth >= 15 && systemHealth <= 75)
				return currentCombo;
			break;
		case Dice_FullHouse:
			if (systemHealth <= 75)
				return currentCombo;
			break;
		case Dice_SmallStraight:
			if (systemHealth <= 65)
				return currentCombo;
			break;
		case Dice_LargeStraight:
			if (systemHealth <= 50)
				return currentCombo;
			break;
		case Dice_Yahtzee:
			if (systemHealth <= 10)
				return currentCombo;
			break;
		case Dice_Chance:
			if (systemHealth >= 15 && systemHealth <= 75)
				return currentCombo;
			break;
	}

	if (systemHealth > 96)
		return Dice_Aces;

	if (systemHealth > 92)
		switch (FMath::RandRange(1, 2))
		{
		case 1:
			return Dice_Aces;
		default:
			return Dice_Twos;
		}

	if (systemHealth > 88)
		switch (FMath::RandRange(1, 3))
		{
		case 1:
			return Dice_Aces;
		case 2:
			return Dice_Twos;
		default:
			return Dice_Threes;
		}

	if (systemHealth > 82)
		switch (FMath::RandRange(1, 4))
		{
		case 1:
			return Dice_Aces;
		case 2:
			return Dice_Twos;
		case 3:
			return Dice_Threes;
		default:
			return Dice_Fours;
		}

	if (systemHealth > 79)
		switch (FMath::RandRange(1, 5))
		{
		case 1:
			return Dice_Aces;
		case 2:
			return Dice_Twos;
		case 3:
			return Dice_Threes;
		case 4:
			return Dice_Fours;
		default:
			return Dice_Fives;
		}

	if (systemHealth > 74)
		switch (FMath::RandRange(1, 4))
		{
		case 1:
			return Dice_Twos;
		case 2:
			return Dice_Threes;
		case 3:
			return Dice_Fours;
		default:
			return Dice_Fives;
		}

	if (systemHealth > 67)
		switch (FMath::RandRange(1, 4))
		{
		case 1:
			return Dice_Threes;
		case 2:
			return Dice_Fours;
		case 3:
			return Dice_Fives;
		default:
			return Dice_Sixes;
		}

	if (systemHealth > 59)
		switch (FMath::RandRange(1, 5))
		{
		case 1:
			return Dice_Fours;
		case 2:
			return Dice_Fives;
		case 3:
			return Dice_Sixes;
		case 4:
			return Dice_ThreeOfAKind;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 49)
		switch (FMath::RandRange(1, 5))
		{
		case 1:
			return Dice_Fives;
		case 2:
			return Dice_Sixes;
		case 3:
			return Dice_ThreeOfAKind;
		case 4:
			return Dice_FourOfAKind;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 40)
		switch (FMath::RandRange(1, 5))
		{
		case 1:
			return Dice_Sixes;
		case 2:
			return Dice_ThreeOfAKind;
		case 3:
			return Dice_FourOfAKind;
		case 4:
			return Dice_FullHouse;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 34)
		switch (FMath::RandRange(1, 5))
		{
		case 1:
			return Dice_ThreeOfAKind;
		case 2:
			return Dice_FourOfAKind;
		case 3:
			return Dice_FullHouse;
		case 4:
			return Dice_SmallStraight;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 30)
		switch (FMath::RandRange(1, 4))
		{
		case 1:
			return Dice_FourOfAKind;
		case 2:
			return Dice_FullHouse;
		case 3:
			return Dice_SmallStraight;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 24)
		switch (FMath::RandRange(1, 5))
		{
		case 1:
			return Dice_FourOfAKind;
		case 2:
			return Dice_FullHouse;
		case 3:
			return Dice_SmallStraight;
		case 4:
			return Dice_LargeStraight;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 19)
		switch (FMath::RandRange(1, 4))
		{
		case 1:
			return Dice_FullHouse;
		case 2:
			return Dice_SmallStraight;
		case 3:
			return Dice_LargeStraight;
		default:
			return Dice_Chance;
		}

	if (systemHealth > 14)
		switch (FMath::RandRange(1, 3))
		{
		case 1:
			return Dice_FullHouse;
		case 2:
			return Dice_SmallStraight;
		default:
			return Dice_LargeStraight;
		}

	if (systemHealth > 9)
		switch (FMath::RandRange(1, 2))
		{
		case 1:
			return Dice_SmallStraight;
		default:
			return Dice_LargeStraight;
		}

	return Dice_LargeStraight;
}