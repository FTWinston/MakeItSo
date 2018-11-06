#ifndef WEB_SERVER_TEST
#include "PowerSystem.h"
#else
#include "stdafx.h"
#include "PowerSystem.h"
#endif

#include "UIConnectionInfo.h"
#include "CrewManager.h"

UPowerSystem::UPowerSystem()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.TickInterval = 1.0f;
	PrimaryComponentTick.SetTickFunctionEnable(true);

#ifndef WEB_SERVER_TEST
	powerLevels.AddZeroed(NUM_POWER_SYSTEMS);
#else
	powerLevels.assign(NUM_POWER_SYSTEMS, 0);
#endif
}

void UPowerSystem::ResetData()
{
	for (auto i = 0; i < NUM_POWER_SYSTEMS; i++)
		powerLevels[i] = 0;

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

bool UPowerSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "power_pickCard "))
	{
		int8 cardNum = ExtractInt(msg, sizeof("power_pickCard "));
		ChooseCard(cardNum);
	}
	else if (STARTS_WITH(msg, "power_useCard "))
	{
		TArray<FString> parts = SplitParts(msg, sizeof("power_useCard "));

		if (SIZENUM(parts) >= 3)
		{
			uint8 cardID = STOI(parts[0]);
			uint8 handPosition = STOI(parts[1]);
			uint8 targetSystemPos = (EPowerSystem)STOI(parts[2]);

			ActivateCard(cardID, handPosition, targetSystemPos);
		}
	}
	else
		return false;

	return true;
}

void UPowerSystem::SendAllData_Implementation()
{
	SendAllPowerLevels();
	SendCardChoice();
	SendWholeHand();
	SendQueueSize();
}

#define CHOICE_GENERATION_ENERGY_AMOUNT 1000
#define MAX_CHOICE_QUEUE_SIZE 9

void UPowerSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	if (choiceQueueSize >= MAX_CHOICE_QUEUE_SIZE)
		return;

	choiceGeneratedAmount += GetHealthLevel();

	if (choiceGeneratedAmount < CHOICE_GENERATION_ENERGY_AMOUNT)
		return;

	choiceGeneratedAmount -= CHOICE_GENERATION_ENERGY_AMOUNT;
	AddCardChoice(PickRandomCard(), PickRandomCard(), PickRandomCard());
}


void UPowerSystem::SetSystemPower(UShipSystem::ESystem system, uint8 power)
{
	auto powerSystem = GetPowerSystem(system);
	if (powerSystem == Power_None)
		return;

	powerLevels[powerSystem] = power;

	if (ISCLIENT())
		SendPowerLevel(powerSystem, power);
}



