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
		Damage_Power,
		Damage_Helm,
		Damage_Warp,
		Damage_Weapons,
		Damage_Sensors,
		Damage_Shields,
		Damage_Comms,
		Damage_None,
		NUM_DAMAGE_SYSTEMS = Damage_None
	};

	enum EDiceCombo : uint8 {
		Dice_None = 0,
		Dice_Aces,
		Dice_Twos,
		Dice_Threes,
		Dice_Fours,
		Dice_Fives,
		Dice_Sixes,
		Dice_ThreeOfAKind,
		Dice_FourOfAKind,
		Dice_FullHouse,
		Dice_SmallStraight,
		Dice_LargeStraight,
		Dice_Yahtzee,
		Dice_Chance,
	};

	UDamageControlSystem();
	virtual void ResetData() override;

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;

	void SetSystemHealth(UShipSystem::ESystem system, uint8 health);

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::DamageControl; }
	virtual void UpdateDamageControl(uint8 health) override { } // This system itself doesn't take damage

private:
	// Replicated properties
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_Dice)
	TArray<uint8> dice;
	void OnReplicated_Dice(TArray<uint8> beforeChange);

	UPROPERTY(Replicated)
	uint8 rollsRemaining;

	UPROPERTY(Replicated)
	TArray<uint8> systemHealth;

	UPROPERTY(Replicated)
	TArray<EDiceCombo> systemCombos;


	// Client functions, that can be called from the server
	UFUNCTION(Client, Reliable)
	void SendDice();
#ifdef WEB_SERVER_TEST
	void SendDice_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendRollsRemaining();
#ifdef WEB_SERVER_TEST
	void SendRollsRemaining_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendSystemState(EDamageSystem system);
#ifdef WEB_SERVER_TEST
	void SendSystemState_Implementation(EDamageSystem system);
#endif


	// Server functions, that can be called from the client
	UFUNCTION(Server, Reliable)
	void RollDice(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5);
#ifdef WEB_SERVER_TEST
	void RollDice_Implementation(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5);
#endif

	UFUNCTION(Server, Reliable)
	void ResetDice();
#ifdef WEB_SERVER_TEST
	void ResetDice_Implementation();
#endif

	UFUNCTION(Server, Reliable)
	void ApplyDiceToSystem(EDamageSystem system);
#ifdef WEB_SERVER_TEST
	void ApplyDiceToSystem_Implementation(EDamageSystem system);
#endif


	uint8 Roll();
	UShipSystem *LookupSystem(EDamageSystem system);
	EDamageSystem GetDamageSystem(UShipSystem::ESystem system);
	bool RestoreDamage(EDamageSystem system, uint8 amount);
	EDiceCombo SelectCombo(EDiceCombo currentCombo, uint8 systemHealth);
};
