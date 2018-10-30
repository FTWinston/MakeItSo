#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "DamageControlSystem.Generated.h"

/**
 * 
 */

UCLASS()
class MAKEITSO_API UDamageControlSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EDamageSystem : uint8 {
		Damage_Empty = 0,
		Damage_Power,
		Damage_Helm,
		Damage_Warp,
		Damage_BeamWeapons,
		Damage_Torpedoes,
		Damage_Sensors,
		Damage_Shields,
		Damage_Comms,
		MAX_DAMAGE_SYSTEMS
	};

	UDamageControlSystem();
	virtual void ResetData() override;

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::DamageControl; }
private:
	void AddCardChoice(uint8 card1, uint8 card2, uint8 card3);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_DamageLevels)
	TArray<uint8> damageLevels;
	void OnReplicated_DamageLevels(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SystemOrder)
	TArray<uint8> systemOrder;
	void OnReplicated_SystemOrder(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_DiceValues)
	TArray<uint8> diceValues;
	void OnReplicated_DiceValues(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CardChoice)
	TArray<uint8> cardChoice;
	void OnReplicated_CardChoice(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ChoiceQueueSize)
	uint8 choiceQueueSize;
	void OnReplicated_ChoiceQueueSize(uint8 beforeChange);

	UPROPERTY()
	TQueue<TArray<uint8>> choiceQueue;


	UFUNCTION(Client, Reliable)
	void SendSystemOrder();
#ifdef WEB_SERVER_TEST
	void SendSystemOrder_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendAllDamageLevels();
#ifdef WEB_SERVER_TEST
	void SendAllDamageLevels_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendDamageLevel(EDamageSystem system, uint8 damageLevel);
#ifdef WEB_SERVER_TEST
	void SendDamageLevel_Implementation(EDamageSystem system, uint8 damageLevel);
#endif

	UFUNCTION(Client, Reliable)
	void SendCardChoice();
#ifdef WEB_SERVER_TEST
	void SendCardChoice_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendQueueSize();
#ifdef WEB_SERVER_TEST
	void SendQueueSize_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendWholeHand();
#ifdef WEB_SERVER_TEST
	void SendWholeHand_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendAddCardToHand(uint8 cardID);
#ifdef WEB_SERVER_TEST
	void SendAddCardToHand_Implementation(uint8 cardID);
#endif

	UFUNCTION(Client, Reliable)
	void SendRemoveCardFromHand(uint8 handPosition);
#ifdef WEB_SERVER_TEST
	void SendRemoveCardFromHand_Implementation(uint8 handPosition);
#endif

	UFUNCTION(Server, Reliable)
	void ChooseCard(uint8 cardPosition);
#ifdef WEB_SERVER_TEST
	void ChooseCard_Implementation(uint8 cardPosition);
#endif

	UShipSystem *LookupSystem(EDamageSystem system);
	FString CombineIDs(const TCHAR *prefix, TArray<uint8> cardIDs);

	UPROPERTY()
	uint16 choiceGeneratedAmount;

	bool RestoreDamage(EDamageSystem system, uint8 amount);
	bool DealDamage(EDamageSystem system, uint8 amount);
	void SetHealth(EDamageSystem system, uint8 newValue);
};
