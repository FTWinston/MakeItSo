// Fill out your copyright notice in the Description page of Project Settings.

#include "MakeItSo.h"
#include "CrewManager.h"
#include "InterfaceUtilities.h"

#include <stdio.h>
#include <stdarg.h>
#include <tchar.h>

#if defined(_MSC_VER) && _MSC_VER < 1900
#define snprintf _snprintf_s
#endif

UCrewManager *UCrewManager::Instance = NULL;

int EventReceived(mg_connection *conn, enum mg_event ev)
{
	return UCrewManager::Instance->HandleEvent(conn, ev);
}

void UCrewManager::Init()
{
	Instance = this;

	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
		shipSystemCounts[i] = 0;
	
	mg_handler_t handler = EventReceived;
	server = mg_create_server(NULL, handler);
	mg_set_option(server, "document_root", "../WebRoot");
	mg_set_option(server, "listening_port", "8080");

	// display address info that web clients should connect to
	APlayerController* PlayerController = GetOuterAPlayerController();
	FString port = FString(mg_get_option(server, "listening_port"));
	PlayerController->ClientMessage(FString::Printf(TEXT("Local address is %s:%s\n"), 
		*InterfaceUtilities::GetLocalIP(),
		*port
	));
}

UCrewManager::~UCrewManager()
{
	mg_destroy_server(&server);

	if (Instance == this)
		Instance = NULL;
}

void UCrewManager::SetupConnection(mg_connection *conn)
{
	int identifier = GetNewUniqueIdentifier();
	if (identifier == -1)
	{
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "full");
		return;
	}

	ConnectionInfo *info = new ConnectionInfo(conn, identifier);
	conn->connection_param = info;

	currentConnections.insert(info);

	// Send connection ID back to the client.
	mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "id %c", 'A' + info->identifier);
	
	APlayerController* PlayerController = GetOuterAPlayerController();
	//PlayerController->ClientMessage(FString::Printf(TEXT("Client %c connected from %s\n"), 'A' + info->identifier, *conn->remote_ip));

	// update this client as to whether or not each system is currently claimed
	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
	{
		if (shipSystemCounts[i] > 0)
			mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "sys- %i", i);
	}

	// if someone is in setup, tell this client
	if (connectionInSetup != NULL)
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "setup-");
}

void UCrewManager::EndConnection(mg_connection *conn)
{
	ConnectionInfo *info = (ConnectionInfo*)conn->connection_param;

	APlayerController* PlayerController = GetOuterAPlayerController();
	//PlayerController->ClientMessage(FString::Printf(TEXT("Client %c disconnected\n"), 'A' + info->identifier));

	currentConnections.erase(info);

	// decrement the counts of each system this user was using
	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
	{
		int shipSystemFlag = 1 << i;
		if ((info->shipSystemFlags & shipSystemFlag) == 0)
			continue;

		shipSystemCounts[i]--;
		SendSystemSelectionMessage(info, i, false);
	}

	if (connectionInSetup == info)
	{
		ConnectionInfo *other;
		connectionInSetup = NULL;

		// send "setup not in use" message to all
		for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
		{
			other = *it;
			mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "setup+");
		}
	}
}

int UCrewManager::GetNewUniqueIdentifier()
{
	int identifier;
	int numChecked = 0;
	do
	{
		identifier = nextConnectionIdentifer++;
		if (identifier >= MAX_CREW_CONNECTIONS)
		{
			identifier = 0;
			nextConnectionIdentifer = 1;
		}

		// has user with this ID?
		bool alreadyGot = false;
		for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
			if ((*it)->identifier == identifier)
			{
			alreadyGot = true;
			break;
			}
		if (!alreadyGot)
			return identifier;

		if (++numChecked == MAX_CREW_CONNECTIONS)
			return -1;
	} while (true);
}

int UCrewManager::HandleEvent(mg_connection *conn, enum mg_event ev)
{
	switch (ev)
	{
	case MG_AUTH:
		return MG_TRUE;
	case MG_REQUEST:
		if (conn->is_websocket)
		{
			ConnectionInfo *info = (ConnectionInfo*)conn->connection_param;
			HandleWebsocketMessage(info);
			return MG_TRUE;
		}
		return MG_FALSE;
	case MG_WS_CONNECT:
		SetupConnection(conn);
		return MG_FALSE;
	case MG_CLOSE:
		if (conn->is_websocket)
			EndConnection(conn);

		free(conn->connection_param);
		return MG_TRUE;
	default:
		return MG_FALSE;
	}
}

