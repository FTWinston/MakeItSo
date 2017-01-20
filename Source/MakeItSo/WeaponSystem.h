#include "CrewManager.h"

#pragma once

/**
 * 
 */

class UWeaponTarget;

//UCLASS()
class MAKEITSO_API UWeaponSystem : public UCrewSystem
{
	//GENERATED_BODY()
public:
	virtual void Init(UCrewManager *manager);
	virtual void ResetData();
	bool ReceiveCrewMessage(ConnectionInfo *info);
	bool ProcessSystemMessage(FString message);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Weapons; }
private:
	void ResetDice();
	void ClearDice();
	void SendDice();
	uint8 Roll();

	#define NUM_DICE 5
	#define MAX_REROLLS 3
	uint8 dice[NUM_DICE];
	bool lockedDice[NUM_DICE];
	uint8 timesRolled;
	TSet<UWeaponTarget> targets;
};


class MAKEITSO_API UWeaponTarget
{
	// id
	// position x, y, z(?)
	// orientation pitch/yaw/roll
	// size/radius
	// status (friendly/hostile/unknown)
	// selected?
};