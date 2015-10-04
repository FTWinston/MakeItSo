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

	/** Bound to the thrust axis */
	void ThrustInput(float Val);
	void ThrustInputSide(float Val);
	void ThrustInputVertical(float Val);

	/** Bound to the vertical axis */
	void PitchInput(float Val);

	/** Bound to the horizontal axis */
	void YawInput(float Val);
};
