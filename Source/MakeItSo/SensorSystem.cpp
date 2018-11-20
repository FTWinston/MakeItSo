#ifndef WEB_SERVER_TEST
#include "SensorSystem.h"
#else
#include "stdafx.h"
#include "SensorSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"


USensorSystem::USensorSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 1.0f;
	PrimaryComponentTick.SetTickFunctionEnable(true);
}

void USensorSystem::ResetData()
{
	nextTargetID = 0;
}

void USensorSystem::SendAllData_Implementation()
{
	// TODO: get sensor data from game objects
	SendAllFixed("sensor_target 1 200 100 50 * #ffd 25 45"); // star
	SendAllFixed("sensor_target 2 200 150 50 o #69c 5"); // planets
	SendAllFixed("sensor_target 3 100 100 20 o #c69 8");
	SendAllFixed("sensor_target 4 250 75 -30 o #9c6 6");
	SendAllFixed("sensor_target 5 110 104 15 + 2"); // station
	SendAllFixed("sensor_target 6 106 108 15 v 3 5 -1 3"); // ships
	SendAllFixed("sensor_target 7 220 65 -15 v 1 2 2 3");
}

void USensorSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	for (auto item : sensorTargets)
	{
		auto targetInfo = PAIRVALUE(item);

		if (!WEAK_PTR_VALID(targetInfo->actor))
		{
			MAPREMOVE(sensorTargets, PAIRKEY(item));
			continue;
		}

		auto actor = WEAK_PTR_GET(targetInfo->actor);

		targetInfo->location = actor->GetActorLocation();

		// TODO: update any other properities
	}
}

bool USensorSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	return false;
}

void USensorSystem::AddTarget(AActor *target)
{
	// get a unique ID ... uint16 wraps so this is safe as long as every ID isn't in use...
	while (MAPCONTAINS(sensorTargets, ++nextTargetID))
		;

	USensorTargetInfo *targetInfo = NEW_OBJECT(USensorTargetInfo, this);

	targetInfo->actor = target;
	targetInfo->location = target->GetActorLocation();
	targetInfo->relationship = ETargetRelationship::Rel_None;
	targetInfo->type = ETargetType::Type_Misc;
	
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Power, 1, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Helm, 0, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Weapons, 0, ESensorSystem, uint8);

	MAPADD(sensorTargets, nextTargetID, targetInfo, uint16, USensorTargetInfo*);
}

void USensorSystem::RemoveTarget(AActor *target)
{
	// TODO: could store a separate map using actor as the key, with ID as the value
	for (auto item : sensorTargets)
	{
		auto targetInfo = PAIRVALUE(item);

		if (!WEAK_PTR_VALID(targetInfo->actor))
			continue;

		auto actor = WEAK_PTR_GET(targetInfo->actor);
		if (actor == target)
		{
			MAPREMOVE(sensorTargets, PAIRKEY(item));
			break;
		}
	}
}


void USensorSystem::OnReplicated_SensorTargets(TArray<USensorTargetInfo*> beforeChange)
{

}

void USensorSystem::OnReplicated_OpenTarget(USensorTargetInfo* beforeChange)
{

}

void USensorSystem::OnReplicated_OpenSystem(USensorSystem::ESensorSystem beforeChange)
{

}

void USensorSystem::OnReplicated_SensorCards(TArray<int8> beforeChange)
{

}


#ifndef WEB_SERVER_TEST
void USensorSystem::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(USensorSystem, sensorTargets);
	DOREPLIFETIME(USensorSystem, openTarget);
	DOREPLIFETIME(USensorSystem, openSystem);
	DOREPLIFETIME(USensorSystem, sensorCards);
}

bool USensorSystem::ReplicateSubobjects(UActorChannel *Channel, FOutBunch *Bunch, FReplicationFlags *RepFlags)
{
	bool wroteSomething = Super::ReplicateSubobjects(Channel, Bunch, RepFlags);

	auto limit = SIZENUM(sensorTargets);
	for (int32 i = 0; i < limit; i++)
		wroteSomething |= Channel->ReplicateSubobject(sensorTargets[i], Bunch, RepFlags);

	return wroteSomething;
}

void USensorTargetInfo::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(USensorSystem, id);
	DOREPLIFETIME(USensorSystem, type);
	DOREPLIFETIME(USensorSystem, relationship);
	DOREPLIFETIME(USensorSystem, location);
	DOREPLIFETIME(USensorSystem, systems);
	DOREPLIFETIME(USensorSystem, infoLevels);
}
#endif


