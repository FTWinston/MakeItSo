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
	
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

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

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CardHand)
	TArray<uint8> cardHand;
	void OnReplicated_CardHand(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CardChoice)
	TArray<uint8> cardChoice;
	void OnReplicated_CardChoice(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ChoiceQueueSize)
	uint8 choiceQueueSize;
	void OnReplicated_ChoiceQueueSize(uint8 beforeChange);

	UPROPERTY()
	TQueue<TArray<uint8>> choiceQueue;

	void SendSystemOrder();
	void SendAllDamageLevels();
	void SendDamageLevel(EDamageSystem system, uint8 damageLevel);
	void SendCardChoice();
	void SendQueueSize();
	void SendWholeHand();
	void SendAddCardToHand(uint8 cardID);
	void SendRemoveCardFromHand(uint8 handPosition);

	UFUNCTION(Server, Reliable)
	void ChooseCard(uint8 cardPosition);
#ifdef WEB_SERVER_TEST
	void ChooseCard_Implementation(uint8 cardPosition);
#endif

	UFUNCTION(Server, Reliable)
	void ActivateCard(uint8 cardID, uint8 handPosition, uint8 targetSystemPos);
#ifdef WEB_SERVER_TEST
	void ActivateCard_Implementation(uint8 cardID, uint8 handPosition, uint8 targetSystemPos);
#endif

	UShipSystem *LookupSystem(EDamageSystem system);
	uint8 PickRandomCard();
	FString CombineIDs(const TCHAR *prefix, TArray<uint8> cardIDs);

	UPROPERTY()
	uint16 choiceGeneratedAmount;

	bool RestoreDamage(EDamageSystem system, uint8 amount);
	bool DealDamage(EDamageSystem system, uint8 amount);
	void SetHealth(EDamageSystem system, uint8 newValue);
	void GetRowCells(uint8 testPos, uint8 &outPos1, uint8 &outPos2, uint8 &outPos3);
	void GetColCells(uint8 testPos, uint8 &outPos1, uint8 &outPos2, uint8 &outPos3);
};
