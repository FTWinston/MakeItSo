// WebTest.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "CrewManager.h"


int _tmain(int argc, _TCHAR* argv[])
{
	auto manager = new UCrewManager();
	manager->Init(NULL);

	while (true)
	{
		manager->Poll();
	}

	delete manager;
	return 0;
}
