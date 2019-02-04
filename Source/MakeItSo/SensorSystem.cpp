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
#define NUM_TARGET_CELLS (TARGET_GRID_WIDTH * TARGET_GRID_HEIGHT)
#define MAX_INITIAL_REVEAL_FRACTION 0.33f

#define INFO_LEVEL_TARGETING 1
#define INFO_LEVEL_HEALTH 2
#define INFO_LEVEL_POWER 3
#define INFO_LEVEL_VULNERABILITY 4

#define CELLINDEX(x, y) (y * TARGET_GRID_WIDTH + x)

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
	targetCells.assign(NUM_TARGET_CELLS, ESensorSystem::Sensor_None);
	cellDisplay.assign(NUM_TARGET_CELLS, ECellDisplay::Show_Unknown);
	cellGroupSizesRemaining.assign(MAX_CELL_GROUPS, 0);
#endif
}

void USensorSystem::ResetData()
{
	nextTargetID = 0;
	openTargetID = 0;
	EMPTY(sensorTargets);
	EMPTY(revealQueue);
	EMPTY(systemCellsRemaining);
	EMPTY(systemTargetSizes);

	for (auto i = 0; i < MAX_CELL_GROUPS; i++)
		cellGroupSizesRemaining[i] = 0;
	
	for (auto i = 0; i < NUM_TARGET_CELLS; i++)
	{
		targetCells[i] = ESensorSystem::Sensor_None;
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
	crewManager->SendSystemFixed(UShipSystem::ESystem::UseSensorData, "env_clear");

	for (auto item : sensorTargets)
		SendTargetData(PAIRKEY(item), PAIRVALUE(item));

	if (openTargetID != 0)
	{
		SendTargetSelection(openTargetID);
	}

	SendTargetCells();
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

	crewManager->SendSystem(UShipSystem::ESystem::UseSensorData, output);
}

void USensorSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	if (!QUEUE_IS_EMPTY(revealQueue))
	{
#ifndef WEB_SERVER_TEST
		uint16 index = revealQueue.Dequeue();
#else
		uint16 index = revealQueue.front();
		revealQueue.pop();
#endif

		PerformReveal(index);
	}

	for (auto item : sensorTargets)
	{
		auto targetID = PAIRKEY(item);
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

		UpdateTargetData(targetID, targetInfo);
	}
}

void USensorSystem::UpdateTargetData(uint16 targetID, USensorTargetInfo *targetInfo)
{
	auto actor = WEAK_PTR_GET(targetInfo->actor);

	targetInfo->location = actor->GetActorLocation();

	// TODO: update any other properties that might change

	for (auto pair : targetInfo->systemInfoLevels)
	{
		ESensorSystem system = PAIRKEY(pair);
		uint8 infoLevel = PAIRVALUE(pair);

		if (infoLevel >= INFO_LEVEL_POWER)
		{
			// TODO: get actual system power level
			targetInfo->systemPower[system] = 100;

			// TODO: send system power if it has changed (and send it in the first place)
		}
		if (infoLevel >= INFO_LEVEL_HEALTH)
		{
			// TODO: get actual system health
			targetInfo->systemHealth[system] = 100;

			// TODO: send system health if it has changed (and send it in the first place)
		}
	}

	if (ISCLIENT())
	{
		// TODO: only resend this component if it changes
		SendTargetData(targetID, targetInfo);
	}
}

bool USensorSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "sensors_target "))
	{
		uint8 targetID = ExtractInt(msg, sizeof("sensors_target "));
		OpenTarget(targetID);
	}
	else if (STARTS_WITH(msg, "sensors_reveal "))
	{
		auto index = ExtractInt(msg, sizeof("sensors_reveal "));
		RevealCell(index);
	}
	else if (STARTS_WITH(msg, "sensors_system "))
	{
		auto system = (ESensorSystem)ExtractInt(msg, sizeof("sensors_system "));
		RevealSystem(system);
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
	if (targetID == 0 || !MAPCONTAINS(sensorTargets, targetID))
		return;

	openTargetID = targetID;

	auto target = sensorTargets[targetID];
	PopulateCells(target);

	if (ISCLIENT())
		SendTargetSelection(targetID);
}

#ifdef WEB_SERVER_TEST
void USensorSystem::RevealCell(uint16 cellIndex) { RevealCell_Implementation(cellIndex); }
#endif

void USensorSystem::RevealCell_Implementation(uint16 cellIndex)
{
	if (cellIndex >= NUM_TARGET_CELLS)
		return;

#ifndef WEB_SERVER_TEST
	revealQueue.Enqueue(cellIndex);
#else
	revealQueue.push(cellIndex);
#endif
}


