// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#include "targetver.h"

#include <stdio.h>
#include <tchar.h>
#include <set>
#include <string>

#define MAKEITSO_API 

#define UCLASS() 
#define GENERATED_BODY() 
#define UFUNCTION(a, b) 

#define TSet std::set
#define FString std::wstring

#define Add insert
#define Remove erase

class UObject {};
class APlayerController {};

class Super
{
public:
	static void BeginDestroy() {}
};