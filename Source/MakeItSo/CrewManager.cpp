#ifndef WEB_SERVER_TEST
#include "CrewManager.h"
#include "Engine/Engine.h"
#include "Runtime/Engine/Public/EngineGlobals.h"
#include "Runtime/Engine/Classes/Kismet/GameplayStatics.h"
#include "Runtime/Core/Public/Misc/Paths.h"
#include "ShipPlayerController.h"
#include "GameFramework/PlayerState.h"
#else
#include "stdafx.h"
#include "CrewManager.h"
#include <iostream>
#include <sstream>
#include <iterator>
#include <locale>
#include <codecvt>
#endif

#include "UIConnectionInfo.h"
#include "MakeItSoPawn.h"
#include "Mongoose.h"

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

struct mg_serve_http_opts s_http_server_opts;
char docRootPath[256];

void EventReceived(mg_connection *conn, int ev, void *ev_data)
{
	return UCrewManager::Instance->HandleEvent(conn, ev, ev_data);
}

#ifdef WEB_SERVER_TEST
AMakeItSoPawn *pawn;
#endif

AMakeItSoPawn* UCrewManager::GetShipPawn()
{
#ifdef WEB_SERVER_TEST
	return pawn;
#else
	return Cast<AMakeItSoPawn>(controller->GetPawn());
#endif
}

UShipSystem* UCrewManager::GetSystem(UShipSystem::ESystem system)
{
#ifndef WEB_SERVER_TEST
	return *GetShipPawn()->systems.Find(system);
#else
	return GetShipPawn()->systems.find(system)->second;
#endif
}

FString UCrewManager::Init(AShipPlayerController *controller)
{
	Instance = this;
	mgr = nullptr;
	LinkController(controller);

	crewState = ECrewState::Setup;

	nextConnectionIdentifer = 1;
	connectionInSetup = nullptr;
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
#ifdef WEB_SERVER_TEST
					wchar_t wBuffer[128];
					mbstowcs(wBuffer, szPort, strlen(szPort) + 1);
					strPort = TEXT(":") + FString(wBuffer);
#else
					strPort = TEXT(":") + FString(ANSI_TO_TCHAR(szPort));
#endif
				}
				else
				{
#ifndef WEB_SERVER_TEST
					if (controller)
						controller->ClientMessage(TEXT("An error occurred setting up the web server\n"));
#endif
				}
			}
		}

		if (conn != NULL)
		{
			mg_set_protocol_http_websocket(conn);
		}

#ifdef WEB_SERVER_TEST
		strncpy(docRootPath, "../wwwroot", sizeof(docRootPath));
#else
		auto tmpPath = StringCast<ANSICHAR>(*(FPaths::ProjectDir() / TEXT("wwwroot")));
		strncpy(docRootPath, tmpPath.Get(), sizeof(docRootPath));
#endif

		s_http_server_opts.document_root = docRootPath;

#ifndef WEB_SERVER_TEST
		controller->ClientMessage(FString::Printf(TEXT("Serving content from %s\n"), ANSI_TO_TCHAR(s_http_server_opts.document_root)));
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

void UCrewManager::ResetData()
{
	for (auto system : GetShipPawn()->systems)
		PAIRVALUE(system)->ResetData();
}

void UCrewManager::BeginDestroy()
{
	if (mgr)
		mg_mgr_free(mgr);

	mgr = nullptr;

	Super::BeginDestroy();
}

void UCrewManager::LinkController(AShipPlayerController *controller)
{
	this->controller = controller; // do we need to null this when the level changes? It's not a UPROPERTY, so it'll go dangling

#ifdef WEB_SERVER_TEST
	pawn = new AMakeItSoPawn();
#endif
}

