#include "stdafx.h"
#include "MainForm.h"
#include "CrewManager.h"
#include <ctime>

using namespace System;
using namespace System::Threading;
using namespace System::Windows::Forms;

bool formOpen = true;
UCrewManager *crewManager;

void PollClient()
{
	auto interval = CLOCKS_PER_SEC / 4;
	std::clock_t nextTick = std::clock() + interval;

	while (formOpen)
	{
		crewManager->Poll();

		if (std::clock() >= nextTick)
		{
			crewManager->ProcessSystemMessage(UCrewManager::ESystem::DamageControl, L"tick");
			nextTick += interval;
		}
	}
	delete crewManager;
}

[STAThread]
void Main(array<String^>^ args)
{
	Application::EnableVisualStyles();
	Application::SetCompatibleTextRenderingDefault(false);

	crewManager = new UCrewManager();
	auto url = crewManager->Init(NULL);

	Thread^ t = gcnew Thread(gcnew ThreadStart(PollClient));
	t->Start();

	WebTest::MainForm form;
	form.lblAddress->Text = "Listening on " + gcnew String(url.c_str());
	Application::Run(%form);

	formOpen = false;
}

int numWeaponsContacts = 0;
System::Void WebTest::MainForm::btnAddEnemy_Click(System::Object^  sender, System::EventArgs^  e)
{
	int id = ++numWeaponsContacts, size = rand() % 10 + 1, status = rand() % 3 + 1, relPitch = rand() % 180 - 90, relYaw = rand() % 360, dist = rand() % 100 + 1;
	int pitch = rand() % 180 - 90, yaw = rand() % 360, roll = rand() % 360 - 180;

	crewManager->SendSystem(UCrewManager::ESystem::Weapons, "add targ %i, %i, %i, %i, %i, %i %i %i %i", id, size, status, relPitch, relYaw, dist, pitch, yaw, roll);
	crewManager->SendSystem(UCrewManager::ESystem::ViewScreen, "add targ %i", id);
}

System::Void WebTest::MainForm::btnUpdateShip_Click(System::Object^  sender, System::EventArgs^  e)
{
	if (numWeaponsContacts == 0)
		return;

	// pick a ship to update
	int id = rand() % numWeaponsContacts + 1;
	int status, angle, dist;

	std::wstring msg;
	switch (rand() % 9)
	{
	case 0:
	case 1:
		status = status = rand() % 3 + 1; // friendly, hostile, unknown
		msg = L"upd targ" + std::to_wstring(id) + L" " + std::to_wstring(status);
		break;
	case 2:
	case 3:
	case 4:
		angle = rand() % 360;
		dist = rand() % 100 + 1;
		msg = L"mov targ" + std::to_wstring(id) + L" " + std::to_wstring(angle) + L" " + std::to_wstring(dist);
		break;
	case 5:
	case 6:
	case 7:
	{
		int pitch = rand() % 180 - 90, yaw = rand() % 360, roll = rand() % 360 - 180;
		crewManager->SendSystem(UCrewManager::ESystem::Weapons, "aim targ %i %i %i %i", id, pitch, yaw, roll);
		break;
	}
	case 8:
		crewManager->SendSystem(UCrewManager::ESystem::ViewScreen, "remo targ %i", id);
		break;
	}
	crewManager->SendSystem(UCrewManager::ESystem::Weapons, msg);
}

System::Void WebTest::MainForm::btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e)
{
	numWeaponsContacts = 0;
	crewManager->SendSystem(UCrewManager::ESystem::Weapons, "clr");
	crewManager->SendSystem(UCrewManager::ESystem::ViewScreen, "clr");
}

System::Void WebTest::MainForm::btnShieldBlock_Click(System::Object^  sender, System::EventArgs^  e)
{
/*
	// pick a cell in the top row, set it to a randomly-colored normal block
	int row = rand() % 36;
	int color = rand() % 6;
	std::wstring command = L"set ";
	command += std::to_wstring(row);
	command += L" 1 ";
	command += std::to_wstring(color);

	crewManager->SendCrewMessage(UCrewManager::ESystem::Shields, command);
*/
}

System::Void WebTest::MainForm::btnShieldDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
/*
	// pick a random cell, set it to a randomly-colored damage block
	int cell = rand() % 864;
	int color = rand() % 6;
	std::wstring command = L"set ";
	command += std::to_wstring(cell);
	command += L" 3 ";
	command += std::to_wstring(color);

	crewManager->SendCrewMessage(UCrewManager::ESystem::Shields, command);
*/
}

System::Void WebTest::MainForm::btnAuxPower_Click(System::Object^  sender, System::EventArgs^  e)
{
	crewManager->ProcessSystemMessage(UCrewManager::ESystem::PowerManagement, L"incaux");
}

System::Void WebTest::MainForm::btnChooseCards_Click(System::Object^  sender, System::EventArgs^  e)
{
	int card1 = rand() % 7;
	int card2, card3;

	do {
		card2 = rand() % 7;
	} while (card2 == card1);

	do {
		card3 = rand() % 7;
	} while (card3 == card2 || card3 == card1);

	FString message = L"addchoice ";
	message += std::to_wstring(card1);
	message += L" ";
	message += std::to_wstring(card2);
	message += L" ";
	message += std::to_wstring(card3);

	crewManager->ProcessSystemMessage(UCrewManager::ESystem::PowerManagement, CHARARR(message));
}

System::Void WebTest::MainForm::btnRespawnDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
	crewManager->ProcessSystemMessage(UCrewManager::ESystem::DamageControl, L"respawn");
}

System::Void WebTest::MainForm::btnAddDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
	FString message = L"damage ";
	message += std::to_wstring(rand() % 10); // section
	message += L" ";
	message += std::to_wstring(rand() % 5 + 1); // amount
	crewManager->ProcessSystemMessage(UCrewManager::ESystem::DamageControl, CHARARR(message));
}