#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAllPowerLevels() { SendAllPowerLevels_Implementation(); }
#endif
void UPowerSystem::SendAllPowerLevels_Implementation()
{
	auto command = CombineIDs(TEXT("power_levels "), powerLevels);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendCardChoice() { SendCardChoice_Implementation(); }
#endif
void UPowerSystem::SendCardChoice_Implementation()
{
	auto command = CombineIDs(TEXT("power_choice "), cardChoice);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendQueueSize() { SendQueueSize_Implementation(); }
#endif
void UPowerSystem::SendQueueSize_Implementation()
{
	FString output = TEXT("power_queue ");
	APPENDINT(output, choiceQueueSize);
	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendWholeHand() { SendWholeHand_Implementation(); }
#endif
void UPowerSystem::SendWholeHand_Implementation()
{
	auto command = CombineIDs(TEXT("power_hand "), cardHand);
	SendSystem(command);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendPowerLevel(EPowerSystem system, uint8 powerLevel) { SendPowerLevel_Implementation(system, powerLevel); }
#endif
void UPowerSystem::SendPowerLevel_Implementation(EPowerSystem system, uint8 powerLevel)
{
	FString output = TEXT("power_level ");
	APPENDINT(output, system);
	output += TEXT(" ");
	APPENDINT(output, powerLevel);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendAddCardToHand(uint8 cardID) { SendAddCardToHand_Implementation(cardID); }
#endif
void UPowerSystem::SendAddCardToHand_Implementation(uint8 cardID)
{
	FString output = TEXT("power_add ");
	APPENDINT(output, cardID);

	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendRemoveCardFromHand(uint8 handPosition) { SendRemoveCardFromHand_Implementation(handPosition); }
#endif
void UPowerSystem::SendRemoveCardFromHand_Implementation(uint8 handPosition)
{
	FString output = TEXT("power_rem ");
	APPENDINT(output, handPosition);

	SendSystem(output);
}


void UPowerSystem::OnReplicated_PowerLevels(TArray<uint8> beforeChange)
{
	// if length has changed, send everything to the UI. Otherwise, only send the values that have changed.
	auto numSys = SIZENUM(powerLevels);
	if (SIZENUM(beforeChange) != numSys)
	{
		SendAllPowerLevels();
		return;
	}

	for (uint32 i = 0; i < numSys; i++)
	{
		auto currentVal = powerLevels[i];
		if (beforeChange[i] != currentVal)
			SendPowerLevel((EPowerSystem)i, currentVal);
	}
}


void UPowerSystem::OnReplicated_ChoiceQueueSize(uint8 beforeChange)
{
	SendQueueSize();
}


void UPowerSystem::OnReplicated_CardHand(TArray<uint8> beforeChange)
{
	auto oldSize = SIZENUM(beforeChange), newSize = SIZENUM(powerLevels);

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

void UPowerSystem::OnReplicated_CardChoice(TArray<uint8> beforeChange)
{
	SendCardChoice();
}

void UPowerSystem::AddCardChoice(uint8 card1, uint8 card2, uint8 card3)
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

FString UPowerSystem::CombineIDs(const TCHAR *prefix, TArray<uint8> IDs)
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

#define MAX_HAND_SIZE 6

#ifdef WEB_SERVER_TEST
void UPowerSystem::ChooseCard(int8 cardPosition) { ChooseCard_Implementation(cardPosition); }
#endif

void UPowerSystem::ChooseCard_Implementation(int8 cardPosition)
{
	if (cardPosition < -1 || cardPosition >= SIZENUM(cardChoice) || SIZENUM(cardHand) >= MAX_HAND_SIZE)
		return;

	if (cardPosition > -1)
	{
		uint8 chosenCardID = cardChoice[cardPosition];
		SETADD(cardHand, chosenCardID);

		if (ISCLIENT())
			SendAddCardToHand(chosenCardID);
	}

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


UShipSystem *UPowerSystem::LookupSystem(EPowerSystem system)
{
	switch (system)
	{
	case Power_Helm:
		return crewManager->GetSystem(UShipSystem::ESystem::Helm);
	case Power_Warp:
		return crewManager->GetSystem(UShipSystem::ESystem::Warp);
	case Power_Weapons:
		return crewManager->GetSystem(UShipSystem::ESystem::Weapons);
	case Power_Sensors:
		return crewManager->GetSystem(UShipSystem::ESystem::Sensors);
	//	case Power_Shields:
	//		return ???;
	case Power_DamageControl:
		return crewManager->GetSystem(UShipSystem::ESystem::DamageControl);
	case Power_Comms:
		return crewManager->GetSystem(UShipSystem::ESystem::Communications);
	default:
		return nullptr;
	}
}


UPowerSystem::EPowerSystem UPowerSystem::GetPowerSystem(UShipSystem::ESystem system)
{
	switch (system)
	{
	case UShipSystem::ESystem::Helm:
		return Power_Helm;
	case UShipSystem::ESystem::Warp:
		return Power_Warp;
	case UShipSystem::ESystem::Weapons:
		return Power_Weapons;
	case UShipSystem::ESystem::Sensors:
		return Power_Sensors;
	//case UShipSystem::ESystem::Shields:
	//	  return Power_Shields;
	case UShipSystem::ESystem::DamageControl:
		return Power_DamageControl;
	case UShipSystem::ESystem::Communications:
		return Power_Comms;
	default:
		return Power_None;
	}
}

bool UPowerSystem::AddPower(EPowerSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return false;
	
	auto powerLevel = targetSystem->GetPowerLevel();

	if (powerLevel >= MAX_SYSTEM_POWER)
		return false;

	powerLevel = FMath::Min((uint8)MAX_SYSTEM_POWER, powerLevel + amount);
	targetSystem->SetPowerLevel(powerLevel);

	powerLevels[system] = powerLevel;

	if (ISCLIENT())
		SendPowerLevel(system, powerLevel);

	return true;
}

bool UPowerSystem::ReducePower(EPowerSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return false;

	auto powerLevel = targetSystem->GetPowerLevel();

	if (powerLevel <= 0)
		return false;

	if (powerLevel <= amount)
		powerLevel = 0;
	else
	{
		powerLevel = powerLevel - amount;
	}

	targetSystem->SetPowerLevel(powerLevel);

	powerLevels[system] = powerLevel;

	if (ISCLIENT())
		SendPowerLevel(system, powerLevel);

	return true;
}


// TODO: implement more cards
enum EPowerCard
{
	Card_BoostHelm = 0,
	Card_BoostWarp,
	Card_BoostWeapons,
	Card_BoostSensors,
	Card_BoostShields,
	Card_BoostDamageControl,
	Card_BoostComms,
	Card_BoostSelectable,

	Card_OverloadHelm,
	Card_OverloadWarp,
	Card_OverloadWeapons,
	Card_OverloadSensors,
	Card_OverloadShields,
	Card_OverloadDamageControl,
	Card_OverloadComms,
	Card_OverloadSelectable,

	NUM_POWER_CARDS,
};


#ifdef WEB_SERVER_TEST
void UPowerSystem::ActivateCard(uint8 cardID, uint8 handPosition, uint8 targetSystemPos) { ActivateCard_Implementation(cardID, handPosition, targetSystemPos); }
#endif

void UPowerSystem::ActivateCard_Implementation(uint8 cardID, uint8 handPosition, uint8 targetSystem)
{
	if (targetSystem >= NUM_POWER_SYSTEMS || cardHand[handPosition] != cardID)
		return;

	switch ((EPowerCard)cardID)
	{
		case Card_BoostHelm:
		{
			if (!AddPower(EPowerSystem::Power_Helm, 25))
				return;
			break;
		}
		case Card_BoostWarp:
		{
			if (!AddPower(EPowerSystem::Power_Warp, 25))
				return;
			break;
		}
		case Card_BoostWeapons:
		{
			if (!AddPower(EPowerSystem::Power_Weapons, 25))
				return;
			break;
		}
		case Card_BoostSensors:
		{
			if (!AddPower(EPowerSystem::Power_Sensors, 25))
				return;
			break;
		}
		case Card_BoostShields:
		{
			if (!AddPower(EPowerSystem::Power_Shields, 25))
				return;
			break;
		}
		case Card_BoostDamageControl:
		{
			if (!AddPower(EPowerSystem::Power_DamageControl, 25))
				return;
			break;
		}
		case Card_BoostComms:
		{
			if (!AddPower(EPowerSystem::Power_Comms, 25))
				return;
			break;
		}
		case Card_BoostSelectable:
		{
			if (!AddPower((EPowerSystem)targetSystem, 20))
				return;
			break;
		}

		case Card_OverloadHelm:
		{
			if (!AddPower(EPowerSystem::Power_Helm, 50))
				return;
			break;
		}
		case Card_OverloadWarp:
		{
			if (!AddPower(EPowerSystem::Power_Warp, 50))
				return;
			break;
		}
		case Card_OverloadWeapons:
		{
			if (!AddPower(EPowerSystem::Power_Weapons, 50))
				return;
			break;
		}
		case Card_OverloadSensors:
		{
			if (!AddPower(EPowerSystem::Power_Sensors, 50))
				return;
			break;
		}
		case Card_OverloadShields:
		{
			if (!AddPower(EPowerSystem::Power_Shields, 50))
				return;
			break;
		}
		case Card_OverloadDamageControl:
		{
			if (!AddPower(EPowerSystem::Power_DamageControl, 50))
				return;
			break;
		}
		case Card_OverloadComms:
		{
			if (!AddPower(EPowerSystem::Power_Comms, 50))
				return;
			break;
		}
		case Card_OverloadSelectable:
		{
			if (!AddPower((EPowerSystem)targetSystem, 40))
				return;
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

uint8 UPowerSystem::PickRandomCard()
{
	// TODO: probably want to make some cards rarer than others
	return FMath::RandRange(0, NUM_POWER_CARDS - 1);
}