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
	recalculatingCellPower = false;
#ifndef WEB_SERVER_TEST
	cells.Add(POWER_GRID_SERVER_SIZE);
	cellTypes.AddZeroed(POWER_GRID_SEND_SIZE);
	cellPower.AddZeroed(POWER_GRID_SEND_SIZE);
	systemsOnline.AddZeroed(MAX_POWER_SYSTEMS);
#else
	cells.assign(POWER_GRID_SERVER_SIZE, nullptr);
	cellTypes.assign(POWER_GRID_SEND_SIZE, Cell_Empty);
	cellPower.assign(POWER_GRID_SEND_SIZE, 0);
	systemsOnline.assign(MAX_POWER_SYSTEMS, false);
#endif
}

#define CELLINDEX(x, y) ((x) + POWER_GRID_WIDTH * (y))
#define CLIENT_TO_SERVER_ID(cellID) (cellID + POWER_GRID_WIDTH)
#define SERVER_TO_CLIENT_ID(cellID) (cellID - POWER_GRID_WIDTH)

#define REACTOR_MIN_X 5
#define REACTOR_MAX_X 9
#define REACTOR_MIN_SERVER_Y 7
#define REACTOR_MAX_SERVER_Y 9

#define NUM_SPARE_CELLS 5

#define REACTOR_CELL_POWER_LEVEL 20

void UPowerSystem::BeginPlay()
{
	// hook up pointers to the neighbours of each power cell, so we can easily navigate them
	// also set up the default cell types
	for (int32 x = 0; x < POWER_GRID_WIDTH; x++)
		for (int32 y = 0; y < POWER_GRID_SERVER_HEIGHT; y++)
		{
			// TODO: ensure this doesn't leak memory on deletion
			auto cell = new PowerCell(); 
			cell->system = this;

			int32 i = CELLINDEX(x, y);
			cells[i] = cell;

			if (y == 0 || y >= POWER_GRID_SEND_HEIGHT)
			{
				cell->cellIndex = -i - 1; // a negative ID to make it clear we never send to client, but we still need these to be unique
				cell->SetType(EPowerCellType::Cell_System);
			}
			else
			{
				cell->cellIndex = SERVER_TO_CLIENT_ID(i);

				if (y >= REACTOR_MIN_SERVER_Y && y <= REACTOR_MAX_SERVER_Y)
				{
					if (x >= REACTOR_MIN_X && x <= REACTOR_MAX_X)
					{
						cell->SetType(EPowerCellType::Cell_Reactor);
						cell->powerLevel = cellPower[cell->cellIndex] = REACTOR_CELL_POWER_LEVEL;
						
						if (ISCLIENT())
							SendCellPower(cell->cellIndex, cell->powerLevel);
					}
					else if ((y == REACTOR_MIN_SERVER_Y || y == REACTOR_MAX_SERVER_Y) && (x == 0 || x == POWER_GRID_WIDTH - 1))
						cell->SetType(EPowerCellType::Cell_ExhaustPort);
					else
						cell->SetType(EPowerCellType::Cell_Empty);
				}
				else
					cell->SetType(EPowerCellType::Cell_Empty);
			}
			
			cell->SetNeighbour(Dir_West, x > 0 ? cells[CELLINDEX(x - 1, y)] : NULL);
			cell->SetNeighbour(Dir_East, x < POWER_GRID_WIDTH - 1 ? cells[CELLINDEX(x + 1, y)] : NULL);
			cell->SetNeighbour(Dir_North, y > 0 ? cells[CELLINDEX(x, y - 1)] : NULL);
			cell->SetNeighbour(Dir_South, y < POWER_GRID_SERVER_HEIGHT - 1 ? cells[CELLINDEX(x, y + 1)] : NULL);
		}

	for (int32 i = 0; i < NUM_SPARE_CELLS; i++)
		SETADD(spareCells, GetRandomCellType());

	Super::BeginPlay(); // calls ResetData, so done after data population
}

