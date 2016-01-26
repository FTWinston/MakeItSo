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
	int HandleEvent(mg_connection *conn, enum mg_event ev);
	void SendCrewMessage(ESystem system, const char *message);

	UFUNCTION(BlueprintCallable, Category = MISUtils)
	static FString GetLocalURL();
	static int EventReceived(mg_connection *conn, enum mg_event ev);
	
	static UCrewManager *Instance;

private:
	void PauseGame(bool state);
	void AllocateListenPort();
#ifndef WEB_SERVER_TEST
	void InputKey(FKey key, bool down);
	void InputAxis(FKey key, float value);
#endif
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int shipSystemIndex, bool adding);

	static mg_server *server;
	AShipPlayerController *controller;

	ECrewState crewState;
	int nextConnectionIdentifer;
	static const int maxConnectionIdentifer = 26;
	int shipSystemCounts[MAX_SHIP_SYSTEMS];

	TSet<ConnectionInfo*> *currentConnections;
	ConnectionInfo *connectionInSetup;
};

class ConnectionInfo
{
public:
	ConnectionInfo(mg_connection *conn, int id)
	{
		connection = conn;
		identifier = id;
		shipSystemFlags = 0;
	}

	mg_connection *connection;
	int identifier;
	int shipSystemFlags;
};
