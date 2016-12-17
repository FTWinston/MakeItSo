// Fill out your copyright notice in the Description page of Project Settings.

#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#include "Engine/Engine.h"
#include "Runtime/Engine/Public/EngineGlobals.h"
#include "ShipPlayerController.h"
#include "KeyBindings.h"
#else
#include "stdafx.h"
#include <iostream>
#include <sstream>
#include <iterator>
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

UCrewManager *UCrewManager::Instance = nullptr;
mg_server *UCrewManager::server = nullptr;

int UCrewManager::EventReceived(mg_connection *conn, enum mg_event ev)
{
	return Instance->HandleEvent(conn, ev);
}

FString UCrewManager::Init(AShipPlayerController *controller)
{
	Instance = this;
	LinkController(controller);
	crewState = ECrewState::Setup;

	nextConnectionIdentifer = 0;
	connectionInSetup = nullptr;
	currentConnections = new TSet<ConnectionInfo*>();

	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
		shipSystemCounts[i] = 0;
	
	if (!server)
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
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Listening on %s\n"), *url));
#endif

	return url;
}

void UCrewManager::BeginDestroy()
{
	if (server)
		mg_destroy_server(&server);

	server = nullptr;

	delete currentConnections;

	Super::BeginDestroy();
}

void UCrewManager::LinkController(AShipPlayerController *controller)
{
	this->controller = controller; // do we need to null this when the level changes?
}

void UCrewManager::PauseGame(bool state)
{
	if (state)
	{
		crewState = ECrewState::Paused;
		SendCrewMessage(ESystem::Everyone, "pause+");
	}
	else
	{
		crewState = ECrewState::Active;

		SendCrewMessage(ESystem::AllStations, "pause-");
		SendCrewMessage(ESystem::NoStations, "started"); // game resumed, keep out
		SendAllCrewData();
	}

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->SetPause(state);
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
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("An error occurred setting up the web server: %s\n"), *FString(error)));
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

	if (!host)
	{
		WSACleanup();
		return FString(TEXT("ERROR_NO_HOST"));
	}

	char *ip = inet_ntoa(*(struct in_addr *)host->h_addr);

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

#ifndef WEB_SERVER_TEST
	currentConnections->Add(info);
#else
	currentConnections->insert(currentConnections->end(), info);
#endif

	// Send connection ID back to the client.
	mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "id %c", 'A' + info->identifier);

	// indicate to the client that the game is currently active. They cannot do anything until it is paused, so show an appropriate "please wait" message.
	if (crewState == ECrewState::Active)
	{
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "started");
		return;
	}
	else if (crewState == ECrewState::Paused)
	{
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "paused");
	}

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Client %c connected from %s\n"), 'A' + info->identifier, ANSI_TO_TCHAR(conn->remote_ip)));
#endif

	// update this client as to whether or not each system is currently claimed
	for (int i = 0; i < MAX_SHIP_SYSTEMS; i++)
	{
		if (shipSystemCounts[i] > 0)
			mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "sys- %i", i);
	}

	// if someone is in setup, tell this client
	if (connectionInSetup)
		mg_websocket_printf(conn, WEBSOCKET_OPCODE_TEXT, "setup-");
}

