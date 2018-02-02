#ifndef WEB_SERVER_TEST
#include "WarpJump.h"
#include "UnrealNetwork.h"
#else
#include "stdafx.h"
#include "WarpJump.h"
#endif

#define NUM_WARP_JUMP_STEPS 50

#ifndef WEB_SERVER_TEST
void UWarpJump::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);
	
	DOREPLIFETIME(UWarpJump, StartOrientation);
	DOREPLIFETIME(UWarpJump, JumpPower);
	DOREPLIFETIME(UWarpJump, PositionSteps);
}
#endif

void UWarpJump::Initialize(FVector startPos, FRotator startOrientation, float power)
{
	StartOrientation = startOrientation;
	JumpPower = power;

#ifndef WEB_SERVER_TEST
	PositionSteps.Reset(NUM_WARP_JUMP_STEPS);
	PositionSteps.Add(startPos);
#else
	PositionSteps.clear();
	PositionSteps.push_back(startPos);
#endif

	StepsRemaining = NUM_WARP_JUMP_STEPS - 1;
}

void UWarpJump::CalculateNextStep()
{
	// TODO: simulate one more step, determine how to indicate 3 output states: continue, finished, crashed

	StepsRemaining--;
}