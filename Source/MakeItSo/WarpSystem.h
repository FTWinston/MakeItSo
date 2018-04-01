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
	enum JumpPathStatus // matches enum in JumpPath.ts
	{
		Calculating = 1,
		Invalid = 2,
		Plotted = 3,
		//InRange = 4
	};

	UWarpSystem();
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
	void TickCalculating(float DeltaTime);
	void TickCharging(float DeltaTime);
	int DetermineAndSendJumpCharge();
	void TickJumping(float DeltaTime);
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
	void PrepareWarpJump(int32 jumpID);
#ifdef WEB_SERVER_TEST
	bool PrepareWarpJump_Validate(int32 jumpID);
	void PrepareWarpJump_Implementation(int32 jumpID);
#endif

	UFUNCTION(Server, Reliable, WithValidation)
	void PerformWarpJump();
#ifdef WEB_SERVER_TEST
	bool PerformWarpJump_Validate();
	void PerformWarpJump_Implementation();
#endif

	UFUNCTION(Server, Reliable)
	void CancelWarpJump();
#ifdef WEB_SERVER_TEST
	void CancelWarpJump_Implementation();
#endif

private:
	enum TickMode {
		Tick_Calculating,
		Tick_Charging,
		Tick_Jumping,
	};
	TickMode tickMode;

	void SendPath(int32 pathID, JumpPathStatus pathStatus, float jumpPower, TArray<FVector> positionSteps);

	UFUNCTION(Client, Reliable)
	void SendPathDeletion(int32 pathID, bool displayInvalid);
#ifdef WEB_SERVER_TEST
	void SendPathDeletion_Implementation(int32 pathID, bool displayInvalid);
#endif

	void AddCalculationStep(FVector newPoint);
	void AddPointToOutput(FString &output, FVector point);

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

	void CalculationStepsAdded(int32 prevNumSteps);

	int32 nextJumpID;

	UPROPERTY(Replicated)
	int32 activeJumpID;

	UPROPERTY(Replicated)
	int32 jumpCharge;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CalculatedJumps)
	TMap<int32, UWarpJump*> calculatedJumps;

	UFUNCTION()
	void OnReplicated_CalculatedJumps(TMap<int32, UWarpJump*> beforeChange);

	void SendJumpInProgress();
};