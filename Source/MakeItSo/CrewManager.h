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
class MAKEITSO_API UCrewManager : public UPlayerInput
{
public:
	virtual void BeginDestroy();

	enum CrewState_t {
		Setup = 0,
		Active = 1,
		Paused = 2
	};

	enum System_t
	{
		Station0 = 0,
		Station1,
		Station2,

		MAX_SHIP_SYSTEMS,

		AllStations,
		NoStations,
		Everyone
	};

	static int EventReceived(mg_connection *conn, enum mg_event ev);

	void Init();
	void Poll() { mg_poll_server(server, 1); }
	int HandleEvent(mg_connection *conn, enum mg_event ev);
	void SendCrewMessage(System_t system, const char *message);

	UFUNCTION(BlueprintCallable, Category = MISUtils)
	FString GetLocalURL();

private:
	void AllocateListenPort();
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int shipSystemIndex, bool adding);

	mg_server *server;

	CrewState_t crewState;
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
