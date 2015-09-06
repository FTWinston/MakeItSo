#include "MakeItSo.h"
#include "MakeItSoEngine.h"
#include "CrewManager.h"

UMakeItSoEngine::UMakeItSoEngine(const FObjectInitializer& foi)
	: Super(foi)
{}

void UMakeItSoEngine::Init(class IEngineLoop* InEngineLoop)
{
	Super::Init(InEngineLoop);
}

void UMakeItSoEngine::PreExit()
{
	Super::PreExit();

	if (UCrewManager::Instance)
	{
		UCrewManager::Instance->ConditionalBeginDestroy();
		UCrewManager::Instance = nullptr;
	}
}
