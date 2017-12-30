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

#ifndef WEB_SERVER_TEST
#define CHARARR(str) *str
#define EMPTY(set) set.Num() == 0
#define NOTEMPTY(set) set.Num() != 0
#define APPENDINT(str, i) str.AppendInt(i)
#define STRFIND(str, val) str.Find(val)
#define CHOPSTART(str, pos) str.RemoveAt(0, pos, false);
#define PAIRVALUE(pair) pair.Value
#else
#define CHARARR(str) str.c_str()
#define EMPTY(set) set.empty()
#define NOTEMPTY(set) !set.empty()
#define APPENDINT(str, i) str += std::to_wstring(i)
#define STRFIND(str, val) str.find(val)
#define CHOPSTART(str, pos) str = str.substr(pos)
#define PAIRVALUE(pair) pair.second
#endif

#define STARTS_WITH(msg, text) msg->size > sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define MATCHES(msg, text)   msg->size == sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define EXTRACT(msg, buffer, skipText) EXTRACT_WITH_OFFSET(msg, buffer, sizeof(skipText))
#define EXTRACT_WITH_OFFSET(msg, buffer, offsetLength) snprintf(buffer, sizeof(buffer), "%.*s\0", (int32)FMath::Min(sizeof(buffer) - 1, msg->size - offsetLength + 1), msg->data + offsetLength - 1)

class ConnectionInfo;
class AShipPlayerController;
class UCrewSystem;
class AMakeItSoPawn;

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

		All = Helm + Warp + Weapons + Sensors + PowerManagement + DamageControl + ViewScreen + Communications,
		None = 0,
	};

	FString Init(AShipPlayerController *controller);
	virtual void BeginDestroy();

	void LinkController(AShipPlayerController *controller);
	void TickSystems(float DeltaSeconds);
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
	AMakeItSoPawn* GetShipPawn();

	int32 ExtractInt(websocket_message *msg, int offset) {
		char buffer[12];
		EXTRACT_WITH_OFFSET(msg, buffer, offset);
		return atoi(buffer);
	}

	float ExtractFloat(websocket_message *msg, int offset) {
		char buffer[12];
		EXTRACT_WITH_OFFSET(msg, buffer, offset);
		return atof(buffer);
	}

	static UCrewManager *Instance;

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
	void StartGame(websocket_message *msg);
	void ShipSystemChanged(ConnectionInfo *info, int32 systemFlags);
	ESystem GetDistinctSystem(int systemFlags);
	ConnectionInfo *GetConnectionViewing(ESystem system);
	void AllocateViewSystems();

	static mg_mgr *mgr;
	AShipPlayerController *controller;
	TMap<ESystem, UCrewSystem*> systems;

	ECrewState crewState;
	int32 nextConnectionIdentifer;

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
		viewingSystem = UCrewManager::ESystem::None;
		hasName = false;
	}

	mg_connection *connection;
	int32 identifier;
	int32 shipSystemFlags;
	UCrewManager::ESystem viewingSystem;
	FString name;
	bool hasName;
};



UCLASS(abstract)
class MAKEITSO_API UCrewSystem : public UObject
{
	GENERATED_BODY()

public:
	virtual void Init(UCrewManager *manager) { crewManager = manager; ResetData(); }
	virtual bool ReceiveCrewMessage(ConnectionInfo *info, websocket_message *msg) { return false; }
	virtual bool ProcessSystemMessage(FString message) { return false; }
	virtual void Tick(float DeltaSeconds) { }
	virtual void SendAllData() { }
	virtual void ResetData() { }
protected:
	UCrewManager* crewManager;
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::None; }
	int32 ExtractInt(websocket_message *msg, int offset) { return crewManager->ExtractInt(msg, offset); }
	float ExtractFloat(websocket_message *msg, int offset) { return crewManager->ExtractFloat(msg, offset); }
};
