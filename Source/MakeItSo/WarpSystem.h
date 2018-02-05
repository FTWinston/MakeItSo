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

#ifdef WEB_SERVER_TEST
	void GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const;
#endif

	UFUNCTION(Server, Reliable, WithValidation)
	void StartJumpCalculation(FVector startPos, FRotator direction, float power);
#ifdef WEB_SERVER_TEST
	bool StartJumpCalculation_Validate(FVector startPos, FRotator direction, float power);
	void StartJumpCalculation_Implementation(FVector startPos, FRotator direction, float power);
#endif

	UFUNCTION(Server, Reliable, WithValidation)
	void DeleteJump(int32 jumpID);
#ifdef WEB_SERVER_TEST
	bool DeleteJump_Validate(int32 jumpID);
	void DeleteJump_Implementation(int32 jumpID);
#endif

	UFUNCTION(Server, Reliable, WithValidation)
	void PerformWarpJump(int32 jumpID);
#ifdef WEB_SERVER_TEST
	bool PerformWarpJump_Validate(int32 jumpID);
	void PerformWarpJump_Implementation(int32 jumpID);
#endif

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

#ifdef WEB_SERVER_TEST
void UWarpSystem::StartJumpCalculation(FVector startPos, FRotator direction, float power) { if (StartJumpCalculation_Validate(startPos, direction, power)) StartJumpCalculation_Implementation(startPos, direction, power); }
void UWarpSystem::DeleteJump(int32 jumpID) { if (DeleteJump_Validate(jumpID)) DeleteJump_Implementation(jumpID); }
void UWarpSystem::PerformWarpJump(int32 jumpID) { if (PerformWarpJump_Validate(jumpID)) PerformWarpJump_Implementation(jumpID); }
#endif