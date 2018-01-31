#ifndef WEB_SERVER_TEST
#include "WarpJumpCalculation.h"
#include "UnrealNetwork.h"
#else
#include "stdafx.h"
#include "WarpJumpCalculation.h"
#endif

#define NUM_WARP_JUMP_STEPS 50

void UWarpJumpCalculation::Initialize(FVector startPos, FRotator startOrientation, float power)
{
	StartPos = startPos;
	StartOrientation = startOrientation;
	JumpPower = power;
	StepsRemaining = NUM_WARP_JUMP_STEPS;
}

#ifndef WEB_SERVER_TEST
void UWarpJumpCalculation::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UWarpJumpCalculation, StartPos);
	DOREPLIFETIME(UWarpJumpCalculation, StartOrientation);
	DOREPLIFETIME(UWarpJumpCalculation, JumpPower);
	DOREPLIFETIME(UWarpJumpCalculation, Steps);
	DOREPLIFETIME(UWarpJumpCalculation, StepsRemaining);
}
#endif

void UWarpJumpCalculation::CalculateNextStep()
{
	// TODO: simulate one more step, determine how to indicate 3 output states: continue, finished, crashed

	StepsRemaining--;
}