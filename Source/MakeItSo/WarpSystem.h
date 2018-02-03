#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WarpSystem.Generated.h"

class UWarpJump;

UCLASS( ClassGroup = (Systems) )
class MAKEITSO_API UWarpSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Warp; }

	UFUNCTION(Server, Reliable, WithValidation)
	void StartJumpCalculation(FVector startPos, FRotator direction, float power);

	UFUNCTION(Server, Reliable, WithValidation)
	void PerformWarpJump(int32 jumpID);
private:
	void AddCalculationStep(FVector newPoint);
	void AddPointToOutput(FString output, FVector point);

	// server -> client synchronisation will be fine, if we set values to only sync to the owning client
	// Can use ReplicatedUsing to handle changes from the server. And client never needs to set these properties, I guess?
	// BUT client *does* need to store the full path for each jump, not just the end points. Hmmph.
	// TODO: If we sync them, with a listen server will they still fire the ReplicatedUsing event? test!

	UPROPERTY(Replicated)
	UWarpJump *currentJumpCalculation;

	UPROPERTY(Replicated)
	TMap<int32, UWarpJump*> calculatedJumps;
};