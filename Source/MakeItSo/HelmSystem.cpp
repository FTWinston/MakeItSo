#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "HelmSystem.h"


bool UHelmSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
#ifndef WEB_SERVER_TEST
	if (MATCHES(info, "+yawLeft"))
	{
		crewManager->InputKey(EKeys::A, true);
	}
	else if (MATCHES(info, "-yawLeft"))
	{
		crewManager->InputKey(EKeys::A, false);
	}
	else if (MATCHES(info, "+yawRight"))
	{
		crewManager->InputKey(EKeys::D, true);
	}
	else if (MATCHES(info, "-yawRight"))
	{
		crewManager->InputKey(EKeys::D, false);
	}
	else if (MATCHES(info, "+pitchUp"))
	{
		crewManager->InputKey(EKeys::S, true);
	}
	else if (MATCHES(info, "-pitchUp"))
	{
		crewManager->InputKey(EKeys::S, false);
	}
	else if (MATCHES(info, "+pitchDown"))
	{
		crewManager->InputKey(EKeys::W, true);
	}
	else if (MATCHES(info, "-pitchDown"))
	{
		crewManager->InputKey(EKeys::W, false);
	}
	else if (MATCHES(info, "+rotStop"))
	{
		crewManager->InputKey(EKeys::X, true);
	}
	else if (MATCHES(info, "-rotStop"))
	{
		crewManager->InputKey(EKeys::X, false);
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
	else if (MATCHES(info, "speed -2"))
	{
		// TODO: sett speed usefully
		crewManager->InputKey(EKeys::1, true);
		crewManager->InputKey(EKeys::1, false);
	}
	else if (MATCHES(info, "speed -1"))
	{
		crewManager->InputKey(EKeys::2, true);
		crewManager->InputKey(EKeys::2, false);
	}
	else if (MATCHES(info, "speed 0"))
	{
		crewManager->InputKey(EKeys::3, true);
		crewManager->InputKey(EKeys::3, false);
	}
	else if (MATCHES(info, "speed 1"))
	{
		crewManager->InputKey(EKeys::4, true);
		crewManager->InputKey(EKeys::4, false);
	}
	else if (MATCHES(info, "speed 2"))
	{
		crewManager->InputKey(EKeys::5, true);
		crewManager->InputKey(EKeys::5, false);
	}
	else if (MATCHES(info, "speed 3"))
	{
		crewManager->InputKey(EKeys::6, true);
		crewManager->InputKey(EKeys::6, false);
	}
	else if (MATCHES(info, "speed 4"))
	{
		crewManager->InputKey(EKeys::7, true);
		crewManager->InputKey(EKeys::7, false);
	}
	else if (MATCHES(info, "-moveForward"))
	{
		crewManager->InputKey(EKeys::LeftShift, false);
	}
	else if (MATCHES(info, "+moveBackward"))
	{
		crewManager->InputKey(EKeys::LeftControl, true);
	}
	else if (MATCHES(info, "-moveBackward"))
	{
		crewManager->InputKey(EKeys::LeftControl, false);
	}
	else if (MATCHES(info, "+strafeLeft"))
	{
		crewManager->InputKey(EKeys::J, true);
	}
	else if (MATCHES(info, "-strafeLeft"))
	{
		crewManager->InputKey(EKeys::J, false);
	}
	else if (MATCHES(info, "+strafeRight"))
	{
		crewManager->InputKey(EKeys::L, true);
	}
	else if (MATCHES(info, "-strafeRight"))
	{
		crewManager->InputKey(EKeys::L, false);
	}
	else if (MATCHES(info, "+strafeUp"))
	{
		crewManager->InputKey(EKeys::I, true);
	}
	else if (MATCHES(info, "-strafeUp"))
	{
		crewManager->InputKey(EKeys::I, false);
	}
	else if (MATCHES(info, "+strafeDown"))
	{
		crewManager->InputKey(EKeys::K, true);
	}
	else if (MATCHES(info, "-strafeDown"))
	{
		crewManager->InputKey(EKeys::K, false);
	}
	else if (MATCHES(info, "+strafeStop"))
	{
		crewManager->InputKey(EKeys::M, true);
	}
	else if (MATCHES(info, "-strafeStop"))
	{
		crewManager->InputKey(EKeys::M, false);
	}
	else
#endif
		return false;

	return true;
}
