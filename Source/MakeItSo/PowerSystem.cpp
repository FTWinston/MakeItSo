#ifndef WEB_SERVER_TEST
#include "PowerSystem.h"
#else
#include "stdafx.h"
#include "PowerSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

TMap<int32, UPowerSystem::EPowerCellType> UPowerSystem::initialCells;
#define INITIAL(num, type) MAPADD(initialCells, num, type, int32, UPowerSystem::EPowerCellType)

UPowerSystem::UPowerSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 1.0f;
	PrimaryComponentTick.SetTickFunctionEnable(true);

#ifndef WEB_SERVER_TEST
	cells.Add(POWER_GRID_SIZE);
	cellTypes.AddZeroed(POWER_GRID_SIZE);
	cellPower.AddZeroed(POWER_GRID_SIZE);
#else
	cells.assign(POWER_GRID_SIZE, nullptr);
	cellTypes.assign(POWER_GRID_SIZE, Cell_Empty);
	cellPower.assign(POWER_GRID_SIZE, 0);
#endif

	// setting up static data in the constructor is safe cos this only runs once... right?
	CLEAR(initialCells);

	INITIAL(0, Cell_System); INITIAL(1, Cell_System); INITIAL(2, Cell_System);
	INITIAL(4, Cell_System); INITIAL(5, Cell_System); INITIAL(6, Cell_System);
	INITIAL(8, Cell_System); INITIAL(9, Cell_System); INITIAL(10, Cell_System);

	INITIAL(44, Cell_System); INITIAL(55, Cell_System); INITIAL(66, Cell_System);
	INITIAL(54, Cell_System); INITIAL(65, Cell_System); INITIAL(76, Cell_System);

	INITIAL(110, Cell_System); INITIAL(111, Cell_System); INITIAL(112, Cell_System);
	INITIAL(114, Cell_System); INITIAL(115, Cell_System); INITIAL(116, Cell_System);
	INITIAL(118, Cell_System); INITIAL(119, Cell_System); INITIAL(120, Cell_System);

	INITIAL(48, Cell_Reactor); INITIAL(49, Cell_Reactor); INITIAL(50, Cell_Reactor);
	INITIAL(59, Cell_Reactor); INITIAL(60, Cell_Reactor); INITIAL(61, Cell_Reactor);
	INITIAL(70, Cell_Reactor); INITIAL(71, Cell_Reactor); INITIAL(72, Cell_Reactor);

	INITIAL(46, Cell_Radiator); INITIAL(47, Cell_Radiator);
	INITIAL(68, Cell_Radiator); INITIAL(69, Cell_Radiator);

	INITIAL(51, Cell_Radiator); INITIAL(52, Cell_Radiator);
	INITIAL(73, Cell_Radiator); INITIAL(74, Cell_Radiator);

	INITIAL(56, Cell_EastWest); INITIAL(57, Cell_EastWest); INITIAL(58, Cell_EastWest);
	INITIAL(62, Cell_EastWest); INITIAL(63, Cell_EastWest); INITIAL(64, Cell_EastWest);

	INITIAL(16, Cell_NorthSouth); INITIAL(27, Cell_NorthSouth); INITIAL(38, Cell_NorthSouth);
	INITIAL(82, Cell_NorthSouth); INITIAL(93, Cell_NorthSouth); INITIAL(104, Cell_NorthSouth);

	INITIAL(37, Cell_NorthSouth); INITIAL(26, Cell_SouthWest); INITIAL(25, Cell_EastWest); INITIAL(24, Cell_NorthEast); INITIAL(13, Cell_NorthSouth);
	INITIAL(39, Cell_NorthSouth); INITIAL(28, Cell_SouthEast); INITIAL(29, Cell_EastWest); INITIAL(30, Cell_NorthWest); INITIAL(19, Cell_NorthSouth);

	INITIAL(81, Cell_NorthSouth); INITIAL(92, Cell_NorthWest); INITIAL(91, Cell_EastWest); INITIAL(90, Cell_SouthEast); INITIAL(101, Cell_NorthSouth);
	INITIAL(83, Cell_NorthSouth); INITIAL(94, Cell_NorthEast); INITIAL(95, Cell_EastWest); INITIAL(96, Cell_SouthWest); INITIAL(107, Cell_NorthSouth);
}

