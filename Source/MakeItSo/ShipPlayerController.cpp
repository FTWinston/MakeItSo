// Fill out your copyright notice in the Description page of Project Settings.

#include "MakeItSo.h"
#include "ShipPlayerController.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"

void AShipPlayerController::InitInputSystem()
{
	Super::InitInputSystem();

	if (!UCrewManager::Instance)
	{
		UCrewManager::Instance = NewObject<UCrewManager>(GetTransientPackage(), NAME_None, RF_Standalone | RF_RootSet);
		UCrewManager::Instance->Init(this);
	}
	else
		UCrewManager::Instance->LinkController(this);

	InputComponent->BindAxis("HelmThrust", this, &AShipPlayerController::ThrustInput);
	InputComponent->BindAxis("HelmThrustSide", this, &AShipPlayerController::ThrustInputSide);
	InputComponent->BindAxis("HelmThrustVertical", this, &AShipPlayerController::ThrustInputVertical);

	InputComponent->BindAxis("HelmPitch", this, &AShipPlayerController::PitchInput);
	InputComponent->BindAxis("HelmYaw", this, &AShipPlayerController::YawInput);

	// how to send a crew message, as it stands
	//if (UCrewManager::Instance)
	//{
	//	UCrewManager::Instance->SendCrewMessage(CrewManager::ESystem::AllSystems, "hello world");
	//}
}

void AShipPlayerController::PreProcessInput(const float DeltaTime, const bool bGamePaused)
{
	if (UCrewManager::Instance)
	{
		UCrewManager::Instance->Poll();
	}
}

void AShipPlayerController::ThrustInput(float Val)
{
	if (FMath::IsNearlyEqual(Val, 0.f))
		return; // no input, do nothing

	auto pawn = Cast<AMakeItSoPawn>(GetPawn());
	Val = FMath::Clamp(Val, -1.f, 1.f) * pawn->GetThrusterAcceleration() * GetWorld()->GetDeltaSeconds();
	pawn->AddLocalVelocity(FVector(Val, 0.f, 0.f));
}

void AShipPlayerController::ThrustInputSide(float Val)
{
	if (FMath::IsNearlyEqual(Val, 0.f))
		return; // no input, do nothing

	auto pawn = Cast<AMakeItSoPawn>(GetPawn());
	Val = FMath::Clamp(Val, -1.f, 1.f) * pawn->GetThrusterAcceleration() * GetWorld()->GetDeltaSeconds();
	pawn->AddLocalVelocity(FVector(0.f, Val, 0.f));
}

void AShipPlayerController::ThrustInputVertical(float Val)
{
	if (FMath::IsNearlyEqual(Val, 0.f))
		return; // no input, do nothing

	auto pawn = Cast<AMakeItSoPawn>(GetPawn());
	Val = FMath::Clamp(Val, -1.f, 1.f) * pawn->GetThrusterAcceleration() * GetWorld()->GetDeltaSeconds();
	pawn->AddLocalVelocity(FVector(0.f, 0.f, Val));
}

void AShipPlayerController::PitchInput(float Val)
{
	auto pawn = Cast<AMakeItSoPawn>(GetPawn());

	// Target pitch speed is based in input
	float TargetPitchSpeed = Val * pawn->GetMaxTurnSpeed() * -1.f;

	FRotator rotation = pawn->GetRotationSpeed();

	// Smoothly interpolate to target pitch speed ... should really be adding speed, not setting speed
	float deltaPitch = FMath::FInterpTo(rotation.Pitch, TargetPitchSpeed, GetWorld()->GetDeltaSeconds(), 2.f) - rotation.Pitch;
	pawn->AddRotation(FRotator(deltaPitch, 0.f, 0.f));
}

void AShipPlayerController::YawInput(float Val)
{
	auto pawn = Cast<AMakeItSoPawn>(GetPawn());

	// Target yaw speed is based on input
	float TargetYawSpeed = Val * pawn->GetMaxTurnSpeed();

	FRotator rotation = pawn->GetRotationSpeed();

	// Smoothly interpolate to target yaw speed
	float deltaYaw = FMath::FInterpTo(rotation.Yaw, TargetYawSpeed, GetWorld()->GetDeltaSeconds(), 2.f) - rotation.Yaw;

	// Is there any left/right input?
	const bool bIsTurning = FMath::Abs(Val) > 0.2f;

	// If turning, yaw value is used to influence roll
	// If not turning, roll to reverse current roll value
	float TargetRollSpeed = bIsTurning ? (rotation.Yaw * 0.5f) : (pawn->GetActorRotation().Roll * -2.f);

	// Smoothly interpolate roll speed
	float deltaRoll = FMath::FInterpTo(rotation.Roll, TargetRollSpeed, GetWorld()->GetDeltaSeconds(), 2.f) - rotation.Roll;

	pawn->AddRotation(FRotator(0.f, deltaYaw, deltaRoll));
}