void UCrewManager::EndConnection(mg_connection *conn)
{
	ConnectionInfo *info = (ConnectionInfo*)conn->connection_param;

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Client %c disconnected\n"), 'A' + info->identifier));
	currentConnections->Remove(info);
#else
	currentConnections->erase(std::remove(currentConnections->begin(), currentConnections->end(), info), currentConnections->end());
#endif

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
		connectionInSetup = nullptr;

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

	if (!anySystems && crewState == ECrewState::Active)
	{
		PauseGame(true);
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

#ifndef WEB_SERVER_TEST
#define EXTRACT(info, buffer, offset) snprintf(buffer, sizeof(buffer), "%.*s\0", (int)FMath::Min(sizeof(buffer) - 1, info->connection->content_len - sizeof(offset) + 1), info->connection->content + sizeof(offset) - 1)
#else
#define EXTRACT(info, buffer, offset) snprintf(buffer, sizeof(buffer), "%.*s\0", (int)       min(sizeof(buffer) - 1, info->connection->content_len - sizeof(offset) + 1), info->connection->content + sizeof(offset) - 1)
#endif

	if (STARTS_WITH(info, "+sys ") || STARTS_WITH(info, "-sys "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "+sys ");
		int systemIndex = atoi(buffer);
		ShipSystemChanged(info, systemIndex, info->connection->content[0] == '+');
	}
	else if (MATCHES(info, "+setup"))
	{
		if (connectionInSetup != nullptr || crewState != ECrewState::Setup)
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
		if (connectionInSetup != info || crewState != ECrewState::Setup)
			return;

		connectionInSetup = nullptr;

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
		if (connectionInSetup != info || crewState != ECrewState::Setup)
			return;

		connectionInSetup = nullptr; // game started, no one is setting it up anymore
		crewState = ECrewState::Active;

		SendCrewMessage(ESystem::AllStations, "game+"); // game started
		SendCrewMessage(ESystem::NoStations, "started"); // game started, keep out


#ifndef WEB_SERVER_TEST
		//todo: this should consider the game mode/type selected
		UGameplayStatics::OpenLevel(controller, TEXT("/Game/Flying/Maps/FlyingExampleMap"));
#endif
	}
	else if (MATCHES(info, "pause"))
	{
		if (crewState != ECrewState::Active || info->shipSystemFlags == 0) // if you have no systems, you're not in the game, so can't pause it
			return;

		PauseGame(true); //actually pause the game!
	}
	else if (MATCHES(info, "resume"))
	{
		if (crewState != ECrewState::Paused)
			return;

		PauseGame(false);
	}
	else if (MATCHES(info, "quit"))
	{
		if (crewState != ECrewState::Paused)
			return;

		crewState = ECrewState::Setup;

		char buffer[16];
		snprintf(buffer, sizeof(buffer), "game- %c", 'A' + info->identifier);
		SendCrewMessage(ESystem::Everyone, buffer);

#ifndef WEB_SERVER_TEST
		UGameplayStatics::OpenLevel(controller, TEXT("/Game/Main"));
#endif
	}
#ifndef WEB_SERVER_TEST
	else if (MATCHES(info, "+forward"))
	{
		InputKey(EKeys::LeftShift, true);
	}
	else if (MATCHES(info, "-forward"))
	{
		InputKey(EKeys::LeftShift, false);
	}
	else if (MATCHES(info, "+backward"))
	{
		InputKey(EKeys::LeftControl, true);
	}
	else if (MATCHES(info, "-backward"))
	{
		InputKey(EKeys::LeftControl, false);
	}
	else if (MATCHES(info, "+left"))
	{
		InputKey(EKeys::A, true);
	}
	else if (MATCHES(info, "-left"))
	{
		InputKey(EKeys::A, false);
	}
	else if (MATCHES(info, "+right"))
	{
		InputKey(EKeys::D, true);
	}
	else if (MATCHES(info, "-right"))
	{
		InputKey(EKeys::D, false);
	}
	else if (MATCHES(info, "+up"))
	{
		InputKey(EKeys::S, true);
	}
	else if (MATCHES(info, "-up"))
	{
		InputKey(EKeys::S, false);
	}
	else if (MATCHES(info, "+down"))
	{
		InputKey(EKeys::W, true);
	}
	else if (MATCHES(info, "-down"))
	{
		InputKey(EKeys::W, false);
	}
	else if (STARTS_WITH(info, "yaw "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "yaw "); // this crashes (sometimes) unless buffer length is ~30
		InputAxis(EKeys::Gamepad_LeftX, atof(buffer));
	}
	else if (STARTS_WITH(info, "pitch "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "pitch "); // this crashes (sometimes) unless buffer length is ~30
		InputAxis(EKeys::Gamepad_LeftY, atof(buffer));
	}

	else if (MATCHES(info, "+moveleft"))
	{
		InputKey(EKeys::J, true);
	}
	else if (MATCHES(info, "-moveleft"))
	{
		InputKey(EKeys::J, false);
	}
	else if (MATCHES(info, "+moveright"))
	{
		InputKey(EKeys::L, true);
	}
	else if (MATCHES(info, "-moveright"))
	{
		InputKey(EKeys::L, false);
	}
	else if (MATCHES(info, "+moveup"))
	{
		InputKey(EKeys::I, true);
	}
	else if (MATCHES(info, "-moveup"))
	{
		InputKey(EKeys::I, false);
	}
	else if (MATCHES(info, "+movedown"))
	{
		InputKey(EKeys::K, true);
	}
	else if (MATCHES(info, "-movedown"))
	{
		InputKey(EKeys::K, false);
	}
#endif
	else if (STARTS_WITH(info, "viewdir "))
	{
		char buffer[2];
		EXTRACT(info, buffer, "viewdir ");

		char dir = buffer[0];
		if (dir == 'f')
		{
			viewPitch = 0;
			viewYaw = 0;
		}
		else if (dir == 'b')
		{
			viewPitch = 0;
			viewYaw = 180;
		}
		else if (dir == 'l')
		{
			viewPitch = 0;
			viewYaw = 270;
		}
		else if (dir == 'r')
		{
			viewPitch = 0;
			viewYaw = 90;
		}
		else if (dir == 'u')
		{
			viewPitch = 90;
			viewYaw = 0;
		}
		else if (dir == 'd')
		{
			viewPitch = -90;
			viewYaw = 0;
		}
		else
		{
			viewPitch = 42;
			viewYaw = 42;
		}

		viewTarget = nullptr;
		SendViewAngles();
	}
	else if (STARTS_WITH(info, "viewtarget "))
	{
		char buffer[20];
		EXTRACT(info, buffer, "viewtarget ");
		DetermineViewTarget(buffer);
		DetermineTargetAngles();
		SendViewAngles();
		SendViewZoomDist();
	}
	else if (MATCHES(info, "viewup"))
	{
		viewPitch += viewAngleStep;
		if (viewPitch > 90)
			viewPitch = 90;
		SendViewAngles();
	}
	else if (MATCHES(info, "viewdown"))
	{
		viewPitch -= viewAngleStep;
		if (viewPitch < -90)
			viewPitch = -90;
		SendViewAngles();
	}
	else if (MATCHES(info, "viewleft"))
	{
		viewYaw -= viewAngleStep;
		if (viewYaw < 0)
			viewYaw += 360;
		SendViewAngles();
	}
	else if (MATCHES(info, "viewright"))
	{
		viewYaw += viewAngleStep;
		if (viewYaw >= 360)
			viewYaw -= 360;
		SendViewAngles();
	}
	else if (MATCHES(info, "viewin"))
	{
		if (viewChase)
		{
			viewChaseDist *= viewZoomStep;
			if (viewChaseDist > maxChaseDist)
				viewChaseDist = maxChaseDist;
		}
		else
		{
			viewZoom *= viewZoomStep;
			if (viewZoom > maxZoomFactor)
				viewZoom = maxZoomFactor;
		}

		SendViewZoomDist();
	}
	else if (MATCHES(info, "viewout"))
	{
		if (viewChase)
		{
			viewChaseDist /= viewZoomStep;
			if (viewChaseDist < minChaseDist)
				viewChaseDist = minChaseDist;
		}
		else
		{
			viewZoom /= viewZoomStep;
			if (viewZoom < minZoomFactor)
				viewZoom = minZoomFactor;
		}

		SendViewZoomDist();
	}
	else if (MATCHES(info, "+viewchase"))
	{
		viewChase = true;
		SendCrewMessage(ESystem::ViewScreen, "chase on");
	}
	else if (MATCHES(info, "-viewchase"))
	{
		viewChase = false;
		SendCrewMessage(ESystem::ViewScreen, "chase off");
	}
	else if (MATCHES(info, "+viewcomms"))
	{
		viewComms = true;
		SendCrewMessage(ESystem::ViewScreen, "comms on");
	}
	else if (MATCHES(info, "-viewcomms"))
	{
		viewComms = false;
		SendCrewMessage(ESystem::ViewScreen, "comms off");
	}
	else if (MATCHES(info, "+shields"))
	{
		shieldsUp = true;
		SendCrewMessage(ESystem::Shields, "on");
	}
	else if (MATCHES(info, "-shields"))
	{
		shieldsUp = false;
		SendCrewMessage(ESystem::Shields, "off");
	}
	else if (STARTS_WITH(info, "shieldFoc "))
	{
		char buffer[2];
		EXTRACT(info, buffer, "shieldFoc ");

		char focus = buffer[0];
		shieldFocus = focus - '0';
		SendShieldFocus();
	}
	else if (STARTS_WITH(info, "pickCard "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "pickCard ");
		int cardID = atoi(buffer);

		TSet<int> cardChoice;
#ifndef WEB_SERVER_TEST
		if (!cardChoices.Peek(cardChoice))
			return; // no cards to choose from
#else
		if (cardChoices.empty())
			return; // no cards to choose from
		cardChoice = cardChoices.front();
#endif

		if (cardChoice[0] != cardID && cardChoice[1] != cardID && cardChoice[2] != cardID)
			return; // chosen card isn't part of the current choice

#ifndef WEB_SERVER_TEST
		cardChoices.Dequeue();
#else
		cardChoices.pop();
#endif
		cardLibrary.push_back(cardID);
		SendCardChoice();
		SendCardLibrary();
	}
	else if (STARTS_WITH(info, "useCard "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "useCard ");
		int cardID = atoi(buffer);

#ifndef WEB_SERVER_TEST
		if (!cardLibrary.Contains(cardID))
			return; // card not in library
		cardLibrary.Remove(cardID);
#else
		if (std::find(cardLibrary.begin(), cardLibrary.end(), cardID) == cardLibrary.end())
			return; // card not in library
		cardLibrary.erase(std::remove(cardLibrary.begin(), cardLibrary.end(), cardID), cardLibrary.end());
#endif
		ActivatePowerCard(cardID);
	}
#ifndef WEB_SERVER_TEST
	else
	{
		// write all unrecognised commands to the console
		char buffer[128];
		EXTRACT(info, buffer, "");
		if (controller)
			controller->ClientMessage(FString::Printf(TEXT("Unrecognised message from client %c: %s\n"), 'A' + info->identifier, ANSI_TO_TCHAR(buffer)));
	}
#endif
}

#ifndef WEB_SERVER_TEST
void UCrewManager::InputKey(FKey key, bool pressed)
{
	controller->InputKey(key, pressed ? EInputEvent::IE_Pressed : EInputEvent::IE_Released, pressed ? 1 : 0, false);
}

void UCrewManager::InputAxis(FKey key, float value)
{
	if (value > 1)
		value = 1;
	if (value < -1)
		value = -1;
	controller->InputAxis(key, value, 1, 1, true);
}
#endif

void UCrewManager::ShipSystemChanged(ConnectionInfo *info, int shipSystemIndex, bool adding)
{
	if (crewState == ECrewState::Active || shipSystemIndex < 0 || shipSystemIndex >= MAX_SHIP_SYSTEMS)
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

void UCrewManager::SendCrewMessage(ESystem system, const char *message, ConnectionInfo *exclude)
{
	bool includeNoSystems = false;
	int systemFlags;

#ifndef WEB_SERVER_TEST
	FString withSystem = FString::Printf(TEXT("%i%s\n"), system, message);
#else
	std::string withSystem = std::to_string(system);
	withSystem += message;
#endif

	switch (system)
	{
	case ESystem::Everyone:
		includeNoSystems = true;
	case ESystem::AllStations:
		systemFlags = ~0; // every system flag should be set
		break;
	case ESystem::NoStations:
		systemFlags = 0; // no system flag should be set
		includeNoSystems = true;
		break;
	default:
		message = withSystem.c_str();
		systemFlags = 1 << system; // only the flag for the given system should be set
		break;
	}

	for (auto& other : *currentConnections)
	{
		if (other == exclude)
			continue;

		if ((includeNoSystems && other->shipSystemFlags == 0) || (other->shipSystemFlags & systemFlags) != 0)
			mg_websocket_printf(other->connection, WEBSOCKET_OPCODE_TEXT, message);
	}
}

void UCrewManager::SendAllCrewData()
{
	SendViewAngles();
	SendViewZoomDist();
	// TODO: send all viewscreen targets

	// TODO: send all weapon targets

	// TODO: send shield data
	SendCrewMessage(ESystem::Shields, shieldsUp ? "on" : "off");
	SendShieldFocus();

	SendAuxPower();
	SendPowerLevels();
	SendCardChoice();
	// TODO: send card library
}

void UCrewManager::DetermineViewTarget(const char* targetIdentifier)
{
	// TODO: lookup target
	viewTarget = nullptr;
}

void UCrewManager::DetermineTargetAngles()
{
	// TODO: calculate angle to viewTarget
	viewPitch = 22;
	viewYaw = 137;
	viewZoom = 22.5;
}

void UCrewManager::SendViewAngles()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("view %i %i"), (int)viewYaw, (int)viewPitch);
	SendCrewMessage(ESystem::ViewScreen, message.c_str());
#else
	char buffer[16];
	std::snprintf(buffer, sizeof(buffer), "view %i %i", (int)viewYaw, (int)viewPitch);
	SendCrewMessage(ESystem::ViewScreen, buffer);
#endif
}

