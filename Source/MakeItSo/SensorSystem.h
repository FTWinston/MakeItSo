#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "CrewManager.h"
#include "SensorSystem.Generated.h"
#include "WeaponSystem.h"

class USensorTargetInfo;

UCLASS()
class MAKEITSO_API USensorSystem : public UShipSystem
{
	GENERATED_BODY()
public:
	enum ESensorSystem : uint8 {
		Sensor_None = 0,
		Sensor_Power,
		Sensor_Helm,
		Sensor_Warp,
		Sensor_Weapons,
		Sensor_Sensors,
		Sensor_Shields,
		Sensor_DamageControl,
		Sensor_Comms,
		
		NUM_SENSOR_SYSTEMS = Sensor_Comms
	};

	enum ETargetType : uint8 {
		Type_Star = 0,
		Type_Planet,
		Type_Station,
		Type_Ship,
		Type_Misc,
	};

	enum ETargetRelationship : uint8 {
		Rel_None = 0,
		Rel_Friendly,
		Rel_Hostile,
		Rel_Neutral,
	};

	enum ECellDisplay : uint8 {
		Show_Unknown = 0,
		Show_Empty,
		Show_Hit,
	};

	USensorSystem();
	virtual void ResetData() override;
	virtual void SendAllData_Implementation() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	void AddTarget(AActor *target);
	void RemoveTarget(AActor *target);
	USensorTargetInfo* GetTarget(uint16 targetID);

#ifndef WEB_SERVER_TEST
	void GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const;
	virtual bool ReplicateSubobjects(UActorChannel * Channel, FOutBunch * Bunch, FReplicationFlags * RepFlags) override;
#endif

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Sensors; }
private:
	void UpdateTargetData(uint16 targetID, USensorTargetInfo *targetInfo);
	void SendTargetData(uint8 id, USensorTargetInfo *target);
	void PopulateCells(USensorTargetInfo *target);
	uint8 PlaceTarget(uint8 targetSize, ESensorSystem system);
	bool TryPlaceTarget(uint8 targetSize, ESensorSystem system);
	int32 PickEmptyCell();
	ETargetingSolutionIdentifier GetSolutionIdentifierForSystem(ESensorSystem system, bool isVulnerability);

	// Replicated properties
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SensorTargets)
	TMap<uint16, USensorTargetInfo*> sensorTargets;
	void OnReplicated_SensorTargets(TArray<USensorTargetInfo*> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_OpenTargetID)
	uint16 openTargetID;
	void OnReplicated_OpenTargetID(uint16 beforeChange);

	UPROPERTY()
	TArray<ESensorSystem> targetCells;

	UPROPERTY()
	TMap<ESensorSystem, uint8> systemCellsRemaining;

	UPROPERTY(Replicated)
	TMap<ESensorSystem, uint8> systemTargetSizes;

	TArray<uint8> cellGroupSizesRemaining;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CellDisplay)
	TArray<ECellDisplay> cellDisplay;
	void OnReplicated_CellDisplay(TArray<ECellDisplay> beforeChange);

	UPROPERTY()
	uint16 nextTargetID;

	UPROPERTY()
	TQueue<uint16> revealQueue;


	// Client functions, that can be called from the server
	UFUNCTION(Client, Reliable)
	void SendTargetSelection(uint8 targetID);
#ifdef WEB_SERVER_TEST
	void SendTargetSelection_Implementation(uint8 targetID);
#endif

	UFUNCTION(Client, Reliable)
	void SendSelectable(ESensorSystem system);
#ifdef WEB_SERVER_TEST
	void SendSelectable_Implementation(ESensorSystem system);
#endif


	void SendTargetCells();

	UFUNCTION(Client, Reliable)
	void SendTargetCell(uint16 cellIndex, ECellDisplay display);
#ifdef WEB_SERVER_TEST
	void SendTargetCell_Implementation(uint16 cellIndex, ECellDisplay display);
#endif

	// Server functions, that can be called from the client
	UFUNCTION(Server, Reliable)
	void OpenTarget(uint8 targetID);
#ifdef WEB_SERVER_TEST
	void OpenTarget_Implementation(uint8 targetID);
#endif

	UFUNCTION(Server, Reliable)
	void RevealCell(uint16 cellIndex);
#ifdef WEB_SERVER_TEST
	void RevealCell_Implementation(uint16 cellIndex);
#endif

	UFUNCTION(Server, Reliable)
	void RevealSystem(ESensorSystem system);
#ifdef WEB_SERVER_TEST
	void RevealSystem_Implementation(ESensorSystem system);
#endif

	void PerformReveal(uint16 cellIndex);
};

UCLASS()
class MAKEITSO_API USensorTargetInfo : public UObject
{
public:
#ifndef WEB_SERVER_TEST
	virtual void IsSupportedForNetworking() override { return true; }
	void GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const;
#endif

	UPROPERTY(Replicated)
	USensorSystem::ETargetType type;

	UPROPERTY(Replicated)
	USensorSystem::ETargetRelationship relationship;

	UPROPERTY(Replicated)
	FVector location;

	UPROPERTY(Replicated)
	TMap<USensorSystem::ESensorSystem, uint8> systemInfoLevels;

	UPROPERTY()
	TMap<USensorSystem::ESensorSystem, uint8> maxInfoLevels;

	UPROPERTY(Replicated) // TODO: replicatedUsing?
	TMap<USensorSystem::ESensorSystem, uint8> systemHealth;

	UPROPERTY(Replicated) // TODO: replicatedUsing?
	TMap<USensorSystem::ESensorSystem, uint8> systemPower;

	UPROPERTY(Replicated) // TODO: replicatedUsing?
	TSet<ETargetingSolutionIdentifier> targetingSolutions;

	// The actor in question may not be visible in the scene, so the client doesn't use it directly.
	WEAK_PTR_DECLARE(AActor) actor;

	// color?
	// velocity?
	// radius?
};