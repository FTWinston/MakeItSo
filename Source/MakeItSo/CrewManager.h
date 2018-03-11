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
#define SETCONTAINS(set, key) set.Contains(key)
#define MAPCONTAINS(set, key) set.Contains(key)
#define SETREMOVE(set, key) set.Remove(key)
#define MAPREMOVE(set, key) set.Remove(key)
#define APPENDINT(str, i) str.AppendInt(i)
#define STRFIND(str, val) str.Find(val)
#define CHOPSTART(str, pos) str.RemoveAt(0, pos, false);
#define PAIRKEY(pair) pair.Key
#define PAIRVALUE(pair) pair.Value
#define STOF(str) FCString::Atof(*str)
#define ISCLIENT() (GEngine->GetNetMode(GetWorld()) != NM_DedicatedServer)
#define ISSERVER() (GEngine->GetNetMode(GetWorld()) != NM_Client)
#define MAKENEW(type) NewObject<type>()
#define LASTITEM(arr) arr.Top()
#else
#define CHARARR(str) str.c_str()
#define EMPTY(set) set.empty()
#define NOTEMPTY(set) !set.empty()
#define SIZENUM(set) set.size()
#define SETCONTAINS(set, key) (std::find(set.begin(), set.end(), key) != set.end())
#define MAPCONTAINS(set, key) (set.find(key) != set.end())
#define SETREMOVE(set, key) set.erase(std::remove(set.begin(), set.end(), key), set.end());
#define MAPREMOVE(set, key) set.erase(key);
#define APPENDINT(str, i) str += std::to_wstring(i)
#define STRFIND(str, val) str.find(val)
#define CHOPSTART(str, pos) str = str.substr(pos)
#define PAIRKEY(pair) pair.first
#define PAIRVALUE(pair) pair.second
#define STOF(str) std::stof(str)
#define ISCLIENT() true
#define ISSERVER() true
#define MAKENEW(type) new type()
#define LASTITEM(arr) arr.back()
#endif

#define STARTS_WITH(msg, text) msg->size > sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define MATCHES(msg, text)   msg->size == sizeof(text) - 1 && !memcmp(msg->data, text, sizeof(text) - 1)
#define EXTRACT(msg, buffer, skipText) EXTRACT_WITH_OFFSET(msg, buffer, (int32)sizeof(skipText))
#define EXTRACT_WITH_OFFSET(msg, buffer, offsetLength) snprintf(buffer, sizeof(buffer), "%.*s\0", FMath::Min((int32)sizeof(buffer) - 1, (int32)msg->size - offsetLength + 1), msg->data + offsetLength - 1)

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

	TArray<FString> SplitParts(websocket_message *msg, int offset);

	static UCrewManager *Instance;

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

	TSet<UIConnectionInfo*> currentConnections;
	UIConnectionInfo *connectionInSetup;
};