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

int32 UCrewManager::EventReceived(mg_connection *conn, enum mg_event ev)
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

	for (int32 i = 0; i < MAX_SHIP_SYSTEMS; i++)
		shipSystemCounts[i] = 0;

	CreateSystems();
	ResetData();
	
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

void UCrewManager::CreateSystems()
{
#ifndef WEB_SERVER_TEST
	systems.Add(ESystem::Helm, NewObject<UHelmSystem>());
	systems.Add(ESystem::ViewScreen, NewObject<UViewscreenSystem>());
	systems.Add(ESystem::Shields, NewObject<UShieldSystem>());
	systems.Add(ESystem::PowerManagement, NewObject<UPowerSystem>());
	systems.Add(ESystem::DamageControl, NewObject<UDamageControlSystem>());
	systems.Add(ESystem::Weapons, NewObject<UWeaponSystem>());
	systems.Add(ESystem::Sensors, NewObject<USensorSystem>());
	systems.Add(ESystem::Communications, NewObject<UCommunicationSystem>());
	systems.Add(ESystem::Deflector, NewObject<UDeflectorSystem>());

	for (auto system : systems)
	{
		system.Value->Init(this);
		system.Value->ResetData();
	}
#else
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::Helm, new UHelmSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::ViewScreen, new UViewscreenSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::Shields, new UShieldSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::PowerManagement, new UPowerSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::DamageControl, new UDamageControlSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::Weapons, new UWeaponSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::Sensors, new USensorSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::Communications, new UCommunicationSystem()));
	systems.insert(std::pair<ESystem, UCrewSystem*>(ESystem::Deflector, new UDeflectorSystem()));

	for (auto system : systems)
	{
		system.second->Init(this);
		system.second->ResetData();
	}
#endif
}

