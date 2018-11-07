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
		Power_Helm = 0,
		Power_Warp,
		Power_Weapons,
		Power_Sensors,
		Power_Shields,
		Power_DamageControl,
		Power_Comms,
		Power_None,
		NUM_POWER_SYSTEMS = Power_None
	};
	
	UPowerSystem();
	virtual void ResetData() override;

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

	void SetSystemPower(UShipSystem::ESystem system, uint8 power);

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::PowerManagement; }

private:
	// Replicated properties
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_OverallPower)
	uint16 overallPower;
	void OnReplicated_OverallPower(uint16 beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_PowerLevels)
	TArray<uint8> powerLevels;
	void OnReplicated_PowerLevels(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CardHand)
	TArray<uint8> cardHand;
	void OnReplicated_CardHand(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CardChoice)
	TArray<uint8> cardChoice;
	void OnReplicated_CardChoice(TArray<uint8> beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ChoiceQueueSize)
	uint8 choiceQueueSize;
	void OnReplicated_ChoiceQueueSize(uint8 beforeChange);

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_AuxPowerGenerationProgress)
	uint16 auxPowerGenerationProgress;
	void OnReplicated_AuxPowerGenerationProgress(uint8 beforeChange);

	UPROPERTY()
	TQueue<TArray<uint8>> choiceQueue;


	// Client functions, that can be called from the server
	UFUNCTION(Client, Reliable)
	void SendOverallPower(uint16 overallPower);
#ifdef WEB_SERVER_TEST
	void SendOverallPower_Implementation(uint16 overallPower);
#endif

	UFUNCTION(Client, Reliable)
	void SendAllPowerLevels();
#ifdef WEB_SERVER_TEST
	void SendAllPowerLevels_Implementation();
#endif

	UFUNCTION(Client, Reliable)
	void SendPowerLevel(EPowerSystem system, uint8 powerLevel);
#ifdef WEB_SERVER_TEST
	void SendPowerLevel_Implementation(EPowerSystem system, uint8 powerLevel);
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
	void SendGeneration();
#ifdef WEB_SERVER_TEST
	void SendGeneration_Implementation();
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


	// Server functions, that can be called from the client
	UFUNCTION(Server, Reliable)
	void ChooseCard(int8 cardPosition);
#ifdef WEB_SERVER_TEST
	void ChooseCard_Implementation(int8 cardPosition);
#endif

	UFUNCTION(Server, Reliable)
	void ActivateCard(uint8 cardID, uint8 handPosition, uint8 targetSystemPos);
#ifdef WEB_SERVER_TEST
	void ActivateCard_Implementation(uint8 cardID, uint8 handPosition, uint8 targetSystemPos);
#endif

	UFUNCTION(Server, Reliable)
	void ToggleSystem(EPowerSystem system);
#ifdef WEB_SERVER_TEST
	void ToggleSystem_Implementation(EPowerSystem system);
#endif

private:
	void AddAuxPower(int16 amount);
	void RemoveAuxPower(int16 amount);

	UShipSystem *LookupSystem(EPowerSystem system);
	EPowerSystem GetPowerSystem(UShipSystem::ESystem system);

	uint8 PickRandomCard();
	FString CombineIDs(const TCHAR *prefix, TArray<uint8> cardIDs);

	void AddCardChoice(uint8 card1, uint8 card2, uint8 card3);
	bool AddPower(EPowerSystem system, uint8 amount);
	bool ReducePower(EPowerSystem system, uint8 amount);
};
