#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#else
enum ELevelTick { Fake };
class FActorComponentTickFunction { };
class FTickFunction
{
public:
	bool bCanEverTick;
	float TickInterval;
	void SetTickFunctionEnable(bool val) { ticking = val; }
	bool IsTickFunctionEnabled() { return ticking; }
private:
	bool ticking = true;
};

class UActorComponent {
public:
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) {}
	bool IsComponentTickEnabled() { return PrimaryComponentTick.IsTickFunctionEnabled(); }
	float GetComponentTickInterval() { return PrimaryComponentTick.TickInterval; }
protected:
	FTickFunction PrimaryComponentTick;
	virtual void BeginPlay() {}
	void SetIsReplicated(bool val) {}
};
#endif
#include "ShipSystem.generated.h"

class UIConnectionInfo;
class UCrewManager;
struct websocket_message;

#define MAX_SYSTEM_POWER 150

#define MAX_SYSTEM_HEALTH (uint8)100
#define MIN_SYSTEM_HEALTH 0

UCLASS( abstract, ClassGroup=(Systems) )
class MAKEITSO_API UShipSystem : public UActorComponent
{
	GENERATED_BODY()

public:
	UShipSystem();

	enum ESystem
	{
		Helm = 1,
		Warp = 2,
		Weapons = 4,
		Sensors = 8,
		PowerManagement = 16,
		DamageControl = 32,
		ViewScreen = 64,
		Communications = 128,

		All = Helm + Warp + Weapons + Sensors + PowerManagement + DamageControl + ViewScreen + Communications,
		None = 0,
	};

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) { return false; }
	
	UFUNCTION(Client, Reliable)
	virtual void SendAllData();
#ifdef WEB_SERVER_TEST
	virtual void SendAllData_Implementation();
#endif
	
//	UFUNCTION(Client, Reliable)
	virtual void ResetData() { }

#ifdef WEB_SERVER_TEST
	void CallBeginPlay() { BeginPlay(); }
#endif

	UFUNCTION(Server, Reliable)
	void TakeDamage(uint8 damageAmount);
#ifdef WEB_SERVER_TEST
	void TakeDamage_Implementation(uint8 damageAmount);
#endif
	
	UFUNCTION(Server, Reliable)
	void RestoreDamage(uint8 restoreAmount);
#ifdef WEB_SERVER_TEST
	void RestoreDamage_Implementation(uint8 damageAmount);
#endif

	UFUNCTION(Server, Reliable)
	virtual void SetPowerLevel(uint8 newLevel);
#ifdef WEB_SERVER_TEST
	virtual void SetPowerLevel_Implementation(uint8 newLevel);
#endif

	uint8 GetHealthLevel() { return systemHealth; }
	uint8 GetPowerLevel() { return systemPower; }

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

	virtual UShipSystem::ESystem GetSystem() { return UShipSystem::ESystem::None; }
	virtual void ApplySystemDamage(uint8 prevValue, uint8 newValue) {}
	virtual void RepairSystemDamage(uint8 prevValue, uint8 newValue) {}

	UCrewManager* crewManager;

	void SendAllFixed(const char *message);

//	UFUNCTION(Client, Reliable)
	void SendAll(FString message);

	void SendSystemFixed(const char *message);
	
//	UFUNCTION(Client, Reliable)
	void SendSystem(FString message);

	int32 ExtractInt(websocket_message *msg, int offset);
	float ExtractFloat(websocket_message *msg, int offset);
	TArray<FString> SplitParts(websocket_message *msg, int offset);

	virtual void UpdateDamageControl(uint8 health);
private:

	UPROPERTY(Replicated)
	uint8 systemHealth;

	UPROPERTY(Replicated)
	uint8 systemPower;
};