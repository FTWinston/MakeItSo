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

	virtual void ApplySystemDamage(uint8 prevValue, uint8 newValue) override;
	virtual void RepairSystemDamage(uint8 prevValue, uint8 newValue) override;
private:
	// Replicated properties
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_Dice)
	TArray<uint8> dice;
	void OnReplicated_Dice(TArray<uint8> beforeChange) { SendDice(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_RollsRemaining)
	uint8 rollsRemaining;
	void OnReplicated_RollsRemaining(uint8 beforeChange) { SendRollsRemaining(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SystemHealth)
	TArray<uint8> systemHealth;
	void OnReplicated_SystemHealth(TArray<uint8> beforeChange) { SendSystemHealth(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SelectedSystem)
	EDamageSystem selectedSystem;
	void OnReplicated_SelectedSystem(EDamageSystem beforeChange) { SendSelectedSystem(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_AvailableCombos)
	TArray<EDiceCombo> availableCombos;
	void OnReplicated_AvailableCombos(TArray<EDiceCombo> beforeChange) { SendAvailableCombos(); }


	// Client functions, that can be called from the server
	UFUNCTION(Client, Reliable)
	void SendDice()
#ifdef WEB_SERVER_TEST
	{
		SendDice_Implementation();
	}
	void SendDice_Implementation();
#endif
	;
	
	UFUNCTION(Client, Reliable)
	void SendRollsRemaining()
#ifdef WEB_SERVER_TEST
	{ SendRollsRemaining_Implementation(); }
	void SendRollsRemaining_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendSystemHealth()
#ifdef WEB_SERVER_TEST
	{ SendSystemHealth_Implementation(); }
	void SendSystemHealth_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendSelectedSystem()
#ifdef WEB_SERVER_TEST
	{ SendSelectedSystem_Implementation(); }
	void SendSelectedSystem_Implementation();
#endif
	;

	UFUNCTION(Client, Reliable)
	void SendAvailableCombos()
#ifdef WEB_SERVER_TEST
	{ SendAvailableCombos_Implementation(); }
	void SendAvailableCombos_Implementation();
#endif
	;


	// Server functions, that can be called from the client
	UFUNCTION(Server, Reliable)
	void SelectSystem(EDamageSystem system)
#ifdef WEB_SERVER_TEST
	{ SelectSystem_Implementation(system); }
	void SelectSystem_Implementation(EDamageSystem system);
#endif
	;

	UFUNCTION(Server, Reliable)
	void ToggleSystemPower(bool enabled)
#ifdef WEB_SERVER_TEST
	{ ToggleSystemPower_Implementation(enabled); }
	void ToggleSystemPower_Implementation(bool enabled);
#endif
	;

	UFUNCTION(Server, Reliable)
	void RollDice(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5)
#ifdef WEB_SERVER_TEST
	{ RollDice_Implementation(roll1, roll2, roll3, roll4, roll5); }
	void RollDice_Implementation(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5);
#endif
	;

	UFUNCTION(Server, Reliable)
	void ApplyDiceToCombo(uint8 comboIndex)
#ifdef WEB_SERVER_TEST
	{ ApplyDiceToCombo_Implementation(comboIndex); }
	void ApplyDiceToCombo_Implementation(uint8 comboIndex);
#endif
	;

private:
	void ResetDice();
	void AllocateCombos(uint8 systemHealth);
	uint8 Roll();
	uint8 GetNumRerolls();
	uint8 GetNumRollableDice(uint8 healthLevel);
	uint8 GetDiceScore(EDiceCombo combo);
	UShipSystem *LookupSystem(EDamageSystem system);
	EDamageSystem GetDamageSystem(UShipSystem::ESystem system);
	bool RestoreDamage(EDamageSystem system, uint8 amount);

	uint8 SumOfNumber(uint8 number);
	uint8 SumOfAKind(uint8 number);
};