#ifdef WEB_SERVER_TEST
void USensorSystem::RevealSystem(ESensorSystem system) { RevealSystem_Implementation(system); }
#endif

void USensorSystem::RevealSystem_Implementation(ESensorSystem system)
{
	if (!MAPCONTAINS(systemCellsRemaining, system) || systemCellsRemaining[system] != 0)
		return;

	if (openTargetID == 0 || !MAPCONTAINS(sensorTargets, openTargetID))
		return;

	auto target = sensorTargets[openTargetID];

	if (!MAPCONTAINS(target->systemInfoLevels, system))
		return;

	uint8 infoLevel = target->systemInfoLevels[system];
	uint8 maxInfoLevel = MAPCONTAINS(target->maxInfoLevels, system)
		? target->maxInfoLevels[system]
		: 255;

	if (infoLevel < maxInfoLevel)
	{
		infoLevel++;
		target->systemInfoLevels[system] = infoLevel;
	}

	switch (target->type)
	{
	case ETargetType::Type_Ship:
	case ETargetType::Type_Station:
		if (infoLevel >= INFO_LEVEL_VULNERABILITY)
		{
			auto vulnerability = GetTargetingSolutionForSystem(system, true);
			if (!HasTargetingSolutionOfType(target, vulnerability.identifier))
				SETADD(target->targetingSolutions, vulnerability);
		}
		break;
	default:
		// TODO: reveal any secret info ... somehow.
		// If no more data to scan for, inform the player and don't let them try. Just have no "grid target" maybe?
		break;
	}

	if (infoLevel >= maxInfoLevel)
	{
		// TODO: inform user that this info level has now maxed out
	}

	UpdateTargetData(openTargetID, target);

	PopulateCells(target);

	SendTargetSelection(openTargetID);
}

void USensorSystem::PerformReveal(uint16 cellIndex)
{
	if (cellDisplay[cellIndex] != ECellDisplay::Show_Unknown)
		return;

	auto system = targetCells[cellIndex];

	ECellDisplay display = system == ESensorSystem::Sensor_None
		? ECellDisplay::Show_Empty
		: ECellDisplay::Show_Hit;

	cellDisplay[cellIndex] = display;

	if (ISCLIENT())
		SendTargetCell(cellIndex, display);

	if (system == ESensorSystem::Sensor_None || !MAPCONTAINS(systemCellsRemaining, system))
		return;

	if (--systemCellsRemaining[system] > 0)
		return;

	// TODO: highlight relevant "hit" cells on the grid?

	SendSelectable(system);
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
	// TODO: system info levels should never start at 0 if you've already scanned a system on the same class of ship

	targetInfo->relationship = ETargetRelationship::Rel_None;
	targetInfo->type = ETargetType::Type_Misc;
	
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Power, INFO_LEVEL_HEALTH, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Helm, 0, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Weapons, 0, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Sensors, INFO_LEVEL_HEALTH, ESensorSystem, uint8);
	MAPADD(targetInfo->systemInfoLevels, ESensorSystem::Sensor_Warp, INFO_LEVEL_POWER, ESensorSystem, uint8);

	MAPADD(targetInfo->maxInfoLevels, ESensorSystem::Sensor_Power, INFO_LEVEL_VULNERABILITY, ESensorSystem, uint8);
	MAPADD(targetInfo->maxInfoLevels, ESensorSystem::Sensor_Helm, INFO_LEVEL_VULNERABILITY, ESensorSystem, uint8);
	MAPADD(targetInfo->maxInfoLevels, ESensorSystem::Sensor_Weapons, INFO_LEVEL_VULNERABILITY, ESensorSystem, uint8);
	MAPADD(targetInfo->maxInfoLevels, ESensorSystem::Sensor_Sensors, INFO_LEVEL_VULNERABILITY, ESensorSystem, uint8);
	MAPADD(targetInfo->maxInfoLevels, ESensorSystem::Sensor_Warp, INFO_LEVEL_VULNERABILITY, ESensorSystem, uint8);


	SETADD(targetInfo->targetingSolutions, GetTargetingSolutionForSystem(ESensorSystem::Sensor_None, false));

	// set up health data, power data, and weapon targeting solutions based on the curent info levels
	for (auto iSystem = ESensorSystem::Sensor_None + 1; iSystem <= NUM_SENSOR_SYSTEMS; iSystem++)
	{
		ESensorSystem system = (ESensorSystem)iSystem;

		if (!MAPCONTAINS(targetInfo->systemInfoLevels, system))
			continue;

		auto infoLevel = targetInfo->systemInfoLevels[system];

		if (infoLevel >= INFO_LEVEL_HEALTH)
			MAPADD(targetInfo->systemHealth, system, 100, ESensorSystem, uint8); // TODO: get actual health value

		if (infoLevel >= INFO_LEVEL_POWER)
			MAPADD(targetInfo->systemPower, system, 100, ESensorSystem, uint8); // TODO: get actual power value

		if (infoLevel >= INFO_LEVEL_TARGETING)
			SETADD(targetInfo->targetingSolutions, GetTargetingSolutionForSystem(system, false));
		
		if (infoLevel >= INFO_LEVEL_VULNERABILITY)
			SETADD(targetInfo->targetingSolutions, GetTargetingSolutionForSystem(system, true));
	}

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

