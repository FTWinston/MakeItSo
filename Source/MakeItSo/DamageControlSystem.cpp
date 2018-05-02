#ifndef WEB_SERVER_TEST
#include "DamageControlSystem.h"
#else
#include "stdafx.h"
#include <sstream>
#include "DamageControlSystem.h"
#endif

#include "CrewManager.h"
#include "UIConnectionInfo.h"


UDamageControlSystem::UDamageControlSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 1.0f;
	PrimaryComponentTick.SetTickFunctionEnable(true);

#ifndef WEB_SERVER_TEST
	systemOrder.AddZeroed(MAX_DAMAGE_SYSTEMS);
	damageLevels.AddZeroed(MAX_DAMAGE_SYSTEMS);
#else
	systemOrder.assign(MAX_DAMAGE_SYSTEMS, 0);
	damageLevels.assign(MAX_DAMAGE_SYSTEMS, 0);
#endif
}

void UDamageControlSystem::ResetData()
{
	for (auto i = 0; i < MAX_DAMAGE_SYSTEMS; i++)
		damageLevels[i] = 0;

	systemOrder[0] = Damage_Power;
	systemOrder[1] = Damage_Helm;
	systemOrder[2] = Damage_Warp;
	systemOrder[3] = Damage_BeamWeapons;
	systemOrder[4] = Damage_Empty;
	systemOrder[5] = Damage_Torpedoes;
	systemOrder[6] = Damage_Sensors;
	systemOrder[7] = Damage_Shields;
	systemOrder[8] = Damage_Comms;
	
	CLEAR(cardChoice);
	CLEAR(cardHand);

#ifndef WEB_SERVER_TEST
	choiceQueue.Empty();
#else
	while (!QUEUE_IS_EMPTY(choiceQueue))
		choiceQueue.pop();
#endif

	choiceQueueSize = 0;
	choiceGeneratedAmount = 0;
}

bool UDamageControlSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "dmg_pickCard "))
	{
		uint8 cardNum = ExtractInt(msg, sizeof("dmg_pickCard "));
		ChooseCard(cardNum);
	}
	else if (STARTS_WITH(msg, "dmg_useCard "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("dmg_useCard "));

		if (SIZENUM(parts) >= 3)
		{
			uint8 cardID = STOI(parts[0]);
			uint8 handPosition = STOI(parts[1]);
			uint8 targetSystemPos = (EDamageSystem)STOI(parts[2]);

			ActivateCard(cardID, handPosition, targetSystemPos);
		}
	}
	else
		return false;

	return true;
}