void UPowerSystem::ResetData()
{
	reactorPower = 100;

	for (int32 i = 0; i < POWER_GRID_SERVER_SIZE; i++)
	{
		auto cell = cells[i];
		if (cell->GetType() > EPowerCellType::Cell_ExhaustPort) // don't clear reactor, system & exhaust port cells
		{
			cell->SetType(EPowerCellType::Cell_Empty);
			cell->powerLevel = 0;

			if (cell->cellIndex >= 0)
				cellPower[cell->cellIndex] = 0;
		}
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
	cells[cellID]->RotateCellType();

	DistributePower();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::PlaceCell(uint8 cellID, uint8 spareCellNum) { PlaceCell_Implementation(cellID, spareCellNum); }
#endif
void UPowerSystem::PlaceCell_Implementation(uint8 cellID, uint8 spareCellNum)
{
	if (cellID < 0 || cellID >= POWER_GRID_SEND_SIZE || spareCellNum < 0 || spareCellNum >= SIZENUM(spareCells))
		return;

	cellID = CLIENT_TO_SERVER_ID(cellID);
	EPowerCellType cellType = spareCells[spareCellNum];
	cells[cellID]->SetType(cellType);
	
	SETREMOVEAT(spareCells, spareCellNum);
	SETADD(spareCells, GetRandomCellType());

	if (ISCLIENT())
		SendAllSpares();

	DistributePower();
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
	// This is a short list, and we remove particular indices and add things on the end, rather than just replacing. Safest just to send it all.
	SendAllSpares();
}

#define ADD_CELL_TO_MAP(map, cell) MAPADD_PTR(map, cell->cellIndex, cell, int32, PowerCell*)

void UPowerSystem::DistributePower()
{
	recalculatingCellPower = true;
	for (auto cell : cells)
	{
		if (cell->GetType() != Cell_Reactor)
			cell->powerLevel = 0;

		cell->powerArrivesFrom = Dir_None;
	}

	TMap<int32, PowerCell*> tmpCells1;
	TMap<int32, PowerCell*> tmpCells2;
	TMap<int32, PowerCell*> tmpCells3;

	// use pointers here so we can swap which we are iterating on easily
	TMap<int32, PowerCell*> *edgeCells = &tmpCells1;
	TMap<int32, PowerCell*> *nextEdgeCells_singleOutput = &tmpCells2;
	TMap<int32, PowerCell*> *nextEdgeCells_multipleOutput = &tmpCells3;

	// add each reactor edge cell to the initial "edge" set
	for (int32 x = REACTOR_MIN_X; x <= REACTOR_MAX_X; x++) {
		auto cell = cells[CELLINDEX(x, REACTOR_MIN_SERVER_Y)];
		ADD_CELL_TO_MAP(edgeCells, cell);
		
		cell = cells[CELLINDEX(x, REACTOR_MAX_SERVER_Y)];
		ADD_CELL_TO_MAP(edgeCells, cell);
	}
	for (int32 y = REACTOR_MIN_SERVER_Y + 1; y <= REACTOR_MAX_SERVER_Y - 1; y++) {
		auto cell = cells[CELLINDEX(REACTOR_MIN_X, y)];
		ADD_CELL_TO_MAP(edgeCells, cell);

		cell = cells[CELLINDEX(REACTOR_MAX_X, y)];
		ADD_CELL_TO_MAP(edgeCells, cell);
	}

	bool handlingMultipleOutputs = false;
	
	// loop over all "edge" cells, calculate where they can pass power to
	while (SIZENUM_PTR(edgeCells) > 0)
	{
		for (auto pair : *edgeCells)
		{
			auto edgeCell = PAIRVALUE(pair);

			if (edgeCell->GetType() == UPowerSystem::Cell_System)
			{
				// TODO: reached an end point, do something
				continue;
			}

			// look at each adjacent cell, see if we can output power to it
			PowerCell *north = edgeCell->GetOutputConnection(UPowerSystem::Dir_North);
			PowerCell *south = edgeCell->GetOutputConnection(UPowerSystem::Dir_South);
			PowerCell *east = edgeCell->GetOutputConnection(UPowerSystem::Dir_East);
			PowerCell *west = edgeCell->GetOutputConnection(UPowerSystem::Dir_West);

			uint8 numOutputs = 0; // a connection is still an output if it has power already, but isn't if power arrived in this cell from there.
			if (north != NULL)
				numOutputs++;
			if (south != NULL)
				numOutputs++;
			if (east != NULL)
				numOutputs++;
			if (west != NULL)
				numOutputs++;

			// where possible, only process cells with a single possible output, until there are no such cells left
			if (numOutputs > 1 && !handlingMultipleOutputs)
			{
				ADD_CELL_TO_MAP(nextEdgeCells_multipleOutput, edgeCell);
				continue;
			}

			// output power reduces if we split it multiple ways
			auto outputPower = edgeCell->powerLevel + 1 - numOutputs;

			if (north != NULL)
			{
				north->powerLevel += outputPower;
				north->powerArrivesFrom |= Dir_South;

				if (!MAPCONTAINS_PTR(nextEdgeCells_singleOutput, north->cellIndex))
				{
					ADD_CELL_TO_MAP(nextEdgeCells_singleOutput, north);
					MAPREMOVE_PTR(nextEdgeCells_multipleOutput, north->cellIndex);
				}
			}

			if (south != NULL)
			{
				south->powerLevel += outputPower;
				south->powerArrivesFrom |= Dir_North;

				if (!MAPCONTAINS_PTR(nextEdgeCells_singleOutput, south->cellIndex))
				{
					ADD_CELL_TO_MAP(nextEdgeCells_singleOutput, south);
					MAPREMOVE_PTR(nextEdgeCells_multipleOutput, south->cellIndex);
				}
			}

			if (east != NULL)
			{
				east->powerLevel += outputPower;
				east->powerArrivesFrom |= Dir_West;

				if (!MAPCONTAINS_PTR(nextEdgeCells_singleOutput, east->cellIndex))
				{
					ADD_CELL_TO_MAP(nextEdgeCells_singleOutput, east);
					MAPREMOVE_PTR(nextEdgeCells_multipleOutput, east->cellIndex);
				}
			}

			if (west != NULL)
			{
				west->powerLevel += outputPower;
				west->powerArrivesFrom |= Dir_East;

				if (!MAPCONTAINS_PTR(nextEdgeCells_singleOutput, west->cellIndex))
				{
					ADD_CELL_TO_MAP(nextEdgeCells_singleOutput, west);
					MAPREMOVE_PTR(nextEdgeCells_multipleOutput, west->cellIndex);
				}
			}
		}

		// if we have more edge cells that (potentially) have a single output, process those.
		// otherwise, process those we've flagged as having multiple outputs
		CLEAR_PTR(edgeCells);
		auto tmp = edgeCells;
		if (SIZENUM_PTR(nextEdgeCells_singleOutput) > 0)
		{
			handlingMultipleOutputs = false;
			edgeCells = nextEdgeCells_singleOutput;
			nextEdgeCells_singleOutput = tmp;
		}
		else
		{
			handlingMultipleOutputs = true;
			edgeCells = nextEdgeCells_multipleOutput;
			nextEdgeCells_multipleOutput = tmp;
		}
	}

	// now that we've recalculated the power of every cell, pass this on
	recalculatingCellPower = false;
	for (auto cell : cells)
	{
		if (cell->cellIndex >= 0)
		{
			if (ISCLIENT())
			{
				auto oldVal = cellPower[cell->cellIndex];
				if (oldVal != cell->powerLevel)
				{
					SendCellPower(cell->cellIndex, cell->powerLevel);
				}
			}

			cellPower[cell->cellIndex] = cell->powerLevel;
		}
	}
}

UPowerSystem::EPowerCellType UPowerSystem::GetRandomCellType()
{
	return (EPowerCellType)FMath::RandRange(Cell_NorthSouth, Cell_WestNorthEast);
}


void PowerCell::SetType(UPowerSystem::EPowerCellType type)
{
	this->type = type;
	if (cellIndex >= 0)
	{
		system->cellTypes[cellIndex] = type;

		if (ISCLIENT())
			system->SendCellType(cellIndex, type);
	}
}

void PowerCell::SetNeighbour(UPowerSystem::EPowerDirection dir, PowerCell *neighbour)
{
	MAPADD(neighbours, dir, neighbour, UPowerSystem::EPowerDirection, PowerCell*);
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
	case UPowerSystem::Cell_Reactor:
	case UPowerSystem::Cell_System:
	case UPowerSystem::Cell_ExhaustPort:
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

PowerCell *PowerCell::GetOutputConnection(UPowerSystem::EPowerDirection dir)
{
	// doesn't count as an output connection if we get power from this direction
	if ((powerArrivesFrom & dir) != 0)
		return NULL;

	// can't output power if this cell's shape doesn't connect in this direction
	if ((GetConnectedDirections() & dir) == 0)
		return NULL;

	// can't output power if no adjacent neighbour in this direction
	auto adjacent = neighbours[dir];
	if (adjacent == NULL)
		return NULL;

	// can't output power to reactor cells, they only provide it
	if (adjacent->GetType() == UPowerSystem::Cell_Reactor)
		return NULL;

	// can't output power if neighbour's shape doesn't connect in opposite direction
	auto opposite = GetOppositeDirection(dir);
	if ((adjacent->GetConnectedDirections() & opposite) == 0)
		return NULL;

	return adjacent;
}