// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "WarpJumpCalculation.generated.h"

UCLASS()
class MAKEITSO_API UWarpJumpCalculation : public UObject
{
	GENERATED_BODY()

public:
	void Initialize(FVector startPos, FRotator startOrientation, float power);
	void CalculateNextStep();
private:
	UPROPERTY(Replicated)
	FVector StartPos;

	UPROPERTY(Replicated)
	FRotator StartOrientation;

	UPROPERTY(Replicated)
	float JumpPower;

	UPROPERTY(Replicated)
	TArray<FVector> Steps;

	UPROPERTY(Replicated)
	int StepsRemaining;
};
