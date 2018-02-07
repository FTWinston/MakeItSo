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
	UWarpSystem();
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
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
	void SendPath(int32 pathID, UWarpJump *path);
	void SendPathDeletion(int32 pathID);
	void AddCalculationStep(FVector newPoint);
	void AddPointToOutput(FString output, FVector point);

	FVector CalculateNextPosition(FVector position, FVector velocity, float timeStep);
	bool IsSafeJumpPosition(FVector position);
	void CleanupAfterCalculation();
	

	UPROPERTY(Replicated)
	float calculationStartPower;
	
	FVector calculationCurrentVelocity;
	int calculationStepsRemaining;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CalculationStepPositions)
	TArray<FVector> calculationStepPositions;

	UFUNCTION()
	void OnReplicated_CalculationStepPositions(TArray<FVector> beforeChange);


	int nextJumpID;


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CalculatedJumps)
	TMap<int32, UWarpJump*> calculatedJumps;

	UFUNCTION()
	void OnReplicated_CalculatedJumps(TMap<int32, UWarpJump*> beforeChange);
};