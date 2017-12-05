// Fill out your copyright notice in the Description page of Project Settings.

#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#include "Engine/Engine.h"
#include "Runtime/Engine/Public/EngineGlobals.h"
#include "ShipPlayerController.h"
#else
#include "stdafx.h"
#include <iostream>
#include <sstream>
#include <iterator>
#endif

#include "CrewManager.h"

#include "CommunicationSystem.h"
#include "DamageControlSystem.h"
#include "HelmSystem.h"
#include "PowerSystem.h"
#include "SensorSystem.h"
#include "WarpSystem.h"
#include "ViewScreenSystem.h"
#include "WeaponSystem.h"

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

UCrewManager *UCrewManager::Instance = nullptr;
mg_mgr *UCrewManager::mgr = nullptr;
struct mg_serve_http_opts UCrewManager::s_http_server_opts;

void UCrewManager::EventReceived(mg_connection *conn, int ev, void *ev_data)
{
	return Instance->HandleEvent(conn, ev, ev_data);
}

FString UCrewManager::Init(AShipPlayerController *controller)
{
	Instance = this;
	LinkController(controller);

	crewState = ECrewState::Setup;

	nextConnectionIdentifer = 1;
	connectionInSetup = nullptr;
	currentConnections = new TSet<ConnectionInfo*>();
	FString strPort;

	if (!mgr)
	{
		mgr = new mg_mgr();
		mg_mgr_init(mgr, NULL);

		// try port 80 for user convenience
		struct mg_connection *conn = mg_bind(mgr, "80", EventReceived);
		if (conn != NULL)
		{
			strPort = TEXT(""); // don't display port 80
		}
		else
		{
			// if that's in use, try port 8080
			conn = mg_bind(mgr, "8080", EventReceived);
			if (conn != NULL)
			{
				strPort = TEXT(":8080");
			}
			else
			{
				// failing that, select a port automatically
				conn = mg_bind(mgr, "0", EventReceived);

				if (conn != NULL)
				{
					char szPort[16];
					mg_conn_addr_to_str(conn, szPort, sizeof(szPort), MG_SOCK_STRINGIFY_PORT);

					std::string tmpString = szPort;
					FString tmpFString(tmpString.length(), L' ');
					std::copy(tmpString.begin(), tmpString.end(), tmpFString.begin());
					strPort = TEXT(":") + tmpFString;
				}
				else
				{
#ifndef WEB_SERVER_TEST
					if (controller)
						controller->ClientMessage(FString::Printf(TEXT("An error occurred setting up the web server: %s\n"), *FString(error)));
#endif
				}
			}
		}

		if (conn != NULL)
		{
			mg_set_protocol_http_websocket(conn);
		}

#ifdef WEB_SERVER_TEST
		s_http_server_opts.document_root = "../wwwroot";
#else
		FString rootPath = FPaths::GameDir() / TEXT("wwwroot");
		s_http_server_opts.document_root = TCHAR_TO_ANSI(*rootPath);
#endif
	}

	FString url = GetLocalIP() + strPort;

#ifndef WEB_SERVER_TEST
	// display address info that web clients should connect to
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Listening on %s\n"), *url));
#endif

	return url;
}

#ifndef WEB_SERVER_TEST
#define ADDSYSTEM(lookup, systemType) systems.Add(lookup, NewObject<systemType>())
#else
#define ADDSYSTEM(lookup, systemType) systems.insert(std::pair<ESystem, UCrewSystem*>(lookup, new systemType()));
#endif

