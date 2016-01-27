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

System::Void WebTest::MainForm::btnAddEnemy_Click(System::Object^  sender, System::EventArgs^  e)
{
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, "add enemy");
}

System::Void WebTest::MainForm::btnAddFriendly_Click(System::Object^  sender, System::EventArgs^  e)
{
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, "add friendly");
}

System::Void WebTest::MainForm::btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e)
{
	crewManager->SendCrewMessage(UCrewManager::ESystem::Weapons, "clear all");
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