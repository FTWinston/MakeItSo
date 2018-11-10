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
	systemCapacity.AddZeroed(NUM_POWER_SYSTEMS);
#else
	powerLevels.assign(NUM_POWER_SYSTEMS, 0);
	systemCapacity.assign(NUM_POWER_SYSTEMS, 0);
#endif
}

void UPowerSystem::ResetData()
{
	overallPower = 0;
	for (auto i = 0; i < NUM_POWER_SYSTEMS; i++)
	{
		auto system = LookupSystem((EPowerSystem)i);

		auto systemPower = system == nullptr
			? 0 : system->GetPowerLevel();

		powerLevels[i] = systemPower;

		systemCapacity[i] = systemPower == 0
			? 100 : systemPower;

		overallPower += systemPower;
	}

	CLEAR(cardChoice);
	CLEAR(cardHand);
	CLEAR(upcomingActions);

#ifndef WEB_SERVER_TEST
	choiceQueue.Empty();
#else
	while (!QUEUE_IS_EMPTY(choiceQueue))
		choiceQueue.pop();
#endif

	choiceQueueSize = 0;
	auxPowerGenerationProgress = 0;
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
	else if (STARTS_WITH(msg, "power_discardCard "))
	{
		uint8 handPosition = ExtractInt(msg, sizeof("power_discardCard "));
		DiscardCard(handPosition);
	}
	else if (STARTS_WITH(msg, "power_toggle "))
	{
		EPowerSystem targetSystem = (EPowerSystem)ExtractInt(msg, sizeof("power_toggle "));
		ToggleSystem(targetSystem);
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

#define CHOICE_GENERATION_AUX_AMOUNT 2100
#define MAX_CHOICE_QUEUE_SIZE 9

void UPowerSystem::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	TickQueuedActions();

	TickAuxPower();
}

void UPowerSystem::TickQueuedActions()
{
	auto queueSize = SIZENUM(upcomingActions);
	if (queueSize == 0)
		return;

	auto firstAction = upcomingActions[0];
	firstAction->delayInTicks--;

	while (firstAction->delayInTicks <= 0)
	{
		PerformAction(firstAction);
		
		SETREMOVEAT(upcomingActions, 0);
		delete firstAction;

		if (--queueSize == 0)
			break;

		firstAction = upcomingActions[0];
	}
}

void UPowerSystem::QueueAction(uint8 totalTickDelay, UPowerAction* action)
{
	int8 queueSize = (int8)SIZENUM(upcomingActions);
	uint8 cumulativeDelay = 0;
	int8 insertIndex = -1;

	while (true)
	{
		if (++insertIndex >= queueSize)
			break;

		auto newDelay = cumulativeDelay + upcomingActions[insertIndex]->delayInTicks;

		if (newDelay > totalTickDelay)
		{
			upcomingActions[insertIndex]->delayInTicks = newDelay - totalTickDelay;
			break;
		}
		else if (newDelay == totalTickDelay)
			break;

		cumulativeDelay = newDelay;
	}

	// hmm, we've gone past it by this point, haven't we?
	action->delayInTicks = totalTickDelay - cumulativeDelay;

	SETINSERT(upcomingActions, action, insertIndex);
}

void UPowerSystem::PerformAction(UPowerAction* action)
{
	auto system = LookupSystem(action->system);
	if (system == nullptr)
		return;

	if (action->healthChange > 0)
		system->RestoreDamage(action->healthChange);
	else if (action->healthChange < 0)
		system->TakeDamage(-action->healthChange);

	if (action->powerChange > 0)
		AddPower(action->system, action->powerChange);
	else if (action->powerChange < 0)
		ReducePower(action->system, -action->powerChange);
}

void UPowerSystem::TickAuxPower()
{
	if (choiceQueueSize >= MAX_CHOICE_QUEUE_SIZE)
		return;

	int16 powerDifference = NUM_POWER_SYSTEMS * 100 - overallPower;

	if (powerDifference < 0)
		RemoveAuxPower(-powerDifference);
	else if (powerDifference > 0)
		AddAuxPower(powerDifference);
	else
		return;

	if (ISCLIENT())
		SendGeneration();
}

void UPowerSystem::AddAuxPower(int16 amount)
{
	// TODO: account for GetHealthLevel() ... or does that affect the overall power "max" rather than aux generation rate?

	auxPowerGenerationProgress += amount;

	if (auxPowerGenerationProgress >= CHOICE_GENERATION_AUX_AMOUNT)
	{
		AddCardChoice(PickRandomCard(), PickRandomCard(), PickRandomCard());

		if (choiceQueueSize >= MAX_CHOICE_QUEUE_SIZE)
			auxPowerGenerationProgress = 0; // when we're full, don't leave a partial bar
		else
			auxPowerGenerationProgress -= CHOICE_GENERATION_AUX_AMOUNT;
	}
}

void UPowerSystem::RemoveAuxPower(int16 amount)
{
	if (auxPowerGenerationProgress < amount)
	{
		// Remove a card from the queue, if there are any.
		if (choiceQueueSize > 0)
		{
#ifndef WEB_SERVER_TEST
			choiceQueue.Dequeue(newChoice);
#else
			choiceQueue.pop();
#endif
			choiceQueueSize--;

			if (ISCLIENT())
				SendQueueSize();
		}

		// Otherwise, remove a card from the hand, if there are any.
		else if (SIZENUM(cardHand) > 0)
		{
			auto removePos = SIZENUM(cardHand) - 1;
			SETREMOVEAT(cardHand, removePos);

			if (ISCLIENT())
				SendRemoveCardFromHand(removePos);
		}

		// Otherwise, shut enough systems down to account for the defecit.
		else
		{
			for (uint8 i = NUM_POWER_SYSTEMS - 1; i >= 0; i++)
				if (powerLevels[i] > 0)
				{
					auto system = LookupSystem((EPowerSystem)i);
					if (system == nullptr)
						continue;

					amount -= powerLevels[i];
					system->SetPowerLevel(0);

					// If there is still unaccounted for power drain, keep shutting systems down...
					if (amount <= 0)
						break;
				}

			auxPowerGenerationProgress = 0;
			return;
		}

		// have consumed aux power point or a card, so "wrap" the aux power back up again
		auxPowerGenerationProgress = CHOICE_GENERATION_AUX_AMOUNT - amount + auxPowerGenerationProgress;
	}
	else
	{
		auxPowerGenerationProgress -= amount;
	}
}

void UPowerSystem::SetSystemPower(UShipSystem::ESystem system, uint8 power)
{
	auto powerSystem = GetPowerSystem(system);
	if (powerSystem == Power_None)
		return;

	auto orig = powerLevels[powerSystem];
	powerLevels[powerSystem] = power;

	overallPower += power - orig;

	if (power != 0)
		systemCapacity[powerSystem] = power;

	if (ISCLIENT())
	{
		SendPowerLevel(powerSystem, power);
		SendOverallPower(overallPower);
	}
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendOverallPower(uint16 overallPower) { SendOverallPower_Implementation(overallPower); }
#endif
void UPowerSystem::SendOverallPower_Implementation(uint16 overallPower)
{
	FString output = TEXT("power_all ");
	APPENDINT(output, overallPower / NUM_POWER_SYSTEMS);
	SendSystem(output);
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
	FString output = TEXT("power_choices ");
	APPENDINT(output, choiceQueueSize);
	SendSystem(output);
}

#ifdef WEB_SERVER_TEST
void UPowerSystem::SendGeneration() { SendGeneration_Implementation(); }
#endif
void UPowerSystem::SendGeneration_Implementation()
{
	FString output = TEXT("power_gen ");
	uint8 percent = 100 * auxPowerGenerationProgress / CHOICE_GENERATION_AUX_AMOUNT;

	APPENDINT(output, percent);
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


void UPowerSystem::OnReplicated_OverallPower(uint16 beforeChange)
{
	SendOverallPower(overallPower);
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

void UPowerSystem::OnReplicated_AuxPowerGenerationProgress(uint8 beforeChange)
{
	SendGeneration();
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
	if (cardPosition < -1 || cardPosition >= (int8)SIZENUM(cardChoice) || SIZENUM(cardHand) >= MAX_HAND_SIZE)
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

uint8 UPowerSystem::GetPowerAddition(uint8 current, uint8 addition)
{
	return FMath::Min((uint8)MAX_SYSTEM_POWER, current + addition);
}

uint8 UPowerSystem::GetPowerReduction(uint8 current, uint8 reduction)
{
	return reduction >= current
		? 0
		: current - reduction;
}

bool UPowerSystem::AddPower(EPowerSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return false;

	auto currentCapacity = systemCapacity[system];
	auto newLevel = GetPowerAddition(currentCapacity, amount);

	if (newLevel == currentCapacity)
		return false;

	systemCapacity[system] = newLevel;

	// Only adjust the power level if the system is turned on. Don't turn it on through this.
	auto currentLevel = targetSystem->GetPowerLevel();
	if (currentLevel > 0)
		targetSystem->SetPowerLevel(newLevel);

	return true;
}

bool UPowerSystem::ReducePower(EPowerSystem system, uint8 amount)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return false;

	auto currentCapacity = systemCapacity[system];
	auto newLevel = GetPowerReduction(currentCapacity, amount);

	if (newLevel == currentCapacity)
		return false;

	systemCapacity[system] = newLevel;

	// Only adjust the power level if the system is turned on. Don't turn it on through this.
	auto currentLevel = targetSystem->GetPowerLevel();
	if (currentLevel > 0)
		targetSystem->SetPowerLevel(newLevel);

	return true;
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::ToggleSystem(EPowerSystem system) { ToggleSystem_Implementation(system); }
#endif

void UPowerSystem::ToggleSystem_Implementation(EPowerSystem system)
{
	UShipSystem *targetSystem = LookupSystem(system);
	if (targetSystem == nullptr)
		return;

	// If it's zero, set it to its current capacity. Otherwise, set it to 0.
	auto powerLevel = targetSystem->GetPowerLevel() == 0
		? systemCapacity[system] : 0;

	targetSystem->SetPowerLevel(powerLevel);
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
void UPowerSystem::DiscardCard(uint8 handPosition) { DiscardCard_Implementation(handPosition); }
#endif

void UPowerSystem::DiscardCard_Implementation(uint8 handPosition)
{
	if (handPosition >= SIZENUM(cardHand))
		return;

	SETREMOVEAT(cardHand, handPosition);

	if (ISCLIENT())
		SendRemoveCardFromHand(handPosition);
}


#ifdef WEB_SERVER_TEST
void UPowerSystem::ActivateCard(uint8 cardID, uint8 handPosition, uint8 targetSystemPos) { ActivateCard_Implementation(cardID, handPosition, targetSystemPos); }
#endif

void UPowerSystem::ActivateCard_Implementation(uint8 cardID, uint8 handPosition, uint8 targetSystem)
{
	if (targetSystem >= NUM_POWER_SYSTEMS || handPosition >= SIZENUM(cardHand) || cardHand[handPosition] != cardID)
		return;

	switch ((EPowerCard)cardID)
	{
		case Card_BoostHelm:
		{
			if (!AddPower(EPowerSystem::Power_Helm, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Helm, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostWarp:
		{
			if (!AddPower(EPowerSystem::Power_Warp, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Warp, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostWeapons:
		{
			if (!AddPower(EPowerSystem::Power_Weapons, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Weapons, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostSensors:
		{
			if (!AddPower(EPowerSystem::Power_Sensors, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Sensors, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostShields:
		{
			if (!AddPower(EPowerSystem::Power_Shields, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Shields, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostDamageControl:
		{
			if (!AddPower(EPowerSystem::Power_DamageControl, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_DamageControl, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostComms:
		{
			if (!AddPower(EPowerSystem::Power_Comms, 25))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Comms, -25, 0);
			QueueAction(20, action);
			break;
		}
		case Card_BoostSelectable:
		{
			if (!AddPower((EPowerSystem)targetSystem, 20))
				return;

			auto action = new UPowerAction((EPowerSystem)targetSystem, -20, 0);
			QueueAction(20, action);
			break;
		}

		case Card_OverloadHelm:
		{
			if (!AddPower(EPowerSystem::Power_Helm, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Helm, -50, -25);
			break;
		}
		case Card_OverloadWarp:
		{
			if (!AddPower(EPowerSystem::Power_Warp, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Warp, -50, -25);
			QueueAction(10, action);
			break;
		}
		case Card_OverloadWeapons:
		{
			if (!AddPower(EPowerSystem::Power_Weapons, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Weapons, -50, -25);
			QueueAction(10, action);
			break;
		}
		case Card_OverloadSensors:
		{
			if (!AddPower(EPowerSystem::Power_Sensors, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Sensors, -50, -25);
			QueueAction(10, action);
			break;
		}
		case Card_OverloadShields:
		{
			if (!AddPower(EPowerSystem::Power_Shields, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Shields, -50, -25);
			QueueAction(10, action);
			break;
		}
		case Card_OverloadDamageControl:
		{
			if (!AddPower(EPowerSystem::Power_DamageControl, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_DamageControl, -50, -25);
			QueueAction(10, action);
			break;
		}
		case Card_OverloadComms:
		{
			if (!AddPower(EPowerSystem::Power_Comms, 50))
				return;

			auto action = new UPowerAction(EPowerSystem::Power_Comms, -50, -25);
			QueueAction(10, action);
			break;
		}
		case Card_OverloadSelectable:
		{
			if (!AddPower((EPowerSystem)targetSystem, 40))
				return;

			auto action = new UPowerAction((EPowerSystem)targetSystem, -40, -25);
			QueueAction(10, action);
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