void UCrewManager::CreateSystems()
{
	ADDSYSTEM(ESystem::Helm, UHelmSystem);
	ADDSYSTEM(ESystem::Warp, UWarpSystem);
	ADDSYSTEM(ESystem::Weapons, UWeaponSystem);
	ADDSYSTEM(ESystem::Sensors, USensorSystem);
	ADDSYSTEM(ESystem::PowerManagement, UPowerSystem);
	ADDSYSTEM(ESystem::DamageControl, UDamageControlSystem);
	ADDSYSTEM(ESystem::ViewScreen, UViewscreenSystem);
	ADDSYSTEM(ESystem::Communications, UCommunicationSystem);

	for (auto system : systems)
	{
#ifndef WEB_SERVER_TEST
		auto s = system.Value;
#else
		auto s = system.second;
#endif
		s->Init(this);
	}
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
	if (mgr)
		mg_mgr_free(mgr);

	mgr = nullptr;

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
		SendAll("pause");
	}
	else
	{
		crewState = ECrewState::Active;
		SendGameActive();
		SendAllCrewData();
	}

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->SetPause(state);
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

void UCrewManager::SetupConnection(mg_connection *conn)
{
	int32 identifier = GetNewUniqueIdentifier();
	if (identifier == -1)
	{
		Send(conn, "full");
		return;
	}

	ConnectionInfo *info = new ConnectionInfo(conn, identifier);
	conn->user_data = info;

	// Send connection ID back to the client.
	Send(conn, "id %i", info->identifier);

	// send all other players to this client
	for (auto& other : *currentConnections)
	{
		if (other->hasName)
		{
			Send(conn, "player %i %S", other->identifier, CHARARR(other->name));
			Send(conn, "playersys %i %i", other->identifier, other->shipSystemFlags);
		}
	}

#ifndef WEB_SERVER_TEST
	currentConnections->Add(info);
#else
	currentConnections->insert(currentConnections->end(), info);
#endif
	
	// indicate to the client that the game is currently active. They cannot do anything until it is paused, so show an appropriate "please wait" message.
	if (crewState == ECrewState::Active)
	{
		Send(conn, "game+ 0");
		return;
	}
	else if (crewState == ECrewState::Paused)
	{
		Send(conn, "pause");
	}

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Client %i connected from %s\n"), info->identifier, ANSI_TO_TCHAR(conn->remote_ip)));
#endif

	// if someone is in setup, tell this client
	if (connectionInSetup)
		Send(conn, "setup-");
}

void UCrewManager::EndConnection(mg_connection *conn)
{
	ConnectionInfo *info = (ConnectionInfo*)conn->user_data;

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Client %i disconnected\n"), info->identifier));
	currentConnections->Remove(info);
#else
	currentConnections->erase(std::remove(currentConnections->begin(), currentConnections->end(), info), currentConnections->end());
#endif

	// send "player quit" message to crewmates
	SendAll("disconnect %i", info->identifier);
	
	if (connectionInSetup == info)
	{
		connectionInSetup = nullptr;

		// send "setup not in use" message to all
		SendAllFixed("setup-");
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
		if (identifier > MAX_CREW_CONNECTIONS)
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

		if (++numChecked > MAX_CREW_CONNECTIONS)
			return -1;
	} while (true);
}

void UCrewManager::HandleEvent(mg_connection *conn, int ev, void *ev_data)
{
	switch (ev)
	{
	case MG_EV_HTTP_REQUEST:
		mg_serve_http(conn, (struct http_message *) ev_data, s_http_server_opts);
		break;
	case MG_EV_WEBSOCKET_HANDSHAKE_DONE:
		SetupConnection(conn);
		break;
	case MG_EV_WEBSOCKET_FRAME: {
		ConnectionInfo *info = (ConnectionInfo*)conn->user_data;
		if (info) // if this connection hasn't been allocated a crew position, don't let them do stuff
			HandleWebsocketMessage(info, (struct websocket_message *) ev_data);
		break;
	}
	case MG_EV_CLOSE:
		if (conn->flags & MG_F_IS_WEBSOCKET)
			EndConnection(conn);
		break;
	}
}

