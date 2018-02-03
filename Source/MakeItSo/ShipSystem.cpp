#include "ShipSystem.h"
#include "CrewManager.h"
#include "Mongoose.h"

// Sets default values for this component's properties
UShipSystem::UShipSystem()
{
	SetIsReplicated(true);

	// Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
	// off to improve performance if you don't need them.
	//PrimaryComponentTick.bCanEverTick = true;

	// ...
}


// Called when the game starts
void UShipSystem::BeginPlay()
{
	Super::BeginPlay();

	crewManager = UCrewManager::Instance;

	ResetData();

	SendAllData();
}

void UShipSystem::SendAllData_Implementation() { }

void UShipSystem::SendAllFixed(const char *message) { crewManager->SendAllFixed(message); }

void UShipSystem::SendAll(FString message) { crewManager->SendAll(message); }

void UShipSystem::SendSystemFixed(const char *message) { crewManager->SendSystemFixed(GetSystem(), message); }

void UShipSystem::SendSystem(FString message) { crewManager->SendSystem(GetSystem(), message); }

int32 UShipSystem::ExtractInt(websocket_message *msg, int offset) { return crewManager->ExtractInt(msg, offset); }

float UShipSystem::ExtractFloat(websocket_message *msg, int offset) { return crewManager->ExtractFloat(msg, offset); }