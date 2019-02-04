#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WeaponSystem.Generated.h"

class USensorTargetInfo;

USTRUCT()
struct FWeaponTargetingSolution {

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
	
	FWeaponTargetingSolution(ETargetingSolutionIdentifier identifier, uint8 sequenceLength, ETargetingFace bestFace)
	{
		this->identifier = identifier;
		this->baseSequenceLength = sequenceLength;
		this->bestFacing = bestFace;
	}

	UPROPERTY(Replicated)
	ETargetingSolutionIdentifier identifier;

	UPROPERTY(Replicated)
	uint8 baseSequenceLength;

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
	void AllocateTargetingElements();
	void DetermineTargetingSolutions();
	void AllocateSequence(FWeaponTargetingSolution &solution);
	uint8 DetermineDifficulty(uint8 baseDifficulty, FWeaponTargetingSolution::ETargetingFace bestFacing);
	UShipSystem::ESystem GetSystemForSolution(FWeaponTargetingSolution::ETargetingSolutionIdentifier solutionType);
	uint8 GetDamageForSolution(FWeaponTargetingSolution::ETargetingSolutionIdentifier solutionType);
	void RemoveTargetingSolution(FWeaponTargetingSolution::ETargetingSolutionIdentifier solutionType);
	USensorTargetInfo *GetSelectedTarget();


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedTargetID)
	uint16 selectedTargetID;
	void OnReplicated_SelectedTargetID(uint16 beforeChange) { SendSelectedTarget(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingElements)
	TArray<uint8> targetingElements;
	void OnReplicated_TargetingElements(uint8 beforeChange) { SendTargetingElements(); }

	UPROPERTY()
	TArray<uint8> targetingElementInput;


	
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingSolutions)
	TSet<FWeaponTargetingSolution> targetingSolutions;
	void OnReplicated_TargetingSolutions(TSet<FWeaponTargetingSolution> beforeChange) { SendTargetingSolutions(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_TargetingSequences)
	TMap<uint8, TArray<uint8>> targetingSequences;
	void OnReplicated_TargetingSequences(TMap<uint8, TArray<FWeaponTargetingSolution>> beforeChange) { SendTargetingSolutions(); } // TODO: calling this from both places sucks

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
	void SendTargetingElements()
#ifdef WEB_SERVER_TEST
	{ SendTargetingElements_Implementation(); }
	void SendTargetingElements_Implementation();
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
	void SendFire(bool success)
#ifdef WEB_SERVER_TEST
	{ SendFire_Implementation(success); }
	void SendFire_Implementation(bool success);
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
	void InputValue(uint8 elementIndex)
#ifdef WEB_SERVER_TEST
	{ InputValue_Implementation(elementIndex); }
	void InputValue_Implementation(uint8 elementIndex);
#endif
	;
};