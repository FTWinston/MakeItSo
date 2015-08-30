// Fill out your copyright notice in the Description page of Project Settings.

#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif

#include "CrewManager.h"

#ifndef WEB_SERVER_TEST
#include "InterfaceUtilities.h"
#endif

#include <stdio.h>
#include <stdarg.h>
#include <tchar.h>

#if defined(_MSC_VER) && _MSC_VER < 1900
#define snprintf _snprintf_s
#endif

int UCrewManager::EventReceived(mg_connection *conn, enum mg_event ev)
{
	auto crewManager = (UCrewManager*)conn->server_param;
	return crewManager->HandleEvent(conn, ev);
}

void UCrewManager::Init()
{
	nextConnectionIdentifer = 0;
	connectionInSetup = NULL;
	currentConnections = new TSet<ConnectionInfo*>();

	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
		shipSystemCounts[i] = 0;
	
	server = mg_create_server(this, EventReceived);
#ifdef WEB_SERVER_TEST
	mg_set_option(server, "document_root", "../WebRoot");
#else
	FString rootPath = FPaths::GameDir() / TEXT("WebRoot");
	mg_set_option(server, "document_root", TCHAR_TO_ANSI(*rootPath));
#endif

	AllocateListenPort();
	FString url = GetLocalURL();

#ifndef WEB_SERVER_TEST
	// display address info that web clients should connect to
	APlayerController* PlayerController = GetOuterAPlayerController();
	PlayerController->ClientMessage(FString::Printf(TEXT("Local address is %s\n"), *url));
#endif
}

void UCrewManager::BeginDestroy()
{
	if (server)
		mg_destroy_server(&server);
	
	delete currentConnections;

#ifndef WEB_SERVER_TEST
	Super::BeginDestroy();
#endif
}

void UCrewManager::AllocateListenPort()
{
	// try port 80 for user convenience
	const char *error = mg_set_option(server, "listening_port", "80");
	if (!error)
		return;

	// if that's in use, try port 8080
	error = mg_set_option(server, "listening_port", "8080");
	if (!error)
		return;

	// failing that, select a port automatically
	error = mg_set_option(server, "listening_port", "0");
	if (!error)
		return;

#ifndef WEB_SERVER_TEST
	APlayerController* PlayerController = GetOuterAPlayerController();
	PlayerController->ClientMessage(FString::Printf(TEXT("An error occurred setting up the web server: %s\n"), *FString(error)));
#endif
}

FString UCrewManager::GetLocalURL()
{
	const char *port = mg_get_option(server, "listening_port");
	bool showPort = strcmp(port, "80") != 0;
	
	FString ipAddress = InterfaceUtilities::GetLocalIP();

	if (!showPort)
		return ipAddress;

	return FString::Printf(TEXT("%s:%s\n"), *ipAddress, *FString(port));
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

	currentConnections->Add(info);

	// Send connection ID back to the client.
	mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "id %c", 'A' + info->identifier);
	
#ifndef WEB_SERVER_TEST
	APlayerController* PlayerController = GetOuterAPlayerController();
	PlayerController->ClientMessage(FString::Printf(TEXT("Client %c connected from %s\n"), 'A' + info->identifier, ANSI_TO_TCHAR(conn->remote_ip)));
#endif

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

#ifndef WEB_SERVER_TEST
	APlayerController* PlayerController = GetOuterAPlayerController();
	PlayerController->ClientMessage(FString::Printf(TEXT("Client %c disconnected\n"), 'A' + info->identifier));
#endif

	currentConnections->Remove(info);

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
		connectionInSetup = NULL;

		// send "setup not in use" message to all
		for (auto& other : *currentConnections)
		{
			mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "setup+");
		}
	}

	delete info;
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
		for (auto& other : *currentConnections)
			if (other->identifier == identifier)
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
		for (auto& other : *currentConnections)
		{
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
		for (auto& other : *currentConnections)
		{
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
#ifndef WEB_SERVER_TEST
	else if (MATCHES(info, "+forward"))
	{
		InputKey(EKeys::LeftShift, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-forward"))
	{
		InputKey(EKeys::LeftShift, EInputEvent::IE_Released, 0, false);
	}
	else if (MATCHES(info, "+backward"))
	{
		InputKey(EKeys::LeftControl, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-backward"))
	{
		InputKey(EKeys::LeftControl, EInputEvent::IE_Released, 0, false);
	}
	else if (MATCHES(info, "+left"))
	{
		InputKey(EKeys::A, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-left"))
	{
		InputKey(EKeys::A, EInputEvent::IE_Released, 0, false);
	}
	else if (MATCHES(info, "+right"))
	{
		InputKey(EKeys::D, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-right"))
	{
		InputKey(EKeys::D, EInputEvent::IE_Released, 0, false);
	}
	else if (MATCHES(info, "+up"))
	{
		InputKey(EKeys::S, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-up"))
	{
		InputKey(EKeys::S, EInputEvent::IE_Released, 0, false);
	}
	else if (MATCHES(info, "+down"))
	{
		InputKey(EKeys::W, EInputEvent::IE_Pressed, 1, false);
	}
	else if (MATCHES(info, "-down"))
	{
		InputKey(EKeys::W, EInputEvent::IE_Released, 0, false);
	}
	else
	{
		// write all unrecognised commands to the console
		char buffer[128];
		EXTRACT(info, buffer, "");
		APlayerController* PlayerController = GetOuterAPlayerController();
		PlayerController->ClientMessage(FString::Printf(TEXT("Unrecognised message from client %c: %s\n"), 'A' + info->identifier, ANSI_TO_TCHAR(buffer)));
	}
#endif
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
	int count = shipSystemCounts[shipSystemIndex];
	if (!adding)
		if (count > 1)
			return; // do nothing, cos multiple people still use this
		else if (count == 1)
		{
			int shipSystemFlag = 1 << shipSystemIndex;

			// find the one user using this system, and tell them its not in use by anyone else
			for (auto& other : *currentConnections)
			{
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

	for (auto& other : *currentConnections)
	{
		// don't tell the player selecting a system whether it is now in use... they know
		if (info == other)
			continue;

		mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, "sys%c %i", adding ? '-' : '+', shipSystemIndex);
	}
}

void UCrewManager::SendCrewMessage(System_t system, const char *message, ...)
{
	int systemFlags = system == System_t::All ? System_t::All : 1 << system;

	va_list args;
	va_start(args, message);

	for (auto& other : *currentConnections)
	{
		if ((other->shipSystemFlags & systemFlags) != 0)
			mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, message, args);
	}

	va_end(args);
}