USensorTargetInfo *USensorSystem::GetTarget(uint16 targetID)
{
	if (targetID == 0 || !MAPCONTAINS(sensorTargets, targetID))
		return nullptr;

	return sensorTargets[targetID];
}

void USensorSystem::PopulateCells(USensorTargetInfo *target)
{
	EMPTY(revealQueue);
	CLEAR(systemCellsRemaining);
	CLEAR(systemTargetSizes);

	for (auto i = 0; i < NUM_TARGET_CELLS; i++)
	{
		targetCells[i] = ESensorSystem::Sensor_None;
		cellDisplay[i] = ECellDisplay::Show_Unknown;
	}

	// place "targets" according to the info level of their system
	// ... could be interesting to vary "default" system sizes between ship types, to add variety
	for (auto pair : target->systemInfoLevels)
	{
		ESensorSystem system = PAIRKEY(pair);
		uint8 level = PAIRVALUE(pair);

		uint8 maxInfoLevel = MAPCONTAINS(target->maxInfoLevels, system)
			? target->maxInfoLevels[system]
			: 255;

		if (level >= maxInfoLevel)
			continue;

		uint8 size = level >= 4
			? 2
			: 6 - level;
		
		size = PlaceTarget(size, system);
		systemCellsRemaining[system] = size;
		systemTargetSizes[system] = size;
	}


	// reveal empty cells dependent upon damage
	uint16 numRevealedCells = (uint16)(GetHealthLevel() * MAX_INITIAL_REVEAL_FRACTION / 100.f * NUM_TARGET_CELLS);
	for (auto i = 0; i < numRevealedCells; i++)
	{
		auto cellIndex = PickEmptyCell();
		cellDisplay[cellIndex] = ECellDisplay::Show_Empty;
	}

	if (ISCLIENT())
		SendTargetCells();
}

#define MAX_PLACEMENT_TRIES 100
uint8 USensorSystem::PlaceTarget(uint8 targetSize, ESensorSystem system)
{
	// don't try forever no matter what, in case we cock up somehow
	while (true)
	{
		for (int32 i = MAX_PLACEMENT_TRIES; i > 0; i--)
			if (TryPlaceTarget(targetSize, system))
				return targetSize;

		targetSize--;
	}
}

bool USensorSystem::TryPlaceTarget(uint8 targetSize, ESensorSystem system)
{
	uint8 stepX, stepY;
	uint8 startX, startY;

	switch (FMath::RandRange(0, 1))
	{
	case 0:
		stepX = 1;
		stepY = 0;

		startX = FMath::RandRange(0, TARGET_GRID_WIDTH - 1 - targetSize);
		startY = FMath::RandRange(0, TARGET_GRID_HEIGHT - 1);
		break;
	case 1:
		stepX = 0;
		stepY = 1;

		startX = FMath::RandRange(0, TARGET_GRID_WIDTH - 1);
		startY = FMath::RandRange(0, TARGET_GRID_HEIGHT - 1 - targetSize);
		break;
	}

	auto currentX = startX;
	auto currentY = startY;

	for (uint8 i = 0; i < targetSize; i++)
	{
		if (targetCells[CELLINDEX(currentX, currentY)] != ESensorSystem::Sensor_None)
			return false;

		currentX += stepX;
		currentY += stepY;
	}

	currentX = startX;
	currentY = startY;

	for (uint8 i = 0; i < targetSize; i++)
	{
		targetCells[CELLINDEX(currentX, currentY)] = system;

		currentX += stepX;
		currentY += stepY;
	}

	return true;
}

