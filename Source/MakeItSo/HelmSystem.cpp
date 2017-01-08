#include "MakeItSo.h"
#include "HelmSystem.h"


bool UHelmSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
#ifndef WEB_SERVER_TEST
	if (MATCHES(info, "+forward"))
	{
		crewManager->InputKey(EKeys::LeftShift, true);
	}
	else if (MATCHES(info, "-forward"))
	{
		crewManager->InputKey(EKeys::LeftShift, false);
	}
	else if (MATCHES(info, "+backward"))
	{
		crewManager->InputKey(EKeys::LeftControl, true);
	}
	else if (MATCHES(info, "-backward"))
	{
		crewManager->InputKey(EKeys::LeftControl, false);
	}
	else if (MATCHES(info, "+left"))
	{
		crewManager->InputKey(EKeys::A, true);
	}
	else if (MATCHES(info, "-left"))
	{
		crewManager->InputKey(EKeys::A, false);
	}
	else if (MATCHES(info, "+right"))
	{
		crewManager->InputKey(EKeys::D, true);
	}
	else if (MATCHES(info, "-right"))
	{
		crewManager->InputKey(EKeys::D, false);
	}
	else if (MATCHES(info, "+up"))
	{
		crewManager->InputKey(EKeys::S, true);
	}
	else if (MATCHES(info, "-up"))
	{
		crewManager->InputKey(EKeys::S, false);
	}
	else if (MATCHES(info, "+down"))
	{
		crewManager->InputKey(EKeys::W, true);
	}
	else if (MATCHES(info, "-down"))
	{
		crewManager->InputKey(EKeys::W, false);
	}
	else if (STARTS_WITH(info, "yaw "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "yaw "); // this crashes (sometimes) unless buffer length is ~30
		crewManager->InputAxis(EKeys::Gamepad_LeftX, atof(buffer));
	}
	else if (STARTS_WITH(info, "pitch "))
	{
		char buffer[10];
		EXTRACT(info, buffer, "pitch "); // this crashes (sometimes) unless buffer length is ~30
		crewManager->InputAxis(EKeys::Gamepad_LeftY, atof(buffer));
	}

	else if (MATCHES(info, "+moveleft"))
	{
		crewManager->InputKey(EKeys::J, true);
	}
	else if (MATCHES(info, "-moveleft"))
	{
		crewManager->InputKey(EKeys::J, false);
	}
	else if (MATCHES(info, "+moveright"))
	{
		crewManager->InputKey(EKeys::L, true);
	}
	else if (MATCHES(info, "-moveright"))
	{
		crewManager->InputKey(EKeys::L, false);
	}
	else if (MATCHES(info, "+moveup"))
	{
		crewManager->InputKey(EKeys::I, true);
	}
	else if (MATCHES(info, "-moveup"))
	{
		crewManager->InputKey(EKeys::I, false);
	}
	else if (MATCHES(info, "+movedown"))
	{
		crewManager->InputKey(EKeys::K, true);
	}
	else if (MATCHES(info, "-movedown"))
	{
		crewManager->InputKey(EKeys::K, false);
	}
	else
#endif
		return false;

	return true;
}


