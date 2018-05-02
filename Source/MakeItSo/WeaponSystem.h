#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "WeaponSystem.Generated.h"

UCLASS()
class MAKEITSO_API UWeaponSystem : public UShipSystem
{
	GENERATED_BODY()
public:
	UWeaponSystem();
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::Weapons; }
private:
	uint8 Roll();

	TArray<uint8> GetDiceFromCode(uint16 code);
	uint16 GetCodeFromDice(TArray<uint8> dice);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_Dice)
	TArray<uint8> dice;
	void OnReplicated_Dice(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_RollsRemaining)
	uint8 rollsRemaining;
	void OnReplicated_RollsRemaining(uint8 beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CurrentTargetCodes)
	TArray<uint16> currentTargetCodes;
	void OnReplicated_CurrentTargetCodes(TArray<uint16> beforeChange);

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
	void SendTargetCodes();
#ifdef WEB_SERVER_TEST
	void SendTargetCodes_Implementation();
#endif

	UFUNCTION(Server, Reliable)
	void RollDice(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5);
#ifdef WEB_SERVER_TEST
	void RollDice_Implementation(bool roll1, bool roll2, bool roll3, bool roll4, bool roll5);
#endif

	UFUNCTION(Server, Reliable)
	void Fire();
#ifdef WEB_SERVER_TEST
	void Fire_Implementation();
#endif

	UFUNCTION(Server, Reliable)
	void ResetDice();
#ifdef WEB_SERVER_TEST
	void ResetDice_Implementation();
#endif
};