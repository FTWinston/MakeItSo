#ifndef WEB_SERVER_TEST
#include "WeaponSystem.h"
#else
#include "stdafx.h"
#include "WeaponSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

UWeaponSystem::UWeaponSystem()
{
	PrimaryComponentTick.bCanEverTick = false;
}

void UWeaponSystem::ResetData()
{
	EMPTY(currentTargetCodes);
}

bool UWeaponSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (MATCHES(msg, "wpn_fire"))
	{
		Fire();
	}
	else
		return false;

	return true;
}

void UWeaponSystem::SendAllData_Implementation()
{
	// TODO: send all weapon targets?
	SendTargetCodes();
}

#ifdef WEB_SERVER_TEST
void UWeaponSystem::SendTargetCodes() { SendTargetCodes_Implementation(); }
#endif

void UWeaponSystem::SendTargetCodes_Implementation()
{
	FString output = TEXT("wpn_codes");

	for (auto code : currentTargetCodes)
	{
		output += TEXT(" ");
		APPENDINT(output, code);
	}

	SendSystem(output);
}


void UWeaponSystem::OnReplicated_CurrentTargetCodes(TArray<uint16> beforeChanges)
{
	SendTargetCodes();
}

#ifdef WEB_SERVER_TEST
void UWeaponSystem::Fire() { Fire_Implementation(); }
#endif
void UWeaponSystem::Fire_Implementation()
{

	// TODO: actually fire
}
