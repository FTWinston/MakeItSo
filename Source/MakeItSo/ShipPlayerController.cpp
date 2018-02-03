#include "ShipPlayerController.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"
#include "WarpSystem.h"

void AShipPlayerController::InitInputSystem()
{
	Super::InitInputSystem();
	
	if (!ISCLIENT())
		return; // only want a crew manager on clients

	if (!UCrewManager::Instance)
	{
		UCrewManager::Instance = NewObject<UCrewManager>(GetTransientPackage(), NAME_None, RF_Standalone | RF_MarkAsRootSet);
		UCrewManager::Instance->Init(this);
	}
	else
		UCrewManager::Instance->LinkController(this);

	// how to send a crew message, as it stands
	//if (UCrewManager::Instance)
	//{
	//	UCrewManager::Instance->SendCrewMessage(CrewManager::ESystem::AllSystems, "hello world");
	//}
}

void AShipPlayerController::PreProcessInput(const float DeltaTime, const bool bGamePaused)
{
	if (UCrewManager::Instance)
	{
		UCrewManager::Instance->Poll();
	}
}
