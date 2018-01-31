#include "WarpJump.h"
#include "UnrealNetwork.h"

void UWarpJump::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UWarpJump, StartPos);
	DOREPLIFETIME(UWarpJump, EndPos);
	DOREPLIFETIME(UWarpJump, JumpPower);
}
