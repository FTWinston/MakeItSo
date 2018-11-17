#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "SensorSystem.Generated.h"

class USensorTargetInfo;

UCLASS()
class MAKEITSO_API USensorSystem : public UShipSystem
{
	GENERATED_BODY()
public:
	enum ESensorSystem {
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

	enum ETargetType {
		Type_Star = 0,
		Type_Planet,
		Type_Station,
		Type_Ship,
		Type_Misc,
	};

	enum ETargetRelationship {
		Rel_None = 0,
		Rel_Friendly,
		Rel_Hostile,
		Rel_Neutral,
	};

	virtual void SendAllData_Implementation() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	void AddTarget(USensorTargetInfo *target);
	void RemoveTarget(USensorTargetInfo *target);

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Sensors; }
private:
	// Replicated properties
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SensorTargets)
	TArray<USensorTargetInfo*> sensorTargets;
	void OnReplicated_SensorTargets(TArray<USensorTargetInfo*> beforeChange) {}

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SensorTargets)
	USensorTargetInfo *openTarget;
	void OnReplicated_OpenTarget(USensorTargetInfo* beforeChange) {}

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_OpenSystem)
	USensorSystem::ESensorSystem openSystem;
	void OnReplicated_OpenSystem(USensorSystem::ESensorSystem beforeChange) {}

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SensorCards)
	TArray<int8> sensorCards;
	void OnReplicated_SensorCards(TArray<int8> beforeChange) {}
};

class MAKEITSO_API USensorTargetInfo : public UObject
{
public:
	UPROPERTY(Replicated)
	uint16 id;

	UPROPERTY(Replicated)
	USensorSystem::ETargetType type;

	UPROPERTY(Replicated)
	USensorSystem::ETargetRelationship relationship;

	UPROPERTY(Replicated)
	FVector location;

	// color?
	// velocity?
	// radius?

	UPROPERTY(Replicated)
	TArray<USensorSystem::ESensorSystem> systems;
	
	UPROPERTY(Replicated)
	TArray<uint8> infoLevels;
};