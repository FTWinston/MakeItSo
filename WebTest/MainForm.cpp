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
	std::string msg = "add targ" + std::to_string(id) + " " + std::to_string(size) + " " + std::to_string(status) + " " + std::to_string(angle) + " " + std::to_string(dist);
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, msg.c_str());

	crewManager->SendCrewMessage(UCrewManager::ESystem::ViewScreen, ("add targ" + std::to_string(id)).c_str());
}

System::Void WebTest::MainForm::btnUpdateShip_Click(System::Object^  sender, System::EventArgs^  e)
{
	if (numWeaponsContacts == 0)
		return;

	// pick a ship to update
	int id = rand() % numWeaponsContacts + 1;
	int status, angle, dist;

	std::string msg;
	switch (rand() % 6)
	{
	case 0:
	case 1:
		status = status = rand() % 3 + 1; // friendly, hostile, unknown
		msg = "upd targ" + std::to_string(id) + " " + std::to_string(status);
		break;
	case 2:
	case 3:
	case 4:
		angle = rand() % 360;
		dist = rand() % 100 + 1;
		msg = "mov targ" + std::to_string(id) + " " + std::to_string(angle) + " " + std::to_string(dist);
		break;
	case 5:
		msg = "rem targ" + std::to_string(id);
		crewManager->SendCrewMessage(UCrewManager::ESystem::ViewScreen, ("rem targ" + std::to_string(id)).c_str());
		break;
	}
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, msg.c_str());
}

System::Void WebTest::MainForm::btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e)
{
	numWeaponsContacts = 0;
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, "clr");
	crewManager->SendCrewMessage(UCrewManager::ESystem::ViewScreen, "clr");
}

System::Void WebTest::MainForm::btnShieldBlock_Click(System::Object^  sender, System::EventArgs^  e)
{
	// pick a cell in the top row, set it to a randomly-colored normal block
	int row = rand() % 36;
	int color = rand() % 6;
	std::string command = "set ";
	command += std::to_string(row);
	command += " 1 ";
	command += std::to_string(color);

	crewManager->SendCrewMessage(UCrewManager::ESystem::Shields, command.c_str());
}

System::Void WebTest::MainForm::btnShieldDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
	// pick a random cell, set it to a randomly-colored damage block
	int cell = rand() % 864;
	int color = rand() % 6;
	std::string command = "set ";
	command += std::to_string(cell);
	command += " 3 ";
	command += std::to_string(color);

	crewManager->SendCrewMessage(UCrewManager::ESystem::Shields, command.c_str());
}

System::Void WebTest::MainForm::btnBreakWire_Click(System::Object^  sender, System::EventArgs^  e)
{
	int wire = rand() % 52;
	std::string command = "break ";
	command += std::to_string(wire);

	crewManager->SendCrewMessage(UCrewManager::ESystem::PowerManagement, command.c_str());
}

System::Void WebTest::MainForm::btnBreakNode_Click(System::Object^  sender, System::EventArgs^  e)
{
	int node = 52 + rand() % 8;
	std::string command = "break ";
	command += std::to_string(node);

	crewManager->SendCrewMessage(UCrewManager::ESystem::PowerManagement, command.c_str());
}