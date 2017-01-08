#include "CrewManager.h"

#pragma once

/**
 * 
 */

//UCLASS()
class MAKEITSO_API UDeflectorSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Deflector; }
};