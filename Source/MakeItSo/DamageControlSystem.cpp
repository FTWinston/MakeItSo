#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "DamageControlSystem.h"


bool UDamageControlSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (STARTS_WITH(info, "dcdir "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "dcdir ");
		EOrdinalDirection dir = (EOrdinalDirection)atoi(buffer);

		// check they didn't switch to the opposite direction ... that isn't allowed
		int32 combinedDirs = dir + prevSnakeDir;
		if (combinedDirs == 3 || combinedDirs == 7) // up + down or left + right
			return true;

		snakeDir = dir;
	}
	else
		return false;

	return true;
}

bool UDamageControlSystem::ProcessSystemMessage(FString message)
{
	if (message == TEXT("tick"))
	{
		AdvanceSnake();
	}
	else if (message.find(TEXT("damage ") == 0))
	{
		message = message.substr(7);

		// TODO: parse section and amount
		CreateDamage(EDamageSection::Section_Any, 5);
	}
	else
		return false;

	return true;
}

void UDamageControlSystem::SendAllData()
{
	SendDamageGrid();
}

void UDamageControlSystem::Init(UCrewManager *manager)
{
	UCrewSystem::Init(manager);

	int32 initialGrid[DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH]{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

#ifndef WEB_SERVER_TEST
	damageGrid.AddUninitialized(DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH);
	FMemory::Memcpy(damageGrid.GetData(), initialGrid, DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH * sizeof(int32));
#else
	memcpy(damageGrid, initialGrid, DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH * sizeof(int32));
#endif

	CreateDamageSnake();
	CreateDamageApple();
}

void UDamageControlSystem::ResetData()
{
	// clear all damage control, set up the snake & an apple
	for (int32 i = 0; i < DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH; i++)
	{
		int32 val = damageGrid[i];
		if (val == 0 || val == 1)
			continue;

		damageGrid[i] = 0;
	}

	CreateDamageSnake();
	CreateDamageApple();
}

#ifndef WEB_SERVER_TEST
#define CLEARCELLS(cells) cells.Empty()
#define ADDCELL(cells, val) cells.Add(val)
#else
#define CLEARCELLS(cells) cells.clear()
#define ADDCELL(cells, val) cells.push_back(val)
#endif

void UDamageControlSystem::CreateDamageSnake()
{
	snakeDir = prevSnakeDir = Right;

	CLEARCELLS(snakeCells);
	ADDCELL(snakeCells, 588);
	ADDCELL(snakeCells, 587);
	ADDCELL(snakeCells, 586);
	ADDCELL(snakeCells, 585);

	bool first = true;
	for (int32 cell : snakeCells)
	{
		if (first)
		{
			damageGrid[cell] = 2;
			first = false;
		}
		else
			damageGrid[cell] = 2;
	}
}

void UDamageControlSystem::SendDamageGrid()
{
	FString output = TEXT("dmggrid ");

	for (int32 id : damageGrid)
		APPENDINT(output, id);

	SendCrewMessage(CHARARR(output));
}

void UDamageControlSystem::AdvanceSnake()
{
	if (EMPTY(snakeCells))
		return;

	prevSnakeDir = snakeDir;
#ifndef WEB_SERVER_TEST
	int32 oldHead = damageSnakeCells[0];
#else
	int32 oldHead = snakeCells.front();
#endif

	int32 newHead;
	switch (snakeDir)
	{
	case Up:
		newHead = oldHead - DAMAGE_GRID_WIDTH;
		if (newHead < 0)
			newHead += DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT;
		break;
	case Down:
		newHead = oldHead + DAMAGE_GRID_WIDTH;
		if (newHead >= DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT)
			newHead -= DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT;
		break;
	case Left:
		newHead = oldHead - 1;
		if (newHead % DAMAGE_GRID_WIDTH == 0)
			newHead += DAMAGE_GRID_WIDTH;
		break;
	case Right:
		newHead = oldHead + 1;
		if (newHead % DAMAGE_GRID_WIDTH == 0)
			newHead -= DAMAGE_GRID_WIDTH;
		break;
	default:
		return; // snake isn't moving; do nothing
	}

	FString crewMessage = TEXT("dmgcell");
	int32 tailCellsToLose = 1;
	bool advanceHead = true;

	// if new head wasn't empty, do something!
	switch (damageGrid[newHead])
	{
	case Wall:
	{
		snakeDir = None;
		advanceHead = false;
		tailCellsToLose = 0;

#ifndef WEB_SERVER_TEST
		int32 snakeSize = snakeCells.Num();
#else
		int32 snakeSize = snakeCells.size();
#endif

		// convert all snake cells into damage
		while (NOTEMPTY(snakeCells))
		{
#ifndef WEB_SERVER_TEST
			int32 lastIndex = snakeCells.Num() - 1;
			int32 cell = snakeCells[lastIndex];
			snakeCells.RemoveAt(lastIndex, 1);
#else
			int32 cell = snakeCells.back();
			snakeCells.pop_back();
#endif
			damageGrid[cell] = Damage1;

			crewMessage += TEXT(" ");
			APPENDINT(crewMessage, cell);
			crewMessage += TEXT(":");
			APPENDINT(crewMessage, Damage1);

			UpdateDamage(cell, SnakeBody, Damage1);
		}

		// create additional damage around crash area
		CreateDamage(GetDamageCellSection(newHead), snakeSize);
		break;
	}
	case SnakeBody:
		while (true)
		{
#ifndef WEB_SERVER_TEST
			int32 lastIndex = snakeCells.Num() - 1;
			int32 cell = snakeCells[lastIndex];
			snakeCells.RemoveAt(lastIndex, 1);
#else
			int32 cell = snakeCells.back();
			snakeCells.pop_back();
#endif

			if (cell == newHead)
				break; // all snake cells up to the collision point have been converted into damage

			damageGrid[cell] = Damage1;

			crewMessage += TEXT(" ");
			APPENDINT(crewMessage, cell);
			crewMessage += TEXT(":");
			APPENDINT(crewMessage, Damage1);

			UpdateDamage(cell, SnakeBody, Damage1);
		}
		tailCellsToLose = 0;
		break;
	case Apple:
		tailCellsToLose = 0;

		crewMessage += TEXT(" ");
		APPENDINT(crewMessage, CreateDamageApple());
		crewMessage += TEXT(":");
		APPENDINT(crewMessage, Apple);
		break;
	case Damage1:
		UpdateDamage(newHead, Damage1, SnakeHead);
		break;
	case Damage2:
		UpdateDamage(newHead, Damage2, SnakeHead);
		tailCellsToLose = 2;
		break;
	case Damage3:
		UpdateDamage(newHead, Damage3, SnakeHead);
		tailCellsToLose = 3;
		break;
	}

	while (tailCellsToLose-- > 0)
	{
		// current tail cell becomes empty
#ifndef WEB_SERVER_TEST
		int32 lastIndex = snakeCells.Num() - 1;
		int32 cell = snakeCells[lastIndex];
		snakeCells.RemoveAt(lastIndex, 1);
#else
		int32 cell = snakeCells.back();
		snakeCells.pop_back();
#endif
		damageGrid[cell] = Empty;

		crewMessage += TEXT(" ");
		APPENDINT(crewMessage, cell);
		crewMessage += TEXT(":");
		APPENDINT(crewMessage, Empty);
	}

	if (advanceHead)
	{
		// current head cell becomes body
		damageGrid[oldHead] = SnakeBody;

		crewMessage += TEXT(" ");
		APPENDINT(crewMessage, oldHead);
		crewMessage += TEXT(":");
		APPENDINT(crewMessage, SnakeBody);

		// new head cell becomes head
		damageGrid[newHead] = SnakeHead;
#ifndef WEB_SERVER_TEST
		snakeCells.Insert(0, newHead);
#else
		snakeCells.insert(snakeCells.begin(), newHead);
#endif

		crewMessage += TEXT(" ");
		APPENDINT(crewMessage, newHead);
		crewMessage += TEXT(":");
		APPENDINT(crewMessage, SnakeHead);
	}

	// send crew message listing changed cells
	SendCrewMessage(CHARARR(crewMessage));
}

void UDamageControlSystem::UpdateDamage(int32 updatedCell, EDamageCell before, EDamageCell after)
{
	int beforeDamage, afterDamage;
	switch (before)
	{
	case Damage1:
		beforeDamage = 1; break;
	case Damage2:
		beforeDamage = 1; break;
	case Damage3:
		beforeDamage = 1; break;
	default:
		beforeDamage = 0; break;
	}
	switch (after)
	{
	case Damage1:
		afterDamage = 1; break;
	case Damage2:
		afterDamage = 1; break;
	case Damage3:
		afterDamage = 1; break;
	default:
		afterDamage = 0; break;
	}

	int difference = afterDamage - beforeDamage;

	EDamageSection section = GetDamageCellSection(updatedCell);

	// TODO: apply damage difference to section total damage
}

int32 UDamageControlSystem::CreateDamageApple()
{
	while (true)
	{
		int32 cell = FMath::RandRange(0, DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT);

		if (damageGrid[cell] != Empty)
			continue;

		damageGrid[cell] = Apple;
		return cell;
	}
}

void UDamageControlSystem::CreateDamage(EDamageSection section, int32 amount)
{
	FString crewMessage = TEXT("dmgcell");

	int32 numUpdated = 0;
	while (numUpdated < amount)
	{
		int32 cell;

		switch (section) {
		case Section_Manoevering:
			cell = GetCellIndex(FMath::RandRange(0, 15), FMath::RandRange(0, 11)); break;
		case Section_Shields:
			cell = GetCellIndex(FMath::RandRange(16, 31), FMath::RandRange(0, 11)); break;
		case Section_BeamWeapons:
			cell = GetCellIndex(FMath::RandRange(32, 47), FMath::RandRange(0, 11)); break;
		case Section_Deflector:
			cell = GetCellIndex(FMath::RandRange(0, 15), FMath::RandRange(12, 23)); break;
		case Section_Power:
			cell = GetCellIndex(FMath::RandRange(16, 31), FMath::RandRange(12, 23)); break;
		case Section_Torpedoes:
			cell = GetCellIndex(FMath::RandRange(32, 47), FMath::RandRange(12, 23)); break;
		case Section_Warp:
			cell = GetCellIndex(FMath::RandRange(0, 15), FMath::RandRange(24, 35)); break;
		case Section_Sensors:
			cell = GetCellIndex(FMath::RandRange(16, 31), FMath::RandRange(24, 35)); break;
		case Section_Communications:
			cell = GetCellIndex(FMath::RandRange(32, 47), FMath::RandRange(24, 35)); break;
		default:
			cell = FMath::RandRange(0, DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT); break;
		}

		EDamageCell content = (EDamageCell)damageGrid[cell], newContent;
		switch (content)
		{
		case Empty:
			newContent = Damage1; break;
		case Damage1:
			newContent = Damage2; break;
		case Damage2:
			newContent = Damage3; break;
		default:
			continue;
		}

		damageGrid[cell] = newContent;

		crewMessage += TEXT(" ");
		APPENDINT(crewMessage, cell);
		crewMessage += TEXT(":");
		APPENDINT(crewMessage, newContent);

		UpdateDamage(cell, content, newContent);

		numUpdated++;
	}

	SendCrewMessage(CHARARR(crewMessage));
}

UDamageControlSystem::EDamageSection UDamageControlSystem::GetDamageCellSection(int32 cellIndex)
{
	int32 x = cellIndex % DAMAGE_GRID_WIDTH;
	int32 y = cellIndex / DAMAGE_GRID_WIDTH;

	if (x < 16) {
		if (y < 12)
			return Section_Manoevering;
		else if (y < 24)
			return Section_Deflector;
		else
			return Section_Warp;
	}
	else if (x < 32) {
		if (y < 12)
			return Section_Shields;
		else if (y < 24)
			return Section_Power;
		else
			return Section_Sensors;
	}
	else {
		if (y < 12)
			return Section_BeamWeapons;
		else if (y < 24)
			return Section_Torpedoes;
		else
			return Section_Communications;
	}
}
