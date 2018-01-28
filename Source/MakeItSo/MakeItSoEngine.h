// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
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
