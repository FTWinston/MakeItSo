#include "WarpJumpCalculation.h"
#include "UnrealNetwork.h"

#define NUM_WARP_JUMP_STEPS 50

void UWarpJumpCalculation::Initialize(FVector startPos, FRotator startOrientation, float power)
{
	StartPos = startPos;
	StartOrientation = startOrientation;
	JumpPower = power;
	StepsRemaining = NUM_WARP_JUMP_STEPS;
}

void UWarpJumpCalculation::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UWarpJumpCalculation, StartPos);
	DOREPLIFETIME(UWarpJumpCalculation, StartOrientation);
	DOREPLIFETIME(UWarpJumpCalculation, JumpPower);
	DOREPLIFETIME(UWarpJumpCalculation, Steps);
	DOREPLIFETIME(UWarpJumpCalculation, StepsRemaining);
}

void UWarpJumpCalculation::CalculateNextStep()
{
	// TODO: simulate one more step, determine how to indicate 3 output states: continue, finished, crashed

	StepsRemaining--;
}