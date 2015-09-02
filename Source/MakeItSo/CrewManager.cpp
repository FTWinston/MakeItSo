// Fill out your copyright notice in the Description page of Project Settings.

#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif

#include "CrewManager.h"

#ifdef WIN32

#ifndef WEB_SERVER_TEST
#include "AllowWindowsPlatformTypes.h"
#endif

#include "winsock.h"

#ifndef WEB_SERVER_TEST
#include "HideWindowsPlatformTypes.h"
#endif

#endif

#include <stdio.h>
#include <stdarg.h>
#include <tchar.h>

#if defined(_MSC_VER) && _MSC_VER < 1900
#define snprintf _snprintf_s
#endif

mg_server *UCrewManager::server = NULL;

int UCrewManager::EventReceived(mg_connection *conn, enum mg_event ev)
{
	auto crewManager = (UCrewManager*)conn->server_param;
	return crewManager->HandleEvent(conn, ev);
}

void UCrewManager::Init()
{
	crewState = CrewState_t::Setup;

	nextConnectionIdentifer = 0;
	connectionInSetup = NULL;
	currentConnections = new TSet<ConnectionInfo*>();

	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
		shipSystemCounts[i] = 0;
	
	if (server)
		mg_destroy_server(&server);

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
	PlayerController->ClientMessage(FString::Printf(TEXT("Listening on %s\n"), *url));
#else
	wprintf(L"Listening on %s\n", url.c_str());
#endif
}

void UCrewManager::BeginDestroy()
{
	if (server)
		mg_destroy_server(&server);
	server = NULL;

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

FString UCrewManager::GetLocalIP()
{
#ifdef WIN32
	WSADATA wsaData;
	WORD wVersionRequested = MAKEWORD(2, 0); // previously was 1, 1

	if (::WSAStartup(wVersionRequested, &wsaData) != 0)
		return FString(TEXT("ERROR_NO_WINSOCK"));

	char hostname[255];
	if (gethostname(hostname, sizeof(hostname)) == SOCKET_ERROR)
	{
		WSACleanup();
		return FString(TEXT("ERROR_GET_HOST"));
	}

	struct hostent *host = gethostbyname(hostname);

	if (host == NULL)
	{
		WSACleanup();
		return FString(TEXT("ERROR_NO_HOST"));
	}

	char *ip = inet_ntoa(*(struct in_addr *)host->h_addr);
	//sprintf(client_ipstring, ip);

	WSACleanup();

#ifdef WEB_SERVER_TEST
	std::string strIP = ip;

	FString wstrIP(strIP.length(), L' ');
	std::copy(strIP.begin(), strIP.end(), wstrIP.begin());

	return wstrIP;
#else
	return FString(ANSI_TO_TCHAR(ip));
#endif

#else
	return FString(TEXT("ERROR_NO_WIN32"));
#endif
}

FString UCrewManager::GetLocalURL()
{
	const char *port = mg_get_option(server, "listening_port");
	bool showPort = strcmp(port, "80") != 0;
	
	FString ipAddress = GetLocalIP();

	if (!showPort)
		return ipAddress;

#ifndef WEB_SERVER_TEST
	return FString::Printf(TEXT("%s:%s\n"), *ipAddress, *FString(port));
#else
	FString url = ipAddress;

	url += TEXT(":");

	std::string strPort = port;
	std::wstring wstrPort(strPort.length(), L' ');
	std::copy(strPort.begin(), strPort.end(), wstrPort.begin());

	url += wstrPort;
	return url;
#endif
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

	// indicate to the client that the game is currently active. They cannot do anything until it is paused, so show an appropriate "please wait" message.
	if (crewState == CrewState_t::Active)
	{
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "started");
		return;
	}
	else if (crewState == CrewState_t::Paused)
	{
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "pause+");
	}

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

	// if there are no connections in currentConnections with any ship system set, automatically pause the game
	bool anySystems = false;
	for (auto& other : *currentConnections)
	{
		if (other->shipSystemFlags != 0)
		{
			anySystems = true;
			break;
		}
	}

	if (!anySystems)
	{
		crewState = CrewState_t::Paused;
		SendCrewMessage(System_t::Everyone, "pause+");
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
			if (info) // if this connection hasn't been allocated a crew position, don't let them do stuff
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
		if (connectionInSetup != NULL || crewState != CrewState_t::Setup)
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
		if (connectionInSetup != info || crewState != CrewState_t::Setup)
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
		if (connectionInSetup != info || crewState != CrewState_t::Setup)
			return;

		connectionInSetup = NULL; // game started, no one is setting it up anymore
		crewState = CrewState_t::Active;

		SendCrewMessage(System_t::AllStations, "game+"); // game started
		SendCrewMessage(System_t::NoStations, "started"); // game started, keep out


#ifndef WEB_SERVER_TEST
		//actually start the game!
#endif
	}
	else if (MATCHES(info, "pause"))
	{
		if (crewState != CrewState_t::Active || info->shipSystemFlags == 0) // if you have no systems, you're not in the game, so can't pause it
			return;

		crewState = CrewState_t::Paused;
		SendCrewMessage(System_t::Everyone, "pause+");

#ifndef WEB_SERVER_TEST
		//actually pause the game!
#endif
	}
	else if (MATCHES(info, "resume"))
	{
		if (crewState != CrewState_t::Paused)
			return;

		crewState = CrewState_t::Active;

		SendCrewMessage(System_t::AllStations, "pause-");
		SendCrewMessage(System_t::NoStations, "started"); // game resumed, keep out

#ifndef WEB_SERVER_TEST
		//actually unpause the game!
#endif
	}
	else if (MATCHES(info, "quit"))
	{
		if (crewState != CrewState_t::Paused)
			return;

		crewState = CrewState_t::Setup;

		char buffer[16];
		sprintf(buffer, "game- %c", 'A' + info->identifier);
		SendCrewMessage(System_t::Everyone, buffer);

#ifndef WEB_SERVER_TEST
		//actually end the game!
#endif
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
	if (crewState == CrewState_t::Active || shipSystemIndex < 0 || shipSystemIndex >= MAX_SHIP_SYSTEMS)
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

void UCrewManager::SendCrewMessage(System_t system, const char *message)
{
	bool includeNoSystems = false;
	int systemFlags;

	switch (system)
	{
	case System_t::Everyone:
		includeNoSystems = true;
	case System_t::AllStations:
		systemFlags = ~0; // every system flag should be set
		break;
	case System_t::NoStations:
		systemFlags = 0; // no system flag should be set
		includeNoSystems = true;
		break;
	default:
		systemFlags = 1 << system; // only the flag for the given system should be set
		break;
	}

	for (auto& other : *currentConnections)
	{
		if ((includeNoSystems && other->shipSystemFlags == 0) || (other->shipSystemFlags & systemFlags) != 0)
			mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, message);
	}
}