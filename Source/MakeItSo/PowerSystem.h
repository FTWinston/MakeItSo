#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "PowerSystem.Generated.h"

UCLASS()
class MAKEITSO_API UPowerSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EPowerSystem {
		Power_Engines = 0,
		Power_Sensors,
		Power_Weapons,
		Power_Shields,
		Power_DamageControl,
		Power_Deflector,
		MAX_POWER_SYSTEMS
	};

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::PowerManagement; }
private:
	void IncrementAuxPower();
	void AddCardChoice(int32 card1, int32 card2, int32 card3);

	int32 auxPower;
#define MAX_AUX_POWER 5
	float powerLevels[MAX_POWER_SYSTEMS];
	void SendAuxPower();
	void SendPowerLevels();
	void SendCardChoice();
	void SendCardLibrary();
	void ActivatePowerCard(int32 cardID);
	FString CombineIDs(const TCHAR *prefix, TSet<int32> cardIDs);
	TQueue<TSet<int32>> cardChoices;
	TSet<int32> cardLibrary;
};
