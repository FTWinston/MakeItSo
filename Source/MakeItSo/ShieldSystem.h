#include "CrewManager.h"

#pragma once

/**
 * 
 */
//UCLASS()
class MAKEITSO_API UShieldSystem : public UCrewSystem
{
	//GENERATED_BODY()

public:
	bool ReceiveCrewMessage(ConnectionInfo *info);
	virtual void SendAllData();
protected:
	virtual UCrewManager::ESystem GetSystem() { return UCrewManager::ESystem::Shields; }
private:
	void SendShieldFocus();
	bool shieldsUp;
	int32 shieldFocus;
};