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

#define PI		3.14159265359f
#define INV_PI	0.31830988618f
#define HALF_PI	1.57079632679f

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
	static float Atan2(float val1, float val2) { return atan2(val1, val2); }
	static float FastAsin(float val) { return asinf(val); }

	static float Square(float val) { return val * val; }
	static float Fmod(float val1, float val2) { return fmod(val1, val2); }

	static void SinCos(float* ScalarSin, float* ScalarCos, float Value)
	{
		// Map Value to y in [-pi,pi], x = 2*pi*quotient + remainder.
		float quotient = (INV_PI*0.5f)*Value;
		if (Value >= 0.0f)
		{
			quotient = (float)((int)(quotient + 0.5f));
		}
		else
		{
			quotient = (float)((int)(quotient - 0.5f));
		}
		float y = Value - (2.0f*PI)*quotient;

		// Map y to [-pi/2,pi/2] with sin(y) = sin(Value).
		float sign;
		if (y > HALF_PI)
		{
			y = PI - y;
			sign = -1.0f;
		}
		else if (y < -HALF_PI)
		{
			y = -PI - y;
			sign = -1.0f;
		}
		else
		{
			sign = +1.0f;
		}

		float y2 = y * y;

		// 11-degree minimax approximation
		*ScalarSin = (((((-2.3889859e-08f * y2 + 2.7525562e-06f) * y2 - 0.00019840874f) * y2 + 0.0083333310f) * y2 - 0.16666667f) * y2 + 1.0f) * y;

		// 10-degree minimax approximation
		float p = ((((-2.6051615e-07f * y2 + 2.4760495e-05f) * y2 - 0.0013888378f) * y2 + 0.041666638f) * y2 - 0.5f) * y2 + 1.0f;
		*ScalarCos = sign * p;
	}

	static float InvSqrt(float x)
	{
		float xhalf = 0.5f*x;
		int i = *(int*)&x;
		i = 0x5f3759df - (i >> 1);
		x = *(float*)&i;
		x = x*(1.5f - xhalf*x*x);
		return x;
	}
};

struct FRotator;

struct FQuat {
public:
	FQuat() {}
	FQuat(float x, float y, float z, float w) { W = w; X = x; Y = y; Z = z; }
	float W, X, Y, Z;

	FQuat operator*(const FQuat& Q) const {
		FQuat result;

		result.W = this->W * Q.W - this->X * Q.X - this->Y * Q.Y - this->Z * Q.Z;
		result.X = this->X * Q.W + this->W * Q.X + this->Z * Q.Y - this->Y * Q.Z;
		result.Y = this->Y * Q.W - this->Z * Q.X + this->W * Q.Y + this->X * Q.Z;
		result.Z = this->Z * Q.W + this->Y * Q.X - this->X * Q.Y + this->W * Q.Z;

		return result;
	}

	void Normalize()
	{
		const float SquareSum = X * X + Y * Y + Z * Z + W * W;

		if (SquareSum >= 0.000001f)
		{
			const float Scale = FMath::InvSqrt(SquareSum);

			X *= Scale;
			Y *= Scale;
			Z *= Scale;
			W *= Scale;
		}
		else
		{
			W = 1;
			X = Y = Z = 0;
		}
	}

	FRotator Rotator() const;
};

struct FRotator {
public:
	FRotator() {}
	FRotator(float pitch, float yaw, float roll) { Pitch = pitch; Yaw = yaw; Roll = roll; }
	float Pitch, Yaw, Roll;

	static float ClampAxis(float Angle)
	{
		// returns Angle in the range (-360,360)
		Angle = FMath::Fmod(Angle, 360.f);

		if (Angle < 0.f)
		{
			// shift to [0,360) range
			Angle += 360.f;
		}

		return Angle;
	}

	static float NormalizeAxis(float Angle)
	{
		// returns Angle in the range [0,360)
		Angle = ClampAxis(Angle);

		if (Angle > 180.f)
		{
			// shift to (-180,180]
			Angle -= 360.f;
		}

		return Angle;
	}

	FQuat Quaternion()
	{
		const float DEG_TO_RAD = PI / (180.f);
		const float DIVIDE_BY_2 = DEG_TO_RAD / 2.f;
		float SP, SY, SR;
		float CP, CY, CR;

		FMath::SinCos(&SP, &CP, Pitch*DIVIDE_BY_2);
		FMath::SinCos(&SY, &CY, Yaw*DIVIDE_BY_2);
		FMath::SinCos(&SR, &CR, Roll*DIVIDE_BY_2);

		FQuat RotationQuat;
		RotationQuat.X = CR * SP*SY - SR * CP*CY;
		RotationQuat.Y = -CR * SP*CY - SR * CP*SY;
		RotationQuat.Z = CR * CP*SY - SR * SP*CY;
		RotationQuat.W = CR * CP*CY + SR * SP*SY;

		return RotationQuat;
	}
};