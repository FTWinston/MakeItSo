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
#include <map>
#include <math.h>
#include <algorithm>

#define MAKEITSO_API 

#define UCLASS() 
#define GENERATED_BODY() 
#define UFUNCTION(a, b) 

#define int32 int
#define uint8 int

#define TSet std::vector
#define TSparseArray std::vector
#define TQueue std::queue
#define TMap std::map
#define FString std::wstring

class UObject {};
class APlayerController {};

class Super
{
public:
	static void BeginDestroy() {}
};

class FMath {
public:
	static int32 RandRange(int32 min, int32 max) {
		return rand() % (max - min + 1) + min;
	}
	static float Min(float min, float max) {
		return std::min(min, max);
	}
	static float Max(float min, float max) {
		return std::max(min, max);
	}

	static float Sin(float val) { return sin(val); }
	static float Cos(float val) { return cos(val); }
	static float Tan(float val) { return tan(val); }
};

struct FQuat {
public:
	FQuat() {}
	FQuat(float x, float y, float z, float w) { W = w; X = x; Y = y; Z = z; }
	float W, X, Y, Z;

	FQuat operator*(const FQuat& Q) const {
		FQuat result;

		result.W = this->W * Q.W - this->X * Q.X - this->Y * Q.Y - this->Z * Q.Z;
		result.X = this->W * Q.W - this->X * Q.X - this->Y * Q.Y - this->Z * Q.Z;
		result.Y = result.Y = this->W * Q.X + this->X * Q.W + this->Y * Q.Z - this->Z * Q.Y;
		result.Z = this->W * Q.Y - this->X * Q.Z + this->Y * Q.W + this->Z * Q.X;

		return result;
	}
};