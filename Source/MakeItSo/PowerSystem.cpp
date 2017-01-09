#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif
#include "PowerSystem.h"


bool UPowerSystem::ReceiveCrewMessage(ConnectionInfo *info)
{
	if (STARTS_WITH(info, "pickCard "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "pickCard ");
		int32 cardID = atoi(buffer);

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
	else if (STARTS_WITH(info, "useCard "))
	{
		char buffer[8];
		EXTRACT(info, buffer, "useCard ");
		int32 cardID = atoi(buffer);

#ifndef WEB_SERVER_TEST
		if (!cardLibrary.Contains(cardID))
			return true; // card not in library
		cardLibrary.Remove(cardID);
#else
		if (std::find(cardLibrary.begin(), cardLibrary.end(), cardID) == cardLibrary.end())
			return true; // card not in library
		cardLibrary.erase(std::remove(cardLibrary.begin(), cardLibrary.end(), cardID), cardLibrary.end());
#endif
		ActivatePowerCard(cardID);
	}
	else
		return false;

	return true;
}

void UPowerSystem::SendAllData()
{
	SendAuxPower();
	SendPowerLevels();
	SendCardChoice();
	SendCardLibrary();
}

bool UPowerSystem::ProcessSystemMessage(FString message)
{
	if (message == TEXT("inc_aux"))
	{
		IncrementAuxPower();
		return true;
	}

	// TODO: check for addchoice message

	return false;
}

void UPowerSystem::IncrementAuxPower()
{
	if (auxPower >= MAX_AUX_POWER)
		return;

	auxPower++;
	SendAuxPower();
}

void UPowerSystem::SendAuxPower()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("aux %i"), auxPower);
	SendCrewMessage(CHARARR(message));
#else
	TCHAR buffer[8];
	swprintf(buffer, sizeof(buffer), L"aux %i", auxPower);
	SendCrewMessage(buffer);
#endif
}

void UPowerSystem::SendPowerLevels()
{
#ifndef WEB_SERVER_TEST
	auto message = FString::Printf(TEXT("levels %.0f %.0f %.0f %.0f %.0f %.0f"), powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
	SendCrewMessage(CHARARR(message));
#else
	TCHAR buffer[32];
	swprintf(buffer, sizeof(buffer), L"levels %.0f %.0f %.0f %.0f %.0f %.0f", powerLevels[0], powerLevels[1], powerLevels[2], powerLevels[3], powerLevels[4], powerLevels[5]);
	SendCrewMessage(buffer);
#endif
}

void UPowerSystem::AddCardChoice(int32 card1, int32 card2, int32 card3)
{
	TSet<int32> choice;
#ifndef WEB_SERVER_TEST
	choice.Add(card1);
	choice.Add(card2);
	choice.Add(card3);
#else
	choice.push_back(card1);
	choice.push_back(card2);
	choice.push_back(card3);
#endif

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

void UPowerSystem::SendCardChoice()
{
#ifndef WEB_SERVER_TEST
	if (cardChoices.IsEmpty())
#else
	if (cardChoices.empty())
#endif
		SendCrewMessage(TEXT("choice "));
	else
	{
#ifndef WEB_SERVER_TEST
		TSet<int32> choiceIDs;
		cardChoices.Peek(choiceIDs);
#else
		auto choiceIDs = cardChoices.front();
#endif

		auto command = CombineIDs(TEXT("choice "), choiceIDs);
		SendCrewMessage(CHARARR(command));
	}
}

void UPowerSystem::SendCardLibrary()
{
	auto command = CombineIDs(TEXT("lib "), cardLibrary);
	SendCrewMessage(CHARARR(command));
}

FString UPowerSystem::CombineIDs(const TCHAR *prefix, TSet<int32> IDs)
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

			output += id;
		}
	}
	return output;
}

void UPowerSystem::ActivatePowerCard(int32 cardID)
{
	// ???
}