#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"

struct mg_connection;

class UIConnectionInfo
{
public:
	UIConnectionInfo(mg_connection *conn, int32 id)
	{
		connection = conn;
		identifier = id;
		viewingSystem = UShipSystem::ESystem::None;
		hasName = false;
	}

	mg_connection *connection;
	int32 identifier;
	UShipSystem::ESystem viewingSystem;
	FString name;
	bool hasName;
};