int32 USensorSystem::PickEmptyCell()
{
	int32 cellIndex;

	do
	{
		cellIndex = FMath::RandRange(0, NUM_TARGET_CELLS - 1);
	} while (targetCells[cellIndex]);

	return cellIndex;
}

FWeaponTargetingSolution USensorSystem::GetTargetingSolutionForSystem(ESensorSystem system, bool isVulnerability)
{
	switch (system)
	{
		case Sensor_Power:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::PowerVulnerability, 7, FWeaponTargetingSolution::Top)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::PowerManagement, 4, FWeaponTargetingSolution::Top);
		case Sensor_Helm:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::EngineVulnerability, 7, FWeaponTargetingSolution::Right)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Engines, 4, FWeaponTargetingSolution::Right);
		case Sensor_Warp:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::WarpVulnerability, 7, FWeaponTargetingSolution::Bottom)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Warp, 4, FWeaponTargetingSolution::Bottom);
		case Sensor_Weapons:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::WeaponVulnerability, 7, FWeaponTargetingSolution::Rear)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Weapons, 4, FWeaponTargetingSolution::Rear);
		case Sensor_Sensors:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::SensorVulnerability, 7, FWeaponTargetingSolution::Left)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Sensors, 4, FWeaponTargetingSolution::Left);
		/*
		case Sensor_Shields:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::ShieldVulnerability, 7, FWeaponTargetingSolution::Right)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Shields, 4, FWeaponTargetingSolution::Right);
		*/
		case Sensor_DamageControl:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::DamageControlVulnerability, 7, FWeaponTargetingSolution::Right)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::DamageControl, 4, FWeaponTargetingSolution::Right);
		case Sensor_Comms:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::CommunicationVulnerability, 7, FWeaponTargetingSolution::Right)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Communications, 4, FWeaponTargetingSolution::Right);
		case Sensor_None:
		default:
			return isVulnerability
				? FWeaponTargetingSolution(FWeaponTargetingSolution::MiscVulnerability, 4, FWeaponTargetingSolution::NoFace)
				: FWeaponTargetingSolution(FWeaponTargetingSolution::Misc, 3, FWeaponTargetingSolution::NoFace);
	}
}

bool USensorSystem::HasTargetingSolutionOfType(USensorTargetInfo *target, FWeaponTargetingSolution::ETargetingSolutionIdentifier identifier)
{
	for (auto solution : target->targetingSolutions)
		if (solution.identifier == identifier)
			return true;

	return false;
}

void USensorSystem::OnReplicated_SensorTargets(TArray<USensorTargetInfo*> beforeChange)
{

}

void USensorSystem::OnReplicated_OpenTargetID(uint16 beforeChange)
{
	SendTargetSelection(openTargetID);
}

void USensorSystem::OnReplicated_CellDisplay(TArray<USensorSystem::ECellDisplay> beforeChange)
{
	// TODO: only send changed cell, if only one changes ... !
	SendTargetCells();
}


#ifdef WEB_SERVER_TEST
void USensorSystem::SendTargetSelection(uint8 targetID) { SendTargetSelection_Implementation(targetID); }
#endif
void USensorSystem::SendTargetSelection_Implementation(uint8 targetID)
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

				uint8 targetSize = MAPCONTAINS(systemTargetSizes, system)
					? systemTargetSizes[system]
					: 0;

				output += TEXT(" ");
				APPENDINT(output, (uint8)system);
				output += TEXT(" ");
				APPENDINT(output, infoLevel);
				output += TEXT(" ");
				APPENDINT(output, targetSize);
			}
	}

	SendSystem(output);
}


#ifdef WEB_SERVER_TEST
void USensorSystem::SendSelectable(ESensorSystem system) { SendSelectable_Implementation(system); }
#endif
void USensorSystem::SendSelectable_Implementation(ESensorSystem system)
{
	FString output = TEXT("sensor_selectable ");
	APPENDINT(output, (uint8)system);
	SendSystem(output);
}


void USensorSystem::SendTargetCells()
{
	FString output = TEXT("sensor_cells ");

	for (ECellDisplay cell : cellDisplay)
		APPENDINT(output, (uint8)cell);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void USensorSystem::SendTargetCell(uint16 cellIndex, ECellDisplay display) { SendTargetCell_Implementation(cellIndex, display); }
#endif
void USensorSystem::SendTargetCell_Implementation(uint16 cellIndex, ECellDisplay display)
{
	FString output = TEXT("sensor_cell ");
	APPENDINT(output, cellIndex);
	output += TEXT(" ");
	APPENDINT(output, (uint8)display);
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


