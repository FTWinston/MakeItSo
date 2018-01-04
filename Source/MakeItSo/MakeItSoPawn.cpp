// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

#ifndef WEB_SERVER_TEST
#include "MakeItSo.h"
#else
#include "stdafx.h"
#endif

#include "MakeItSoPawn.h"

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
	ShipMesh->SetStaticMesh(ConstructorStatics.ShipMesh.Get());
	RootComponent = ShipMesh;

	// Create a spring arm component
	SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm0"));
	SpringArm->AttachTo(RootComponent);
	SpringArm->TargetArmLength = 160.0f; // The camera follows at this distance behind the character	
	SpringArm->SocketOffset = FVector(0.f,0.f,60.f);
	SpringArm->bEnableCameraLag = false;
	SpringArm->CameraLagSpeed = 15.f;

	// Create camera component 
	Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera0"));
	Camera->AttachTo(SpringArm, USpringArmComponent::SocketName);
	Camera->bUsePawnControlRotation = false; // Don't rotate camera with controller
#endif
	// Set handling parameters
	ThrusterAcceleration = 500.f;
	MaxThrusterSpeed = 4000.f;

	MaxTurnSpeed = 50.f;

	LocalVelocity = FVector(500.f, 0.f, 0.f);
	AngularVelocity = FRotator(0.f, 0.f, 0.f);

#ifdef WEB_SERVER_TEST
	actorRotation = FRotator(0, 0, 0);
#endif
}

#ifndef WEB_SERVER_TEST
void AMakeItSoPawn::Tick(float DeltaSeconds)
{
	// apply speed limit
	LocalVelocity = LocalVelocity.GetClampedToMaxSize(MaxThrusterSpeed);

	// add drag
	LocalVelocity -= LocalVelocity * 0.01f * DeltaSeconds;



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