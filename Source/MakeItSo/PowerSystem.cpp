#ifndef WEB_SERVER_TEST
#include "PowerSystem.h"
#else
#include "stdafx.h"
#include "PowerSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"


UPowerSystem::UPowerSystem()
{
#ifndef WEB_SERVER_TEST
	cells.Add(POWER_GRID_SIZE);
	cellTypes.AddUninitialized(POWER_GRID_SIZE);
	cellPower.AddZeroed(POWER_GRID_SIZE);
	systemsOnline.AddZeroed(MAX_POWER_SYSTEMS);
#endif
}

#define CELLINDEX(x, y) (x + POWER_GRID_WIDTH * y)
#define CLIENT_TO_SERVER_ID(cellID) (cellID + POWER_GRID_WIDTH)
#define SERVER_TO_CLIENT_ID(cellID) (cellID - POWER_GRID_WIDTH)

#define REACTOR_MIN_X 5
#define REACTOR_MAX_X 9
#define REACTOR_MIN_SERVER_Y 7
#define REACTOR_MAX_SERVER_Y 9
#define EXHAUST_PORT_SERVER_Y 8

void UPowerSystem::BeginPlay()
{
	// hook up pointers to the neighbours of each power cell, so we can easily navigate them
	// also set up the default cell types
	for (int32 x = 0; x < POWER_GRID_WIDTH; x++)
		for (int32 y = 0; y < POWER_GRID_SERVER_HEIGHT; y++)
		{
			int32 i = CELLINDEX(x, y);
			auto cell = cells[i];

			if (y == 0 || y >= POWER_GRID_SEND_HEIGHT)
			{
				cell.cellIndex = -1;
				cell.SetType(EPowerCellType::Cell_System);
			}
			else
			{
				cell.cellIndex = SERVER_TO_CLIENT_ID(i);

				if (y >= REACTOR_MIN_SERVER_Y && y <= REACTOR_MAX_SERVER_Y)
				{
					if (x >= REACTOR_MIN_X && x <= REACTOR_MAX_X)
						cell.SetType(EPowerCellType::Cell_System);
					else if (y == EXHAUST_PORT_SERVER_Y && x == 0 || x == POWER_GRID_WIDTH - 1)
						cell.SetType(EPowerCellType::Cell_ExhaustPort);
					else
						cell.SetType(EPowerCellType::Cell_Empty);
				}
				else
					cell.SetType(EPowerCellType::Cell_Empty);
			}
			
			cell.system = this;
			cell.westNeighbour = x > 0 ? &cells[CELLINDEX(x - 1, y)] : NULL;
			cell.eastNeighbour = x < POWER_GRID_WIDTH - 1  ? &cells[CELLINDEX(x + 1, y)] : NULL;
			cell.northNeighbour = y > 0 ? &cells[CELLINDEX(x, y - 1)] : NULL;
			cell.southNeighbour = y < POWER_GRID_SERVER_HEIGHT - 1 ? &cells[CELLINDEX(x, y + 1)] : NULL;
		}

	Super::BeginPlay(); // calls ResetData, so done after data population
}

void UPowerSystem::ResetData()
{
	reactorPower = 100;

	for (int32 i = 0; i < POWER_GRID_SERVER_SIZE; i++)
	{
		auto cell = cells[i];
		if (cell.GetType() > EPowerCellType::Cell_ExhaustPort) // don't clear system & exhaust port cells
			cell.SetType(EPowerCellType::Cell_Empty);

		cell.SetPowerLevel(0);
	}

	for (int32 i = 0; i < MAX_POWER_SYSTEMS; i++)
		systemsOnline[i] = true;

#ifndef WEB_SERVER_TEST
	spareCells.Empty();
#else
	spareCells.clear();
#endif
}

bool UPowerSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "power_rotCell "))
	{
		int32 cellID = ExtractInt(msg, sizeof("power_rotCell "));
		if (cellID >= 0 && cellID < POWER_GRID_SEND_SIZE)
			RotateCell(cellID);
	}
	else if (STARTS_WITH(msg, "power_placeCell "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("power_placeCell "));

		if (SIZENUM(parts) >= 2)
		{
			int32 cellID = STOI(parts[0]);

			if (cellID >= 0 && cellID < POWER_GRID_SEND_SIZE)
			{
				int32 spareCellNum = STOI(parts[1]);
				PlaceCell(cellID, spareCellNum);
			}
		}
	}
	else if (STARTS_WITH(msg, "power_toggleSys "))
	{
		int32 systemID = ExtractInt(msg, sizeof("power_toggleSys "));
		if (systemID >= 0 && systemID < MAX_POWER_SYSTEMS)
			ToggleSystem((EPowerSystem)systemID);
	}
	else
		return false;

	return true;
}