void UDamageControlSystem::SendAllData_Implementation()
{
	SendSystemOrder();
	SendAllDamageLevels();
	SendCardChoice();
	SendWholeHand();
	SendQueueSize();
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendSystemOrder() { SendSystemOrder_Implementation(); }
#endif
void UDamageControlSystem::SendSystemOrder_Implementation()
{
	auto command = CombineIDs(TEXT("dmg_order "), systemOrder);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendAllDamageLevels() { SendAllDamageLevels_Implementation(); }
#endif
void UDamageControlSystem::SendAllDamageLevels_Implementation()
{
	auto command = CombineIDs(TEXT("dmg_levels "), damageLevels);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendCardChoice() { SendCardChoice_Implementation(); }
#endif
void UDamageControlSystem::SendCardChoice_Implementation()
{
	auto command = CombineIDs(TEXT("dmg_choice "), cardChoice);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendQueueSize() { SendQueueSize_Implementation(); }
#endif
void UDamageControlSystem::SendQueueSize_Implementation()
{
	FString output = TEXT("dmg_queue ");
	APPENDINT(output, choiceQueueSize);
	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendWholeHand() { SendWholeHand_Implementation(); }
#endif
void UDamageControlSystem::SendWholeHand_Implementation()
{
	auto command = CombineIDs(TEXT("dmg_hand "), cardHand);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendDamageLevel(EDamageSystem system, uint8 damageLevel) { SendDamageLevel_Implementation(system, damageLevel); }
#endif
void UDamageControlSystem::SendDamageLevel_Implementation(EDamageSystem system, uint8 damageLevel)
{
	FString output = TEXT("dmg_level ");
	APPENDINT(output, system);
	output += TEXT(" ");
	APPENDINT(output, damageLevel);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendAddCardToHand(uint8 cardID) { SendAddCardToHand_Implementation(cardID); }
#endif
void UDamageControlSystem::SendAddCardToHand_Implementation(uint8 cardID)
{
	FString output = TEXT("dmg_add ");
	APPENDINT(output, cardID);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::SendRemoveCardFromHand(uint8 handPosition) { SendRemoveCardFromHand_Implementation(handPosition); }
#endif
void UDamageControlSystem::SendRemoveCardFromHand_Implementation(uint8 handPosition)
{
	FString output = TEXT("dmg_rem ");
	APPENDINT(output, handPosition);

	SendSystem(output);
}


void UDamageControlSystem::OnReplicated_DamageLevels(TArray<uint8> beforeChange)
{
	// if length has changed, send everything to the UI. Otherwise, only send the values that have changed.
	auto numSys = SIZENUM(damageLevels);
	if (SIZENUM(beforeChange) != numSys)
	{
		SendAllDamageLevels();
		return;
	}

	for (uint32 i = 0; i < numSys; i++)
	{
		auto currentVal = damageLevels[i];
		if (beforeChange[i] != currentVal)
			SendDamageLevel((EDamageSystem)i, currentVal);
	}
}

void UDamageControlSystem::OnReplicated_SystemOrder(TArray<uint8> beforeChange)
{
	SendSystemOrder();
}

void UDamageControlSystem::OnReplicated_ChoiceQueueSize(uint8 beforeChange)
{
	SendQueueSize();
}


void UDamageControlSystem::OnReplicated_CardHand(TArray<uint8> beforeChange)
{
	auto oldSize = SIZENUM(beforeChange), newSize = SIZENUM(damageLevels);

	if (newSize == oldSize + 1)
	{
		// one card added ... if any differ except the last card, resend whole hand
		for (uint8 i = 0; i < oldSize; i++)
			if (beforeChange[i] != cardHand[i])
			{
				SendWholeHand();
				return;
			}

		// send the addition of the one new card
		SendAddCardToHand(cardHand[oldSize]);
	}
	else if (oldSize == newSize + 1)
	{
		// one card removed ... if any differ except the card that was removed, resend whole hand
		auto offset = 0;
		uint8 removedPos;

		for (uint8 i = 0; i < newSize; i++)
			if (beforeChange[i + offset] != cardHand[i])
			{
				if (offset > 0)
				{
					// have already passed one difference, so resend all
					SendWholeHand();
					return;
				}

				removedPos = i;
				offset = 1;
			}

		if (offset == 0)
			removedPos = newSize;

		SendRemoveCardFromHand(removedPos);
	}
	else
	{
		SendWholeHand();
	}
}

void UDamageControlSystem::OnReplicated_CardChoice(TArray<uint8> beforeChange)
{
	SendCardChoice();
}

#define CHOICE_GENERATION_ENERGY_AMOUNT 500
#define MAX_CHOICE_QUEUE_SIZE 8

void UDamageControlSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	if (choiceQueueSize >= MAX_CHOICE_QUEUE_SIZE)
		return;

	choiceGeneratedAmount += GetPowerLevel();

	if (choiceGeneratedAmount < CHOICE_GENERATION_ENERGY_AMOUNT)
		return;

	choiceGeneratedAmount -= CHOICE_GENERATION_ENERGY_AMOUNT;
	AddCardChoice(PickRandomCard(), PickRandomCard(), PickRandomCard());
}

void UDamageControlSystem::AddCardChoice(uint8 card1, uint8 card2, uint8 card3)
{
	TArray<uint8> newChoice;
	SETADD(newChoice, card1);
	SETADD(newChoice, card2);
	SETADD(newChoice, card3);

	bool alreadyShowingChoice = NOTEMPTY(cardChoice);

	if (alreadyShowingChoice)
	{
#ifndef WEB_SERVER_TEST
		choiceQueue.Enqueue(newChoice);
#else
		choiceQueue.push(newChoice);
#endif
		choiceQueueSize = SIZENUM(choiceQueue);
	}
	else
	{
		cardChoice = newChoice;

		if (ISCLIENT())
			SendCardChoice();
	}

	if (ISCLIENT())
		SendQueueSize();
}

FString UDamageControlSystem::CombineIDs(const TCHAR *prefix, TArray<uint8> IDs)
{
	FString output = prefix;

	if (NOTEMPTY(IDs))
	{
		bool first = true;
		for (int32 id : IDs)
		{
			if (first)
				first = false;
			else
				output += TEXT(" ");

			APPENDINT(output, id);
		}
	}
	return output;
}

#define MAX_HAND_SIZE 8

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::ChooseCard(uint8 cardPosition) { ChooseCard_Implementation(cardPosition); }
#endif

void UDamageControlSystem::ChooseCard_Implementation(uint8 cardPosition)
{
	if (cardPosition >= SIZENUM(cardChoice) || SIZENUM(cardHand) >= MAX_HAND_SIZE)
		return;

	uint8 chosenCardID = cardChoice[cardPosition];
	SETADD(cardHand, chosenCardID);

	if (ISCLIENT())
		SendAddCardToHand(chosenCardID);

	if (QUEUE_IS_EMPTY(choiceQueue))
	{
		CLEAR(cardChoice);

		if (ISCLIENT())
			SendCardChoice();
		return;
	}

#ifndef WEB_SERVER_TEST
	cardChoices.Dequeue(cardChoice);
#else
	cardChoice = choiceQueue.front();
	choiceQueue.pop();
#endif

	choiceQueueSize = SIZENUM(choiceQueue);

	if (ISCLIENT())
	{
		SendCardChoice();
		SendQueueSize();
	}
}

UShipSystem *UDamageControlSystem::LookupSystem(EDamageSystem system)
{
	switch (system)
	{
	case Damage_Power:
		return crewManager->GetSystem(UShipSystem::ESystem::PowerManagement);
	case Damage_Helm:
		return crewManager->GetSystem(UShipSystem::ESystem::Helm);
	case Damage_Warp:
		return crewManager->GetSystem(UShipSystem::ESystem::Warp);
	case Damage_BeamWeapons:
		return crewManager->GetSystem(UShipSystem::ESystem::Weapons);
//	case Damage_Torpedoes:
//		return crewManager->GetSystem(UShipSystem::ESystem::Weapons);
	case Damage_Sensors:
		return crewManager->GetSystem(UShipSystem::ESystem::Sensors);
//	case Damage_Shields:
//		return ???;
	case Damage_Comms:
		return crewManager->GetSystem(UShipSystem::ESystem::Communications);
	default:
		return nullptr;
	}
}

// TODO: implement more cards
enum EDamageCard
{
	Card_RepairSmall,
	Card_RepairMed,
	Card_RepairLarge,
	Card_SwapLeft,
	Card_SwapRight,
	Card_SwapUp,
	Card_SwapDown,
	Card_DistributeRow,
	Card_RepairRowSmall,
	Card_DivertCol,
	NUM_DAMAGE_CARDS,
};

bool UDamageControlSystem::RestoreDamage(EDamageSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr || targetSystem->GetHealthLevel() >= MAX_SYSTEM_HEALTH)
		return false;

	targetSystem->RestoreDamage(amount);
	auto newValue = targetSystem->GetHealthLevel();
	damageLevels[system] = newValue;

	if (ISCLIENT())
		SendDamageLevel(system, newValue);

	return true;
}

bool UDamageControlSystem::DealDamage(EDamageSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr || targetSystem->GetHealthLevel() >= MAX_SYSTEM_HEALTH)
		return false;

	targetSystem->TakeDamage(amount);
	auto newValue = targetSystem->GetHealthLevel();
	damageLevels[system] = newValue;

	if (ISCLIENT())
		SendDamageLevel(system, newValue);

	return true;
}

void UDamageControlSystem::SetHealth(EDamageSystem system, uint8 newValue)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return;
	
	uint8 existingHealth = targetSystem->GetHealthLevel();
	if (existingHealth > newValue)
		targetSystem->TakeDamage(existingHealth - newValue);
	else if (existingHealth < newValue)
		targetSystem->RestoreDamage(newValue - existingHealth);

	if (ISCLIENT())
		SendDamageLevel(system, newValue);
}

void UDamageControlSystem::GetRowCells(uint8 testPos, uint8 &outPos1, uint8 &outPos2, uint8 &outPos3)
{
	if (testPos < 3)
	{
		outPos1 = 0;
		outPos2 = 1;
		outPos3 = 2;
	}
	else if (testPos < 6)
	{
		outPos1 = 3;
		outPos2 = 4;
		outPos3 = 5;
	}
	else
	{
		outPos1 = 6;
		outPos2 = 7;
		outPos3 = 8;
	}
}

void UDamageControlSystem::GetColCells(uint8 testPos, uint8 &outPos1, uint8 &outPos2, uint8 &outPos3)
{
	if (testPos == 0 || testPos == 3 || testPos == 6)
	{
		outPos1 = 0;
		outPos2 = 3;
		outPos3 = 6;
	}
	else if (testPos == 1 || testPos == 4 || testPos == 7)
	{
		outPos1 = 1;
		outPos2 = 4;
		outPos3 = 7;
	}
	else
	{
		outPos1 = 2;
		outPos2 = 5;
		outPos3 = 8;
	}
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::ActivateCard(uint8 cardID, uint8 handPosition, uint8 targetSystemPos) { ActivateCard_Implementation(cardID, handPosition, targetSystemPos); }
#endif

void UDamageControlSystem::ActivateCard_Implementation(uint8 cardID, uint8 handPosition, uint8 targetSystemPos)
{
	if (targetSystemPos >= MAX_DAMAGE_SYSTEMS || cardHand[handPosition] != cardID)
		return;

	switch ((EDamageCard)cardID)
	{
	case Card_RepairSmall:
	{
		EDamageSystem damageSystem = (EDamageSystem)systemOrder[targetSystemPos];
		if (!RestoreDamage(damageSystem, 15))
			return;
		break;
	}
	case Card_RepairMed:
	{
		EDamageSystem damageSystem = (EDamageSystem)systemOrder[targetSystemPos];
		if (!RestoreDamage(damageSystem, 35))
			return;
		break;
	}
	case Card_RepairLarge:
	{
		EDamageSystem damageSystem = (EDamageSystem)systemOrder[targetSystemPos];
		if (!RestoreDamage(damageSystem, 75))
			return;
		break;
	}
	case Card_SwapLeft:
	{
		uint8 pos1, pos2, pos3;
		GetRowCells(targetSystemPos, pos1, pos2, pos3);
			
		uint8 tmp = systemOrder[pos1];
		systemOrder[pos1] = systemOrder[pos2];
		systemOrder[pos2] = systemOrder[pos3];
		systemOrder[pos3] = tmp;

		if (ISCLIENT())
			SendSystemOrder();
		break;
	}
	case Card_SwapRight:
	{
		uint8 pos1, pos2, pos3;
		GetRowCells(targetSystemPos, pos3, pos2, pos1);

		uint8 tmp = systemOrder[pos1];
		systemOrder[pos1] = systemOrder[pos2];
		systemOrder[pos2] = systemOrder[pos3];
		systemOrder[pos3] = tmp;

		if (ISCLIENT())
			SendSystemOrder();
		break;
	}
	case Card_SwapUp:
	{
		uint8 pos1, pos2, pos3;
		GetColCells(targetSystemPos, pos1, pos2, pos3);

		uint8 tmp = systemOrder[pos1];
		systemOrder[pos1] = systemOrder[pos2];
		systemOrder[pos2] = systemOrder[pos3];
		systemOrder[pos3] = tmp;

		if (ISCLIENT())
			SendSystemOrder();
		break;
	}
	case Card_SwapDown:
	{
		uint8 pos1, pos2, pos3;
		GetColCells(targetSystemPos, pos3, pos2, pos1);

		uint8 tmp = systemOrder[pos1];
		systemOrder[pos1] = systemOrder[pos2];
		systemOrder[pos2] = systemOrder[pos3];
		systemOrder[pos3] = tmp;

		if (ISCLIENT())
			SendSystemOrder();
		break;
	}
	case Card_DistributeRow:
	{
		uint8 pos1, pos2, pos3;
		GetRowCells(targetSystemPos, pos1, pos2, pos3);

		EDamageSystem sys1 = (EDamageSystem)systemOrder[pos1];
		EDamageSystem sys2 = (EDamageSystem)systemOrder[pos2];
		EDamageSystem sys3 = (EDamageSystem)systemOrder[pos3];

		auto shipSys1 = LookupSystem(sys1);
		auto shipSys2 = LookupSystem(sys2);
		auto shipSys3 = LookupSystem(sys3);

		uint8 numSys = 0;
		uint16 totalHealth = 0;

		if (shipSys1 != nullptr)
		{
			totalHealth += shipSys1->GetHealthLevel();
			numSys++;
		}
		if (shipSys2 != nullptr)
		{
			totalHealth += shipSys2->GetHealthLevel();
			numSys++;
		}
		if (shipSys3 != nullptr)
		{
			totalHealth += shipSys3->GetHealthLevel();
			numSys++;
		}

		uint8 averageHealth = totalHealth / numSys; // we'll lose a couple of points in rounding here, that's ok
		if (averageHealth == MAX_SYSTEM_HEALTH)
			return;

		SetHealth(sys1, averageHealth);
		SetHealth(sys2, averageHealth);
		SetHealth(sys3, averageHealth);
		break;
	}
	case Card_RepairRowSmall:
	{
		uint8 pos1, pos2, pos3;
		GetRowCells(targetSystemPos, pos1, pos2, pos3);

		EDamageSystem sys1 = (EDamageSystem)systemOrder[pos1];
		EDamageSystem sys2 = (EDamageSystem)systemOrder[pos2];
		EDamageSystem sys3 = (EDamageSystem)systemOrder[pos3];

		if (!RestoreDamage(sys1, 15) && !RestoreDamage(sys2, 15) && !RestoreDamage(sys3, 15))
			return;

		break;
	}
	case Card_DivertCol:
	{
		uint8 pos1, pos2, pos3;
		GetColCells(targetSystemPos, pos1, pos2, pos3);

		EDamageSystem col1 = (EDamageSystem)systemOrder[pos1];
		EDamageSystem col2 = (EDamageSystem)systemOrder[pos2];
		EDamageSystem col3 = (EDamageSystem)systemOrder[pos3];

		EDamageSystem healSystem = (EDamageSystem)systemOrder[targetSystemPos];
		EDamageSystem damage1 = col1 != healSystem ? col1 : col2;
		EDamageSystem damage2 = col2 != healSystem && col2 != damage1 ? col2 : col3;

		if (!RestoreDamage(healSystem, 50))
			return;

		DealDamage(damage1, 25);
		DealDamage(damage2, 25);
		break;
	}
	default:
		return;
	}
	
	// only remove card from hand if we play it successfully
	SETREMOVEAT(cardHand, handPosition);

	if (ISCLIENT())
		SendRemoveCardFromHand(handPosition);
}

uint8 UDamageControlSystem::PickRandomCard()
{
	// TODO: probably want to make some cards rarer than others
	return FMath::RandRange(0, NUM_DAMAGE_CARDS - 1);
}