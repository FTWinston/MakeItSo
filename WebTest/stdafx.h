// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#include "targetver.h"

#include <stdio.h>
#include <tchar.h>
#include <vector>
#include <queue>
#include <string>

#define MAKEITSO_API 

#define UCLASS() 
#define GENERATED_BODY() 
#define UFUNCTION(a, b) 

#define int32 int

#define TSet std::vector
#define TQueue std::queue
#define FString std::wstring

class UObject {};
class APlayerController {};

class Super
{
public:
	static void BeginDestroy() {}
};