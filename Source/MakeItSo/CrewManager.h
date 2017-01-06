// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#ifndef WEB_SERVER_TEST
#include "GameFramework/PlayerInput.h"
#endif
#include "Mongoose.h"
#include "CrewManager.Generated.h"

#define MAX_CREW_CONNECTIONS 26

class ConnectionInfo;
class AShipPlayerController;
class UCrewSystem;

/**
*
*/
UCLASS()
class MAKEITSO_API UCrewManager : public UObject
{
	GENERATED_BODY()

public:
	enum ECrewState {
		Setup = 0,
		Active = 1,
		Paused = 2
	};

	enum ESystem
	{
		Helm = 0,
		ViewScreen,
		Communications,
		Sensors,
		Weapons,
		Shields,
		DamageControl,
		PowerManagement,
		Deflector,

		MAX_SHIP_SYSTEMS,

		AllStations,
		NoStations,
		Everyone
	};

	FString Init(AShipPlayerController *controller);
	virtual void BeginDestroy();

	void LinkController(AShipPlayerController *controller);
	void Poll() { mg_poll_server(server, 1); }
	int32 HandleEvent(mg_connection *conn, enum mg_event ev);
	void SendCrewMessage(ESystem system, const char *message, ConnectionInfo *exclude = nullptr);
	void SendAllCrewData();
	void ProcessSystemMessage(ESystem system, FString message);

	UFUNCTION(BlueprintCallable, Category = MISUtils)
	static FString GetLocalURL();
	static int32 EventReceived(mg_connection *conn, enum mg_event ev);
	
	static UCrewManager *Instance;

#ifndef WEB_SERVER_TEST
	void InputKey(FKey key, bool down);
	void InputAxis(FKey key, float value);
#endif

private:
	void CreateSystems();
	void ResetData();
	void PauseGame(bool state);
	void AllocateListenPort();
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int32 GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int32 shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int32 shipSystemIndex, bool adding);

	static mg_server *server;
	AShipPlayerController *controller;
	TMap<ESystem, UCrewSystem*> systems;

	ECrewState crewState;
	int32 nextConnectionIdentifer;
	static const int32 maxConnectionIdentifer = 26;
	int32 shipSystemCounts[MAX_SHIP_SYSTEMS];

	TSet<ConnectionInfo*> *currentConnections;
	ConnectionInfo *connectionInSetup;
};

class ConnectionInfo
{
public:
	ConnectionInfo(mg_connection *conn, int32 id)
	{
		connection = conn;
		identifier = id;
		shipSystemFlags = 0;
	}

	mg_connection *connection;
	int32 identifier;
	int32 shipSystemFlags;
};



UCLASS()
class MAKEITSO_API UCrewSystem : public UObject
{
	GENERATED_BODY()

public:
	void Init(UCrewManager *manager) { crewManager = manager; }
	virtual bool ReceiveCrewMessage(ConnectionInfo *info) = 0;
	virtual bool ProcessSystemMessage(FString message) { return false; };
	virtual void SendAllData() { }
	virtual void ResetData() { }
protected:
	void SendCrewMessage(const char *message, ConnectionInfo *exclude = nullptr) { crewManager->SendCrewMessage(GetSystem(), message, exclude); }
	UCrewManager* crewManager;
	virtual UCrewManager::ESystem GetSystem() = 0;
};


UCLASS()
class MAKEITSO_API UHelmSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Helm; }
};


UCLASS()
class MAKEITSO_API UViewscreenSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::ViewScreen; }
private:
	void DetermineViewTarget(const char* targetIdentifier);
	void DetermineTargetAngles();
	void SendViewAngles();
	void SendViewZoomDist();
	float viewPitch, viewYaw, viewZoom, viewChaseDist;
	bool viewComms, viewChase;
	UObject *viewTarget;
	const float viewAngleStep = 15, viewZoomStep = 1.5f, minZoomFactor = 1, maxZoomFactor = 1000000, minChaseDist = 10, maxChaseDist = 10000;
};


UCLASS()
class MAKEITSO_API UShieldSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Shields; }
private:
	void SendShieldFocus();
	bool shieldsUp;
	int32 shieldFocus;
};


UCLASS()
class MAKEITSO_API UPowerSystem : public UCrewSystem
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

	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
	virtual bool ProcessSystemMessage(FString message);

	void IncrementAuxPower();
	void AddCardChoice(int32 card1, int32 card2, int32 card3);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::PowerManagement; }
private:
	int32 auxPower;
	#define MAX_AUX_POWER 5
	float powerLevels[MAX_POWER_SYSTEMS];
	void SendAuxPower();
	void SendPowerLevels();
	void SendCardChoice();
	void SendCardLibrary();
	void ActivatePowerCard(int32 cardID);
	std::string CombineIDs(const char *prefix, TSet<int32> cardIDs);
	TQueue<TSet<int32>> cardChoices;
	TSet<int32> cardLibrary;
};


UCLASS()
class MAKEITSO_API UDamageControlSystem : public UCrewSystem
{
	GENERATED_BODY()

public:

	enum EDamageCell {
		Empty = 0,
		Wall,
		SnakeBody,
		SnakeHead,
		Apple,
		Damage1,
		Damage2,
		Damage3,
	};

	enum EOrdinalDirection {
		None = 0,
		Up,
		Down,
		Left,
		Right,
	};

	enum EDamageSection {
		Section_Any = 0,
		Section_Manoevering = 1,
		Section_Shields = 2,
		Section_BeamWeapons = 3,
		Section_Deflector = 4,
		Section_Power = 5,
		Section_Torpedoes = 6,
		Section_Warp = 7,
		Section_Sensors = 8,
		Section_Communications = 9,
	};

	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
	virtual void ResetData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::DamageControl; }
private:
	#define DAMAGE_GRID_WIDTH 48
	#define DAMAGE_GRID_HEIGHT 36
	int32 damageGrid[DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH]{ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	void SendDamageGrid();
	inline int32 GetDamageCellIndex(int32 x, int32 y) { return y * DAMAGE_GRID_WIDTH + x; }
	EDamageSection GetDamageCellSection(int32 cellIndex);
	void AdvanceSnake();
	TSet<int32> damageSnakeCells;
	EOrdinalDirection damageSnakeDir, prevDamageSnakeDir;
	void CreateDamageSnake();
	void CreateDamage(EDamageSection section, int32 amount);
	int32 CreateDamageApple();
	void UpdateDamage(int32 updatedCell, EDamageCell before, EDamageCell after);
};


UCLASS()
class MAKEITSO_API UWeaponSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Weapons; }
};


UCLASS()
class MAKEITSO_API USensorSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Sensors; }
};


UCLASS()
class MAKEITSO_API UCommunicationSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Communications; }
};


UCLASS()
class MAKEITSO_API UDeflectorSystem : public UCrewSystem
{
	GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Deflector; }
};