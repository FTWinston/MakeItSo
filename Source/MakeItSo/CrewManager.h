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

	enum EPowerSystem {
		Power_Engines = 0,
		Power_Sensors,
		Power_Weapons,
		Power_Shields,
		Power_DamageControl,
		Power_Deflector,
		MAX_POWER_SYSTEMS
	};

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

	FString Init(AShipPlayerController *controller);
	virtual void BeginDestroy();

	void LinkController(AShipPlayerController *controller);
	void Poll() { mg_poll_server(server, 1); }
	int32 HandleEvent(mg_connection *conn, enum mg_event ev);
	void SendCrewMessage(ESystem system, const char *message, ConnectionInfo *exclude = nullptr);
	void SendAllCrewData();

	UFUNCTION(BlueprintCallable, Category = MISUtils)
	static FString GetLocalURL();
	static int32 EventReceived(mg_connection *conn, enum mg_event ev);
	
	static UCrewManager *Instance;

	void IncrementAuxPower();
	void AddCardChoice(int32 card1, int32 card2, int32 card3);
private:
	void ResetData();
	void PauseGame(bool state);
	void AllocateListenPort();
#ifndef WEB_SERVER_TEST
	void InputKey(FKey key, bool down);
	void InputAxis(FKey key, float value);
#endif
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int32 GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int32 shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int32 shipSystemIndex, bool adding);

	static mg_server *server;
	AShipPlayerController *controller;

	ECrewState crewState;
	int32 nextConnectionIdentifer;
	static const int32 maxConnectionIdentifer = 26;
	int32 shipSystemCounts[MAX_SHIP_SYSTEMS];

	TSet<ConnectionInfo*> *currentConnections;
	ConnectionInfo *connectionInSetup;

	// viewscreen
	void DetermineViewTarget(const char* targetIdentifier);
	void DetermineTargetAngles();
	void SendViewAngles();
	void SendViewZoomDist();
	float viewPitch, viewYaw, viewZoom, viewChaseDist;
	bool viewComms, viewChase;
	UObject *viewTarget;
	const float viewAngleStep = 15, viewZoomStep = 1.5f, minZoomFactor = 1, maxZoomFactor = 1000000, minChaseDist = 10, maxChaseDist = 10000;

	// shields
	void SendShieldFocus();
	bool shieldsUp;
	int32 shieldFocus;

	// power management
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

	// damage control
	#define DAMAGE_GRID_WIDTH 48
	#define DAMAGE_GRID_HEIGHT 36
	int32 damageGrid[DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
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