void UCrewManager::PauseGame(bool state)
{
	if (state)
	{
		crewState = ECrewState::Paused;
		SendAllFixed("pause");
	}
	else
	{
		crewState = ECrewState::Active;
		AllocateViewSystems();
		SendAllFixed("game+");
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

	UIConnectionInfo *info = new UIConnectionInfo(conn, identifier);
	conn->user_data = info;

	// send connection ID back to the client.
	Send(conn, "id %i", info->identifier);

	// send all other players to this client
	for (auto& other : currentConnections)
	{
		if (other->hasName)
		{
			Send(conn, "player %i %S", other->identifier, CHARARR(other->name));
			Send(conn, "playersys %i %i", other->identifier, other->shipSystemFlags);
		}
	}

	SETADD(currentConnections, info);
	
	// indicate to the client that the game is currently active
	if (crewState == ECrewState::Active)
	{
		Send(conn, "game+");
		return;
	}
	else if (crewState == ECrewState::Paused)
	{
		Send(conn, "pause");
	}

#ifndef WEB_SERVER_TEST
	if (controller)
	{
		char buf[100];
		mg_sock_to_str(conn->sock, buf, sizeof(buf), MG_SOCK_STRINGIFY_REMOTE | MG_SOCK_STRINGIFY_IP);
		controller->ClientMessage(FString::Printf(TEXT("Client %i connected from %s\n"), info->identifier, ANSI_TO_TCHAR(buf)));
	}
#endif

	// if someone is in setup, tell this client
	if (connectionInSetup)
		Send(conn, "setup-");
}

void UCrewManager::EndConnection(mg_connection *conn)
{
	UIConnectionInfo *info = (UIConnectionInfo*)conn->user_data;

#ifndef WEB_SERVER_TEST
	if (controller)
		controller->ClientMessage(FString::Printf(TEXT("Client %i disconnected\n"), info->identifier));
#endif

	SETREMOVE(currentConnections, info);

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
	for (auto& other : currentConnections)
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
		for (auto& other : currentConnections)
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
		UIConnectionInfo *info = (UIConnectionInfo*)conn->user_data;
		if (info)
			HandleWebsocketMessage(info, (struct websocket_message *) ev_data);
		break;
	}
	case MG_EV_CLOSE:
		if (conn->flags & MG_F_IS_WEBSOCKET)
			EndConnection(conn);
		break;
	}
}

