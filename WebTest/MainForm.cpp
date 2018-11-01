#include "stdafx.h"
#include "MainForm.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"
#include "ShipSystem.h"
#include "DamageControlSystem.h"
#include <ctime>

using namespace System;
using namespace System::Threading;
using namespace System::Windows::Forms;

bool formOpen = true;
UCrewManager *crewManager;

void PollClient()
{
	clock_t nextSystemTick = clock();

	std::map<UShipSystem::ESystem, clock_t> systemTicks; // all ship systems, regardless of whether they actually tick or not
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::Helm, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::Warp, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::Weapons, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::Sensors, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::PowerManagement, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::DamageControl, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::ViewScreen, nextSystemTick));
	systemTicks.insert(std::pair<UShipSystem::ESystem, clock_t>(UShipSystem::ESystem::Communications, nextSystemTick));
	
	while (formOpen)
	{
		crewManager->Poll();
		
		for (auto systemTick = systemTicks.begin(); systemTick != systemTicks.end(); systemTick++)
		{
			auto system = crewManager->GetSystem(systemTick->first);
			auto now = clock();
			if (!system->IsComponentTickEnabled() || systemTick->second > now)
				continue;

			auto interval = system->GetComponentTickInterval();
			system->TickComponent(interval, ELevelTick::Fake, nullptr);
			systemTick->second = now + (std::clock_t)(interval * CLOCKS_PER_SEC);
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

	crewManager->SendSystem(UShipSystem::ESystem::Weapons, "add targ %i, %i, %i, %i, %i, %i %i %i %i", id, size, status, relPitch, relYaw, dist, pitch, yaw, roll);
	crewManager->SendSystem(UShipSystem::ESystem::ViewScreen, "add targ %i", id);
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
		crewManager->SendSystem(UShipSystem::ESystem::Weapons, "aim targ %i %i %i %i", id, pitch, yaw, roll);
		break;
	}
	case 8:
		crewManager->SendSystem(UShipSystem::ESystem::ViewScreen, "remo targ %i", id);
		break;
	}
	crewManager->SendSystem(UShipSystem::ESystem::Weapons, msg);
}

System::Void WebTest::MainForm::btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e)
{
	numWeaponsContacts = 0;
	crewManager->SendSystem(UShipSystem::ESystem::Weapons, "clr");
	crewManager->SendSystem(UShipSystem::ESystem::ViewScreen, "clr");
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

	crewManager->SendCrewMessage(UShipSystem::ESystem::Shields, command);
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

	crewManager->SendCrewMessage(UShipSystem::ESystem::Shields, command);
*/
}

System::Void WebTest::MainForm::btnAuxPower_Click(System::Object^  sender, System::EventArgs^  e)
{
	//crewManager->ProcessSystemMessage(UShipSystem::ESystem::PowerManagement, L"incaux");
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

	//crewManager->ProcessSystemMessage(UShipSystem::ESystem::PowerManagement, CHARARR(message));
}

System::Void WebTest::MainForm::btnRespawnDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
	//crewManager->ProcessSystemMessage(UShipSystem::ESystem::DamageControl, L"respawn");
}

System::Void WebTest::MainForm::btnAddDamage_Click(System::Object^  sender, System::EventArgs^  e)
{
	auto damageControl = (UDamageControlSystem*)crewManager->GetSystem(UShipSystem::ESystem::DamageControl);

	UShipSystem::ESystem system;
	switch (FMath::RandRange(1, 6))
	{
	case 1:
		system = UShipSystem::ESystem::Helm;
		break;
	case 2:
		system = UShipSystem::ESystem::Warp;
		break;
	case 3:
		system = UShipSystem::ESystem::Weapons;
		break;
	case 4:
		system = UShipSystem::ESystem::Sensors;
		break;
	case 5:
		system = UShipSystem::ESystem::PowerManagement;
		break;
	case 6:
		system = UShipSystem::ESystem::Communications;
		break;

		// TODO: also shields
	}

	auto shipSystem = crewManager->GetSystem(system);
	shipSystem->TakeDamage(FMath::RandRange(1, 25));
}

System::Void WebTest::MainForm::txtPosX_TextChanged(System::Object^  sender, System::EventArgs^  e)
{
	auto ship = crewManager->GetShipPawn();

	float x = (float)int::Parse(txtPosX->Text);
	ship->SetActorLocation(FVector(x, ship->LocalVelocity.Y, ship->LocalVelocity.Z));
}

System::Void WebTest::MainForm::txtPosY_TextChanged(System::Object^  sender, System::EventArgs^  e)
{
	auto ship = crewManager->GetShipPawn();

	float y = (float)int::Parse(txtPosY->Text);
	ship->SetActorLocation(FVector(ship->LocalVelocity.X, y, ship->LocalVelocity.Z));
}

System::Void WebTest::MainForm::txtPosZ_TextChanged(System::Object^  sender, System::EventArgs^  e)
{
	auto ship = crewManager->GetShipPawn();

	float z = (float)int::Parse(txtPosZ->Text);
	ship->SetActorLocation(FVector(ship->LocalVelocity.X, ship->LocalVelocity.Y, z));
}