void UCrewManager::ResetData()
{
	for (auto system : systems)
#ifndef WEB_SERVER_TEST
		system.Value->ResetData();
#else
		system.second->ResetData();
#endif
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
	int32 identifier = GetNewUniqueIdentifier();
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
	for (int32 i = 0; i < MAX_SHIP_SYSTEMS; i++)
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
	for (int32 i = 0; i < MAX_SHIP_SYSTEMS; i++)
	{
		int32 shipSystemFlag = 1 << i;
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

int32 UCrewManager::GetNewUniqueIdentifier()
{
	int32 identifier;
	int32 numChecked = 0;
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

int32 UCrewManager::HandleEvent(mg_connection *conn, enum mg_event ev)
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
		int32 systemIndex = atoi(buffer);
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

		SendAllCrewData();
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

	for (auto system : systems)
#ifndef WEB_SERVER_TEST
		if (system.Value->ReceiveCrewMessage(info))
#else
		if (system.second->ReceiveCrewMessage(info))
#endif
			return;

#ifndef WEB_SERVER_TEST
	// write all unrecognised commands to the console
	char buffer[128];
	EXTRACT(info, buffer, "");
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Unrecognised message from client %c: %s\n"), 'A' + info->identifier, ANSI_TO_TCHAR(buffer)));
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

void UCrewManager::ShipSystemChanged(ConnectionInfo *info, int32 shipSystemIndex, bool adding)
{
	if (crewState == ECrewState::Active || shipSystemIndex < 0 || shipSystemIndex >= MAX_SHIP_SYSTEMS)
		return;

	int32 shipSystemFlag = 1 << shipSystemIndex;

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

void UCrewManager::SendSystemSelectionMessage(ConnectionInfo *info, int32 shipSystemIndex, bool adding)
{
	int32 count = shipSystemCounts[shipSystemIndex];
	if (!adding)
		if (count > 1)
			return; // do nothing, cos multiple people still use this
		else if (count == 1)
		{
			int32 shipSystemFlag = 1 << shipSystemIndex;

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
	int32 systemFlags;

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
	for (auto system : systems)
#ifndef WEB_SERVER_TEST
		system.Value->SendAllData();
#else
		system.second->SendAllData();
#endif
}

void UCrewManager::ProcessSystemMessage(ESystem system, FString message)
{
#ifndef WEB_SERVER_TEST
	if (!systems.Contains(system))
#else
	if (systems.find(system) == systems.end())
#endif
	{

#ifndef WEB_SERVER_TEST
		if (controller)
			controller->ClientMessage(FString::Printf(TEXT("Received a message for non-existant crew system %i: %s\n"), (int)system, message));
#endif
		return;
	}

#ifndef WEB_SERVER_TEST
	if (!systems[system]->ProcessSystemMessage(message))
		controller->ClientMessage(FString::Printf(TEXT("Crew system %i is unable to process system message: %s\n"), (int)system, message));
#else
	systems[system]->ProcessSystemMessage(message);
#endif
}




// --------- helm

bool UHelmSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
#ifndef WEB_SERVER_TEST
	if (MATCHES(info, "+forward"))
	{
		crewManager->InputKey(EKeys::LeftShift, true);
	}
	else if (MATCHES(info, "-forward"))
	{
		crewManager->InputKey(EKeys::LeftShift, false);
	}
	else if (MATCHES(info, "+backward"))
	{
		crewManager->InputKey(EKeys::LeftControl, true);
	}
	else if (MATCHES(info, "-backward"))
	{
		crewManager->InputKey(EKeys::LeftControl, false);
	}
	else if (MATCHES(info, "+left"))
	{
		crewManager->InputKey(EKeys::A, true);
	}
	else if (MATCHES(info, "-left"))
	{
		crewManager->InputKey(EKeys::A, false);
	}
	else if (MATCHES(info, "+right"))
	{
		crewManager->InputKey(EKeys::D, true);
	}
	else if (MATCHES(info, "-right"))
	{
		crewManager->InputKey(EKeys::D, false);
	}
	else if (MATCHES(info, "+up"))
	{
		crewManager->InputKey(EKeys::S, true);
	}
	else if (MATCHES(info, "-up"))
	{
		crewManager->InputKey(EKeys::S, false);
	}
	else if (MATCHES(info, "+down"))
	{
		crewManager->InputKey(EKeys::W, true);
	}
	else if (MATCHES(info, "-down"))
	{
		crewManager->InputKey(EKeys::W, false);
	}
	else if (STARTS_WITH(info, "yaw "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "yaw "); // this crashes (sometimes) unless buffer length is ~30
		crewManager->InputAxis(EKeys::Gamepad_LeftX, atof(buffer));
	}
	else if (STARTS_WITH(info, "pitch "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "pitch "); // this crashes (sometimes) unless buffer length is ~30
		crewManager->InputAxis(EKeys::Gamepad_LeftY, atof(buffer));
	}

	else if (MATCHES(info, "+moveleft"))
	{
		crewManager->InputKey(EKeys::J, true);
	}
	else if (MATCHES(info, "-moveleft"))
	{
		crewManager->InputKey(EKeys::J, false);
	}
	else if (MATCHES(info, "+moveright"))
	{
		crewManager->InputKey(EKeys::L, true);
	}
	else if (MATCHES(info, "-moveright"))
	{
		crewManager->InputKey(EKeys::L, false);
	}
	else if (MATCHES(info, "+moveup"))
	{
		crewManager->InputKey(EKeys::I, true);
	}
	else if (MATCHES(info, "-moveup"))
	{
		crewManager->InputKey(EKeys::I, false);
	}
	else if (MATCHES(info, "+movedown"))
	{
		crewManager->InputKey(EKeys::K, true);
	}
	else if (MATCHES(info, "-movedown"))
	{
		crewManager->InputKey(EKeys::K, false);
	}
	else
#endif
		return false;
}




// --------- viewscreen

bool UViewscreenSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (STARTS_WITH(info, "viewdir "))
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
		SendCrewMessage("chase on");
	}
	else if (MATCHES(info, "-viewchase"))
	{
		viewChase = false;
		SendCrewMessage("chase off");
	}
	else if (MATCHES(info, "+viewcomms"))
	{
		viewComms = true;
		SendCrewMessage("comms on");
	}
	else if (MATCHES(info, "-viewcomms"))
	{
		viewComms = false;
		SendCrewMessage("comms off");
	}
	else
		return false;

	return true;
}

void UViewscreenSystem::SendAllData()
{
	SendViewAngles();
	SendViewZoomDist();
	// TODO: send all viewscreen targets
}

void UViewscreenSystem::DetermineViewTarget(const char* targetIdentifier)
{
	// TODO: lookup target
	viewTarget = nullptr;
}

void UViewscreenSystem::DetermineTargetAngles()
{
	// TODO: calculate angle to viewTarget
	viewPitch = 22;
	viewYaw = 137;
	viewZoom = 22.5;
}

void UViewscreenSystem::SendViewAngles()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("view %i %i"), (int)viewYaw, (int)viewPitch);
	SendCrewMessage(ESystem::ViewScreen, message.c_str());
#else
	char buffer[16];
	std::snprintf(buffer, sizeof(buffer), "view %i %i", (int)viewYaw, (int)viewPitch);
	SendCrewMessage(buffer);
#endif
}

