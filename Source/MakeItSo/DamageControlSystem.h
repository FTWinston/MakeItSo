#include "CrewManager.h"

#pragma once

/**
 * 
 */

 //UCLASS()
class MAKEITSO_API UDamageControlSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:

	enum EDamageCell {
		Empty = 0,
		Wall,
		SnakeBodyLR,
		SnakeBodyUD,
		SnakeBodyUR,
		SnakeBodyDR,
		SnakeBodyDL,
		SnakeBodyUL,
		SnakeHead,
		Apple,
		Damage1,
		Damage2,
		Damage3,
	};

	enum EOrdinalDirection {
		None = 0,
		Up = 1,
		Down = 2,
		Left = 4,
		Right = 8,
	};

	enum EDamageSection {
		Section_Any = 0,
		Section_Manoevering = 1,
		Section_Shields = 2,
		Section_BeamWeapons = 3,
		Section_Deflector = 4,
		Section_Power = 5,
		Section_Torpedoes = 6,
		Section_Warp = 7,
		Section_Sensors = 8,
		Section_Communications = 9,
	};

	void Init(UCrewManager* manager);
	void ResetData();

	bool ReceiveCrewMessage(ConnectionInfo *info);
	bool ProcessSystemMessage(FString message);
	void SendAllData();
protected:
	UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::DamageControl; }
private:
#define DAMAGE_GRID_WIDTH 48
#define DAMAGE_GRID_HEIGHT 36

#ifndef WEB_SERVER_TEST
	TArray<int32> damageGrid;
#else
	int32 damageGrid[DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH];
#endif
	void SendDamageGrid();
	inline int32 GetCellIndex(int32 x, int32 y) { return y * DAMAGE_GRID_WIDTH + x; }
	EDamageSection GetDamageCellSection(int32 cellIndex);
	void AdvanceSnake();
	TSparseArray<int32> snakeCells;
	EOrdinalDirection snakeDir, prevSnakeDir;
	void CreateSnake();
	void CreateDamage(EDamageSection section, int32 amount);
	int32 CreateApple();
	void UpdateDamage(int32 updatedCell, EDamageCell before, EDamageCell after);
	EDamageCell GetBodyCellType(EOrdinalDirection prevDir, EOrdinalDirection currentDir);
	void AppendCell(FString &output, int32 cell, int32 cellType);
	void AppendCellType(FString &output, int32 cellType);
};