void UCrewManager::HandleWebsocketMessage(ConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "name "))
	{		
		char buffer[128];
		EXTRACT(msg, buffer, "name ");
#ifndef WEB_SERVER_TEST
		info->name = FString(ANSI_TO_TCHAR(buffer));
#else
		wchar_t wBuffer[128];
		mbstowcs(wBuffer, buffer, strlen(buffer) + 1);
		info->name = FString(wBuffer);
#endif
		info->hasName = true;
		
		SendAll("player %i %S", info->identifier, CHARARR(info->name));
	}
	else if (MATCHES(msg, "all_present"))
	{
		// TODO: if game in progress, do nothing

		SendAll("all_present");
	}
	else if (STARTS_WITH(msg, "sys+ "))
	{
		char buffer[10];
		EXTRACT(msg, buffer, "sys+ ");
		int32 systemFlags = atoi(buffer);
		ShipSystemChanged(info, info->shipSystemFlags | systemFlags);
	}
	else if (STARTS_WITH(msg, "sys- "))
	{
		char buffer[10];
		EXTRACT(msg, buffer, "sys- ");
		int32 systemFlags = atoi(buffer);
		ShipSystemChanged(info, info->shipSystemFlags & ~systemFlags);
	}
	else if (MATCHES(msg, "+setup"))
	{
		if (connectionInSetup != nullptr || crewState != ECrewState::Setup)
			return;

		connectionInSetup = info;

		// send "setup in use" message to all others
		SendAll("setup+ %i", info->identifier);
	}
	else if (MATCHES(msg, "-setup"))
	{
		if (connectionInSetup != info || crewState != ECrewState::Setup)
			return;

		connectionInSetup = nullptr;

		// send "setup not in use" message to all others
		SendAllFixed("setup-");
	}
	/*
	// ship name = player name
	else if (STARTS_WITH(msg, "shipname "))
	{
		if (connectionInSetup != info)
			return;

		char buffer[128];
		EXTRACT(msg, buffer, "shipname ");

		name = std::string(buffer);
	}
	else if (MATCHES(msg, "startGame"))
	{
		if (connectionInSetup != info || crewState != ECrewState::Setup)
			return;

		if (!systems.empty())
			CreateSystems();

		connectionInSetup = nullptr; // game started, no one is setting it up anymore
		crewState = ECrewState::Active;

		SendGameActive();
		SendAllCrewData();

#ifndef WEB_SERVER_TEST
		//todo: this should consider the game mode/type selected
		UGameplayStatics::OpenLevel(controller, TEXT("/Game/Flying/Maps/FlyingExampleMap"));
#endif
	}
	else if (MATCHES(msg, "pause"))
	{
		if (crewState != ECrewState::Active || info->shipSystemFlags == 0) // if you have no systems, you're not in the game, so can't pause it
			return;

		PauseGame(true); //actually pause the game!
	}
	else if (MATCHES(msg, "resume"))
	{
		if (crewState != ECrewState::Paused)
			return;

		PauseGame(false);
	}
	else if (MATCHES(msg, "quit"))
	{
		if (crewState != ECrewState::Paused)
			return;

		crewState = ECrewState::Setup;

#ifndef WEB_SERVER_TEST
		auto message = FString::Printf(TEXT("game- %i"), info->identifier);
		SendCrewMessage(ESystem::Everyone, CHARARR(message));
#else
		TCHAR buffer[16];
		swprintf(buffer, sizeof(buffer), L"game- %i", info->identifier);
		SendSystemMessage(ESystem::Everyone, buffer);
#endif

#ifndef WEB_SERVER_TEST
		UGameplayStatics::OpenLevel(controller, TEXT("/Game/Main"));
#endif
	}
	*/

	for (auto system : systems)
#ifndef WEB_SERVER_TEST
		if (system.Value->ReceiveCrewMessage(info, msg))
#else
		if (system.second->ReceiveCrewMessage(info, msg))
#endif
			return;

#ifndef WEB_SERVER_TEST
	// write all unrecognised commands to the console
	char buffer[128];
	EXTRACT(info, buffer, "");
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Unrecognised message from client %i: %s\n"), info->identifier, ANSI_TO_TCHAR(buffer)));
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

