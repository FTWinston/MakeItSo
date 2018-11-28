#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "CrewManager.h"
#include "SensorSystem.Generated.h"

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

	enum ECellContent : uint8 {
		Cell_Empty,
		Cell_Group1,
		Cell_Group2,
		Cell_Group3,
		Cell_Group4,
		Cell_Group5,
		Cell_Group6,
		Cell_Group7,
		Cell_Group8,
		Cell_Group9,
	};

	enum ECellDisplay : uint8 {
		Show_Unknown = 0,
		Show_Empty,
		Show_Hit,
		Show_Group1,
		Show_Group2,
		Show_Group3,
		Show_Group4,
		Show_Group5,
		Show_Group6,
		Show_Group7,
		Show_Group8,
		Show_Group9,
	};

	USensorSystem();
	virtual void ResetData() override;
	virtual void SendAllData_Implementation() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	void AddTarget(AActor *target);
	void RemoveTarget(AActor *target);

#ifndef WEB_SERVER_TEST
	void GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const;
	virtual bool ReplicateSubobjects(UActorChannel * Channel, FOutBunch * Bunch, FReplicationFlags * RepFlags) override;
#endif

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Sensors; }
private:
	void SendTargetData(uint8 id, USensorTargetInfo *target);


	// Replicated properties
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SensorTargets)
	TMap<uint16, USensorTargetInfo*> sensorTargets;
	void OnReplicated_SensorTargets(TArray<USensorTargetInfo*> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SensorTargets)
	USensorTargetInfo *openTarget;
	void OnReplicated_OpenTarget(USensorTargetInfo* beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_OpenSystem)
	USensorSystem::ESensorSystem openSystem;
	void OnReplicated_OpenSystem(USensorSystem::ESensorSystem beforeChange);


	TArray<ECellContent> targetCells;

	TArray<uint8> cellGroupSizesRemaining;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CellDisplay)
	TArray<ECellDisplay> cellDisplay;
	void OnReplicated_CellDisplay(TArray<ECellDisplay> beforeChange);


	uint16 nextTargetID;
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

	// The actor in question may not be visible in the scene, so the client doesn't use it directly.
	WEAK_PTR_DECLARE(AActor) actor;

	// color?
	// velocity?
	// radius?
};