void UCrewManager::HandleWebsocketMessage(UIConnectionInfo *info, websocket_message *msg)
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
	else if (STARTS_WITH(msg, "sys+ "))
	{
		int32 systemFlag = ExtractInt(msg, sizeof("sys+ "));
		UShipSystem::ESystem system = GetDistinctSystem(systemFlag);
		ShipSystemChanged(info, info->shipSystemFlags | system);
	}
	else if (STARTS_WITH(msg, "sys- "))
	{
		int32 systemFlag = ExtractInt(msg, sizeof("sys- "));
		UShipSystem::ESystem system = GetDistinctSystem(systemFlag);
		ShipSystemChanged(info, info->shipSystemFlags & ~system);
	}
	else if (STARTS_WITH(msg, "viewsys "))
	{
		int32 systemFlag = ExtractInt(msg, sizeof("viewsys "));
		UShipSystem::ESystem system = GetDistinctSystem(systemFlag);

		// check this system is one that they have selected
		if ((info->shipSystemFlags & system) == 0)
			return;

		// check that no one else is viewing this system
		auto viewing = GetConnectionViewing(system);
		if (viewing != nullptr && viewing != info)
			return;

		// mark that they're viewing this system, and tell everyone
		info->viewingSystem = system;
		SendAll("viewsys %i %i", info->identifier, system);
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
	// ship name = player name
	else if (STARTS_WITH(msg, "shipName "))
	{
		if (connectionInSetup != info)
			return;

		char buffer[128];
		EXTRACT(msg, buffer, "shipName ");

#ifndef WEB_SERVER_TEST
		if (controller)
			controller->PlayerState->SetPlayerName(FString(ANSI_TO_TCHAR(buffer)));
#endif
	}
	else if (STARTS_WITH(msg, "startGame"))
	{
		if (connectionInSetup != info || crewState != ECrewState::Setup)
			return;

		StartGame(msg);
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
	/*
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
	else
	{
		for (auto system : GetShipPawn()->systems)
			if (PAIRVALUE(system)->ReceiveCrewMessage(info, msg))
				return;

#ifndef WEB_SERVER_TEST
		// write all unrecognised commands to the console
		// TODO: try this instead: printf("%.*s\n", (int)msg->size, msg->data);
		char buffer[128];
		EXTRACT(msg, buffer, "");
		if (controller)
			controller->ClientMessage(FString::Printf(TEXT("Unrecognised message from client %i: %s\n"), info->identifier, ANSI_TO_TCHAR(buffer)));
#endif
	}
}

void UCrewManager::StartGame(websocket_message *msg)
{
	if (STARTS_WITH(msg, "startGame local"))
	{
		if (STARTS_WITH(msg, "startGame local exploration")) {
			int difficulty = ExtractInt(msg, sizeof("startGame local exploration "));
#ifndef WEB_SERVER_TEST
			// TODO: load exploration map with specified difficulty
			UGameplayStatics::OpenLevel(controller, TEXT("/Game/FlyingCPP/Maps/FlyingExampleMap"));
#endif
		}
		else if (STARTS_WITH(msg, "startGame local survival")) {
			int difficulty = ExtractInt(msg, sizeof("startGame local survival "));
#ifndef WEB_SERVER_TEST
			// TODO: load survival map with specified difficulty
			UGameplayStatics::OpenLevel(controller, TEXT("/Game/FlyingCPP/Maps/FlyingExampleMap"));
#endif
		}
		else
			return;
	}
	else if (STARTS_WITH(msg, "startGame host"))
	{
		if (STARTS_WITH(msg, "startGame host exploration")) {
			int difficulty = ExtractInt(msg, sizeof("startGame host exploration "));
			// TODO: host an exploration game with specified difficulty
		}
		else if (STARTS_WITH(msg, "startGame host survival")) {
			int difficulty = ExtractInt(msg, sizeof("startGame host survival "));
			// TODO: host a survival game with specified difficulty
		}
		else if (MATCHES(msg, "startGame host arena")) {
			// TODO: host an arena game
		}
		else
			return;
	}
	else if (STARTS_WITH(msg, "startGame join"))
	{
		char buffer[128];
		EXTRACT(msg, buffer, "startGame join ");
		// TODO: join server address contained in buffer
	}
	else
		return;

	// no need to send corresponding setup-, as game+ clears the setup player on clients
	connectionInSetup = nullptr;

	PauseGame(false); // unpausing the game (though it isn't paused now) does all the remaining setup we need
}

void UCrewManager::AllocateViewSystems()
{
	int32 alreadyAllocated = UShipSystem::ESystem::None;

	// check what system players are currently viewing. If it's one they (still) have selected, let them keep that.
	for (auto& connection : currentConnections)
	{
		if ((connection->shipSystemFlags & connection->viewingSystem) != 0)
			alreadyAllocated |= connection->viewingSystem;
		else
			connection->viewingSystem = UShipSystem::ESystem::None;
	}

	// for every player that doesn't have a system, see if there's one they have selected that isn't already allocated
	for (auto& connection : currentConnections)
	{
		if (connection->viewingSystem == UShipSystem::ESystem::None)
		{
			UShipSystem::ESystem viewSystem = GetDistinctSystem(connection->shipSystemFlags & ~alreadyAllocated);
			alreadyAllocated |= viewSystem;

			connection->viewingSystem = viewSystem;
		}

		// regardless of if it has changed or not, tell everyone what they're now viewing
		SendAll("viewsys %i %i", connection->identifier, connection->viewingSystem);
	}
}

TArray<FString> UCrewManager::SplitParts(websocket_message *msg, int offset)
{
	char buffer[128];
	EXTRACT_WITH_OFFSET(msg, buffer, offset);
	TArray<FString> parts;

#ifndef WEB_SERVER_TEST
	FString fstr = FString(ANSI_TO_TCHAR(buffer));
	fstr.ParseIntoArray(parts, TEXT(" "));
#else
	wchar_t wBuffer[128];
	mbstowcs(wBuffer, buffer, strlen(buffer) + 1);
	auto wString = FString(wBuffer);

	std::wistringstream iss(wString);

	std::istream_iterator<std::wstring, wchar_t> eos;
	std::istream_iterator<std::wstring, wchar_t> iit(iss);
	std::copy(iit, eos, std::back_inserter(parts));
#endif

	return parts;
}

void UCrewManager::ShipSystemChanged(UIConnectionInfo *info, int32 systemFlags)
{
	if (crewState == ECrewState::Active)
		return;

	info->shipSystemFlags = systemFlags;

	SendAll("playersys %i %i", info->identifier, systemFlags);
}

UShipSystem::ESystem UCrewManager::GetDistinctSystem(int systemFlags)
{
	if ((systemFlags & UShipSystem::ESystem::Helm) != 0)
		return UShipSystem::ESystem::Helm;
	if ((systemFlags & UShipSystem::ESystem::Warp) != 0)
		return UShipSystem::ESystem::Warp;
	if ((systemFlags & UShipSystem::ESystem::Weapons) != 0)
		return UShipSystem::ESystem::Weapons;
	if ((systemFlags & UShipSystem::ESystem::Sensors) != 0)
		return UShipSystem::ESystem::Sensors;
	if ((systemFlags & UShipSystem::ESystem::PowerManagement) != 0)
		return UShipSystem::ESystem::PowerManagement;
	if ((systemFlags & UShipSystem::ESystem::DamageControl) != 0)
		return UShipSystem::ESystem::DamageControl;
	if ((systemFlags & UShipSystem::ESystem::Communications) != 0)
		return UShipSystem::ESystem::Communications;
	if ((systemFlags & UShipSystem::ESystem::ViewScreen) != 0)
		return UShipSystem::ESystem::ViewScreen;

	return UShipSystem::ESystem::None;
}

UIConnectionInfo *UCrewManager::GetConnectionViewing(UShipSystem::ESystem system)
{
	for (auto& connection : currentConnections)
	{
		if ((connection->viewingSystem & system) != 0)
			return connection;
	}

	return nullptr;
}

void UCrewManager::SendFixed(mg_connection *conn, const char *message)
{
	int32 len = strlen(message);
	mg_send_websocket_frame(conn, WEBSOCKET_OP_TEXT, message, len);
}

#ifdef WEB_SERVER_TEST
#pragma unmanaged
#endif
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
#ifdef WEB_SERVER_TEST
#pragma managed
#endif

void UCrewManager::Send(mg_connection *conn, FString message)
{
#ifndef WEB_SERVER_TEST
	auto nMessage = TCHAR_TO_ANSI(*message);
#else
	auto nMessage = std::wstring_convert<std::codecvt_utf8<wchar_t>>().to_bytes(message).c_str();
#endif

	SendFixed(conn, nMessage);
}

void UCrewManager::SendAllFixed(const char *message)
{
	int32 len = strlen(message);

	for (auto& other : currentConnections)
	{
		mg_send_websocket_frame(other->connection, WEBSOCKET_OP_TEXT, message, len);
	}
}

#ifdef WEB_SERVER_TEST
#pragma unmanaged
#endif
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
#ifdef WEB_SERVER_TEST
#pragma managed

std::string ToNarrowString(FString wide)
{
	std::string narrow;

	std::transform(wide.begin(), wide.end(),
		std::back_insert_iterator<std::string>(narrow),
		[](wchar_t wchar)
	{
		return static_cast<char>(wchar > 127 ? '?' : wchar);
	});

	return narrow;
}

#endif

void UCrewManager::SendAll(FString message)
{
#ifndef WEB_SERVER_TEST
	auto nMessage = TCHAR_TO_ANSI(*message);
#else
	auto nStr = ToNarrowString(message);
	auto nMessage = nStr.c_str();
#endif

	SendAllFixed(nMessage);
}

void UCrewManager::SendSystemFixed(UShipSystem::ESystem system, const char *message)
{
	int32 systemFlags = system;
	int32 len = strlen(message);

	for (auto& other : currentConnections)
	{
		if (other->shipSystemFlags & systemFlags)
			mg_send_websocket_frame(other->connection, WEBSOCKET_OP_TEXT, message, len);
	}
}

#ifdef WEB_SERVER_TEST
#pragma unmanaged
#endif
void UCrewManager::SendSystem(UShipSystem::ESystem system, const char *message, ...)
{
	char mem[MG_VPRINTF_BUFFER_SIZE], *buf = mem;
	va_list ap;

	va_start(ap, message);
	if ((mg_avprintf(&buf, sizeof(mem), message, ap)) > 0)
	{
		SendSystemFixed(system, buf);
	}
	va_end(ap);

	if (buf != mem && buf != NULL)
	{
		free(buf);
	}
}
#ifdef WEB_SERVER_TEST
#pragma managed
#endif

void UCrewManager::SendSystem(UShipSystem::ESystem system, FString message)
{
#ifndef WEB_SERVER_TEST
	auto nMessage = TCHAR_TO_ANSI(*message);
#else
	auto nStr = ToNarrowString(message);
	auto nMessage = nStr.c_str();
#endif
	
	SendSystemFixed(system, nMessage);
}

void UCrewManager::SendAllCrewData()
{
	for (auto system : GetShipPawn()->systems)
		PAIRVALUE(system)->SendAllData();
}