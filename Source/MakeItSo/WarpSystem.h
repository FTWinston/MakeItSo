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

	UPROPERTY()
	TArray<TArray<uint8>> groupCells; // this is just a cache for checking solutions
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
	bool IsGroupValid(TArray<uint8> solution, TArray<uint8> group, FKenKenData::EOperator groupOperator, int16 groupTarget);
	bool CheckGroupPermutatations(TArray<uint8> solution, TArray<uint8> group, FKenKenData::EOperator groupOperator, int16 groupTarget, uint16 stepsLeft);

	bool ResolveGroup(TArray<uint8> solution, TArray<uint8> group, FKenKenData::EOperator groupOperator, int16 &result);
	FVector DetermineJumpDestination(uint8 numPuzzleErrors);
	uint8 DeterminePuzzleSize();
	void CalculatePuzzle();
	void CreateLatinSquare(TArray<uint8> &cells);
	TArray<TArray<uint8>> AllocateCellGroups();
	void AddUnallocatedNeighbouringCellIndices(uint8 cellIndex, TArray<uint8> &output, TSet<uint8> allocatedCells);
	bool TryPickTarget(TArray<uint8> group, TArray<uint8> solution, FKenKenData::EOperator groupOperator, int16 &groupTarget);

	UPROPERTY()
	uint16 maxSavedPositionID;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SavedPositions)
	TMap<uint16, FVector> savedPositions;
	void OnReplicated_SavedPositions(TMap<uint16, FVector> beforeChange);

	UPROPERTY()
	float jumpTimeRemaining;

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
	void SendShipLocation()
#ifdef WEB_SERVER_TEST
	{ SendShipLocation_Implementation(); }
	void SendShipLocation_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendJumpState()
#ifdef WEB_SERVER_TEST
	{ SendJumpState_Implementation();}
	void SendJumpState_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendJumpCharge()
#ifdef WEB_SERVER_TEST
	{ SendJumpCharge_Implementation(); }
	void SendJumpCharge_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendJumpDuration(float duration)
#ifdef WEB_SERVER_TEST
	{ SendJumpDuration_Implementation(duration); }
	void SendJumpDuration_Implementation(float duration);
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendJumpPositions(FVector startPos, FVector targetPos)
#ifdef WEB_SERVER_TEST
	{ SendJumpPositions_Implementation(startPos, targetPos); }
	void SendJumpPositions_Implementation(FVector startPos, FVector targetPos);
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendSavedPositions()
#ifdef WEB_SERVER_TEST
	{ SendSavedPositions_Implementation(); }
	void SendSavedPositions_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendPuzzleData()
#ifdef WEB_SERVER_TEST
	{ SendPuzzleData_Implementation(); }
	void SendPuzzleData_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendPuzzleResults(TArray<bool> results)
#ifdef WEB_SERVER_TEST
	{ SendPuzzleResults_Implementation(results); }
	void SendPuzzleResults_Implementation(TArray<bool> results);
#endif
	;

	// Server functions, that can be called from the client
	UFUNCTION(Server, Reliable)
	void CalculateJump(FVector targetPos)
#ifdef WEB_SERVER_TEST
	{ CalculateJump_Implementation(targetPos); }
	void CalculateJump_Implementation(FVector targetPos);
#endif
	;

	UFUNCTION(Server, Reliable)
	void CancelJump()
#ifdef WEB_SERVER_TEST
	{ CancelJump_Implementation(); }
	void CancelJump_Implementation();
#endif
	;

	UFUNCTION(Server, Reliable)
	void PerformWarpJump(TArray<uint8> solution)
#ifdef WEB_SERVER_TEST
	{ PerformWarpJump_Implementation(solution); }
	void PerformWarpJump_Implementation(TArray<uint8> solution);
#endif
	;

	UFUNCTION(Server, Reliable)
	void AddSavedPosition(FVector pos, uint16 id)
#ifdef WEB_SERVER_TEST
	{ AddSavedPosition_Implementation(pos, id); }
	void AddSavedPosition_Implementation(FVector pos, uint16 id);
#endif
	;

	UFUNCTION(Server, Reliable)
	void RemoveSavedPosition(uint16 id)
#ifdef WEB_SERVER_TEST
	{ RemoveSavedPosition_Implementation(id); }
	void RemoveSavedPosition_Implementation(uint16 id);
#endif
	;
};