#define CELLINDEX(x, y) ((x) + POWER_GRID_WIDTH * (y))

#define NUM_SPARE_CELLS 5

void UPowerSystem::BeginPlay()
{
	// hook up pointers to the neighbours of each power cell, so we can easily navigate them
	// also set up the default cell types
	for (int32 y = 0; y < POWER_GRID_HEIGHT; y++)
		for (int32 x = 0; x < POWER_GRID_WIDTH; x++)
		{
			// TODO: ensure this doesn't leak memory on deletion
			auto cell = new PowerCell();
			cell->system = this;

			int32 i = CELLINDEX(x, y);
			cells[i] = cell;
			cell->cellIndex = i;

			if (x > 0)
			{
				auto neighbour = cells[CELLINDEX(x - 1, y)];
				MAPADD(cell->neighbours, Dir_West, neighbour, UPowerSystem::EPowerDirection, PowerCell*);
				MAPADD(neighbour->neighbours, Dir_East, cell, UPowerSystem::EPowerDirection, PowerCell*);
			}

			if (y > 0)
			{
				auto neighbour = cells[CELLINDEX(x, y - 1)];
				MAPADD(cell->neighbours, Dir_North, neighbour, UPowerSystem::EPowerDirection, PowerCell*);
				MAPADD(neighbour->neighbours, Dir_South, cell, UPowerSystem::EPowerDirection, PowerCell*);
			}
		}

	for (int32 i = 0; i < NUM_SPARE_CELLS; i++)
		SETADD(spareCells, GetRandomCellType());

	// create system objects to store & display system info on
	SETADD(systems, new PowerReactor(0, 4, 4, 3, 3, cells, this));

	SETADD(systems, new PowerSystemOutput(1, 0, 0, 3, 1, Power_Helm, cells));
	SETADD(systems, new PowerSystemOutput(2, 4, 0, 3, 1, Power_Warp, cells));
	SETADD(systems, new PowerSystemOutput(3, 8, 0, 3, 1, Power_BeamWeapons, cells));

	SETADD(systems, new PowerSystemOutput(4, 0, 4, 1, 3, Power_Shields, cells));
	SETADD(systems, new PowerSystemOutput(5, 10, 4, 1, 3, Power_Sensors, cells));

	SETADD(systems, new PowerSystemOutput(6, 0, 10, 3, 1, Power_Comms, cells));
	SETADD(systems, new PowerSystemOutput(7, 4, 10, 3, 1, Power_DamageControl, cells));
	SETADD(systems, new PowerSystemOutput(8, 8, 10, 3, 1, Power_Torpedoes, cells));

	for (auto system : systems)
	{
		SETADD(systemLayout, system->system);
		SETADD(systemLayout, system->firstCell);
		SETADD(systemLayout, system->lastCell);
	}

	UShipSystem::BeginPlay(); // calls ResetData, so done after data population
}

void UPowerSystem::ResetData()
{
	for (int32 i = 0; i < POWER_GRID_SIZE; i++)
	{
		auto cell = cells[i];
		if (MAPCONTAINS(initialCells, i))
		{
			EPowerCellType type = initialCells[i];
			cell->SetType(type);

			if (type != Cell_System && type != Cell_Reactor)
				SETADD(undamagedCells, cell);
		}
		else
		{
			cell->SetType(EPowerCellType::Cell_Empty);
			SETADD(undamagedCells, cell);
		}

		cell->powerLevel = 0;
		cellPower[cell->cellIndex] = 0;
	}

	overheatValue = 50;
	SetPowerLevel(100);

	//CLEAR(spareCells);
}

