#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WarpSystem.Generated.h"


USTRUCT()
struct FKenKenData
{
	enum EOperator
	{
		Add = 1,
		Multiply = 2,
		Subtract = 3,
		Divide = 4,

		MIN_OPERATOR = Add,
		MAX_OPERATOR = Divide,
		MAX_SAFE_OPERATOR = Multiply, // Safe as in, will work regardless of the numbers / order
		MAX_UNORDERED_OPERATOR = Multiply,
	};

	GENERATED_BODY()

		UPROPERTY(Replicated)
		uint8 width;

	UPROPERTY(Replicated)
		TArray<uint8> cellGroups;

	UPROPERTY(Replicated)
		TArray<int16> groupTargets;

	UPROPERTY(Replicated)
		TArray<EOperator> groupOperators;
};


UCLASS( ClassGroup = (Systems) )
class MAKEITSO_API UWarpSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EJumpState : uint8
	{
		Idle = 0,
		Charging = 1,
		Ready = 2,
		Jumping = 3,
	};

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

private:
	void TickCharging(float DeltaTime);
	void TickJumping(float DeltaTime);
	TArray<bool> ResolveSolution(TArray<uint8> solution);
	FVector DetermineJumpDestination(uint8 numWrongGroups);
	uint8 DeterminePuzzleSize();
	void CalculatePuzzle();
	void CreateLatinSquare(TArray<uint8> &cells);
	TArray<TArray<uint8>> AllocateCellGroups();
	void AddUnallocatedNeighbouringCellIndices(uint8 cellIndex, TArray<uint8> &output, TSet<uint8> allocatedCells);
	bool TryPickTarget(TArray<uint8> group, FKenKenData::EOperator groupOperator, int16 &groupTarget);


	UPROPERTY(Replicated)
	FVector jumpStartPosition;

	UPROPERTY(Replicated)
	FVector jumpTargetPosition;

	UPROPERTY()
	FVector actualJumpDestination;

	UPROPERTY(Replicated)
	float jumpRequiredCharge;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_JumpState)
	EJumpState jumpState;
	void OnReplicated_JumpState(EJumpState beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_JumpCharge)
	float jumpCharge;
	void OnReplicated_JumpCharge(float beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_Puzzle)
	FKenKenData puzzle;
	void OnReplicated_Puzzle(FKenKenData beforeChange);

	UPROPERTY()
	FVector lastSentLocation;

	// Client functions, that can be called from the server
	UFUNCTION(Client, Reliable)
	void SendShipLocation();
#ifdef WEB_SERVER_TEST
	void SendShipLocation_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendJumpState();
#ifdef WEB_SERVER_TEST
	void SendJumpState_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendJumpCharge();
#ifdef WEB_SERVER_TEST
	void SendJumpCharge_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendJumpPositions(FVector startPos, FVector targetPos);
#ifdef WEB_SERVER_TEST
	void SendJumpPositions_Implementation(FVector startPos, FVector targetPos);
#endif

	UFUNCTION(Client, Reliable)
	void SendPuzzleData();
#ifdef WEB_SERVER_TEST
	void SendPuzzleData_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendPuzzleResults(TArray<bool> results);
#ifdef WEB_SERVER_TEST
	void SendPuzzleResults_Implementation(TArray<bool> results);
#endif


	// Server functions, that can be called from the client
	UFUNCTION(Server, Reliable)
	void CalculateJump(FVector targetPos);
#ifdef WEB_SERVER_TEST
	void CalculateJump_Implementation(FVector targetPos);
#endif

	UFUNCTION(Server, Reliable)
	void CancelJump();
#ifdef WEB_SERVER_TEST
	void CancelJump_Implementation();
#endif

	UFUNCTION(Server, Reliable)
	void PerformWarpJump(TArray<uint8> solution);
#ifdef WEB_SERVER_TEST
	void PerformWarpJump_Implementation(TArray<uint8> solution);
#endif
};
