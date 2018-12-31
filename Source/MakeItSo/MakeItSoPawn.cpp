// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.

#ifndef WEB_SERVER_TEST
#include "MakeItSoPawn.h"
#include "UObject/ConstructorHelpers.h"
#include "Camera/CameraComponent.h"
#include "Components/StaticMeshComponent.h"
#include "Components/InputComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "Engine/World.h"
#include "Engine/StaticMesh.h"
#else
#include "stdafx.h"
#include "MakeItSoPawn.h"
#endif

#include "CommunicationSystem.h"
#include "DamageControlSystem.h"
#include "HelmSystem.h"
#include "PowerSystem.h"
#include "SensorSystem.h"
#include "ViewscreenSystem.h"
#include "WeaponSystem.h"
#include "WarpSystem.h"
#include "WarpJump.h"

#ifndef WEB_SERVER_TEST
#define ADDSYSTEM(lookup, systemType, name) systems.Add(lookup, CreateDefaultSubobject<systemType>(TEXT(name)))
#else
#define ADDSYSTEM(lookup, systemType, name) systems.insert(std::pair<UShipSystem::ESystem, UShipSystem*>(lookup, new systemType()));
#endif

AMakeItSoPawn::AMakeItSoPawn()
{
#ifndef WEB_SERVER_TEST
	// Structure to hold one-time initialization
	struct FConstructorStatics
	{
		ConstructorHelpers::FObjectFinderOptional<UStaticMesh> ShipMesh;
		FConstructorStatics()
			: ShipMesh(TEXT("/Game/Flying/Meshes/UFO.UFO"))
		{
		}
	};

	static FConstructorStatics ConstructorStatics;

	// Create static mesh component
	ShipMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("PlaneMesh0"));
	ShipMesh->SetStaticMesh(ConstructorStatics.ShipMesh.Get());	// Set static mesh
	RootComponent = ShipMesh;

	// Create a spring arm component
	SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm0"));
	SpringArm->SetupAttachment(RootComponent);	// Attach SpringArm to RootComponent
	SpringArm->TargetArmLength = 160.0f; // The camera follows at this distance behind the character	
	SpringArm->SocketOffset = FVector(0.f,0.f,60.f);
	SpringArm->bEnableCameraLag = false;	// Do not allow camera to lag
	SpringArm->CameraLagSpeed = 15.f;

	// Create camera component 
	Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera0"));
	Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);	// Attach the camera
	Camera->bUsePawnControlRotation = false; // Don't rotate camera with controller

#endif

	// Create the ship system components
	ADDSYSTEM(UShipSystem::ESystem::Helm, UHelmSystem, "Helm0");
	ADDSYSTEM(UShipSystem::ESystem::Warp, UWarpSystem, "Warp0");
	ADDSYSTEM(UShipSystem::ESystem::Weapons, UWeaponSystem, "Weapons0");
	ADDSYSTEM(UShipSystem::ESystem::PowerManagement, UPowerSystem, "Power0");
	ADDSYSTEM(UShipSystem::ESystem::Sensors, USensorSystem, "Sensors0");
	ADDSYSTEM(UShipSystem::ESystem::DamageControl, UDamageControlSystem, "Damage0");
	ADDSYSTEM(UShipSystem::ESystem::Communications, UCommunicationSystem, "Comms0");
	ADDSYSTEM(UShipSystem::ESystem::ViewScreen, UViewscreenSystem, "View0");

	// Set handling parameters
	ThrusterAcceleration = 500.f;
	MaxThrusterSpeed = 4000.f;
	MaxTurnSpeed = 50.f;

	LocalVelocity = FVector(500.f, 0.f, 0.f);
	AngularVelocity = FRotator(0.f, 0.f, 0.f);
}

void AMakeItSoPawn::Restart()
{
	Super::Restart();

	//GetWorld()->GetFirstPlayerController()->ClientMessage(TEXT("AMakeItSoPawn::Restart"));
}

void AMakeItSoPawn::StartWarpJump(FVector destination)
{
	// TODO: hide ship, disable controls, show warp jumping effect
}

void AMakeItSoPawn::FinishWarpJump(FVector destination)
{
	// TODO: move ship, show ship, enable controls, hide warp jumping effect
}

#ifndef WEB_SERVER_TEST
void AMakeItSoPawn::Tick(float DeltaSeconds)
{
	// apply speed limit
	LocalVelocity = LocalVelocity.GetClampedToMaxSize(MaxThrusterSpeed);

	// add drag
	//LocalVelocity -= LocalVelocity * 0.01f * DeltaSeconds;



	// this shows the input is getting ever more negative, all the time - even when in the menu.
	// it then "resets" when the game starts, or we hit something.
	// it seems to be adding -5, -2, -2 each tick to forward / right / up
	// uh... why is there a PAWN in the main menu?

	//GetWorld()->GetFirstPlayerController()->ClientMessage(FString::Printf(TEXT("Current speed: %f, %f, %f\n"), CurrentForwardSpeed, CurrentRightSpeed, CurrentUpSpeed));

	// Move ship (with sweep so we stop when we collide with things)
	AddActorLocalOffset(LocalVelocity * DeltaSeconds, true);

	// Rotate ship
	AddActorLocalRotation(AngularVelocity * DeltaSeconds);

	// Call any parent class Tick implementation
	Super::Tick(DeltaSeconds);
}

void AMakeItSoPawn::NotifyHit(class UPrimitiveComponent* MyComp, class AActor* Other, class UPrimitiveComponent* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit)
{
	Super::NotifyHit(MyComp, Other, OtherComp, bSelfMoved, HitLocation, HitNormal, NormalImpulse, Hit);

	// Reverse slowly upon collision
	LocalVelocity = -0.05f * LocalVelocity;
}
#endif