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
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CurrentTargetCodes)
	TArray<uint16> currentTargetCodes;
	void OnReplicated_CurrentTargetCodes(TArray<uint16> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendTargetCodes();
#ifdef WEB_SERVER_TEST
	void SendTargetCodes_Implementation();
#endif

	UFUNCTION(Server, Reliable)
	void Fire();
#ifdef WEB_SERVER_TEST
	void Fire_Implementation();
#endif
};