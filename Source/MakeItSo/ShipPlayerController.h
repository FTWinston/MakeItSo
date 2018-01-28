// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerController.h"
#include "ShipPlayerController.generated.h"

/**
 * 
 */
UCLASS()
class MAKEITSO_API AShipPlayerController : public APlayerController
{
	GENERATED_BODY()

public:
	virtual void PreProcessInput(const float DeltaTime, const bool bGamePaused);

protected:
	virtual void InitInputSystem();
};
