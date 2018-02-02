#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#include "GameFramework/PlayerInput.h"
#endif
#include "ShipSystem.h"
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
#define SIZENUM(set) set.Num()
#define APPENDINT(str, i) str.AppendInt(i)
#define STRFIND(str, val) str.Find(val)
#define CHOPSTART(str, pos) str.RemoveAt(0, pos, false);
#define PAIRVALUE(pair) pair.Value
#else
#define CHARARR(str) str.c_str()
#define EMPTY(set) set.empty()
#define NOTEMPTY(set) !set.empty()
#define SIZENUM(set) set.size()
#define APPENDINT(str, i) str += std::to_wstring(i)
#define STRFIND(str, val) str.find(val)
#define CHOPSTART(str, pos) str = str.substr(pos)
#define PAIRVALUE(pair) pair.second
#endif

#define STARTS_WITH(msg, text) msg->size > sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define MATCHES(msg, text)   msg->size == sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define EXTRACT(msg, buffer, skipText) EXTRACT_WITH_OFFSET(msg, buffer, sizeof(skipText))
#define EXTRACT_WITH_OFFSET(msg, buffer, offsetLength) snprintf(buffer, sizeof(buffer), "%.*s\0", (int32)FMath::Min(sizeof(buffer) - 1, msg->size - offsetLength + 1), msg->data + offsetLength - 1)

class UIConnectionInfo;
class AShipPlayerController;
class UShipSystem;
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
	void SendSystemFixed(UShipSystem::ESystem system, const char *message);
	void SendSystem(UShipSystem::ESystem system, const char *message, ...);
	void SendSystem(UShipSystem::ESystem system, FString message);
	void SendAllCrewData();
	void ProcessSystemMessage(UShipSystem::ESystem system, const TCHAR *message);
	AShipPlayerController* GetController() { return controller; }
	AMakeItSoPawn* GetShipPawn();
	UShipSystem* GetSystem(UShipSystem::ESystem system);

	int32 ExtractInt(websocket_message *msg, int offset)
	{
		char buffer[12];
		EXTRACT_WITH_OFFSET(msg, buffer, offset);
		return atoi(buffer);
	}

	float ExtractFloat(websocket_message *msg, int offset)
	{
		char buffer[12];
		EXTRACT_WITH_OFFSET(msg, buffer, offset);
		return (float)atof(buffer);
	}

	static UCrewManager *Instance;

#ifndef WEB_SERVER_TEST
	void InputKey(FKey key, bool down);
	void InputAxis(FKey key, float value);
#endif

private:
	void InitSystems();
	void ResetData();
	void PauseGame(bool state);
	static FString GetLocalIP();

	void SetupConnection(mg_connection *conn);
	void EndConnection(mg_connection *conn);
	int32 GetNewUniqueIdentifier();
	void HandleWebsocketMessage(UIConnectionInfo *info, websocket_message *msg);
	void StartGame(websocket_message *msg);
	void ShipSystemChanged(UIConnectionInfo *info, int32 systemFlags);
	UShipSystem::ESystem GetDistinctSystem(int systemFlags);
	UIConnectionInfo *GetConnectionViewing(UShipSystem::ESystem system);
	void AllocateViewSystems();

	mg_mgr *mgr;
	AShipPlayerController *controller;

	ECrewState crewState;
	int32 nextConnectionIdentifer;

	TSet<UIConnectionInfo*> *currentConnections;
	UIConnectionInfo *connectionInSetup;
};