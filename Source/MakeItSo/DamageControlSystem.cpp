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
		SendSystemState((EDamageSystem)i);
	}
}


void UDamageControlSystem::SetSystemHealth(UShipSystem::ESystem system, uint8 health)
{
	auto damageSystem = GetDamageSystem(system);
	if (damageSystem == Damage_None)
		return;

	systemHealth[damageSystem] = health;
	systemCombos[damageSystem] = SelectCombo(systemCombos[damageSystem], health);
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

	for (auto val : dice)
	{
		output += TEXT(" ");
		APPENDINT(output, val);
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
void UDamageControlSystem::SendSystemState(EDamageSystem system) { SendSystemState_Implementation(system); }
#endif

void UDamageControlSystem::SendSystemState_Implementation(EDamageSystem system)
{
	FString output = TEXT("dmg_system ");
	APPENDINT(output, system);
	output += TEXT(" ");
	APPENDINT(output, systemHealth[system]);
	output += TEXT(" ");
	APPENDINT(output, systemCombos[system]);
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
	// TODO: calculate effect of current dice combo, apply it to current system
	uint8 healingAmount = 10;

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
//	case Damage_Shields:
//		return ???;
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
	//	case ???:
	//		return Damage_Shields;
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
	systemHealth[system] = targetSystem->GetHealthLevel();

	SendSystemState(system);

	return true;
}

UDamageControlSystem::EDiceCombo UDamageControlSystem::SelectCombo(EDiceCombo currentCombo, uint8 systemHealth)
{
	if (systemHealth >= 100)
		return Dice_None;

	if (systemHealth == 0)
		return Dice_Yahtzee;
	
	// Determine if the current combo is valid for the current system health value.
	// Combos are valid for a wider "health" range than they are selectable for, to avoid changing combos that the user is trying to get.
	switch (currentCombo)
	{
		case Dice_Aces:
			if (systemHealth >= 1 && systemHealth <= 25)
				return currentCombo;
			break;
		case Dice_Twos:
			if (systemHealth >= 1 && systemHealth <= 35)
				return currentCombo;
			break;
		case Dice_Threes:
			if (systemHealth >= 1 && systemHealth <= 40)
				return currentCombo;
			break;
		case Dice_Fours:
			if (systemHealth >= 5 && systemHealth <= 45)
				return currentCombo;
			break;
		case Dice_Fives:
			if (systemHealth >= 8 && systemHealth <= 50)
				return currentCombo;
			break;
		case Dice_Sixes:
			if (systemHealth >= 10 && systemHealth <= 55)
				return currentCombo;
			break;
		case Dice_ThreeOfAKind:
			if (systemHealth >= 20 && systemHealth <= 60)
				return currentCombo;
			break;
		case Dice_FourOfAKind:
			if (systemHealth >= 30 && systemHealth <= 70)
				return currentCombo;
			break;
		case Dice_FullHouse:
			if (systemHealth >= 35 && systemHealth <= 80)
				return currentCombo;
			break;
		case Dice_SmallStraight:
			if (systemHealth >= 40 && systemHealth <= 60)
				return currentCombo;
			break;
		case Dice_LargeStraight:
			if (systemHealth >= 50 && systemHealth <= 99)
				return currentCombo;
			break;
		case Dice_Yahtzee:
			if (systemHealth >= 90)
				return currentCombo;
			break;
		case Dice_Chance:
			if (systemHealth >= 10 && systemHealth <= 99)
				return currentCombo;
			break;
	}

	// The current combo isn't valid for this systemHealth value, so select a new combo.
	if (systemHealth < 10) {
		return FMath::RandRange(1, 2) == 1
			? Dice_Aces
			: Dice_Twos;
	}

	if (systemHealth < 20) {
		return FMath::RandRange(1, 2) == 1
			? Dice_Twos
			: Dice_Threes;
	}

	if (systemHealth < 30) {
		return FMath::RandRange(1, 2) == 1
			? Dice_Threes
			: Dice_Fours;
	}

	if (systemHealth < 40) {
		return FMath::RandRange(1, 2) == 1
			? Dice_Fours
			: Dice_Fives;
	}

	if (systemHealth < 50) {
		return FMath::RandRange(1, 2) == 1
			? Dice_Fives
			: Dice_Sixes;
	}

	// Beyond 50% damage, a small chance of getting Chance...
	if (FMath::RandRange(1, 8) == 1)
		return Dice_Chance;

	if (systemHealth < 60) {
		return FMath::RandRange(1, 2) == 1
			? Dice_Sixes
			: Dice_ThreeOfAKind;
	}

	if (systemHealth < 70) {
		return FMath::RandRange(1, 2) == 1
			? Dice_ThreeOfAKind
			: Dice_FourOfAKind;
	}

	if (systemHealth < 80) {
		return FMath::RandRange(1, 2) == 1
			? Dice_FourOfAKind
			: Dice_FullHouse;
	}

	if (systemHealth < 90) {
		return FMath::RandRange(1, 2) == 1
			? Dice_FullHouse
			: Dice_SmallStraight;
	}

	return FMath::RandRange(1, 2) == 1
		? Dice_SmallStraight
		: Dice_LargeStraight;
}