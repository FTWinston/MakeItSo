#include "stdafx.h"

FQuat::FQuat(FRotator r)
{
	*this = r.Quaternion();
}

FQuat FVector::ToOrientationQuat()
{
	// Essentially an optimized Vector->Rotator->Quat made possible by knowing Roll == 0, and avoiding radians->degrees->radians.
	// This is done to avoid adding any roll (which our API states as a constraint).
	const float YawRad = FMath::Atan2(Y, X);
	const float PitchRad = FMath::Atan2(Z, sqrt(X*X + Y * Y));

	const float DIVIDE_BY_2 = 0.5f;
	float SP, SY;
	float CP, CY;

	FMath::SinCos(&SP, &CP, PitchRad * DIVIDE_BY_2);
	FMath::SinCos(&SY, &CY, YawRad * DIVIDE_BY_2);

	FQuat RotationQuat;
	RotationQuat.X = SP * SY;
	RotationQuat.Y = -SP * CY;
	RotationQuat.Z = CP * SY;
	RotationQuat.W = CP * CY;
	return RotationQuat;
}

FRotator FQuat::Rotator() const
{
	const float SingularityTest = Z * X - W * Y;
	const float YawY = 2.f*(W*Z + X * Y);
	const float YawX = (1.f - 2.f*(FMath::Square(Y) + FMath::Square(Z)));

	const float SINGULARITY_THRESHOLD = 0.4999995f;
	const float RAD_TO_DEG = (180.f) / PI;
	FRotator RotatorFromQuat;

	if (SingularityTest < -SINGULARITY_THRESHOLD)
	{
		RotatorFromQuat.Pitch = -90.f;
		RotatorFromQuat.Yaw = FMath::Atan2(YawY, YawX) * RAD_TO_DEG;
		RotatorFromQuat.Roll = FRotator::NormalizeAxis(-RotatorFromQuat.Yaw - (2.f * FMath::Atan2(X, W) * RAD_TO_DEG));
	}
	else if (SingularityTest > SINGULARITY_THRESHOLD)
	{
		RotatorFromQuat.Pitch = 90.f;
		RotatorFromQuat.Yaw = FMath::Atan2(YawY, YawX) * RAD_TO_DEG;
		RotatorFromQuat.Roll = FRotator::NormalizeAxis(RotatorFromQuat.Yaw - (2.f * FMath::Atan2(X, W) * RAD_TO_DEG));
	}
	else
	{
		RotatorFromQuat.Pitch = FMath::FastAsin(2.f*(SingularityTest)) * RAD_TO_DEG;
		RotatorFromQuat.Yaw = FMath::Atan2(YawY, YawX) * RAD_TO_DEG;
		RotatorFromQuat.Roll = FMath::Atan2(-2.f*(W*X + Y * Z), (1.f - 2.f*(FMath::Square(X) + FMath::Square(Y)))) * RAD_TO_DEG;
	}

	return RotatorFromQuat;
}

const FRotator FRotator::ZeroRotator = FRotator(0, 0, 0);

const FVector FVector::ZeroVector = FVector(0, 0, 0);