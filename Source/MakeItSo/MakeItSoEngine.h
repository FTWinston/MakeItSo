#pragma once

#include "Engine/GameEngine.h"
#include "MakeItSoEngine.generated.h"

/**
 * 
 */
UCLASS()
class MAKEITSO_API UMakeItSoEngine : public UGameEngine
{
	GENERATED_UCLASS_BODY()


	// When engine starts
	void Init(class IEngineLoop* InEngineLoop);
	// Close engine
	void PreExit();
};
