// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#ifndef WEB_SERVER_TEST
#include "GameFramework/PlayerInput.h"
#endif
#include "Mongoose.h"
#include <set>
#include <string>

#define MAX_CREW_CONNECTIONS 26

class ConnectionInfo;

/**
*
*/
class MAKEITSO_API UCrewManager : public UPlayerInput
{
public:
	~UCrewManager();

	enum System_t
	{
		All = ~0,
		Station0 = 0,
		Station1,
		Station2,

		MAX_SHIP_SYSTEMS
	};

	static UCrewManager *Instance;

	void Init();
	void Poll() { mg_poll_server(server, 100); }
	int HandleEvent(mg_connection *conn, enum mg_event ev);
	void SendCrewMessage(System_t system, const char *message, ...);

private:
	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int shipSystemIndex, bool adding);

	mg_server *server = NULL;

	int nextConnectionIdentifer = 0;
	const int maxConnectionIdentifer = 26;
	int shipSystemCounts[MAX_SHIP_SYSTEMS];

	std::set<ConnectionInfo*> currentConnections;
	ConnectionInfo *connectionInSetup = NULL;
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
