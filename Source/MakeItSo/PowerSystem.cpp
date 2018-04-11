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
	cells.AddUninitialized(POWER_GRID_SIZE);
	systemsOnline.AddUninitialized(MAX_POWER_SYSTEMS);
#endif
}

void UPowerSystem::ResetData()
{
	reactorPower = 100;

	for (int32 i = 0; i < POWER_GRID_SIZE; i++)
		cells[i] = EPowerCellType::Cell_Empty;

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
		if (cellID >= 0 && cellID < POWER_GRID_SIZE)
			RotateCell(cellID);
	}
	else if (STARTS_WITH(msg, "power_placeCell "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("power_placeCell "));

		if (SIZENUM(parts) >= 2)
		{
			int32 cellID = STOI(parts[0]);
			int32 spareCellNum = STOI(parts[1]);
			PlaceCell(cellID, spareCellNum);
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
	SendAllCells();
	SendAllSystems();
	SendAllSpares();
	Client_SendReactorPower();
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::RotateCell(uint8 cellID) { RotateCell_Implementation(cellID); }
#endif
void UPowerSystem::RotateCell_Implementation(uint8 cellID)
{
	if (cellID < 0 || cellID >= POWER_GRID_SIZE)
		return;

	cells[cellID] = GetRotatedCellType(cells[cellID]);
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::PlaceCell(uint8 cellID, uint8 spareCellNum) { PlaceCell_Implementation(cellID, spareCellNum); }
#endif
void UPowerSystem::PlaceCell_Implementation(uint8 cellID, uint8 spareCellNum)
{
	if (cellID < 0 || cellID >= POWER_GRID_SIZE || spareCellNum < 0 || spareCellNum >= SIZENUM(spareCells))
		return;

	cells[cellID] = spareCells[spareCellNum];
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
void UPowerSystem::SendCell(uint8 cell, EPowerCellType cellType) { SendCell_Implementation(cell, cellType); }
#endif
void UPowerSystem::SendCell_Implementation(uint8 cell, EPowerCellType cellType)
{
	FString output = TEXT("power_cell ");

	APPENDINT(output, cell);
	output += TEXT(" ");
	APPENDINT(output, cellType);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllCells() { SendAllCells_Implementation(); }
#endif
void UPowerSystem::SendAllCells_Implementation()
{
	FString output = TEXT("power_all_cells");

	for (auto cell : cells)
	{
		output += TEXT(" ");
		APPENDINT(output, cell);
	}

	SendSystem(output);
}

void UPowerSystem::OnReplicated_Cells(TArray<EPowerCellType> beforeChange)
{
	// if length has changed, send everything to the UI. Otherwise, only send the values that have changed.
	uint8 numCells = SIZENUM(cells);
	if (SIZENUM(beforeChange) != numCells)
	{
		SendAllCells();
		return;
	}

	for (uint8 i = 0; i < numCells; i++)
	{
		auto currentVal = cells[i];
		if (beforeChange[i] != currentVal)
			SendCell(i, currentVal);
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