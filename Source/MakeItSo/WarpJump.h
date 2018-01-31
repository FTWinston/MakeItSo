#pragma once

#include "CoreMinimal.h"
#include "WarpJump.generated.h"

UCLASS()
class MAKEITSO_API UWarpJump : public UObject
{
	GENERATED_BODY()
	
public:
	UPROPERTY(Replicated)
	FVector StartPos;
	
	UPROPERTY(Replicated)
	FVector EndPos;
	
	UPROPERTY(Replicated)
	float JumpPower;
};
