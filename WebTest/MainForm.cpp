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

}

System::Void WebTest::MainForm::btnAddFriendly_Click(System::Object^  sender, System::EventArgs^  e)
{

}

System::Void WebTest::MainForm::btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e)
{

}

System::Void WebTest::MainForm::btnShieldBlock_Click(System::Object^  sender, System::EventArgs^  e)
{

}

System::Void WebTest::MainForm::btnShieldDamage_Click(System::Object^  sender, System::EventArgs^  e)
{

}

System::Void WebTest::MainForm::btnBreakWire_Click(System::Object^  sender, System::EventArgs^  e)
{

}

System::Void WebTest::MainForm::btnBreakNode_Click(System::Object^  sender, System::EventArgs^  e)
{

}