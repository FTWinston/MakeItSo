#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "DamageControlSystem.Generated.h"

/**
 * 
 */

#define MAX_AUX_POWER 5

 UCLASS()
class MAKEITSO_API UDamageControlSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EDamageSystem {
		Damage_Engines = 0,
		Damage_Sensors,
		Damage_Weapons,
		Damage_Shields,
		Damage_DamageControl,
		Damage_Deflector,
		MAX_DAMAGE_SYSTEMS
	};
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::DamageControl; }
private:
	void IncrementAuxPower();
	void AddCardChoice(int32 card1, int32 card2, int32 card3);

	int32 auxPower;
	float powerLevels[MAX_DAMAGE_SYSTEMS];
	void SendAuxPower();
	void SendPowerLevels();
	void SendCardChoice();
	void SendCardLibrary();
	void ActivatePowerCard(int32 cardID);
	FString CombineIDs(const TCHAR *prefix, TSet<int32> cardIDs);
	TQueue<TSet<int32>> cardChoices;
	TSet<int32> cardLibrary;
};