void UCrewManager::SendViewZoomDist()
{
	if (viewChase)
	{
#ifndef WEB_SERVER_TEST
		auto message = FString::Printf(TEXT("dist %i"), (int)viewChaseDist);
		SendCrewMessage(ESystem::ViewScreen, message.c_str());
#else
		char buffer[16];
		std::snprintf(buffer, sizeof(buffer), "dist %i", (int)viewChaseDist);
		SendCrewMessage(ESystem::ViewScreen, buffer);
#endif
	}
	else
	{
#ifndef WEB_SERVER_TEST
		auto message = FString::Printf(TEXT("zoom %.2f"), viewZoom);
		SendCrewMessage(ESystem::ViewScreen, message.c_str());
#else
		char buffer[24];
		std::snprintf(buffer, sizeof(buffer), "zoom %.2f", viewZoom);
		SendCrewMessage(ESystem::ViewScreen, buffer);
#endif
	}
}

void UCrewManager::SendShieldFocus()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("focus %i"), shieldFocus);
	SendCrewMessage(ESystem::Shields, message.c_str());
#else
	char buffer[10];
	std::snprintf(buffer, sizeof(buffer), "focus %i", shieldFocus);
	SendCrewMessage(ESystem::Shields, buffer);
#endif
}

void UCrewManager::IncrementAuxPower()
{
	if (auxPower >= MAX_AUX_POWER)
		return;

	auxPower++;
	SendAuxPower();
}

