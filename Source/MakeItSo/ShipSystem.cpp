#ifndef WEB_SERVER_TEST
#include "ShipSystem.h"
#else
#include "stdafx.h"
#include "ShipSystem.h"
#endif

#include "CrewManager.h"
#include "Mongoose.h"

#define MAX_SYSTEM_HEALTH 100
#define MIN_SYSTEM_HEALTH 0

// Sets default values for this component's properties
UShipSystem::UShipSystem()
{
	SetIsReplicated(true);

	systemHealth = MAX_SYSTEM_HEALTH;

	// Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
	// off to improve performance if you don't need them.
	//PrimaryComponentTick.bCanEverTick = true;

	crewManager = UCrewManager::Instance;

#ifdef WEB_SERVER_TEST
	BeginPlay();
#endif
}


// Called when the game starts
void UShipSystem::BeginPlay()
{
	Super::BeginPlay();

	ResetData();

	SendAllData();
}

#ifdef WEB_SERVER_TEST
void UShipSystem::TakeDamage(uint8 damageAmount) { TakeDamage_Implementation(damageAmount); }
#endif
void UShipSystem::TakeDamage_Implementation(uint8 damageAmount)
{
	uint8 prevValue = systemHealth;
	systemHealth -= damageAmount;

	if (systemHealth > prevValue)
		systemHealth = 0; // value wrapped

	ApplySystemDamage(prevValue, systemHealth);
}

#ifdef WEB_SERVER_TEST
void UShipSystem::RestoreDamage(uint8 restoreAmount) { RestoreDamage_Implementation(restoreAmount); }
#endif
void UShipSystem::RestoreDamage_Implementation(uint8 damageAmount)
{
	uint8 prevValue = systemHealth;
	systemHealth = FMath::Max(systemHealth + damageAmount, MAX_SYSTEM_HEALTH);
	
	if (systemHealth < prevValue)
		systemHealth = MAX_SYSTEM_HEALTH; // value wrapped

	RepairSystemDamage(prevValue, systemHealth);
}

#define MAX_POWER_LEVEL 200

#ifdef WEB_SERVER_TEST
void UShipSystem::SetPowerLevel(uint8 newLevel) { SetPowerLevel_Implementation(newLevel); }
#endif
void UShipSystem::SetPowerLevel_Implementation(uint8 newLevel)
{
	if (newLevel > MAX_POWER_LEVEL)
		newLevel = MAX_POWER_LEVEL;

	systemPower = newLevel;
}

#ifdef WEB_SERVER_TEST
void UShipSystem::SendAllData() { SendAllData_Implementation(); }
#endif

void UShipSystem::SendAllData_Implementation() { }

void UShipSystem::SendAllFixed(const char *message) { crewManager->SendAllFixed(message); }

void UShipSystem::SendAll(FString message) { crewManager->SendAll(message); }

void UShipSystem::SendSystemFixed(const char *message) { crewManager->SendSystemFixed(GetSystem(), message); }

void UShipSystem::SendSystem(FString message) { crewManager->SendSystem(GetSystem(), message); }

int32 UShipSystem::ExtractInt(websocket_message *msg, int offset) { return crewManager->ExtractInt(msg, offset); }

float UShipSystem::ExtractFloat(websocket_message *msg, int offset) { return crewManager->ExtractFloat(msg, offset); }

TArray<FString> UShipSystem::SplitParts(websocket_message *msg, int offset) { return crewManager->SplitParts(msg, offset); }