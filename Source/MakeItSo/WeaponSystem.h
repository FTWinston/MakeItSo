#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WeaponSystem.Generated.h"

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
	TArray<bool> cells;

	UPROPERTY(Replicated)
	uint8 startCell;
};

UCLASS()
class MAKEITSO_API UWeaponSystem : public UShipSystem
{
	enum ETargetingSolution : uint8
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

		MIN_STANDARD_SYSTEM = Engines,
		MAX_STANDARD_SYSTEM = Communications,
		MIN_SYSTEM_VULNERABILITY = EngineVulnerability,
		MAX_SYSTEM_VULNERABILITY = DamageControlVulnerability
	};

	GENERATED_BODY()
public:
	UWeaponSystem();
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Weapons; }

private:
	void DetermineTargetingSolutions();
	void ClearPuzzle();
	uint8 DeterminePuzzleSize();
	void GeneratePuzzle();
	bool IsValidSolution(TArray<FWeaponPuzzleData::EDirection> puzzleSolution);
	UShipSystem::ESystem GetSystemForSolution(ETargetingSolution solution);
	uint8 GetDamageForSolution(ETargetingSolution solution);


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedTargetID)
	uint16 selectedTargetID;
	void OnReplicated_SelectedTargetID(uint16 beforeChange) { SendSelectedTarget(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingSolutions)
	TSet<ETargetingSolution> targetingSolutions;
	void OnReplicated_TargetingSolutions(TSet<ETargetingSolution> beforeChange) { SendTargetingSolutions(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedTargetingSolution)
	ETargetingSolution selectedTargetingSolution;
	void OnReplicated_SelectedTargetingSolution(ETargetingSolution beforeChange) { SendSelectedTargetingSolution(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingPuzzle)
	FWeaponPuzzleData targetingPuzzle;
	void OnReplicated_TargetingPuzzle(FWeaponPuzzleData beforeChange) { SendPuzzle(); }


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


	UFUNCTION(Server, Reliable)
	void SelectTarget(uint16 targetID)
#ifdef WEB_SERVER_TEST
	{ SelectTarget_Implementation(targetID); }
	void SelectTarget_Implementation(uint16 targetID);
#endif
	;

	UFUNCTION(Server, Reliable)
	void SelectTargetingSolution(ETargetingSolution solution)
#ifdef WEB_SERVER_TEST
	{ SelectTargetingSolution_Implementation(solution); }
	void SelectTargetingSolution_Implementation(ETargetingSolution solution);
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