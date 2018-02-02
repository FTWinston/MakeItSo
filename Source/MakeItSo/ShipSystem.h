#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ShipSystem.generated.h"

class UIConnectionInfo;
class UCrewManager;
struct websocket_message;

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

	virtual void ClientInit(UCrewManager *manager) { crewManager = manager; ResetData(); }
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) { return false; }
	virtual bool ProcessSystemMessage(FString message) { return false; }

//	UFUNCTION(Client, Reliable)
	virtual void SendAllData() { }
	
//	UFUNCTION(Client, Reliable)
	virtual void ResetData() { }

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

	virtual UShipSystem::ESystem GetSystem() { return UShipSystem::ESystem::None; }

	UCrewManager* crewManager;

	void SendAllFixed(const char *message);

//	UFUNCTION(Client, Reliable)
	void SendAll(FString message);

	void SendSystemFixed(const char *message);
	
//	UFUNCTION(Client, Reliable)
	void SendSystem(FString message);

	int32 ExtractInt(websocket_message *msg, int offset);
	float ExtractFloat(websocket_message *msg, int offset);
public:	
	// Called every frame
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
};