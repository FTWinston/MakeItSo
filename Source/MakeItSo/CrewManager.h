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

#define STARTS_WITH(msg, text) msg->size >  sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define MATCHES(msg, text)     msg->size >= sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)

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
#define EXTRACT(msg, buffer, offset) snprintf(buffer, sizeof(buffer), "%.*s\0", (int)       min(sizeof(buffer) - 1, msg->size - sizeof(offset) + 1), msg->data + sizeof(offset) - 1)
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
		Helm = 1,
		Warp = 2,
		Weapons = 4,
		Sensors = 8,
		PowerManagement = 16,
		DamageControl = 32,
		ViewScreen = 64,
		Communications = 128,

		AllStations = Helm + Warp + Weapons + Sensors + PowerManagement + DamageControl + ViewScreen + Communications,
		NoStations = 0,
	};

	FString Init(AShipPlayerController *controller);
	virtual void BeginDestroy();

	void LinkController(AShipPlayerController *controller);
	void Poll() { mg_mgr_poll(mgr, 1); }
	void HandleEvent(mg_connection *conn, int ev, void *ev_data);
	void SendFixed(mg_connection *conn, const char *message);
	void Send(mg_connection *conn, const char *message, ...);
	void Send(mg_connection *conn, FString message);
	void SendAllFixed(const char *message);
	void SendAll(const char *message, ...);
	void SendAll(FString message);
	void SendSystemFixed(ESystem system, const char *message);
	void SendSystem(ESystem system, const char *message, ...);
	void SendSystem(ESystem system, FString message);
	void SendAllCrewData();
	void ProcessSystemMessage(ESystem system, const TCHAR *message);

	UFUNCTION(BlueprintCallable, Category = MISUtils)
	static void EventReceived(mg_connection *conn, int ev, void *ev_data);
	
	static UCrewManager *Instance;
	static struct mg_serve_http_opts s_http_server_opts;

#ifndef WEB_SERVER_TEST
	void InputKey(FKey key, bool down);
	void InputAxis(FKey key, float value);
#endif

private:
	void CreateSystems();
	void ResetData();
	void PauseGame(bool state);
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int32 GetNewUniqueIdentifier();
	void HandleWebsocketMessage(ConnectionInfo *info, websocket_message *msg);
	void ShipSystemChanged(ConnectionInfo *info, int32 systemFlags);
	void SendSystemUsage(ConnectionInfo *sendTo);
	void SendGameActive();

	static mg_mgr *mgr;
	AShipPlayerController *controller;
	TMap<ESystem, UCrewSystem*> systems;

	ECrewState crewState;
	int32 nextConnectionIdentifer;
	bool selectSystemsDirectly;

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
		hasName = false;
	}

	mg_connection *connection;
	int32 identifier;
	int32 shipSystemFlags;
	FString name;
	bool hasName;
};



UCLASS(abstract)
class MAKEITSO_API UCrewSystem : public UObject
{
	GENERATED_BODY()

public:
	virtual void Init(UCrewManager *manager) { crewManager = manager; }
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) { return false; }
	virtual bool ProcessSystemMessage(FString message) { return false; }
	virtual void SendAllData() { }
	virtual void ResetData() { }
protected:
	UCrewManager* crewManager;
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::NoStations; }
};
