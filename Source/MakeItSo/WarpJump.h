#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif
#include "WarpJump.generated.h"

UCLASS()
class MAKEITSO_API UWarpJump : public UObject
{
	GENERATED_BODY()
	
public:
	void Initialize(FVector startPos, FRotator startOrientation, float power);
	void CalculateNextStep();

	UPROPERTY(Replicated)
	FRotator StartOrientation;
	
	UPROPERTY(Replicated)
	float JumpPower;

	UPROPERTY(Replicated)
	TArray<FVector> PositionSteps;

#ifndef WEB_SERVER_TEST
	FVector StartPosition() { return PositionSteps[0]; }
	FVector EndPosition() { return PositionSteps.Top(); }
#else
	FVector StartPosition() { return PositionSteps.front(); }
	FVector EndPosition() { return PositionSteps.back(); }
#endif

private:
	int StepsRemaining;
};
