// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

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

	void ThrustInput(float Val);
	void ThrustInputSide(float Val);
	void ThrustInputVertical(float Val);

	void PitchInput(float Val);
	void YawInput(float Val);
	void RollInput(float Val);
};
