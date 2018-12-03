#ifndef WEB_SERVER_TEST
#include "SensorSystem.h"
#else
#include "stdafx.h"
#include "SensorSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

#define MAX_CELL_GROUPS 9
#define TARGET_GRID_WIDTH 8
#define TARGET_GRID_HEIGHT 8
#define NUM_TARGET_CELLS TARGET_GRID_WIDTH * TARGET_GRID_HEIGHT


USensorSystem::USensorSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 1.0f;
	PrimaryComponentTick.SetTickFunctionEnable(true);

#ifndef WEB_SERVER_TEST
	targetCells.AddZeroed(NUM_TARGET_CELLS);
	cellDisplay.AddZeroed(NUM_TARGET_CELLS);
	cellGroupSizesRemaining.AddZeroed(MAX_CELL_GROUPS);
#else
	targetCells.assign(NUM_TARGET_CELLS, ECellContent::Cell_Empty);
	cellDisplay.assign(NUM_TARGET_CELLS, ECellDisplay::Show_Unknown);
	cellGroupSizesRemaining.assign(MAX_CELL_GROUPS, 0);
#endif
}

void USensorSystem::ResetData()
{
	nextTargetID = 0;
	openSystem = ESensorSystem::Sensor_None;
	openTargetID = 0;
	EMPTY(sensorTargets);

	for (auto i = 0; i < MAX_CELL_GROUPS; i++)
		cellGroupSizesRemaining[i] = 0;
	
	for (auto i = 0; i < NUM_TARGET_CELLS; i++)
	{
		targetCells[i] = ECellContent::Cell_Empty;
		cellDisplay[i] = ECellDisplay::Show_Unknown;
	}

#ifdef WEB_SERVER_TEST
	auto actor = new AActor();
	actor->SetActorLocation(FVector(200, 100, 50));
	// set type star
	// set color #ffd
	// set radius 25
	// set damage radius 45
	AddTarget(actor);

	actor = new AActor();
	actor->SetActorLocation(FVector(200, 150, 50));
	// set type planet
	// set color #69c
	// set radius 5
	AddTarget(actor);

	actor = new AActor();
	actor->SetActorLocation(FVector(100, 100, 20));
	// set type planet
	// set color #c69
	// set radius 8
	AddTarget(actor);

	actor = new AActor();
	actor->SetActorLocation(FVector(250, 75, -30));
	// set type planet
	// set color #9c6
	// set radius 6
	AddTarget(actor);

	actor = new AActor();
	actor->SetActorLocation(FVector(110, 104, 15));
	// set type station
	// set relationship friendly
	AddTarget(actor);

	actor = new AActor();
	actor->SetActorLocation(FVector(106, 108, 15));
	// set type ship
	// set relationship neutral
	// set velocity 5 -1 3
	AddTarget(actor);

	actor = new AActor();
	actor->SetActorLocation(FVector(220, 65, -15));
	// set type ship
	// set relationship hostile
	// set velocity 2 2 3
	AddTarget(actor);
#endif
}

void USensorSystem::SendAllData_Implementation()
{
	SendSystemFixed("env_clear");

	for (auto item : sensorTargets)
		SendTargetData(PAIRKEY(item), PAIRVALUE(item));
}

void USensorSystem::SendTargetData(uint8 id, USensorTargetInfo *target)
{
	FString output = TEXT("env_target ");
	APPENDINT(output, id);
	output += TEXT(" ");

	APPENDINT(output, target->location.X);
	output += TEXT(" ");
	APPENDINT(output, target->location.Y);
	output += TEXT(" ");
	APPENDINT(output, target->location.Z);

	switch (target->type)
	{
	case ETargetType::Type_Star:
		output += TEXT(" * ");
		output += TEXT("#ffd"); // TODO: actual star color
		output += TEXT(" 25"); // TODO: actual star radius
		output += TEXT(" 45"); // TODO: actual star damage radius
		break;
	case ETargetType::Type_Planet:
		output += TEXT(" o ");
		output += TEXT("#69c"); // TODO: actual planet color
		output += TEXT(" 6"); // TODO: actual planet radius
		break;
	case ETargetType::Type_Station:
		output += TEXT(" + ");
		APPENDINT(output, target->relationship);
		break;
	case ETargetType::Type_Ship:
		output += TEXT(" v ");
		APPENDINT(output, target->relationship);
		output += TEXT(" 3 2 1"); // TODO: append actual velocity
		break;
	case ETargetType::Type_Misc:
		output += TEXT(" ?");
		break;
	}

	SendSystem(output);
}

void USensorSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	for (auto item : sensorTargets)
	{
		auto targetInfo = PAIRVALUE(item);

		if (!WEAK_PTR_VALID(targetInfo->actor))
		{
			// remove this target
			auto id = PAIRKEY(item);
			MAPREMOVE(sensorTargets, id);

			if (ISCLIENT())
			{
				// send removal of this target
				FString output = TEXT("env_rem ");
				APPENDINT(output, id);
				SendSystem(output);
			}
			continue;
		}

		auto actor = WEAK_PTR_GET(targetInfo->actor);

		targetInfo->location = actor->GetActorLocation();

		// TODO: update any other properties that might change

		if (ISCLIENT())
		{
			// TODO: only resend this component if it changes
			SendTargetData(PAIRKEY(item), targetInfo);
		}
	}
}

bool USensorSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "sensors_target "))
	{
		int8 targetID = ExtractInt(msg, sizeof("sensors_target "));
		OpenTarget(targetID);
	}
	else
		return false;

	return true;
}

#ifdef WEB_SERVER_TEST
void USensorSystem::OpenTarget(uint8 targetID) { OpenTarget_Implementation(targetID); }
#endif

void USensorSystem::OpenTarget_Implementation(uint8 targetID)
{
	if (targetID != 0 && !MAPCONTAINS(sensorTargets, targetID))
		return;

	openTargetID = targetID;

	if (ISCLIENT())
		SendTargetSelection(targetID);
}

void USensorSystem::AddTarget(AActor *target)
{
	// get a unique ID ... uint16 wraps so this is safe as long as every ID isn't in use...
	while (MAPCONTAINS(sensorTargets, ++nextTargetID))
		;

	USensorTargetInfo *targetInfo = NEW_OBJECT(USensorTargetInfo, this);

	targetInfo->actor = target;
	targetInfo->location = target->GetActorLocation();

	// TODO: get sensor data from actor ... perhaps have a "sensor data" component on it?
	targetInfo->relationship = ETargetRelationship::Rel_None;
	targetInfo->type = ETargetType::Type_Misc;
	
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Power, 1, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Helm, 0, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Weapons, 0, ESensorSystem, uint8);

	MAPADD(sensorTargets, nextTargetID, targetInfo, uint16, USensorTargetInfo*);
}

void USensorSystem::RemoveTarget(AActor *target)
{
	// TODO: could store a separate map using some "unique id" property of the actor as the key, with ID as the value ... but if we have an ID, just use that!
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

void USensorSystem::OnReplicated_OpenTargetID(uint16 beforeChange)
{
	SendTargetSelection(openTargetID);
}

void USensorSystem::OnReplicated_OpenSystem(USensorSystem::ESensorSystem beforeChange)
{

}

void USensorSystem::OnReplicated_CellDisplay(TArray<USensorSystem::ECellDisplay> beforeChange)
{

}


void USensorSystem::SendTargetSelection(uint8 targetID)
{
	FString output = TEXT("sensor_target ");
	APPENDINT(output, targetID);

	if (targetID != 0)
	{
		auto target = sensorTargets[targetID];

		if (target != nullptr)
			for (auto item : target->systemInfoLevels)
			{
				ESensorSystem system = PAIRKEY(item);
				uint8 infoLevel = PAIRVALUE(item);

				output += TEXT(" ");
				APPENDINT(output, (uint8)system);
				output += TEXT(" ");
				APPENDINT(output, infoLevel);
			}
	}

	SendSystem(output);
}


#ifndef WEB_SERVER_TEST
void USensorSystem::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(USensorSystem, sensorTargets);
	DOREPLIFETIME(USensorSystem, openTarget);
	DOREPLIFETIME(USensorSystem, openSystem);
	DOREPLIFETIME(USensorSystem, targetCells);
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


