// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#ifndef WEB_SERVER_TEST
#include "GameFramework/PlayerInput.h"
#endif
#include "Mongoose.h"

#define MAX_CREW_CONNECTIONS 26

class ConnectionInfo;

/**
*
*/
class MAKEITSO_API UCrewManager : public UObject
{
public:
	enum ECrewState {
		Setup = 0,
		Active = 1,
		Paused = 2
	};

	enum ESystem
	{
		Station0 = 0,
		Station1,
		Station2,

		MAX_SHIP_SYSTEMS,

		AllStations,
		NoStations,
		Everyone
	};

	void Init(APlayerController *controller);
	virtual void BeginDestroy();

	void LinkController(APlayerController *controller);
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
#endif
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int shipSystemIndex, bool adding);

	static mg_server *server;
	APlayerController *controller;

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