void UViewscreenSystem::SendViewZoomDist()
{
	if (viewChase)
	{
#ifndef WEB_SERVER_TEST
		auto message = FString::Printf(TEXT("dist %i"), (int)viewChaseDist);
		SendCrewMessage(ESystem::ViewScreen, message.c_str());
#else
		char buffer[16];
		std::snprintf(buffer, sizeof(buffer), "dist %i", (int)viewChaseDist);
		SendCrewMessage(buffer);
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
		SendCrewMessage(buffer);
#endif
	}
}




// --------- shields

bool UShieldSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (MATCHES(info, "+shields"))
	{
		shieldsUp = true;
		SendCrewMessage("on");
	}
	else if (MATCHES(info, "-shields"))
	{
		shieldsUp = false;
		SendCrewMessage("off");
	}
	else if (STARTS_WITH(info, "shieldFoc "))
	{
		char buffer[2];
		EXTRACT(info, buffer, "shieldFoc ");

		char focus = buffer[0];
		shieldFocus = focus - '0';
		SendShieldFocus();
	}
	else
		return false;

	return true;
}

void UShieldSystem::SendAllData()
{
	// TODO: send shield data
	SendCrewMessage(shieldsUp ? "on" : "off");
	SendShieldFocus();
}

void UShieldSystem::SendShieldFocus()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("focus %i"), shieldFocus);
	SendCrewMessage(message.c_str());
#else
	char buffer[10];
	std::snprintf(buffer, sizeof(buffer), "focus %i", shieldFocus);
	SendCrewMessage(buffer);
#endif
}




// --------- power

bool UPowerSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (STARTS_WITH(info, "pickCard "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "pickCard ");
		int32 cardID = atoi(buffer);

		TSet<int32> cardChoice;
#ifndef WEB_SERVER_TEST
		if (!cardChoices.Peek(cardChoice))
			return; // no cards to choose from
#else
		if (cardChoices.empty())
			return true; // no cards to choose from
		cardChoice = cardChoices.front();
#endif

		if (cardChoice[0] != cardID && cardChoice[1] != cardID && cardChoice[2] != cardID)
			return true; // chosen card isn't part of the current choice

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
		int32 cardID = atoi(buffer);

#ifndef WEB_SERVER_TEST
		if (!cardLibrary.Contains(cardID))
			return true; // card not in library
		cardLibrary.Remove(cardID);
#else
		if (std::find(cardLibrary.begin(), cardLibrary.end(), cardID) == cardLibrary.end())
			return true; // card not in library
		cardLibrary.erase(std::remove(cardLibrary.begin(), cardLibrary.end(), cardID), cardLibrary.end());
#endif
		ActivatePowerCard(cardID);
	}
	else
		return false;

	return true;
}

void UPowerSystem::SendAllData()
{
	SendAuxPower();
	SendPowerLevels();
	SendCardChoice();
	SendCardLibrary();
}

