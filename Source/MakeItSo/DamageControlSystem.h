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
		SnakeBody,
		SnakeHead,
		Apple,
		Damage1,
		Damage2,
		Damage3,
	};

	enum EOrdinalDirection {
		None = 0,
		Up,
		Down,
		Left,
		Right,
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

	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
	virtual void InitData();
	virtual void ResetData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::DamageControl; }
private:
#define DAMAGE_GRID_WIDTH 48
#define DAMAGE_GRID_HEIGHT 36
	int32 damageGrid[DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH];
	void SendDamageGrid();
	inline int32 GetDamageCellIndex(int32 x, int32 y) { return y * DAMAGE_GRID_WIDTH + x; }
	EDamageSection GetDamageCellSection(int32 cellIndex);
	void AdvanceSnake();
	TSparseArray<int32> damageSnakeCells;
	EOrdinalDirection damageSnakeDir, prevDamageSnakeDir;
	void CreateDamageSnake();
	void CreateDamage(EDamageSection section, int32 amount);
	int32 CreateDamageApple();
	void UpdateDamage(int32 updatedCell, EDamageCell before, EDamageCell after);
};
