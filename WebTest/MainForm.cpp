#include "stdafx.h"
#include "MainForm.h"
#include "CrewManager.h"

using namespace System;
using namespace System::Threading;
using namespace System::Windows::Forms;

bool formOpen = true;
UCrewManager *crewManager;

void PollClient()
{
	while (formOpen)
	{
		crewManager->Poll();
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
	int id = ++numWeaponsContacts, size = rand() % 10 + 1, status = rand() % 3 + 1, angle = rand() % 360, dist = rand() % 100 + 1;
	std::wstring msg = L"add targ" + std::to_wstring(id) + L" " + std::to_wstring(size) + L" " + std::to_wstring(status) + L" " + std::to_wstring(angle) + L" " + std::to_wstring(dist);
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, msg.c_str());

	crewManager->SendCrewMessage(UCrewManager::ESystem::ViewScreen, (L"add targ" + std::to_wstring(id)).c_str());
}

System::Void WebTest::MainForm::btnUpdateShip_Click(System::Object^  sender, System::EventArgs^  e)
{
	if (numWeaponsContacts == 0)
		return;

	// pick a ship to update
	int id = rand() % numWeaponsContacts + 1;
	int status, angle, dist;

	std::wstring msg;
	switch (rand() % 6)
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
		msg = L"rem targ" + std::to_wstring(id);
		crewManager->SendCrewMessage(UCrewManager::ESystem::ViewScreen, (L"rem targ" + std::to_wstring(id)).c_str());
		break;
	}
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, msg.c_str());
}

System::Void WebTest::MainForm::btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e)
{
	numWeaponsContacts = 0;
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, L"clr");
	crewManager->SendCrewMessage(UCrewManager::ESystem::ViewScreen, L"clr");
}

System::Void WebTest::MainForm::btnShieldBlock_Click(System::Object^  sender, System::EventArgs^  e)
{
	// pick a cell in the top row, set it to a randomly-colored normal block
	int row = rand() % 36;
	int color = rand() % 6;
	std::wstring command = L"set ";
	command += std::to_wstring(row);
	command += L" 1 ";
	command += std::to_wstring(color);

	crewManager->SendCrewMessage(UCrewManager::ESystem::Shields, command.c_str());
}

System::Void WebTest::MainForm::btnShieldDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
	// pick a random cell, set it to a randomly-colored damage block
	int cell = rand() % 864;
	int color = rand() % 6;
	std::wstring command = L"set ";
	command += std::to_wstring(cell);
	command += L" 3 ";
	command += std::to_wstring(color);

	crewManager->SendCrewMessage(UCrewManager::ESystem::Shields, command.c_str());
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