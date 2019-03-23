#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WeaponSystem.Generated.h"

class USensorTargetInfo;

enum ETargetingSolutionIdentifier : uint8
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

USTRUCT()
struct FWeaponTargetingSolution
{
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
	
	FWeaponTargetingSolution(uint8 baseDifficulty, ETargetingFace bestFace)
	{
		this->baseDifficulty = baseDifficulty;
		this->bestFacing = bestFace;
	}

	UPROPERTY(Replicated)
	ETargetingFace bestFacing;

	UPROPERTY(Replicated)
	uint8 baseDifficulty;

	UPROPERTY(Replicated)
	TArray<TArray<uint8>> polygons;
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
	void AddTargetingSolution(ETargetingSolutionIdentifier identifier);
	void CreatePolygons(FWeaponTargetingSolution &solution);
	float BisectPolygon(TArray<uint8> points);
	UShipSystem::ESystem GetSystemForSolution(ETargetingSolutionIdentifier solution);
	uint8 GetDamageForSolution(ETargetingSolutionIdentifier solution, float firstHalfPercentage);
	void RemoveTargetingSolution(ETargetingSolutionIdentifier solution);
	USensorTargetInfo *GetSelectedTarget();
	
	FWeaponTargetingSolution::ETargetingFace GetSolutionBestFace(ETargetingSolutionIdentifier solution);
	int8 GetSolutionDifficulty(ETargetingSolutionIdentifier solution);


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedTargetID)
	uint16 selectedTargetID;
	void OnReplicated_SelectedTargetID(uint16 beforeChange) { SendSelectedTarget(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingSolutions)
	TMap<ETargetingSolutionIdentifier, FWeaponTargetingSolution> targetingSolutions;
	void OnReplicated_TargetingSolutions(TMap<uint8, FWeaponTargetingSolution> beforeChange) { SendTargetingSolutions(); }

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

	UFUNCTION(Client, Reliable)
	void SendFire(ETargetingSolutionIdentifier solution)
#ifdef WEB_SERVER_TEST
	{ SendFire_Implementation(solution); }
	void SendFire_Implementation(ETargetingSolutionIdentifier solution);
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
	void FireSolution(ETargetingSolutionIdentifier solution, uint8 x1, uint8 y1, uint8 x2, uint8 y2)
#ifdef WEB_SERVER_TEST
	{ FireSolution_Implementation(solution, x1, y1, x2, y2); }
	void FireSolution_Implementation(ETargetingSolutionIdentifier solution, uint8 x1, uint8 y1, uint8 x2, uint8 y2);
#endif
	;
};