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

UDamageControlSystem::UDamageControlSystem()
{
	PrimaryComponentTick.bCanEverTick = false;

#ifndef WEB_SERVER_TEST
	dice.AddZeroed(NUM_DICE);
	systemHealth.AddZeroed(MAX_DAMAGE_SYSTEMS);
#else
	dice.assign(NUM_DICE, 0);
	systemHealth.assign(NUM_DAMAGE_SYSTEMS, 0);
#endif
}

void UDamageControlSystem::ResetData()
{
	ResetDice();
	selectedSystem = EDamageSystem::Damage_None;
	CLEAR(availableCombos);

	for (uint8 i = 0; i < NUM_DAMAGE_SYSTEMS; i++)
	{
		auto system = (EDamageSystem)i;

		auto damageSystem = LookupSystem(system);
		auto health = damageSystem != nullptr ? damageSystem->GetHealthLevel() : 0;

		systemHealth[i] = health;
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
	else if (STARTS_WITH(msg, "dmg_system "))
	{
		uint8 systemNum = ExtractInt(msg, sizeof("dmg_system "));
		SelectSystem((EDamageSystem)systemNum);
	}
	else if (STARTS_WITH(msg, "dmg_combo "))
	{
		uint8 comboNum = ExtractInt(msg, sizeof("dmg_combo "));
		ApplyDiceToCombo(comboNum);
	}
	else if (STARTS_WITH(msg, "dmg_power "))
	{
		uint8 onOff = ExtractInt(msg, sizeof("dmg_power "));
		ToggleSystemPower(onOff == 1);
	}

	else
		return false;

	return true;
}


void UDamageControlSystem::SendAllData_Implementation()
{
	SendDice();
	SendRollsRemaining();
	SendSystemHealth();
	SendSelectedSystem();
	SendAvailableCombos();
}


void UDamageControlSystem::SetSystemHealth(UShipSystem::ESystem system, uint8 health)
{
	auto damageSystem = GetDamageSystem(system);
	if (damageSystem == Damage_None)
		return;

	systemHealth[damageSystem] = health;
}

void UDamageControlSystem::SendDice_Implementation()
{
	FString output = TEXT("dmg_dice");

	for (auto die : dice)
	{
		output += TEXT(" ");
		APPENDINT(output, die);
	}

	uint8 numRerollable = GetNumRollableDice(GetHealthLevel());
	uint8 i;
	
	for (i = 0; i < numRerollable; i++)
		output += TEXT(" 1");

	for (i; i < NUM_DICE; i++)
		output += TEXT(" 0");

	SendSystem(output);
}

void UDamageControlSystem::SendRollsRemaining_Implementation()
{
	FString output = TEXT("dmg_rolls ");
	APPENDINT(output, rollsRemaining);
	SendSystem(output);
}

void UDamageControlSystem::SendSystemHealth_Implementation()
{
	FString output = TEXT("dmg_health");

	for (auto health : systemHealth)
	{
		output += TEXT(" ");
		APPENDINT(output, health);
	}

	SendAll(output);
}

void UDamageControlSystem::SendSelectedSystem_Implementation()
{
	FString output = TEXT("dmg_system ");

	APPENDINT(output, (uint8)selectedSystem);

	SendAll(output);
}

void UDamageControlSystem::SendAvailableCombos_Implementation()
{
	FString output = TEXT("dmg_combos");

	for (auto combo : availableCombos)
	{
		output += TEXT(" ");
		APPENDINT(output, (uint8)combo);
	}

	SendAll(output);
}


void UDamageControlSystem::RollDice_Implementation(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5)
{
	// Can only roll if a system is selected
	if (selectedSystem == EDamageSystem::Damage_None)
		return;

	// Can only roll if that system has no power
	auto system = LookupSystem(selectedSystem);
	if (system == nullptr || system->GetPowerLevel() > 0)
		return;

	uint8 numRollable = GetNumRollableDice(GetHealthLevel());

	if (roll1 && numRollable < 1)
		roll1 = false;
	if (roll2 && numRollable < 2)
		roll2 = false;
	if (roll3 && numRollable < 3)
		roll3 = false;
	if (roll4 && numRollable < 4)
		roll4 = false;
	if (roll5 && numRollable < 5)
		roll5 = false;

	if (rollsRemaining == 0 || !(roll1 || roll2 || roll3 || roll4 || roll5)) {
		return;
	}

	if (GetPowerLevel() == 0)
	{
		rollsRemaining = 0;
		SendRollsRemaining();
		return;
	}

	rollsRemaining--;

	// In case the power level has reduced, shrink things even further
	uint8 maxLimit = GetNumRerolls();
	if (rollsRemaining > maxLimit)
		rollsRemaining = maxLimit;

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

void UDamageControlSystem::SelectSystem_Implementation(EDamageSystem system)
{
	if (selectedSystem == system && SIZENUM(availableCombos) > 0)
	{
		SendSelectedSystem();
		SendDice();
		SendRollsRemaining();
		return;
	}

	selectedSystem = system;
	ResetDice();
	AllocateCombos(systemHealth[system]);
		
	if (ISCLIENT())
	{
		SendSelectedSystem();
		SendAvailableCombos();
	}
}

void UDamageControlSystem::ToggleSystemPower_Implementation(bool enabled)
{
	if (selectedSystem == EDamageSystem::Damage_None)
		return;

	auto system = LookupSystem(selectedSystem);
	if (system == nullptr)
		return;

	auto existingPower = system->GetPowerLevel();

	// TODO: this should account for the system's capacity in the power management system, and restore it back to that.
	if (existingPower > 0)
		system->SetPowerLevel(0);
	else
		system->SetPowerLevel(100);
}

uint8 UDamageControlSystem::Roll()
{
	return FMath::RandRange(1, 6);
}

uint8 UDamageControlSystem::GetNumRerolls()
{
	// 150 should be 5
	// 125 should be 4
	// 100 should be 3
	// 75 should be 2
	// 50 should be 1
	// 25 should be 0
	// 0 is CANT ROLL

	uint8 power = GetPowerLevel();
	if (power < 25)
		return 0;

	return (power - 25) / 25;
}

uint8 UDamageControlSystem::GetNumRollableDice(uint8 health)
{
	if (health >= 100)
		return NUM_DICE;
	if (health >= 80)
		return 4;
	if (health >= 60)
		return 3;
	if (health >= 40)
		return 2;
	if (health >= 20)
		return 1;

	return 0;
}

void UDamageControlSystem::ApplySystemDamage(uint8 prevValue, uint8 newValue)
{
	if (GetNumRollableDice(prevValue) != GetNumRollableDice(newValue))
		SendDice();
}

void UDamageControlSystem::RepairSystemDamage(uint8 prevValue, uint8 newValue)
{
	if (GetNumRollableDice(prevValue) != GetNumRollableDice(newValue))
		SendDice();
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


void UDamageControlSystem::ResetDice()
{
	rollsRemaining = GetNumRerolls();
	for (uint8 i = 0; i < NUM_DICE; i++)
		dice[i] = 0;

	if (ISCLIENT())
	{
		SendDice();
		SendRollsRemaining();
	}
}


void UDamageControlSystem::ApplyDiceToCombo_Implementation(uint8 comboIndex)
{
	// Must have a system to repair and have selected a valid combo
	if (selectedSystem == EDamageSystem::Damage_None || comboIndex >= SIZENUM(availableCombos))
		return;

	// Cannot repair a powered system
	auto system = LookupSystem(selectedSystem);
	if (system == nullptr || system->GetPowerLevel() > 0)
		return;

	auto combo = availableCombos[comboIndex];
	if (combo == EDiceCombo::Dice_None)
		return;

	uint8 healingAmount = GetDiceScore(combo);

	// Once a combo has been used, it can't be reused
	availableCombos[comboIndex] = Dice_None;

	ResetDice();

	RestoreDamage(selectedSystem, healingAmount);
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
	//	  return crewManager->GetSystem(UShipSystem::ESystem::Shields);
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
	//	  return Damage_Shields;
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


void UDamageControlSystem::AllocateCombos(uint8 systemHealth)
{
	CLEAR(availableCombos);

	if (systemHealth >= 100)
		return;

	// TODO: These combos aren't terribly well thought through. Reconsider them.

	if (systemHealth > 90)
	{
		SETADD(availableCombos, Dice_Aces);
		SETADD(availableCombos, Dice_Twos);
		SETADD(availableCombos, Dice_Threes);
		SETADD(availableCombos, Dice_Chance);
	}
	else if (systemHealth > 80)
	{
		SETADD(availableCombos, Dice_Twos);
		SETADD(availableCombos, Dice_Threes);
		SETADD(availableCombos, Dice_ThreeOfAKind);
		SETADD(availableCombos, Dice_Chance);
	}
	else if (systemHealth > 70)
	{
		SETADD(availableCombos, Dice_Threes);
		SETADD(availableCombos, Dice_Fours);
		SETADD(availableCombos, Dice_ThreeOfAKind);
		SETADD(availableCombos, Dice_Chance);
	}
	else if (systemHealth > 60)
	{
		SETADD(availableCombos, Dice_Fours);
		SETADD(availableCombos, Dice_Fives);
		SETADD(availableCombos, Dice_ThreeOfAKind);
		SETADD(availableCombos, Dice_SmallStraight);
	}
	else if (systemHealth > 50)
	{
		SETADD(availableCombos, Dice_Fives);
		SETADD(availableCombos, Dice_Sixes);
		SETADD(availableCombos, Dice_FourOfAKind);
		SETADD(availableCombos, Dice_SmallStraight);
	}
	else if (systemHealth > 40)
	{
		SETADD(availableCombos, Dice_Threes);
		SETADD(availableCombos, Dice_FullHouse);
		SETADD(availableCombos, Dice_FourOfAKind);
		SETADD(availableCombos, Dice_SmallStraight);
	}
	else if (systemHealth > 30)
	{
		SETADD(availableCombos, Dice_Twos);
		SETADD(availableCombos, Dice_FullHouse);
		SETADD(availableCombos, Dice_FourOfAKind);
		SETADD(availableCombos, Dice_SmallStraight);
	}
	else if (systemHealth > 20)
	{
		SETADD(availableCombos, Dice_Aces);
		SETADD(availableCombos, Dice_SmallStraight);
		SETADD(availableCombos, Dice_ThreeOfAKind);
		SETADD(availableCombos, Dice_FourOfAKind);
	}
	else if (systemHealth > 10)
	{
		SETADD(availableCombos, Dice_SmallStraight);
		SETADD(availableCombos, Dice_FullHouse);
		SETADD(availableCombos, Dice_ThreeOfAKind);
		SETADD(availableCombos, Dice_FourOfAKind);
	}
	else if (systemHealth > 0)
	{
		SETADD(availableCombos, Dice_SmallStraight);
		SETADD(availableCombos, Dice_LargeStraight);
		SETADD(availableCombos, Dice_FullHouse);
		SETADD(availableCombos, Dice_Yahtzee);
	}
	else
	{
		SETADD(availableCombos, Dice_FourOfAKind);
		SETADD(availableCombos, Dice_FullHouse);
		SETADD(availableCombos, Dice_LargeStraight);
		SETADD(availableCombos, Dice_Yahtzee);
	}
}