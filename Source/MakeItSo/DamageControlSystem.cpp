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
	systemHealth.assign(MAX_DAMAGE_SYSTEMS, 0);
	systemCombos.assign(MAX_DAMAGE_SYSTEMS, Dice_None);
#endif
}

void UDamageControlSystem::ResetData()
{
	ResetDice();

	for (uint8 i = 0; i < MAX_DAMAGE_SYSTEMS; i++)
	{
		systemHealth[i] = 100;
		systemCombos[i] = Dice_None;
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

	for (uint8 i = 0; i < MAX_DAMAGE_SYSTEMS; i++)
	{
		SendSystemState((EDamageSystem)i);
	}
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

	ResetDice();
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


// TODO: how do changes to system health (from elsewhere) affect this system? It needs to be notified.
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

bool UDamageControlSystem::DealDamage(EDamageSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr || targetSystem->GetHealthLevel() >= MAX_SYSTEM_HEALTH)
		return false;

	targetSystem->TakeDamage(amount);
	systemHealth[system] = targetSystem->GetHealthLevel();

	SendSystemState(system);

	return true;
}

void UDamageControlSystem::SetHealth(EDamageSystem system, uint8 newValue)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return;
	
	uint8 existingHealth = targetSystem->GetHealthLevel();
	if (existingHealth > newValue)
		targetSystem->TakeDamage(existingHealth - newValue);
	else if (existingHealth < newValue)
		targetSystem->RestoreDamage(newValue - existingHealth);

	SendSystemState(system);
}