void UCrewManager::SendAuxPower()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("aux %i"), auxPower);
	SendCrewMessage(ESystem::PowerManagement, message.c_str());
#else
	char buffer[8];
	std::snprintf(buffer, sizeof(buffer), "aux %i", auxPower);
	SendCrewMessage(ESystem::PowerManagement, buffer);
#endif
}

void UCrewManager::SendPowerLevels()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("levels %.0f %.0f %.0f %.0f %.0f %.0f"), powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
	SendCrewMessage(ESystem::PowerManagement, message.c_str());
#else
	char buffer[32];
	std::snprintf(buffer, sizeof(buffer), "levels %.0f %.0f %.0f %.0f %.0f %.0f", powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
	SendCrewMessage(ESystem::PowerManagement, buffer);
#endif
}

void UCrewManager::AddCardChoice(int card1, int card2, int card3)
{
	TSet<int> choice;
	choice.push_back(card1);
	choice.push_back(card2);
	choice.push_back(card3);

	bool wasEmpty;
#ifndef WEB_SERVER_TEST
	wasEmpty = cardChoices.IsEmpty();
	cardChoices.Enqueue(cardChoice);
#else
	wasEmpty = cardChoices.empty();
	cardChoices.push(choice);
#endif

	if (wasEmpty)
		SendCardChoice();
}

void UCrewManager::SendCardChoice()
{
	if (cardChoices.empty())
		SendCrewMessage(ESystem::PowerManagement, "choice ");
	else
	{
		auto command = CombineIDs("choice ", cardChoices.front());
		SendCrewMessage(ESystem::PowerManagement, command.c_str());
	}
}

void UCrewManager::SendCardLibrary()
{
	auto command = CombineIDs("lib ", cardLibrary);
	SendCrewMessage(ESystem::PowerManagement, command.c_str());
}

std::string UCrewManager::CombineIDs(const char *prefix, TSet<int> IDs)
{
	std::ostringstream os;
	os << prefix;
	
	if (!IDs.empty())
	{
		bool first = true;
		for (int id : IDs)
		{
			if (first)
				first = false;
			else
				os << " ";

			os << id;
		}
	}
	return os.str();
}

void UCrewManager::ActivatePowerCard(int cardID)
{
	// ???
}