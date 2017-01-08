#include "CrewManager.h"

#pragma once

/**
 * 
 */

//UCLASS()
class MAKEITSO_API UHelmSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Helm; }
};