#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WeaponSystem.Generated.h"

class USensorTargetInfo;

USTRUCT()
struct FWeaponPuzzleData
{
	enum EDirection : uint8
	{
		Up = 1,
		Down = 2,
		Left = 3,
		Right = 4,
	};

	GENERATED_BODY()

	UPROPERTY(Replicated)
	uint8 width;

	UPROPERTY(Replicated)
	uint8 height;

	UPROPERTY(Replicated)
	TArray<bool> cells;

	UPROPERTY(Replicated)
	uint8 startCell;
};

USTRUCT()
struct FWeaponTargetingSolution {

	enum ETargetingSolutionType : uint8
	{
		None = 0,

		Misc,

		Engines,
		Warp,
		Weapons,
		Sensors,
		PowerManagement,
		DamageControl,
		Communications,

		MiscVulnerability,
		EngineVulnerability,
		WarpVulnerability,
		WeaponVulnerability,
		SensorVulnerability,
		PowerVulnerability,
		DamageControlVulnerability,
		CommunicationVulnerability,

		MIN_STANDARD_SYSTEM = Engines,
		MAX_STANDARD_SYSTEM = Communications,
		MIN_SYSTEM_VULNERABILITY = EngineVulnerability,
		MAX_SYSTEM_VULNERABILITY = CommunicationVulnerability,
		MIN_VULNERABILITY = MiscVulnerability,
	};

	enum ESolutionDifficulty : uint8 {
		VeryEasy = 0,
		Easy,
		Medium,
		Hard,
		VeryHard,
		Impossible,
	};

	enum ETargetingFace : int8 { // These are numbered stupidly to easily identify opposite faces
		NoFace = 0,
		Front = 1,
		Rear = -1,
		Left = 2,
		Right = -2,
		Top = 3,
		Bottom = -3,
	};

	GENERATED_BODY()

	FWeaponTargetingSolution() {}
	
	FWeaponTargetingSolution(ETargetingSolutionType type, ESolutionDifficulty difficulty, ETargetingFace bestFace)
	{
		this->type = type;
		this->baseDifficulty = difficulty;
		this->bestFacing = bestFace;
	}

	UPROPERTY(Replicated)
	ETargetingSolutionType type;

	UPROPERTY(Replicated)
	ESolutionDifficulty baseDifficulty;

	UPROPERTY(Replicated)
	ETargetingFace bestFacing;
};

UCLASS()
class MAKEITSO_API UWeaponSystem : public UShipSystem
{
	GENERATED_BODY()
public:
	UWeaponSystem();
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Weapons; }

private:
	void DetermineTargetingSolutions();
	void ClearPuzzle();
	FWeaponTargetingSolution::ESolutionDifficulty DetermineDifficulty(FWeaponTargetingSolution::ESolutionDifficulty baseDifficulty, FWeaponTargetingSolution::ETargetingFace bestFacing);
	void GeneratePuzzle(FWeaponTargetingSolution::ESolutionDifficulty difficulty);
	bool IsValidSolution(TArray<FWeaponPuzzleData::EDirection> puzzleSolution);
	UShipSystem::ESystem GetSystemForSolution(FWeaponTargetingSolution::ETargetingSolutionType solutionType);
	uint8 GetDamageForSolution(FWeaponTargetingSolution::ETargetingSolutionType solutionType);
	void RemoveVulnerability(FWeaponTargetingSolution::ETargetingSolutionType solutionType);
	USensorTargetInfo *GetSelectedTarget();


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedTargetID)
	uint16 selectedTargetID;
	void OnReplicated_SelectedTargetID(uint16 beforeChange) { SendSelectedTarget(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingSolutions)
	TSet<FWeaponTargetingSolution> targetingSolutions;
	void OnReplicated_TargetingSolutions(TSet<FWeaponTargetingSolution> beforeChange) { SendTargetingSolutions(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedTargetingSolution)
	int8 selectedTargetingSolution;
	void OnReplicated_SelectedTargetingSolution(int8 beforeChange) { SendSelectedTargetingSolution(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingPuzzle)
	FWeaponPuzzleData targetingPuzzle;
	void OnReplicated_TargetingPuzzle(FWeaponPuzzleData beforeChange) { SendPuzzle(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CurrentlyFacing)
	FWeaponTargetingSolution::ETargetingFace currentlyFacing;
	void OnReplicated_CurrentlyFacing(FWeaponTargetingSolution::ETargetingFace beforeChange) { SendFacing(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetOrientation)
	FRotator targetOrientation;
	void OnReplicated_TargetOrientation(FRotator beforeChange) { SendOrientation(); }

	UFUNCTION(Client, Reliable)
	void SendSelectedTarget()
#ifdef WEB_SERVER_TEST
	{ SendSelectedTarget_Implementation(); }
	void SendSelectedTarget_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendTargetingSolutions()
	{ SendTargetingSolutions_Implementation(); }
#ifdef WEB_SERVER_TEST
	void SendTargetingSolutions_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendSelectedTargetingSolution()
#ifdef WEB_SERVER_TEST
	{ SendSelectedTargetingSolution_Implementation(); }
	void SendSelectedTargetingSolution_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendPuzzle()
#ifdef WEB_SERVER_TEST
	{ SendPuzzle_Implementation(); }
	void SendPuzzle_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendFacing()
#ifdef WEB_SERVER_TEST
	{ SendFacing_Implementation(); }
	void SendFacing_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendOrientation()
#ifdef WEB_SERVER_TEST
	{ SendOrientation_Implementation(); }
	void SendOrientation_Implementation();
#endif
	;


	UFUNCTION(Server, Reliable)
	void SelectTarget(uint16 targetID)
#ifdef WEB_SERVER_TEST
	{ SelectTarget_Implementation(targetID); }
	void SelectTarget_Implementation(uint16 targetID);
#endif
	;

	UFUNCTION(Server, Reliable)
	void SelectTargetingSolution(int8 solutionIndex)
#ifdef WEB_SERVER_TEST
	{ SelectTargetingSolution_Implementation(solutionIndex); }
	void SelectTargetingSolution_Implementation(int8 solutionIndex);
#endif
	;

	UFUNCTION(Server, Reliable)
	void Fire(TArray<FWeaponPuzzleData::EDirection> puzzleSolution)
#ifdef WEB_SERVER_TEST
	{ Fire_Implementation(puzzleSolution); }
	void Fire_Implementation(TArray<FWeaponPuzzleData::EDirection> puzzleSolution);
#endif
	;
};