void UCrewManager::HandleWebsocketMessage(ConnectionInfo *info)
{
#define STARTS_WITH(info, prefix) info->connection->content_len > sizeof(prefix) - 1 && !memcmp(info->connection->content, prefix, sizeof(prefix) - 1)
#define MATCHES(info, prefix)     info->connection->content_len >= sizeof(prefix) - 1 && !memcmp(info->connection->content, prefix, sizeof(prefix) - 1)

#define EXTRACT(info, buffer, offset) snprintf(buffer, sizeof(buffer), "%.*s", (int)info->connection->content_len - sizeof(offset) + 1, info->connection->content + sizeof(offset) - 1)

	//printf("received: %.*s\n", content_len, content);
	if (STARTS_WITH(info, "+sys ") || STARTS_WITH(info, "-sys "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "+sys ");
		int systemIndex = atoi(buffer);
		ShipSystemChanged(info, systemIndex, info->connection->content[0] == '+');
	}
	else if (MATCHES(info, "+setup"))
	{
		if (connectionInSetup != NULL)
			return;

		connectionInSetup = info;

		// send "show setup" message to this user
		mg_websocket_printf(info->connection, WEBSOCKET_OPCODE_TEXT, "setup");

		// send "setup in use" message to all others
		ConnectionInfo *other;
		for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
		{
			other = *it;
			if (other != info)
				mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "setup-");
		}
	}
	else if (MATCHES(info, "-setup"))
	{
		if (connectionInSetup != info)
			return;

		connectionInSetup = NULL;

		// send "setup not in use" message to all
		ConnectionInfo *other;
		for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
		{
			other = *it;
			if (other != info)
				mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "setup+");
		}
	}
	/* ship name = player name
	else if (STARTS_WITH(info, "name "))
	{
		if (connectionInSetup != info)
			return;

		char buffer[128];
		EXTRACT(info, buffer, "name ");

		name = std::string(buffer);
	}
	*/
	else if (MATCHES(info, "startGame"))
	{
		if (connectionInSetup != info)
			return;

		connectionInSetup = NULL; // game started, no one is setting it up anymore

		SendCrewMessage(System_t::All, "game+"); // game started
	}
	else if (MATCHES(info, "+forward"))
	{
		InputKey(EKeys::W, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-forward"))
	{
		InputKey(EKeys::W, EInputEvent::IE_Released, 0, false);
	}
}

void UCrewManager::ShipSystemChanged(ConnectionInfo *info, int shipSystemIndex, bool adding)
{
	if (shipSystemIndex < 0 || shipSystemIndex >= MAX_SHIP_SYSTEMS)
		return;

	int shipSystemFlag = 1 << shipSystemIndex;

	// check if this client already has / doesn't have this shipSystem, and do nothing if so
	bool alreadyHas = (info->shipSystemFlags & shipSystemFlag) != 0;
	if (alreadyHas == adding)
		return;

	if (adding)
		info->shipSystemFlags |= shipSystemFlag;
	else
		info->shipSystemFlags &= ~shipSystemFlag;
	shipSystemCounts[shipSystemIndex] += adding ? 1 : -1;

	SendSystemSelectionMessage(info, shipSystemIndex, adding);
}

void UCrewManager::SendSystemSelectionMessage(ConnectionInfo *info, int shipSystemIndex, bool adding)
{
	ConnectionInfo *other;

	int count = shipSystemCounts[shipSystemIndex];
	if (!adding)
		if (count > 1)
			return; // do nothing, cos multiple people still use this
		else if (count == 1)
		{
			int shipSystemFlag = 1 << shipSystemIndex;

			// find the one user using this system, and tell them its not in use by anyone else
			for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
			{
				other = *it;

				if (info == other)
					continue;

				if ((other->shipSystemFlags & shipSystemFlag) != 0)
				{
					mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "sys+ %i", shipSystemIndex);
					break;
				}
			}
			return;
		}

	for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
	{
		other = *it;
		// don't tell the player selecting a system whether it is now in use... they know
		if (info == other)
			continue;

		mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "sys%c %i", adding ? '-' : '+', shipSystemIndex);
	}
}

void UCrewManager::SendCrewMessage(System_t system, const char *message, ...)
{
	int systemFlags = 1 << (int)system;

	va_list args;
	va_start(args, message);

	ConnectionInfo *other;
	for (auto it = currentConnections.begin(); it != currentConnections.end(); it++)
	{
		other = *it;

		if ((other->shipSystemFlags & systemFlags) != 0)
			mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, message, args);
	}

	va_end(args);
}