void UCrewManager::ShipSystemChanged(ConnectionInfo *info, int32 systemFlags)
{
	if (crewState == ECrewState::Active)
		return;

	info->shipSystemFlags = systemFlags;

	SendAll("playersys %i %i", info->identifier, systemFlags);
}

void UCrewManager::SendGameActive()
{
	for (auto& info : *currentConnections)
		Send(info->connection, "game+ %i", info->shipSystemFlags);
}

void UCrewManager::SendFixed(mg_connection *conn, const char *message)
{
	int32 len = strlen(message);
	mg_send_websocket_frame(conn, WEBSOCKET_OP_TEXT, message, len);
}

void UCrewManager::Send(mg_connection *conn, const char *message, ...)
{
	// copied from mg_printf_websocket_frame cos we can't pas var args into that
	char mem[MG_VPRINTF_BUFFER_SIZE], *buf = mem;
	va_list ap;

	va_start(ap, message);
	if ((mg_avprintf(&buf, sizeof(mem), message, ap)) > 0)
	{
		SendFixed(conn, buf);
	}
	va_end(ap);

	if (buf != mem && buf != NULL)
	{
		free(buf);
	}
}

void UCrewManager::Send(mg_connection *conn, FString message)
{
#ifndef WEB_SERVER_TEST
	auto nMessage = TCHAR_TO_ANSI(message);
#else
	char nMessage[2048];
	int32 len = wcslen(message.c_str());
	wcstombs(nMessage, message.c_str(), len);
	nMessage[len] = '\0';
#endif

	SendFixed(conn, nMessage);
}

void UCrewManager::SendAllFixed(const char *message)
{
	int32 len = strlen(message);

	for (auto& other : *currentConnections)
	{
		mg_send_websocket_frame(other->connection, WEBSOCKET_OP_TEXT, message, len);
	}
}

void UCrewManager::SendAll(const char *message, ...)
{
	char mem[MG_VPRINTF_BUFFER_SIZE], *buf = mem;
	va_list ap;

	va_start(ap, message);
	if ((mg_avprintf(&buf, sizeof(mem), message, ap)) > 0)
	{
		SendAllFixed(buf);
	}
	va_end(ap);

	if (buf != mem && buf != NULL)
	{
		free(buf);
	}
}

void UCrewManager::SendAll(FString message)
{
#ifndef WEB_SERVER_TEST
	auto nMessage = TCHAR_TO_ANSI(message);
#else
	char nMessage[2048];
	int len = wcslen(message.c_str());
	wcstombs(nMessage, message.c_str(), len);
	nMessage[len] = '\0';
#endif

	SendAllFixed(nMessage);
}

void UCrewManager::SendSystemFixed(ESystem system, const char *message)
{
	int32 systemFlags = system;
	int32 len = strlen(message);

	for (auto& other : *currentConnections)
	{
		if (other->shipSystemFlags & systemFlags)
			mg_send_websocket_frame(other->connection, WEBSOCKET_OP_TEXT, message, len);
	}
}

void UCrewManager::SendSystem(ESystem system, const char *message, ...)
{
	char mem[MG_VPRINTF_BUFFER_SIZE], *buf = mem;
	va_list ap;

	va_start(ap, message);
	if ((mg_avprintf(&buf, sizeof(mem), message, ap)) > 0)
	{
		SendAllFixed(buf);
	}
	va_end(ap);

	if (buf != mem && buf != NULL)
	{
		free(buf);
	}
}

void UCrewManager::SendSystem(ESystem system, FString message)
{
#ifndef WEB_SERVER_TEST
	auto nMessage = TCHAR_TO_ANSI(message);
#else
	char nMessage[2048];
	int len = wcslen(message.c_str());
	wcstombs(nMessage, message.c_str(), len);
	nMessage[len] = '\0';
#endif

	SendSystemFixed(system, nMessage);
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

void UCrewManager::ProcessSystemMessage(ESystem system, const TCHAR *message)
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