bool UPowerSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "power_rotCell "))
	{
		int32 cellID = ExtractInt(msg, sizeof("power_rotCell "));
		if (cellID >= 0 && cellID < POWER_GRID_SIZE)
			RotateCell(cellID);
	}
	else if (STARTS_WITH(msg, "power_placeCell "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("power_placeCell "));

		if (SIZENUM(parts) >= 2)
		{
			int32 cellID = STOI(parts[0]);

			if (cellID >= 0 && cellID < POWER_GRID_SIZE)
			{
				int32 spareCellNum = STOI(parts[1]);
				PlaceCell(cellID, spareCellNum);
			}
		}
	}
	else if (MATCHES(msg, "power_jog"))
	{
		JogReactorPowerOutput();
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
	SendOverheat();

	UShipSystem::SendAllData_Implementation();
}

#define OVERHEAT_DAMAGE_CUTOFF 100
void UPowerSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	uint8 prevValue = overheatValue;
	overheatValue = overheatValue + overheatRate;

	if (overheatRate < 0)
	{
		if (overheatValue > prevValue)
			overheatValue = 0;
	}
	else if (overheatValue < prevValue)
		overheatValue = 250;

	if (ISCLIENT())
		SendOverheat();
	
	if (overheatValue >= 250)
		TakeDamage(5);
	else if (overheatValue >= 200)
		TakeDamage(4);
	else if (overheatValue >= 160)
		TakeDamage(3);
	else if (overheatValue >= 125)
		TakeDamage(2);
	else if (overheatValue >= OVERHEAT_DAMAGE_CUTOFF)
		TakeDamage(1);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::RotateCell(uint8 cellID) { RotateCell_Implementation(cellID); }
