// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

/**
 * 
 */
class MAKEITSO_API InterfaceUtilities
{
public:
	UFUNCTION(BlueprintCallable, Category = NetUtils)
	static FString GetLocalIP();
};
