#ifndef WEB_SERVER_TEST
#include "PowerSystem.h"
#else
#include "stdafx.h"
#include "PowerSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

bool UPowerSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "rotCell "))
	{
		
	}
	else if (STARTS_WITH(msg, "placeCell "))
	{
		
	}
	else if (STARTS_WITH(msg, "toggleSys "))
	{

	}
	else if (MATCHES(msg, "jogReactor"))
	{

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
void UPowerSystem::SendCell(uint8 cell, EPowerCellType cellType) {}
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
void UPowerSystem::SendAllCells() {}
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
void UPowerSystem::SendSystemState(EPowerSystem system, bool state) {}
#endif
void UPowerSystem::SendSystemState_Implementation(EPowerSystem system, bool state)
{
	FString output = TEXT("power_sys ");

	APPENDINT(output, system);
	output += state ? TEXT(" 1") : TEXT(" 0");

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllSystems() {}
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

	for (uint8 i = 0; i < numSys; i++)
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
void UPowerSystem::SendAllSpares() {}
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


UPowerSystem::EPowerCellType UPowerSystem::Rotate(EPowerCellType type)
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