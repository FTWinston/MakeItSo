#ifndef WEB_SERVER_TEST
#include "WarpJump.h"
#include "UnrealNetwork.h"
#else
#include "stdafx.h"
#include "WarpJump.h"
#endif

#ifndef WEB_SERVER_TEST
void UWarpJump::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UWarpJump, StartPos);
	DOREPLIFETIME(UWarpJump, EndPos);
	DOREPLIFETIME(UWarpJump, JumpPower);
}
#endif