void UPowerSystem::SendAllData_Implementation()
{
	SendAllCellTypes();
	SendAllCellPower();
	SendAllSystems();
	SendAllSpares();
	Client_SendReactorPower();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::RotateCell(uint8 cellID) { RotateCell_Implementation(cellID); }
#endif
void UPowerSystem::RotateCell_Implementation(uint8 cellID)
{
	if (cellID < 0 || cellID >= POWER_GRID_SEND_SIZE)
		return;

	cellID = CLIENT_TO_SERVER_ID(cellID);
	// TODO: use actual cells

	auto newType = GetRotatedCellType(cellTypes[cellID]);

	cellTypes[cellID] = newType;
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::PlaceCell(uint8 cellID, uint8 spareCellNum) { PlaceCell_Implementation(cellID, spareCellNum); }
#endif
void UPowerSystem::PlaceCell_Implementation(uint8 cellID, uint8 spareCellNum)
{
	if (cellID < 0 || cellID >= POWER_GRID_SEND_SIZE || spareCellNum < 0 || spareCellNum >= SIZENUM(spareCells))
		return;

	cellID = CLIENT_TO_SERVER_ID(cellID);
	// TODO: use actual cells

	cellTypes[cellID] = spareCells[spareCellNum];
	SETREMOVE(spareCells, spareCellNum);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::ToggleSystem(EPowerSystem system) { ToggleSystem_Implementation(system); }
#endif
void UPowerSystem::ToggleSystem_Implementation(EPowerSystem system)
{
	int32 systemID = (int32)system;
	systemsOnline[systemID] = !systemsOnline[systemID];
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::SendCellType(uint8 cell, EPowerCellType cellType) { SendCellType_Implementation(cell, cellType); }
#endif
void UPowerSystem::SendCellType_Implementation(uint8 cell, EPowerCellType cellType)
{
	FString output = TEXT("power_cell_t ");

	APPENDINT(output, cell);
	output += TEXT(" ");
	APPENDINT(output, cellType);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllCellTypes() { SendAllCellTypes_Implementation(); }
#endif
void UPowerSystem::SendAllCellTypes_Implementation()
{
	FString output = TEXT("power_all_cells_t");

	for (auto cell : cellTypes)
	{
		output += TEXT(" ");
		APPENDINT(output, cell);
	}

	SendSystem(output);
}

void UPowerSystem::OnReplicated_CellTypes(TArray<EPowerCellType> beforeChange)
{
	// if length has changed, send everything to the UI. Otherwise, only send the values that have changed.
	uint8 numCells = SIZENUM(cellTypes);
	if (SIZENUM(beforeChange) != numCells)
	{
		SendAllCellTypes();
		return;
	}

	for (uint8 i = 0; i < numCells; i++)
	{
		auto currentVal = cellTypes[i];
		if (beforeChange[i] != currentVal)
			SendCellType(i, currentVal);
	}
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::SendCellPower(uint8 cell, int8 power) { SendCellPower_Implementation(cell, power); }
#endif
void UPowerSystem::SendCellPower_Implementation(uint8 cell, int8 power)
{
	FString output = TEXT("power_cell_p ");

	APPENDINT(output, cell);
	output += TEXT(" ");
	APPENDINT(output, power);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllCellPower() { SendAllCellPower_Implementation(); }
#endif
void UPowerSystem::SendAllCellPower_Implementation()
{
	FString output = TEXT("power_all_cells_p");

	for (auto cell : cellPower)
	{
		output += TEXT(" ");
		APPENDINT(output, cell);
	}

	SendSystem(output);
}

void UPowerSystem::OnReplicated_CellPower(TArray<int8> beforeChange)
{
	// if length has changed, send everything to the UI. Otherwise, only send the values that have changed.
	uint8 numCells = SIZENUM(cellPower);
	if (SIZENUM(beforeChange) != numCells)
	{
		SendAllCellPower();
		return;
	}

	for (uint8 i = 0; i < numCells; i++)
	{
		auto currentVal = cellPower[i];
		if (beforeChange[i] != currentVal)
			SendCellPower(i, currentVal);
	}
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::SendSystemState(EPowerSystem system, bool state) { SendSystemState_Implementation(system, state); }
#endif
void UPowerSystem::SendSystemState_Implementation(EPowerSystem system, bool state)
{
	FString output = TEXT("power_sys ");

	APPENDINT(output, system);
	output += state ? TEXT(" 1") : TEXT(" 0");

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllSystems() { SendAllSystems_Implementation(); }
#endif
void UPowerSystem::SendAllSystems_Implementation()
{
	FString output = TEXT("power_all_sys");

	for (auto system : systemsOnline)
	{
		output += system ? TEXT(" 1") : TEXT(" 0");
	}

	SendSystem(output);
}

void UPowerSystem::OnReplicated_SystemsOnline(TArray<bool> beforeChange)
{
	// if length has changed, send everything to the UI. Otherwise, only send the values that have changed.
	auto numSys = SIZENUM(systemsOnline);
	if (SIZENUM(beforeChange) != numSys)
	{
		SendAllSystems();
		return;
	}

	for (size_t i = 0; i < numSys; i++)
	{
		auto currentVal = systemsOnline[i];
		if (beforeChange[i] != currentVal)
			SendSystemState((EPowerSystem)i, currentVal);
	}
}


void UPowerSystem::Client_SendReactorPower()
{
	FString output = TEXT("power_reactor ");

	APPENDINT(output, reactorPower);

	SendSystem(output);
}

void UPowerSystem::OnReplicated_ReactorPower(uint8 beforeChange)
{
	Client_SendReactorPower();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllSpares() { SendAllSpares_Implementation(); }
#endif
void UPowerSystem::SendAllSpares_Implementation()
{
	FString output = TEXT("power_all_spare");

	for (auto cell : spareCells)
	{
		output += TEXT(" ");
		APPENDINT(output, cell);
	}

	SendSystem(output);
}

void UPowerSystem::OnReplicated_SpareCells(TArray<EPowerCellType> beforeChange)
{
	// This list is always short, and we remove particular indices and add things on the end, rather than just replacing. Safest just to send it all.
	SendAllSpares();
}


UPowerSystem::EPowerCellType UPowerSystem::GetRotatedCellType(EPowerCellType type)
{
	switch (type)
	{
	case EPowerCellType::Cell_NorthSouth:
		return EPowerCellType::Cell_EastWest;
	case EPowerCellType::Cell_EastWest:
		return EPowerCellType::Cell_NorthSouth;
	case EPowerCellType::Cell_NorthEast:
		return EPowerCellType::Cell_SouthEast;
	case EPowerCellType::Cell_SouthEast:
		return EPowerCellType::Cell_SouthWest;
	case EPowerCellType::Cell_SouthWest:
		return EPowerCellType::Cell_NorthWest;
	case EPowerCellType::Cell_NorthWest:
		return EPowerCellType::Cell_NorthEast;
	case EPowerCellType::Cell_NorthEastSouth:
		return EPowerCellType::Cell_EastSouthWest;
	case EPowerCellType::Cell_EastSouthWest:
		return EPowerCellType::Cell_SouthWestNorth;
	case EPowerCellType::Cell_SouthWestNorth:
		return EPowerCellType::Cell_WestNorthEast;
	case EPowerCellType::Cell_WestNorthEast:
		return EPowerCellType::Cell_NorthEastSouth;
	default:
		return type;
	}
}

UPowerSystem::EPowerDirection UPowerSystem::GetConnectedDirections(EPowerCellType type)
{
	switch (type)
	{
	case EPowerCellType::Cell_NorthSouth:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_South;
	case EPowerCellType::Cell_EastWest:
		return EPowerDirection::Dir_East | EPowerDirection::Dir_West;
	case EPowerCellType::Cell_NorthEast:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_East;
	case EPowerCellType::Cell_SouthEast:
		return EPowerDirection::Dir_South | EPowerDirection::Dir_East;
	case EPowerCellType::Cell_SouthWest:
		return EPowerDirection::Dir_South | EPowerDirection::Dir_West;
	case EPowerCellType::Cell_NorthWest:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_West;
	case EPowerCellType::Cell_NorthEastSouth:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_South | EPowerDirection::Dir_East;
	case EPowerCellType::Cell_EastSouthWest:
		return EPowerDirection::Dir_South | EPowerDirection::Dir_East | EPowerDirection::Dir_West;
	case EPowerCellType::Cell_SouthWestNorth:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_South | EPowerDirection::Dir_West;
	case EPowerCellType::Cell_WestNorthEast:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_East | EPowerDirection::Dir_West;
	case EPowerCellType::Cell_ExhaustPort:
	case EPowerCellType::Cell_NorthEastSouthWest:
		return EPowerDirection::Dir_North | EPowerDirection::Dir_South | EPowerDirection::Dir_East | EPowerDirection::Dir_West;
	default:
		return EPowerDirection::Dir_None;
	}
}


void PowerCell::SetType(UPowerSystem::EPowerCellType type)
{
	this->type = type;
	if (cellIndex != -1)
		system->cellTypes[cellIndex] = type;
}

void PowerCell::SetPowerLevel(uint8 level)
{
	powerLevel = level;
	coolantLevel = 0;
	if (cellIndex != -1)
		system->cellPower[cellIndex] = level;
}

void PowerCell::SetCoolantLevel(uint8 level)
{
	coolantLevel = level;
	powerLevel = 0;
	if (cellIndex != -1)
		system->cellPower[cellIndex] = -level;
}