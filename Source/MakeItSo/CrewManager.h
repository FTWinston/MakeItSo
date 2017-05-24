// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#ifndef WEB_SERVER_TEST
#include "GameFramework/PlayerInput.h"
#endif
#include "Mongoose.h"
#include "CrewManager.Generated.h"
#ifdef WEB_SERVER_TEST
#include <windows.h>
#endif

#if defined(_MSC_VER) && _MSC_VER < 1900
#define snprintf _snprintf_s
#endif

#define MAX_CREW_CONNECTIONS 20

#define STARTS_WITH(info, prefix) info->connection->content_len > sizeof(prefix) - 1 && !memcmp(info->connection->content, prefix, sizeof(prefix) - 1)
#define MATCHES(info, prefix)     info->connection->content_len >= sizeof(prefix) - 1 && !memcmp(info->connection->content, prefix, sizeof(prefix) - 1)

#ifndef WEB_SERVER_TEST
#define CHARARR(str) *str
#define EMPTY(set) set.Num() == 0
#define NOTEMPTY(set) set.Num() != 0
#define EXTRACT(info, buffer, offset) snprintf(buffer, sizeof(buffer), "%.*s\0", (int)FMath::Min(sizeof(buffer) - 1, info->connection->content_len - sizeof(offset) + 1), info->connection->content + sizeof(offset) - 1)
#define APPENDINT(str, i) str.AppendInt(i);
#else
#define CHARARR(str) str.c_str()
#define EMPTY(set) set.empty()
#define NOTEMPTY(set) !set.empty()
#define EXTRACT(info, buffer, offset) snprintf(buffer, sizeof(buffer), "%.*s\0", (int)       min(sizeof(buffer) - 1, info->connection->content_len - sizeof(offset) + 1), info->connection->content + sizeof(offset) - 1)
#define APPENDINT(str, i) str += std::to_wstring(i);
#endif


class ConnectionInfo;
class AShipPlayerController;
class UCrewSystem;

/**
*
*/
UCLASS()
class MAKEITSO_API UCrewManager : public UObject
{
	GENERATED_BODY()

public:
	enum ECrewState {
		Setup = 0,
		Active = 1,
		Paused = 2
	};

	enum ESystem
	{
		Helm = 0,
		ViewScreen,
		Communications,
		Sensors,
		Weapons,
		Shields,
		DamageControl,
		PowerManagement,
		Deflector,

		MAX_SHIP_SYSTEMS,

		AllStations,
		NoStations,
		Everyone
	};

	FString Init(AShipPlayerController *controller);
	virtual void BeginDestroy();

	void LinkController(AShipPlayerController *controller);
	void Poll() { mg_poll_server(server, 1); }
	int32 HandleEvent(mg_connection *conn, enum mg_event ev);
	void SendCrewMessage(ESystem system, const TCHAR *message, ConnectionInfo *exclude = nullptr);
	void SendAllCrewData();
	void ProcessSystemMessage(ESystem system, const TCHAR *message);

	UFUNCTION(BlueprintCallable, Category = MISUtils)
	static FString GetLocalURL();
	static int32 EventReceived(mg_connection *conn, enum mg_event ev);
	
	static UCrewManager *Instance;

#ifndef WEB_SERVER_TEST
	void InputKey(FKey key, bool down);
	void InputAxis(FKey key, float value);
#endif

private:
	void CreateSystems();
	void ResetData();
	void PauseGame(bool state);
	void AllocateListenPort();
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int32 GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info);
	void ShipSystemChanged(ConnectionInfo *info, int32 shipSystemIndex, bool adding);
	void SendSystemSelectionMessage(ConnectionInfo *info, int32 shipSystemIndex, bool adding);

	static mg_server *server;
	AShipPlayerController *controller;
	TMap<ESystem, UCrewSystem*> systems;

	ECrewState crewState;
	int32 nextConnectionIdentifer;
	static const int32 maxConnectionIdentifer = 26;
	int32 shipSystemCounts[MAX_SHIP_SYSTEMS];

	TSet<ConnectionInfo*> *currentConnections;
	ConnectionInfo *connectionInSetup;
};

class ConnectionInfo
{
public:
	ConnectionInfo(mg_connection *conn, int32 id)
	{
		connection = conn;
		identifier = id;
		shipSystemFlags = 0;
		name = FString(TEXT("New player"));
	}

	mg_connection *connection;
	int32 identifier;
	int32 shipSystemFlags;
	FString name;
};



UCLASS(abstract)
class MAKEITSO_API UCrewSystem : public UObject
{
	GENERATED_BODY()

public:
	virtual void Init(UCrewManager *manager) { crewManager = manager; }
	virtual bool ReceiveCrewMessage(ConnectionInfo *info) { return false; }
	virtual bool ProcessSystemMessage(FString message) { return false; }
	virtual void SendAllData() { }
	virtual void ResetData() { }
protected:
	void SendCrewMessage(const TCHAR *message, ConnectionInfo *exclude = nullptr) { crewManager->SendCrewMessage(GetSystem(), message, exclude); }
	UCrewManager* crewManager;
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::NoStations; }
};
