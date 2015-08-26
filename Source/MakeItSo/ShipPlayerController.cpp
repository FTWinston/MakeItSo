// Fill out your copyright notice in the Description page of Project Settings.

#include "MakeItSo.h"
#include "ShipPlayerController.h"
#include "CrewManager.h"

void AShipPlayerController::InitInputSystem()
{
	if (PlayerInput == NULL)
	{
		UCrewManager *crewManager = NewObject<UCrewManager>(this);
		crewManager->Init();

		PlayerInput = crewManager;
	}

	Super::InitInputSystem();

	// how to send a crew message, as it stands
	//if (PlayerInput)
	//{
	//	UCrewManager::Instance->SendCrewMessage(UCrewManager::System_t::All, "hello world");
	//}
}

void AShipPlayerController::PreProcessInput(const float DeltaTime, const bool bGamePaused)
{
	if (PlayerInput)
	{
		UCrewManager::Instance->Poll();
	}
}