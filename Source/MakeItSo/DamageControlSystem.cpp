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
	{
		damageLevels[i] = 0;
		systemOrder[i] = i;
	}

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
			EDamageSystem targetSystem = (EDamageSystem)STOI(parts[2]);

			ActivateCard(cardID, handPosition, targetSystem);
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
}

void UDamageControlSystem::SendSystemOrder()
{
	auto command = CombineIDs(TEXT("dmg_order "), systemOrder);
	SendSystem(command);
}

void UDamageControlSystem::SendAllDamageLevels()
{
	auto command = CombineIDs(TEXT("dmg_levels "), damageLevels);
	SendSystem(command);
}

void UDamageControlSystem::SendCardChoice()
{
	auto command = CombineIDs(TEXT("dmg_choice "), cardChoice);
	SendSystem(command);
}

void UDamageControlSystem::SendQueueSize()
{
	FString output = TEXT("dmg_queue ");
	APPENDINT(output, choiceQueueSize);
	SendSystem(output);
}

void UDamageControlSystem::SendWholeHand()
{
	auto command = CombineIDs(TEXT("dmg_hand "), cardHand);
	SendSystem(command);
}

void UDamageControlSystem::SendDamageLevel(EDamageSystem system, uint8 damageLevel)
{
	FString output = TEXT("dmg_level ");
	APPENDINT(output, system);
	output += TEXT(" ");
	APPENDINT(output, damageLevel);

	SendSystem(output);
}

void UDamageControlSystem::SendAddCardToHand(uint8 cardID)
{
	FString output = TEXT("dmg_add ");
	APPENDINT(output, cardID);

	SendSystem(output);
}

void UDamageControlSystem::SendRemoveCardFromHand(uint8 handPosition)
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
#define MAX_CHOICE_QUEUE_SIZE 10

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
	}
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

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::ChooseCard(uint8 cardPosition) { ChooseCard_Implementation(cardPosition); }
#endif

void UDamageControlSystem::ChooseCard_Implementation(uint8 cardPosition)
{
	if (cardPosition >= SIZENUM(cardChoice))
		return;

	uint8 chosenCardID = cardChoice[cardPosition];
	SETADD(cardHand, chosenCardID);

	if (QUEUE_IS_EMPTY(choiceQueue))
	{
		CLEAR(cardChoice);
		return;
	}

#ifndef WEB_SERVER_TEST
	cardChoices.Dequeue(cardChoice);
#else
	cardChoice = choiceQueue.front();
	choiceQueue.pop();
#endif

	choiceQueueSize = SIZENUM(choiceQueue);
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
	NUM_DAMAGE_CARDS,
};

bool UDamageControlSystem::RestoreDamage(EDamageSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr || targetSystem->GetHealthLevel() >= MAX_SYSTEM_HEALTH)
		return false;

	targetSystem->RestoreDamage(amount);
	damageLevels[system] = targetSystem->GetHealthLevel();
	return true;
}

#ifdef WEB_SERVER_TEST
void UDamageControlSystem::ActivateCard(uint8 cardID, uint8 handPosition, uint8 targetSystemPos) { ActivateCard_Implementation(cardID, handPosition, targetSystemPos); }
#endif

void UDamageControlSystem::ActivateCard_Implementation(uint8 cardID, uint8 handPosition, uint8 targetSystemPos)
{
	if (targetSystemPos >= MAX_DAMAGE_SYSTEMS || cardHand[handPosition] != cardID)
		return;

	EDamageSystem damageSystem = (EDamageSystem)systemOrder[targetSystemPos];

	switch ((EDamageCard)cardID)
	{
	case Card_RepairSmall:
	{
		if (!RestoreDamage(damageSystem, 15))
			return;
		break;
	}
	case Card_RepairMed:

		if (!RestoreDamage(damageSystem, 35))
			return;
		break;
	case Card_RepairLarge:
		if (!RestoreDamage(damageSystem, 75))
			return;
		break;
	default:
		return;
	}
	
	// only remove card from hand if we play it successfully
	SETREMOVEAT(cardHand, handPosition);
}

uint8 UDamageControlSystem::PickRandomCard()
{
	// TODO: probably want to make some cards rarer than others
	return FMath::RandRange(0, NUM_DAMAGE_CARDS - 1);
}