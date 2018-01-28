#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "CrewManager.h"
#include "WeaponSystem.Generated.h"

/**
 * 
 */

class MAKEITSO_API UWeaponTarget
{
	// id
	// position x, y, z(?)
	// orientation pitch/yaw/roll
	// size/radius
	// status (friendly/hostile/unknown)
	// selected?
};

UCLASS()
class MAKEITSO_API UWeaponSystem : public UCrewSystem
{
	GENERATED_BODY()
public:
	virtual void Init(UCrewManager *manager) override;
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) override;
	virtual bool ProcessSystemMessage(FString message) override;
	virtual void SendAllData() override;
protected:
	virtual UCrewManager::ESystem GetSystem() override { return UCrewManager::ESystem::Weapons; }
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