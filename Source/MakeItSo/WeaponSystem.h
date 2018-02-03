#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WeaponSystem.Generated.h"

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
class MAKEITSO_API UWeaponSystem : public UShipSystem
{
	GENERATED_BODY()
public:
	virtual void BeginPlay() override;
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Weapons; }
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