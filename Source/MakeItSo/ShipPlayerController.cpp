// Fill out your copyright notice in the Description page of Project Settings.

#include "MakeItSo.h"
#include "ShipPlayerController.h"
#include "CrewManager.h"

void AShipPlayerController::InitInputSystem()
{
	Super::InitInputSystem();

	if (UCrewManager::Instance == NULL)
	{
		UCrewManager::Instance = NewObject<UCrewManager>(GetTransientPackage(), NAME_None, RF_Standalone | RF_RootSet);
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