#endif
void UPowerSystem::RotateCell_Implementation(uint8 cellID)
{
	if (cellID < 0 || cellID >= POWER_GRID_SIZE)
		return;

	cells[cellID]->RotateCellType();

	DistributePower();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::PlaceCell(uint8 cellID, uint8 spareCellNum) { PlaceCell_Implementation(cellID, spareCellNum); }
#endif
void UPowerSystem::PlaceCell_Implementation(uint8 cellID, uint8 spareCellNum)
{
	if (cellID < 0 || cellID >= POWER_GRID_SIZE || spareCellNum < 0 || spareCellNum >= SIZENUM(spareCells))
		return;

	auto cell = cells[cellID];
	if (cell->GetType() == Cell_System || cell->GetType() == Cell_Reactor || cell->GetType() == Cell_Broken)
		return;

	EPowerCellType cellType = spareCells[spareCellNum];
	cell->SetType(cellType);
	
	SETREMOVEAT(spareCells, spareCellNum);
	SETADD(spareCells, GetRandomCellType());

	if (ISCLIENT())
		SendAllSpares();

	DistributePower();
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::JogReactorPowerOutput() { JogReactorPowerOutput_Implementation(); }
#endif
void UPowerSystem::JogReactorPowerOutput_Implementation()
{
	uint8 power = GetPowerLevel();

	if (power < 40)
		SetPowerLevel(40);
	else if (power < 60)
		SetPowerLevel(60);
	else if (power < 80)
		SetPowerLevel(80);
	else if (power < 100)
		SetPowerLevel(100);
	else if (power < 120)
		SetPowerLevel(120);
	else
		SetPowerLevel(20);

	DistributePower();
}

void UPowerSystem::SetPowerLevel_Implementation(uint8 newLevel)
{
	UShipSystem::SetPowerLevel_Implementation(newLevel);
	DistributePower();
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
void UPowerSystem::SendCellPower(uint8 cell, uint8 power) { SendCellPower_Implementation(cell, power); }
#endif
void UPowerSystem::SendCellPower_Implementation(uint8 cell, uint8 power)
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

void UPowerSystem::OnReplicated_CellPower(TArray<uint8> beforeChange)
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
void UPowerSystem::SendOverheat() { SendOverheat_Implementation(); }
#endif
void UPowerSystem::SendOverheat_Implementation()
{
	FString output = TEXT("power_heat ");
	APPENDINT(output, overheatValue);
	output += TEXT(" ");
	APPENDINT(output, overheatRate);
	
	SendSystem(output);
}

void UPowerSystem::OnReplicated_OverheatRate(uint8 beforeChange)
{
	SendOverheat();
}

void UPowerSystem::OnReplicated_OverheatValue(uint8 beforeChange)
{
	SendOverheat();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllSystems() { SendAllSystems_Implementation(); }
#endif
void UPowerSystem::SendAllSystems_Implementation()
{
	FString output = TEXT("power_all_sys");
	
	// send system id, first cell and last cell for each system, so the client can display them in the right place
	for (auto val : systemLayout)
	{
		output += TEXT(" ");
		APPENDINT(output, val);
	}

	SendSystem(output);
}

void UPowerSystem::OnReplicated_SystemLayout(TArray<uint8> beforeChange)
{
	SendAllSystems();
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

#define NUM_DIRS 4
#define ADD_CELL_TO_MAP(map, cell) MAPADD_PTR(map, cell->cellIndex, cell, int32, PowerCell*)

#define UPDATE_CELL_POWER(cell, newVal) { \
	if (ISCLIENT()) \
	{ \
		auto oldVal = cellPower[cell->cellIndex]; \
		if (oldVal != newVal) \
		{ \
			SendCellPower(cell->cellIndex, newVal); \
		} \
	} \
	cellPower[cell->cellIndex] = newVal; \
}

void UPowerSystem::DistributePower()
{
	for (auto cell : cells)
	{
		cell->powerLevel = 0;
		cell->powerArrivesFrom = Dir_None;
		cell->alreadyOutputPower = false;
	}

	uint8 numPoweredRadiators = 0;
	uint8 numReactorOutputs = 0;

	TMap<int32, PowerCell*> tmpCells1;
	TMap<int32, PowerCell*> tmpCells2;
	TMap<int32, PowerCell*> tmpCells3;

	// use pointers here so we can swap which we are iterating on easily
	TMap<int32, PowerCell*> *edgeCells = &tmpCells1;
	TMap<int32, PowerCell*> *nextEdgeCells_singleOutput = &tmpCells2;
	TMap<int32, PowerCell*> *nextEdgeCells_multipleOutput = &tmpCells3;

	auto reactor = systems[Power_Reactor];
	auto reactorPower = reactor->GetPowerLevel();
	for (auto cell : reactor->cells)
	{
		cell->powerLevel = reactorPower;
		ADD_CELL_TO_MAP(edgeCells, cell);
	}

	EPowerCellType hasMultipleOutputs = Cell_NorthEastSouth | Cell_EastSouthWest | Cell_SouthWestNorth | Cell_WestNorthEast;
	bool handlingMultipleOutputs = false;
	bool firstStep = true;
	
	// loop over all "edge" cells, calculate where they can pass power to
	while (SIZENUM_PTR(edgeCells) > 0)
	{
		for (auto pair : *edgeCells)
		{
			auto edgeCell = PAIRVALUE(pair);

			if (edgeCell->GetType() == Cell_System)
			{
				// reached an system endpoint, don't let power flow any further
				continue;
			}
			else if (edgeCell->GetType() == Cell_Reactor || edgeCell->GetType() == Cell_Radiator)
			{
				// process radiator/heat output
				for (auto neighbour : edgeCell->neighbours)
				{
					EPowerDirection dir = PAIRKEY(neighbour);
					if ((edgeCell->powerArrivesFrom & dir) != 0)
						continue;

					PowerCell *radiatorCell = PAIRVALUE(neighbour);
					if (radiatorCell->GetType() != Cell_Radiator || radiatorCell->powerLevel > 0)
						continue;

					radiatorCell->powerLevel = 1;
					radiatorCell->powerArrivesFrom = radiatorCell->powerArrivesFrom | GetOppositeDirection(dir);
					ADD_CELL_TO_MAP(nextEdgeCells_singleOutput, radiatorCell);
					numPoweredRadiators++;
				}

				if (edgeCell->GetType() == Cell_Radiator)
					continue; // reactors also output power. Radiators don't.
			}

			EPowerDirection dirs[] = { Dir_North, Dir_South, Dir_East, Dir_West };
			EPowerDirection oppositeDirs[] = { Dir_South, Dir_North, Dir_West, Dir_East };
			PowerCell *outputCells[] = { nullptr, nullptr, nullptr, nullptr };

			uint8 numOutputs = 0; // a connection is still an output if it has power already, but isn't if power arrived in this cell from there.
			for (int32 i = 0; i < NUM_DIRS; i++)
			{
				if (edgeCell->GetType() != Cell_Radiator)
				{
					PowerCell *output = edgeCell->GetOutputConnection(dirs[i]);
					if (output != nullptr)
					{
						// process power output
						outputCells[i] = output;
						numOutputs++;
						continue;
					}
				}
			}
			
			if (firstStep)
				numReactorOutputs += numOutputs;

			// where possible, only process non-reactor cells with a single possible output, until there are no such cells left
			bool splitOutput = edgeCell->GetType() != Cell_Reactor && numOutputs > 1;

			if (splitOutput && !handlingMultipleOutputs)
			{
				ADD_CELL_TO_MAP(nextEdgeCells_multipleOutput, edgeCell);
				continue;
			}

			edgeCell->alreadyOutputPower = true;

			// output power reduces if we split it multiple ways
			uint8 outputPower;
			if (splitOutput)
				outputPower = edgeCell->powerLevel / 2;
			else
				outputPower = edgeCell->powerLevel;

			for (int32 i = 0; i < NUM_DIRS; i++)
			{
				auto output = outputCells[i];
				if (output == nullptr)
					continue;

				// Golden rule for spreading power: if its a T shaped cell and hasn't already output power, can add to a cell's power. Otherwise, replace.
				if ((output->GetType() & hasMultipleOutputs) != 0 && output->alreadyOutputPower)
				{
					// combine power levels nonlinearly beyond 100%
					output->powerLevel += outputPower;
				}
				else if (output->powerLevel < outputPower)
					output->powerLevel = outputPower;
				else
					continue; // don't update this cell, and don't progress beyond it

				// just because power came from somewhere else before, doesn't mean we shouldn't overwrite it if this cell now has higher power
				output->powerArrivesFrom = oppositeDirs[i];

				if (!MAPCONTAINS_PTR(nextEdgeCells_singleOutput, output->cellIndex))
				{
					ADD_CELL_TO_MAP(nextEdgeCells_singleOutput, output);
					MAPREMOVE_PTR(nextEdgeCells_multipleOutput, output->cellIndex);
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

		firstStep = false;
	}

	// update the list of power being passed into each system, and the actual systems themselves
	for (auto system : systems)
	{
		auto power = system->GetPowerLevel();
		
		for (auto cell : system->cells)
		{
			UPDATE_CELL_POWER(cell, power);
		}

		auto shipSystem = LookupSystem(system->system);
		if (shipSystem != nullptr)
			shipSystem->SetPowerLevel(power);
	}

	// now that we've recalculated the power of every cell, pass this on
	for (auto cell : cells)
	{
		if (cell->GetType() == Cell_System || cell->GetType() == Cell_Reactor)
			continue;

		auto power = cell->GetVisualPowerLevel();
		UPDATE_CELL_POWER(cell, power);
	}

	DetermineOverheatRate(numPoweredRadiators, numReactorOutputs);
}

void UPowerSystem::DetermineOverheatRate(uint8 numPoweredRadiators, uint8 numOutputs)
{
	// at 100%, you need 2 radiators for every 3 outputs, say
	// TODO: this always outputs zero, except with zero radiators, when it outputs NaN
	float powerRate = 0.6667f * GetPowerLevel() * numOutputs / numPoweredRadiators;

	if (powerRate < 5.0f)
		overheatRate = -10;
	else if (powerRate < 15.0f)
		overheatRate = -9;
	else if (powerRate < 25.0f)
		overheatRate = -8;
	else if (powerRate < 35.0f)
		overheatRate = -7;
	else if (powerRate < 45.0f)
		overheatRate = -6;
	else if (powerRate < 55.0f)
		overheatRate = -5;
	else if (powerRate < 65.0f)
		overheatRate = -4;
	else if (powerRate < 75.0f)
		overheatRate = -3;
	else if (powerRate < 85.0f)
		overheatRate = -2;
	else if (powerRate < 95.0f)
		overheatRate = -1;
	else if (powerRate < 105.0f)
		overheatRate = 0;
	else if (powerRate < 115.0f)
		overheatRate = 1;
	else if (powerRate < 125.0f)
		overheatRate = 2;
	else if (powerRate < 135.0f)
		overheatRate = 3;
	else if (powerRate < 145.0f)
		overheatRate = 4;
	else if (powerRate < 155.0f)
		overheatRate = 5;
	else if (powerRate < 165.0f)
		overheatRate = 6;
	else if (powerRate < 175.0f)
		overheatRate = 7;
	else if (powerRate < 185.0f)
		overheatRate = 8;
	else if (powerRate < 195.0f)
		overheatRate = 9;
	else
		overheatRate = 10;

	if (ISCLIENT())
		SendOverheat();
}

void UPowerSystem::ApplySystemDamage(uint8 prevValue, uint8 newValue)
{
	uint8 numCellsToDamage = GetDamageCellCountForDamage(newValue, prevValue);
	uint32 numUndamagedCells = SIZENUM(undamagedCells);
	bool affectedNonEmpty = false;

	for (uint8 i = FMath::Min(numCellsToDamage, numUndamagedCells); i > 0; i--)
	{
		PowerCell *cell = undamagedCells[FMath::RandRange(0, numUndamagedCells - 1)];
		
		SETREMOVEVAL(undamagedCells, cell);
		SETADD(damagedCells, cell);

		if (cell->GetType() != Cell_Empty)
			affectedNonEmpty = true;

		cell->SetType(Cell_Broken);
		numUndamagedCells--;
	}

	if (affectedNonEmpty)
		DistributePower();
}

void UPowerSystem::RepairSystemDamage(uint8 prevValue, uint8 newValue)
{
	uint8 numCellsToRepair = GetDamageCellCountForDamage(prevValue, newValue);
	uint32 numDamagedCells = SIZENUM(damagedCells);

	for (uint8 i = FMath::Min(numCellsToRepair, numDamagedCells); i > 0; i--)
	{
		PowerCell *cell = damagedCells[FMath::RandRange(0, numDamagedCells)];

		SETREMOVEVAL(damagedCells, cell);
		SETADD(undamagedCells, cell);
		
		cell->SetType(Cell_Empty);
		numDamagedCells--;
	}
}

uint8 UPowerSystem::GetDamageCellCountForDamage(uint8 minHealth, uint8 maxHealth)
{
	// there are only 82 free cells to distribute damage across, so 1/5 of the damage points shouldn't create damage cells when taken
	// and we need those to be the same ones each time when restoring, so that we don't end up with discrepancies
	uint8 numDamageCells = 0;

	for (uint8 i = minHealth; i < maxHealth; i++)
		if ((i % 5) != 1)
			numDamageCells++;

	return numDamageCells;
}

UPowerSystem::EPowerCellType UPowerSystem::GetRandomCellType()
{
	return (EPowerCellType)FMath::RandRange(Cell_Radiator, Cell_WestNorthEast);
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

const uint8 powers[] = {
	0,
	1 << 1,
	1 << 1,
	1 << 2,
	1 << 3,
	1 << 4,
	1 << 5,
	1 << 6,
	1 << 7,
	1 << 8,
	1 << 9,
	1 << 10,
	1 << 11,
	1 << 12,
	1 << 13,
	1 << 14,
	1 << 15,
};

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
		return UPowerSystem::Dir_North | UPowerSystem::Dir_South | UPowerSystem::Dir_East | UPowerSystem::Dir_West;
	default:
		return UPowerSystem::Dir_None;
	}
}

UPowerSystem::EPowerDirection UPowerSystem::GetOppositeDirection(UPowerSystem::EPowerDirection dir)
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

UShipSystem *UPowerSystem::LookupSystem(EPowerSystem system)
{
	switch (system)
	{
	case Power_Helm:
		return crewManager->GetSystem(UShipSystem::ESystem::Helm);
	case Power_Warp:
		return crewManager->GetSystem(UShipSystem::ESystem::Warp);
	case Power_BeamWeapons:
		return crewManager->GetSystem(UShipSystem::ESystem::Weapons);
//	case Power_Torpedoes:
//		return crewManager->GetSystem(UShipSystem::ESystem::Weapons);
	case Power_Sensors:
		return crewManager->GetSystem(UShipSystem::ESystem::Sensors);
//	case Power_Shields:
//		return ???;
	case Power_DamageControl:
		return crewManager->GetSystem(UShipSystem::ESystem::DamageControl);
	case Power_Comms:
		return crewManager->GetSystem(UShipSystem::ESystem::Communications);
	default:
		return nullptr;
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
	auto opposite = UPowerSystem::GetOppositeDirection(dir);
	if ((adjacent->GetConnectedDirections() & opposite) == 0)
		return NULL;

	return adjacent;
}

uint8 PowerCell::GetVisualPowerLevel()
{
	if (powerLevel == 0)
		return 0;
	if (powerLevel < 15)
		return 1;
	if (powerLevel < 25)
		return 2;
	if (powerLevel < 35)
		return 3;
	if (powerLevel < 45)
		return 4;
	if (powerLevel < 55)
		return 5;
	if (powerLevel < 65)
		return 6;
	if (powerLevel < 75)
		return 7;
	if (powerLevel < 85)
		return 8;
	if (powerLevel < 95)
		return 9;
	if (powerLevel < 105)
		return 10;

	if (powerLevel < 115)
		return 11;
	if (powerLevel < 125)
		return 12;
	if (powerLevel < 135)
		return 13;
	if (powerLevel < 145)
		return 14;
	if (powerLevel < 160)
		return 15;
	if (powerLevel < 175)
		return 16;
	if (powerLevel < 200)
		return 17;
	if (powerLevel < 225)
		return 18;
	if (powerLevel < 250)
		return 19;
	if (powerLevel < 300)
		return 20;
	if (powerLevel < 350)
		return 21;
	if (powerLevel < 400)
		return 22;
	if (powerLevel < 500)
		return 23;
	if (powerLevel < 600)
		return 24;
	if (powerLevel < 800)
		return 25;
	if (powerLevel < 1000)
		return 26;

	return 27;
}

PowerSystemOutput::PowerSystemOutput(uint8 index, uint8 minX, uint8 minY, uint8 width, uint8 height, UPowerSystem::EPowerSystem system, TArray<PowerCell*> allCells)
{
	this->system = system;
	sysIndex = index;

	firstCell = CELLINDEX(minX, minY);

	uint8 cellIndex;
	uint8 maxX = minX + width - 1;
	uint8 maxY = minY + height - 1;

	for (auto y = minY; y <= maxY; y++)
		for (auto x = minX; x <= maxX; x++)
		{
			if ((x != minX && x != maxX) && (y != minY && y != maxY))
				continue;

			cellIndex = CELLINDEX(x, y);
			auto cell = allCells[cellIndex];
			SETADD(cells, cell);
		}

	lastCell = cellIndex;
}

uint16 PowerSystemOutput::GetPowerLevel()
{
	uint16 power = 0;
	for (auto cell : cells)
		power += cell->powerLevel;

	if (power <= 100)
		return power;

	// scale power non-linearly beyond 100%
	power = 100 + (uint8)FMath::Pow((float)power - 100, 0.8f);

	return FMath::Min(200, power);
}

PowerReactor::PowerReactor(uint8 index, uint8 x, uint8 y, uint8 w, uint8 h, TArray<PowerCell*> allCells, UPowerSystem *system)
 : PowerSystemOutput(index, x, y, w, h, UPowerSystem::Power_Reactor, allCells)
{
	powerSystem = system;
}

uint16 PowerReactor::GetPowerLevel()
{
	return powerSystem->GetPowerLevel();
}