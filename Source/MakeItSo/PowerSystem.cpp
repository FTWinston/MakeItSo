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
						cell.SetType(EPowerCellType::Cell_Reactor);
					else if (y == EXHAUST_PORT_SERVER_Y && x == 0 || x == POWER_GRID_WIDTH - 1)
						cell.SetType(EPowerCellType::Cell_ExhaustPort);
					else
						cell.SetType(EPowerCellType::Cell_Empty);
				}
				else
					cell.SetType(EPowerCellType::Cell_Empty);
			}
			
			cell.system = this;
			cell.SetNeighbour(Dir_West, x > 0 ? &cells[CELLINDEX(x - 1, y)] : NULL);
			cell.SetNeighbour(Dir_East, x < POWER_GRID_WIDTH - 1  ? &cells[CELLINDEX(x + 1, y)] : NULL);
			cell.SetNeighbour(Dir_North, y > 0 ? &cells[CELLINDEX(x, y - 1)] : NULL);
			cell.SetNeighbour(Dir_South, y < POWER_GRID_SERVER_HEIGHT - 1 ? &cells[CELLINDEX(x, y + 1)] : NULL);
		}

	Super::BeginPlay(); // calls ResetData, so done after data population
}

void UPowerSystem::ResetData()
{
	reactorPower = 100;
	visitFlag = false;

	for (int32 i = 0; i < POWER_GRID_SERVER_SIZE; i++)
	{
		auto cell = cells[i];
		cell.visitFlag = visitFlag;
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
	cells[cellID].RotateCellType();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::PlaceCell(uint8 cellID, uint8 spareCellNum) { PlaceCell_Implementation(cellID, spareCellNum); }
#endif
void UPowerSystem::PlaceCell_Implementation(uint8 cellID, uint8 spareCellNum)
{
	if (cellID < 0 || cellID >= POWER_GRID_SEND_SIZE || spareCellNum < 0 || spareCellNum >= SIZENUM(spareCells))
		return;

	cellID = CLIENT_TO_SERVER_ID(cellID);
	cells[cellID].SetType(spareCells[spareCellNum]);
	
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


void UPowerSystem::DistributePower()
{
	TArray<PowerCell*> edgeCells;
	TArray<PowerCell*> nextEdgeCells;
	visitFlag = !visitFlag;

	// start at each reactor edge cell, apply power to unvisited connected cells.
	for (int32 x = REACTOR_MIN_X; x <= REACTOR_MAX_X; x++) {
		SETADD(edgeCells, &cells[CELLINDEX(x, REACTOR_MIN_SERVER_Y)]);
		SETADD(edgeCells, &cells[CELLINDEX(x, REACTOR_MAX_SERVER_Y)]);
	}

	// TODO: instead of handling each path simultaneously, to get correct power multiples,
	// probably want to start from edge edge point in turn, and run each one to completion.

	while (SIZENUM(edgeCells) > 0)
	{
		// for each cell connected to an edge cell, increment its power, mark visited, add to next edge cell list
		for (auto edgeCell : edgeCells)
		{
			if (edgeCell->GetType() == UPowerSystem::Cell_System)
			{
				// TODO: reached an end point, do something
				continue;
			}

			auto north = edgeCell->GetConnection(UPowerSystem::Dir_North);
			if (north != NULL && north->GetType() != UPowerSystem::Cell_Reactor)
			{
				north->AdjustPowerLevel(1);
				if (north->visitFlag != visitFlag)
				{
					north->visitFlag = visitFlag;
					SETADD(nextEdgeCells, north);
				}
			}

			auto south = edgeCell->GetConnection(UPowerSystem::Dir_South);
			if (south != NULL && south->GetType() != UPowerSystem::Cell_Reactor)
			{
				south->AdjustPowerLevel(1);
				if (south->visitFlag != visitFlag)
				{
					south->visitFlag = visitFlag;
					SETADD(nextEdgeCells, south);
				}
			}

			auto east = edgeCell->GetConnection(UPowerSystem::Dir_East);
			if (east != NULL && east->GetType() != UPowerSystem::Cell_Reactor)
			{
				east->AdjustPowerLevel(1);
				if (east->visitFlag != visitFlag)
				{
					east->visitFlag = visitFlag;
					SETADD(nextEdgeCells, east);
				}
			}

			auto west = edgeCell->GetConnection(UPowerSystem::Dir_West);
			if (west != NULL && west->GetType() != UPowerSystem::Cell_Reactor)
			{
				west->AdjustPowerLevel(1);
				if (west->visitFlag != visitFlag)
				{
					west->visitFlag = visitFlag;
					SETADD(nextEdgeCells, west);
				}
			}
		}

		// TODO: this needs to swap, not make them be the same reference
		edgeCells = nextEdgeCells;
		CLEAR(nextEdgeCells);
	}

	// TODO: when recalculating power, don't update cellPower array until we're done!
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

void PowerCell::RotateCellType()
{
	UPowerSystem::EPowerCellType newType;

	switch (type)
	{
	case UPowerSystem::Cell_NorthSouth:
		newType = UPowerSystem::Cell_EastWest; break;
	case UPowerSystem::Cell_EastWest:
		newType = UPowerSystem::Cell_NorthSouth; break;
	case UPowerSystem::Cell_NorthEast:
		newType = UPowerSystem::Cell_SouthEast; break;
	case UPowerSystem::Cell_SouthEast:
		newType = UPowerSystem::Cell_SouthWest; break;
	case UPowerSystem::Cell_SouthWest:
		newType = UPowerSystem::Cell_NorthWest; break;
	case UPowerSystem::Cell_NorthWest:
		newType = UPowerSystem::Cell_NorthEast; break;
	case UPowerSystem::Cell_NorthEastSouth:
		newType = UPowerSystem::Cell_EastSouthWest; break;
	case UPowerSystem::Cell_EastSouthWest:
		newType = UPowerSystem::Cell_SouthWestNorth; break;
	case UPowerSystem::Cell_SouthWestNorth:
		newType = UPowerSystem::Cell_WestNorthEast; break;
	case UPowerSystem::Cell_WestNorthEast:
		newType = UPowerSystem::Cell_NorthEastSouth; break;
	default:
		return;
	}

	SetType(newType);
}

UPowerSystem::EPowerDirection PowerCell::GetConnectedDirections()
{
	switch (type)
	{
	case UPowerSystem::Cell_NorthSouth:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_South;
	case UPowerSystem::Cell_EastWest:
		return UPowerSystem::Dir_East | UPowerSystem::Dir_West;
	case UPowerSystem::Cell_NorthEast:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_East;
	case UPowerSystem::Cell_SouthEast:
		return UPowerSystem::Dir_South | UPowerSystem::Dir_East;
	case UPowerSystem::Cell_SouthWest:
		return UPowerSystem::Dir_South | UPowerSystem::Dir_West;
	case UPowerSystem::Cell_NorthWest:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_West;
	case UPowerSystem::Cell_NorthEastSouth:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_South | UPowerSystem::Dir_East;
	case UPowerSystem::Cell_EastSouthWest:
		return UPowerSystem::Dir_South | UPowerSystem::Dir_East | UPowerSystem::Dir_West;
	case UPowerSystem::Cell_SouthWestNorth:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_South | UPowerSystem::Dir_West;
	case UPowerSystem::Cell_WestNorthEast:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_East | UPowerSystem::Dir_West;
	case UPowerSystem::Cell_ExhaustPort:
	case UPowerSystem::Cell_NorthEastSouthWest:
		return UPowerSystem::Dir_North | UPowerSystem::Dir_South | UPowerSystem::Dir_East | UPowerSystem::Dir_West;
	default:
		return UPowerSystem::Dir_None;
	}
}

UPowerSystem::EPowerDirection PowerCell::GetOppositeDirection(UPowerSystem::EPowerDirection dir)
{
	switch (dir)
	{
	case UPowerSystem::Dir_North:
		return UPowerSystem::Dir_South;
	case UPowerSystem::Dir_South:
		return UPowerSystem::Dir_North;
	case UPowerSystem::Dir_East:
		return UPowerSystem::Dir_West;
	case UPowerSystem::Dir_West:
		return UPowerSystem::Dir_East;
	default:
		return UPowerSystem::Dir_None;
	}
}

PowerCell *PowerCell::GetConnection(UPowerSystem::EPowerDirection dir)
{
	// only counts as a connection if there is a neighbour, this cell is
	// orientated to connect to it, and it's orientated to connect to this cell
	if ((GetConnectedDirections() & dir) == 0)
		return NULL;

	auto adjacent = neighbours[dir];
	if (adjacent == NULL)
		return NULL;

	auto opposite = GetOppositeDirection(dir);
	if ((adjacent->GetConnectedDirections() & opposite) == 0)
		return NULL;

	return adjacent;
}