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
	// server -> client synchronisation will be fine, as values are set to only synch to the owning client
	// Can use ReplicatedUsing to handle changes from the server. And client never needs to set these properties, I guess?
	// BUT client *does* need to store the full path for each jump, not just the end points. Hmmph.
	// TODO: If we sync them, with a listen server will they still fire the ReplicatedUsing event? test!

	UPROPERTY(Replicated)
	UWarpJumpCalculation *currentJumpCalculation;
	
	UPROPERTY(Replicated)
	TMap<int32, UWarpJump*> calculatedJumps;
};
