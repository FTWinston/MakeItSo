#ifndef WEB_SERVER_TEST
#include "DamageControlSystem.h"
#else
#include "stdafx.h"
#include <sstream>
#include "DamageControlSystem.h"
#endif

#include "CrewManager.h"
#include "UIConnectionInfo.h"

bool UDamageControlSystem::ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg)
{
	if (STARTS_WITH(msg, "pickCard "))
	{
		int32 cardID = ExtractInt(msg, sizeof("pickCard "));

		TSet<int32> cardChoice;
#ifndef WEB_SERVER_TEST
		if (!cardChoices.Dequeue(cardChoice))
			return true; // no cards to choose from
#else
		if (cardChoices.empty())
			return true; // no cards to choose from
		cardChoice = cardChoices.front();
#endif

		bool cardIsInChoice = false;
		for (auto choiceCardID : cardChoice)
			if (choiceCardID == cardID)
			{
				cardIsInChoice = true;
				break;
			}

		if (!cardIsInChoice)
			return true; // chosen card isn't part of the current choice

#ifndef WEB_SERVER_TEST
		cardLibrary.Add(cardID);
#else
		cardChoices.pop();
		cardLibrary.push_back(cardID);
#endif
		SendCardChoice();
		SendCardLibrary();
	}
	else if (STARTS_WITH(msg, "useCard "))
	{
		int32 cardID = ExtractInt(msg, sizeof("useCard "));

		if (!SETCONTAINS(cardLibrary, cardID))
			return true; // card not in library

#ifndef WEB_SERVER_TEST
		cardLibrary.Remove(cardID);
#else
		cardLibrary.erase(std::remove(cardLibrary.begin(), cardLibrary.end(), cardID), cardLibrary.end());
#endif
		ActivatePowerCard(cardID);
	}
	else
		return false;

	return true;
}

void UDamageControlSystem::SendAllData_Implementation()
{
	SendAuxPower();
	SendPowerLevels();
	SendCardChoice();
	SendCardLibrary();
}

void UDamageControlSystem::IncrementAuxPower()
{
	if (auxPower >= MAX_AUX_POWER)
		return;

	auxPower++;
	SendAuxPower();
}

void UDamageControlSystem::SendAuxPower()
{
	crewManager->SendAll("aux %i", auxPower);
}

void UDamageControlSystem::SendPowerLevels()
{
	crewManager->SendAll("levels %.0f %.0f %.0f %.0f %.0f %.0f", powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
}

#ifndef WEB_SERVER_TEST
#define ADD(set, val) set.Add(val)
#else
#define ADD(set, val) set.push_back(val)
#endif

void UDamageControlSystem::AddCardChoice(int32 card1, int32 card2, int32 card3)
{
	TSet<int32> choice;
	ADD(choice, card1);
	ADD(choice, card2);
	ADD(choice, card3);

	bool wasEmpty;
#ifndef WEB_SERVER_TEST
	wasEmpty = cardChoices.IsEmpty();
	cardChoices.Enqueue(choice);
#else
	wasEmpty = cardChoices.empty();
	cardChoices.push(choice);
#endif

	if (wasEmpty)
		SendCardChoice();
}

void UDamageControlSystem::SendCardChoice()
{
#ifndef WEB_SERVER_TEST
	if (cardChoices.IsEmpty())
#else
	if (cardChoices.empty())
#endif
		crewManager->SendAllFixed("choice ");
	else
	{
#ifndef WEB_SERVER_TEST
		TSet<int32> choiceIDs;
		cardChoices.Peek(choiceIDs);
#else
		auto choiceIDs = cardChoices.front();
#endif

		auto command = CombineIDs(TEXT("choice "), choiceIDs);
		crewManager->SendAll(command);
	}
}

void UDamageControlSystem::SendCardLibrary()
{
	auto command = CombineIDs(TEXT("lib "), cardLibrary);
	crewManager->SendAll(command);
}

FString UDamageControlSystem::CombineIDs(const TCHAR *prefix, TSet<int32> IDs)
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

void UDamageControlSystem::ActivatePowerCard(int32 cardID)
{
	// ???
}