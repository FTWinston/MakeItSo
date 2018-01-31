// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerController.h"
#include "WarpJump.h"
#include "WarpJumpCalculation.h"
#include "ShipPlayerController.generated.h"

/**
 * 
 */
UCLASS()
class MAKEITSO_API AShipPlayerController : public APlayerController
{
	GENERATED_BODY()

public:
	AShipPlayerController() { currentJumpCalculation = nullptr; }
	virtual void PreProcessInput(const float DeltaTime, const bool bGamePaused);

	UFUNCTION(Server, Reliable, WithValidation)
	void StartJumpCalculation(FVector startPos, FRotator direction, float power);

	UFUNCTION(Client, Unreliable)
	void JumpCalculationStep(FVector newPoint);

	UFUNCTION(Client, Reliable)
	void FinishJumpCalculation(FVector endPoint, bool isSafe);

	UFUNCTION(Server, Reliable, WithValidation)
	void PerformWarpJump(int32 jumpID);

protected:
	virtual void InitInputSystem();

private:
	// TODO: these properties don't want to be networked ... I don't think
	// ach, wait. If we sync them, with a listen server they'll already be there when we try to set them up via RPC.
	// and it is a bit awkward having them here instead of on the warp system
	// ...so could we just synchronize these?
	
	UPROPERTY(Replicated)
	UWarpJumpCalculation *currentJumpCalculation;
	
	UPROPERTY(Replicated)
	TMap<int32, UWarpJump*> calculatedJumps;
};