bool UPowerSystem::ProcessSystemMessage(FString message)
{
	if (message.compare(TEXT("inc_aux")) == 0)
	{
		IncrementAuxPower();
		return true;
	}

	return false;
}

void UPowerSystem::IncrementAuxPower()
{
	if (auxPower >= MAX_AUX_POWER)
		return;

	auxPower++;
	SendAuxPower();
}

void UPowerSystem::SendAuxPower()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("aux %i"), auxPower);
	SendCrewMessage(ESystem::PowerManagement, message.c_str());
#else
	char buffer[8];
	std::snprintf(buffer, sizeof(buffer), "aux %i", auxPower);
	SendCrewMessage(buffer);
#endif
}

void UPowerSystem::SendPowerLevels()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("levels %.0f %.0f %.0f %.0f %.0f %.0f"), powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
	SendCrewMessage(ESystem::PowerManagement, message.c_str());
#else
	char buffer[32];
	std::snprintf(buffer, sizeof(buffer), "levels %.0f %.0f %.0f %.0f %.0f %.0f", powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
	SendCrewMessage(buffer);
#endif
}

void UPowerSystem::AddCardChoice(int32 card1, int32 card2, int32 card3)
{
	TSet<int32> choice;
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

void UPowerSystem::SendCardChoice()
{
	if (cardChoices.empty())
		SendCrewMessage("choice ");
	else
	{
		auto command = CombineIDs("choice ", cardChoices.front());
		SendCrewMessage(command.c_str());
	}
}

void UPowerSystem::SendCardLibrary()
{
	auto command = CombineIDs("lib ", cardLibrary);
	SendCrewMessage(command.c_str());
}

std::string UPowerSystem::CombineIDs(const char *prefix, TSet<int32> IDs)
{
	std::ostringstream os;
	os << prefix;

	if (!IDs.empty())
	{
		bool first = true;
		for (int32 id : IDs)
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

void UPowerSystem::ActivatePowerCard(int32 cardID)
{
	// ???
}




// --------- damage control

bool UDamageControlSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (STARTS_WITH(info, "dcdir "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "dcdir ");
		EOrdinalDirection dir = (EOrdinalDirection)atoi(buffer);

		// check they didn't switch to the opposite direction ... that isn't allowed
		int32 combinedDirs = dir + prevDamageSnakeDir;
		if (combinedDirs == 3 || combinedDirs == 7) // up + down or left + right
			return true;

		damageSnakeDir = dir;
	}
	else
		return false;

	return true;
}

void UDamageControlSystem::SendAllData()
{
	SendDamageGrid();
}

void UDamageControlSystem::ResetData()
{
	// clear all damage control, set up the snake & an apple
	for (int32 i = 0; i < DAMAGE_GRID_HEIGHT * DAMAGE_GRID_WIDTH; i++)
	{
		int32 val = damageGrid[i];
		if (val == 0 || val == 1)
			continue;

		damageGrid[i] = 0;
	}

	CreateDamageSnake();
	CreateDamageApple();
}

void UDamageControlSystem::CreateDamageSnake()
{
	damageSnakeDir = prevDamageSnakeDir = Right;

	damageSnakeCells.clear();
	damageSnakeCells.push_back(600);
	damageSnakeCells.push_back(599);
	damageSnakeCells.push_back(598);
	damageSnakeCells.push_back(597);

	bool first = true;
	for (int32 cell : damageSnakeCells)
	{
		if (first)
		{
			damageGrid[cell] = 2;
			first = false;
		}
		else
			damageGrid[cell] = 2;
	}
}

void UDamageControlSystem::SendDamageGrid()
{
	std::ostringstream os;
	os << "dmggrid ";

	for (int32 id : damageGrid)
		os << id;

	SendCrewMessage(os.str().c_str());
}

void UDamageControlSystem::AdvanceSnake()
{
	prevDamageSnakeDir = damageSnakeDir;
	int32 oldHead = damageSnakeCells.front();

	int32 newHead;
	switch (damageSnakeDir)
	{
	case Up:
		newHead = oldHead - DAMAGE_GRID_WIDTH;
		if (newHead < 0)
			newHead += DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT;
		break;
	case Down:
		newHead = oldHead + DAMAGE_GRID_WIDTH;
		if (newHead >= DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT)
			newHead -= DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT;
		break;
	case Left:
		newHead = oldHead - 1;
		if (newHead % DAMAGE_GRID_WIDTH == 0)
			newHead += DAMAGE_GRID_WIDTH;
		break;
	case Right:
		newHead = oldHead + 1;
		if (newHead % DAMAGE_GRID_WIDTH == 0)
			newHead -= DAMAGE_GRID_WIDTH;
		break;
	default:
		return; // snake isn't moving; do nothing
	}

	std::string crewMessage = "dmgcell";
	int32 tailCellsToLose = 1;
	bool advanceHead = true;

	// if new head wasn't empty, do something!
	switch (damageGrid[newHead])
	{
	case Wall:
	{
		damageSnakeDir = None;
		advanceHead = false;

		int32 snakeSize = damageSnakeCells.size();

		// convert all snake cells into damage
		while (!damageSnakeCells.empty())
		{
			int32 cell = damageSnakeCells.back();
			damageSnakeCells.pop_back();
			damageGrid[cell] = Damage1;

			crewMessage += " ";
			crewMessage += cell;
			crewMessage += ":";
			crewMessage += Damage1;

			UpdateDamage(cell, SnakeBody, Damage1);
		}

		// create additional damage around crash area
		CreateDamage(GetDamageCellSection(newHead), snakeSize);
		break;
	}
	case SnakeBody:
		while (true)
		{
			int32 cell = damageSnakeCells.back();
			damageSnakeCells.pop_back();

			if (cell == newHead)
				break; // all snake cells up to the collision point have been converted into damage

			damageGrid[cell] = Damage1;

			crewMessage += " ";
			crewMessage += cell;
			crewMessage += ":";
			crewMessage += Damage1;

			UpdateDamage(cell, SnakeBody, Damage1);
		}
		tailCellsToLose = 0;
		break;
	case Apple:
		tailCellsToLose = 0;

		crewMessage += " ";
		crewMessage += CreateDamageApple();
		crewMessage += ":";
		crewMessage += Apple;
		break;
	case Damage1:
		UpdateDamage(newHead, Damage1, SnakeHead);
		break;
	case Damage2:
		UpdateDamage(newHead, Damage2, SnakeHead);
		tailCellsToLose = 2;
		break;
	case Damage3:
		UpdateDamage(newHead, Damage3, SnakeHead);
		tailCellsToLose = 3;
		break;
	}

	while (tailCellsToLose > 0)
	{
		// current tail cell becomes empty
		int32 tail = damageSnakeCells.back();
		damageGrid[tail] = Empty;
		damageSnakeCells.pop_back();

		crewMessage += " ";
		crewMessage += tail;
		crewMessage += ":";
		crewMessage += Empty;
	}

	if (advanceHead)
	{
		// current head cell becomes body
		damageGrid[oldHead] = SnakeBody;

		crewMessage += " ";
		crewMessage += oldHead;
		crewMessage += ":";
		crewMessage += SnakeBody;

		// new head cell becomes head
		damageGrid[newHead] = SnakeHead;
		damageSnakeCells.insert(damageSnakeCells.begin(), newHead);

		crewMessage += " ";
		crewMessage += newHead;
		crewMessage += ":";
		crewMessage += SnakeHead;
	}

	// send crew message listing changed cells
	SendCrewMessage(crewMessage.c_str());
}

void UDamageControlSystem::UpdateDamage(int32 updatedCell, EDamageCell before, EDamageCell after)
{
	int beforeDamage, afterDamage;
	switch (before)
	{
	case Damage1:
		beforeDamage = 1; break;
	case Damage2:
		beforeDamage = 1; break;
	case Damage3:
		beforeDamage = 1; break;
	default:
		beforeDamage = 0; break;
	}
	switch (after)
	{
	case Damage1:
		afterDamage = 1; break;
	case Damage2:
		afterDamage = 1; break;
	case Damage3:
		afterDamage = 1; break;
	default:
		afterDamage = 0; break;
	}

	int difference = afterDamage - beforeDamage;

	EDamageSection section = GetDamageCellSection(updatedCell);

	// TODO: apply damage difference to section total damage
}

int32 UDamageControlSystem::CreateDamageApple()
{
	while (true)
	{
		int32 cell = FMath::RandRange(0, DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT);

		if (damageGrid[cell] != Empty)
			continue;

		damageGrid[cell] = Apple;
		return cell;
	}
}

void UDamageControlSystem::CreateDamage(EDamageSection section, int32 amount)
{
	std::string crewMessage = "dmgcell";

	int32 numUpdated = 0;
	while (numUpdated < amount)
	{
		int32 cell;

		switch (section) {
		case Section_Manoevering:
			cell = GetDamageCellIndex(FMath::RandRange(0, 15), FMath::RandRange(0, 11)); break;
		case Section_Shields:
			cell = GetDamageCellIndex(FMath::RandRange(16, 31), FMath::RandRange(0, 11)); break;
		case Section_BeamWeapons:
			cell = GetDamageCellIndex(FMath::RandRange(32, 47), FMath::RandRange(0, 11)); break;
		case Section_Deflector:
			cell = GetDamageCellIndex(FMath::RandRange(0, 15), FMath::RandRange(12, 23)); break;
		case Section_Power:
			cell = GetDamageCellIndex(FMath::RandRange(16, 31), FMath::RandRange(12, 23)); break;
		case Section_Torpedoes:
			cell = GetDamageCellIndex(FMath::RandRange(32, 47), FMath::RandRange(12, 23)); break;
		case Section_Warp:
			cell = GetDamageCellIndex(FMath::RandRange(0, 15), FMath::RandRange(24, 35)); break;
		case Section_Sensors:
			cell = GetDamageCellIndex(FMath::RandRange(16, 31), FMath::RandRange(24, 35)); break;
		case Section_Communications:
			cell = GetDamageCellIndex(FMath::RandRange(32, 47), FMath::RandRange(24, 35)); break;
		default:
			cell = FMath::RandRange(0, DAMAGE_GRID_WIDTH * DAMAGE_GRID_HEIGHT); break;
		}

		EDamageCell content = (EDamageCell)damageGrid[cell], newContent;
		switch (content)
		{
		case Empty:
			newContent = Damage1; break;
		case Damage1:
			newContent = Damage2; break;
		case Damage2:
			newContent = Damage3; break;
		default:
			continue;
		}

		damageGrid[cell] = newContent;

		crewMessage += " ";
		crewMessage += cell;
		crewMessage += ":";
		crewMessage += newContent;

		UpdateDamage(cell, content, newContent);

		numUpdated++;
	}

	SendCrewMessage(crewMessage.c_str());
}

UDamageControlSystem::EDamageSection UDamageControlSystem::GetDamageCellSection(int32 cellIndex)
{
	int32 x = cellIndex % DAMAGE_GRID_WIDTH;
	int32 y = cellIndex / DAMAGE_GRID_WIDTH;

	if (x < 16) {
		if (y < 12)
			return Section_Manoevering;
		else if (y < 24)
			return Section_Deflector;
		else
			return Section_Warp;
	}
	else if (x < 32) {
		if (y < 12)
			return Section_Shields;
		else if (y < 24)
			return Section_Power;
		else
			return Section_Sensors;
	}
	else {
		if (y < 12)
			return Section_BeamWeapons;
		else if (y < 24)
			return Section_Torpedoes;
		else
			return Section_Communications;
	}
}




// --------- weapons

bool UWeaponSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	return false;
}

void UWeaponSystem::SendAllData()
{
	// TODO: send all weapon targets
}




// --------- communications

bool UCommunicationSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	return false;
}




// --------- sensors

bool USensorSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	return false;
}




// --------- deflector

bool UDeflectorSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	return false;
}