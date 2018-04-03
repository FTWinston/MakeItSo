#pragma once

namespace WebTest {

	using namespace System;
	using namespace System::ComponentModel;
	using namespace System::Collections;
	using namespace System::Windows::Forms;
	using namespace System::Data;
	using namespace System::Drawing;

	/// <summary>
	/// Summary for MainForm
	/// </summary>
	public ref class MainForm : public System::Windows::Forms::Form
	{
	public:
		MainForm(void)
		{
			InitializeComponent();
			//
			//TODO: Add the constructor code here
			//
		}

	protected:
		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		~MainForm()
		{
			if (components)
			{
				delete components;
			}
		}
	public: System::Windows::Forms::Label^  lblAddress;
	protected:

	private: System::Windows::Forms::GroupBox^  groupBox1;
	private: System::Windows::Forms::Button^  btnShieldDamage;
	private: System::Windows::Forms::Button^  btnChooseCards;
	private: System::Windows::Forms::Button^  btnAuxPower;
	private: System::Windows::Forms::Button^  btnShieldBlock;
	private: System::Windows::Forms::GroupBox^  groupBox2;
	private: System::Windows::Forms::Button^  btnRemoveShips;

	private: System::Windows::Forms::Button^  btnAddEnemy;
	private: System::Windows::Forms::Button^  btnUpdateShip;
	private: System::Windows::Forms::Button^  btnAddDamage;
	private: System::Windows::Forms::Button^  btnRespawnDamage;
	private: System::Windows::Forms::GroupBox^  groupBox3;
	private: System::Windows::Forms::TextBox^  txtPosZ;
	private: System::Windows::Forms::TextBox^  txtPosY;
	private: System::Windows::Forms::TextBox^  txtPosX;
	protected:

	protected:

	private:
		/// <summary>
		/// Required designer variable.
		/// </summary>
		System::ComponentModel::Container ^components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		void InitializeComponent(void)
		{
			this->lblAddress = (gcnew System::Windows::Forms::Label());
			this->groupBox1 = (gcnew System::Windows::Forms::GroupBox());
			this->btnAddDamage = (gcnew System::Windows::Forms::Button());
			this->btnRespawnDamage = (gcnew System::Windows::Forms::Button());
			this->btnShieldDamage = (gcnew System::Windows::Forms::Button());
			this->btnChooseCards = (gcnew System::Windows::Forms::Button());
			this->btnAuxPower = (gcnew System::Windows::Forms::Button());
			this->btnShieldBlock = (gcnew System::Windows::Forms::Button());
			this->groupBox2 = (gcnew System::Windows::Forms::GroupBox());
			this->btnUpdateShip = (gcnew System::Windows::Forms::Button());
			this->btnRemoveShips = (gcnew System::Windows::Forms::Button());
			this->btnAddEnemy = (gcnew System::Windows::Forms::Button());
			this->groupBox3 = (gcnew System::Windows::Forms::GroupBox());
			this->txtPosZ = (gcnew System::Windows::Forms::TextBox());
			this->txtPosY = (gcnew System::Windows::Forms::TextBox());
			this->txtPosX = (gcnew System::Windows::Forms::TextBox());
			this->groupBox1->SuspendLayout();
			this->groupBox2->SuspendLayout();
			this->groupBox3->SuspendLayout();
			this->SuspendLayout();
			// 
			// lblAddress
			// 
			this->lblAddress->AutoSize = true;
			this->lblAddress->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10, System::Drawing::FontStyle::Regular, System::Drawing::GraphicsUnit::Point,
				static_cast<System::Byte>(0)));
			this->lblAddress->Location = System::Drawing::Point(20, 20);
			this->lblAddress->Margin = System::Windows::Forms::Padding(4, 0, 4, 0);
			this->lblAddress->Name = L"lblAddress";
			this->lblAddress->Size = System::Drawing::Size(191, 25);
			this->lblAddress->TabIndex = 0;
			this->lblAddress->Text = L"Server is not running";
			// 
			// groupBox1
			// 
			this->groupBox1->Controls->Add(this->btnAddDamage);
			this->groupBox1->Controls->Add(this->btnRespawnDamage);
			this->groupBox1->Controls->Add(this->btnShieldDamage);
			this->groupBox1->Controls->Add(this->btnChooseCards);
			this->groupBox1->Controls->Add(this->btnAuxPower);
			this->groupBox1->Controls->Add(this->btnShieldBlock);
			this->groupBox1->Location = System::Drawing::Point(18, 258);
			this->groupBox1->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->groupBox1->Name = L"groupBox1";
			this->groupBox1->Padding = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->groupBox1->Size = System::Drawing::Size(358, 163);
			this->groupBox1->TabIndex = 1;
			this->groupBox1->TabStop = false;
			this->groupBox1->Text = L"Ship";
			// 
			// btnAddDamage
			// 
			this->btnAddDamage->Location = System::Drawing::Point(183, 118);
			this->btnAddDamage->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnAddDamage->Name = L"btnAddDamage";
			this->btnAddDamage->Size = System::Drawing::Size(165, 35);
			this->btnAddDamage->TabIndex = 3;
			this->btnAddDamage->Text = L"Add damage";
			this->btnAddDamage->UseVisualStyleBackColor = true;
			this->btnAddDamage->Click += gcnew System::EventHandler(this, &MainForm::btnAddDamage_Click);
			// 
			// btnRespawnDamage
			// 
			this->btnRespawnDamage->Location = System::Drawing::Point(9, 118);
			this->btnRespawnDamage->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnRespawnDamage->Name = L"btnRespawnDamage";
			this->btnRespawnDamage->Size = System::Drawing::Size(165, 35);
			this->btnRespawnDamage->TabIndex = 3;
			this->btnRespawnDamage->Text = L"Respawn damage";
			this->btnRespawnDamage->UseVisualStyleBackColor = true;
			this->btnRespawnDamage->Click += gcnew System::EventHandler(this, &MainForm::btnRespawnDamage_Click);
			// 
			// btnShieldDamage
			// 
			this->btnShieldDamage->Location = System::Drawing::Point(183, 29);
			this->btnShieldDamage->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnShieldDamage->Name = L"btnShieldDamage";
			this->btnShieldDamage->Size = System::Drawing::Size(165, 35);
			this->btnShieldDamage->TabIndex = 2;
			this->btnShieldDamage->Text = L"Add shield damage";
			this->btnShieldDamage->UseVisualStyleBackColor = true;
			this->btnShieldDamage->Click += gcnew System::EventHandler(this, &MainForm::btnShieldDamage_Click);
			// 
			// btnChooseCards
			// 
			this->btnChooseCards->Location = System::Drawing::Point(183, 74);
			this->btnChooseCards->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnChooseCards->Name = L"btnChooseCards";
			this->btnChooseCards->Size = System::Drawing::Size(165, 35);
			this->btnChooseCards->TabIndex = 2;
			this->btnChooseCards->Text = L"Add card choice";
			this->btnChooseCards->UseVisualStyleBackColor = true;
			this->btnChooseCards->Click += gcnew System::EventHandler(this, &MainForm::btnChooseCards_Click);
			// 
			// btnAuxPower
			// 
			this->btnAuxPower->Location = System::Drawing::Point(9, 74);
			this->btnAuxPower->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnAuxPower->Name = L"btnAuxPower";
			this->btnAuxPower->Size = System::Drawing::Size(165, 35);
			this->btnAuxPower->TabIndex = 2;
			this->btnAuxPower->Text = L"Boost Aux Power";
			this->btnAuxPower->UseVisualStyleBackColor = true;
			this->btnAuxPower->Click += gcnew System::EventHandler(this, &MainForm::btnAuxPower_Click);
			// 
			// btnShieldBlock
			// 
			this->btnShieldBlock->Location = System::Drawing::Point(9, 29);
			this->btnShieldBlock->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnShieldBlock->Name = L"btnShieldBlock";
			this->btnShieldBlock->Size = System::Drawing::Size(165, 35);
			this->btnShieldBlock->TabIndex = 2;
			this->btnShieldBlock->Text = L"Add shield block";
			this->btnShieldBlock->UseVisualStyleBackColor = true;
			this->btnShieldBlock->Click += gcnew System::EventHandler(this, &MainForm::btnShieldBlock_Click);
			// 
			// groupBox2
			// 
			this->groupBox2->Controls->Add(this->btnUpdateShip);
			this->groupBox2->Controls->Add(this->btnRemoveShips);
			this->groupBox2->Controls->Add(this->btnAddEnemy);
			this->groupBox2->Location = System::Drawing::Point(18, 55);
			this->groupBox2->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->groupBox2->Name = L"groupBox2";
			this->groupBox2->Padding = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->groupBox2->Size = System::Drawing::Size(358, 120);
			this->groupBox2->TabIndex = 2;
			this->groupBox2->TabStop = false;
			this->groupBox2->Text = L"Environment";
			// 
			// btnUpdateShip
			// 
			this->btnUpdateShip->Location = System::Drawing::Point(184, 29);
			this->btnUpdateShip->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnUpdateShip->Name = L"btnUpdateShip";
			this->btnUpdateShip->Size = System::Drawing::Size(165, 35);
			this->btnUpdateShip->TabIndex = 2;
			this->btnUpdateShip->Text = L"Update a ship";
			this->btnUpdateShip->UseVisualStyleBackColor = true;
			this->btnUpdateShip->Click += gcnew System::EventHandler(this, &MainForm::btnUpdateShip_Click);
			// 
			// btnRemoveShips
			// 
			this->btnRemoveShips->Location = System::Drawing::Point(9, 74);
			this->btnRemoveShips->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnRemoveShips->Name = L"btnRemoveShips";
			this->btnRemoveShips->Size = System::Drawing::Size(339, 35);
			this->btnRemoveShips->TabIndex = 2;
			this->btnRemoveShips->Text = L"Remove all ships";
			this->btnRemoveShips->UseVisualStyleBackColor = true;
			this->btnRemoveShips->Click += gcnew System::EventHandler(this, &MainForm::btnRemoveShips_Click);
			// 
			// btnAddEnemy
			// 
			this->btnAddEnemy->Location = System::Drawing::Point(9, 29);
			this->btnAddEnemy->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->btnAddEnemy->Name = L"btnAddEnemy";
			this->btnAddEnemy->Size = System::Drawing::Size(165, 35);
			this->btnAddEnemy->TabIndex = 2;
			this->btnAddEnemy->Text = L"Add a ship";
			this->btnAddEnemy->UseVisualStyleBackColor = true;
			this->btnAddEnemy->Click += gcnew System::EventHandler(this, &MainForm::btnAddEnemy_Click);
			// 
			// groupBox3
			// 
			this->groupBox3->Controls->Add(this->txtPosZ);
			this->groupBox3->Controls->Add(this->txtPosY);
			this->groupBox3->Controls->Add(this->txtPosX);
			this->groupBox3->Location = System::Drawing::Point(18, 183);
			this->groupBox3->Name = L"groupBox3";
			this->groupBox3->Size = System::Drawing::Size(358, 67);
			this->groupBox3->TabIndex = 3;
			this->groupBox3->TabStop = false;
			this->groupBox3->Text = L"Ship Location";
			// 
			// txtPosZ
			// 
			this->txtPosZ->Location = System::Drawing::Point(221, 25);
			this->txtPosZ->Name = L"txtPosZ";
			this->txtPosZ->Size = System::Drawing::Size(100, 26);
			this->txtPosZ->TabIndex = 0;
			this->txtPosZ->Text = L"0";
			this->txtPosZ->TextChanged += gcnew System::EventHandler(this, &MainForm::txtPosZ_TextChanged);
			// 
			// txtPosY
			// 
			this->txtPosY->Location = System::Drawing::Point(115, 25);
			this->txtPosY->Name = L"txtPosY";
			this->txtPosY->Size = System::Drawing::Size(100, 26);
			this->txtPosY->TabIndex = 0;
			this->txtPosY->Text = L"0";
			this->txtPosY->TextChanged += gcnew System::EventHandler(this, &MainForm::txtPosY_TextChanged);
			// 
			// txtPosX
			// 
			this->txtPosX->Location = System::Drawing::Point(9, 25);
			this->txtPosX->Name = L"txtPosX";
			this->txtPosX->Size = System::Drawing::Size(100, 26);
			this->txtPosX->TabIndex = 0;
			this->txtPosX->Text = L"0";
			this->txtPosX->TextChanged += gcnew System::EventHandler(this, &MainForm::txtPosX_TextChanged);
			// 
			// MainForm
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(9, 20);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(392, 440);
			this->Controls->Add(this->groupBox3);
			this->Controls->Add(this->groupBox2);
			this->Controls->Add(this->groupBox1);
			this->Controls->Add(this->lblAddress);
			this->Margin = System::Windows::Forms::Padding(4, 5, 4, 5);
			this->MaximizeBox = false;
			this->Name = L"MainForm";
			this->Text = L"Make It So - fake server";
			this->groupBox1->ResumeLayout(false);
			this->groupBox2->ResumeLayout(false);
			this->groupBox3->ResumeLayout(false);
			this->groupBox3->PerformLayout();
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion

	private:
		System::Void btnAddEnemy_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnUpdateShip_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnRemoveShips_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnShieldBlock_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnShieldDamage_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnAuxPower_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnChooseCards_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnRespawnDamage_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void btnAddDamage_Click(System::Object^  sender, System::EventArgs^  e);
		System::Void txtPosX_TextChanged(System::Object^  sender, System::EventArgs^  e);
		System::Void txtPosY_TextChanged(System::Object^  sender, System::EventArgs^  e);
		System::Void txtPosZ_TextChanged(System::Object^  sender, System::EventArgs^  e);
};
}