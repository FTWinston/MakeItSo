// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.
#pragma once
#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#endif

#include "ShipSystem.h"
#include "MakeItSoPawn.generated.h"

#ifdef WEB_SERVER_TEST
class APawn {
public:
	virtual void Restart() {};
	FVector GetActorLocation() { return location; }
	void SetActorLocation(FVector loc) { location = loc; }
private:
	FVector location = FVector::ZeroVector;
};
class UStaticMeshComponent { };
class USpringArmComponent { };
class UCameraComponent { };
#endif

class UWarpJump;

UCLASS(Config=Game)
class AMakeItSoPawn : public APawn
{
	GENERATED_BODY()

	/** StaticMesh component that will be the visuals for our flying pawn */
	UPROPERTY(Category = Mesh, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
	class UStaticMeshComponent* ShipMesh;

	/** Spring arm that will offset the camera */
	UPROPERTY(Category = Camera, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
	class USpringArmComponent* SpringArm;

	/** Camera component that will be our viewpoint */
	UPROPERTY(Category = Camera, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
	class UCameraComponent* Camera;

public:
	AMakeItSoPawn();
#ifndef WEB_SERVER_TEST
	// Begin AActor overrides
	virtual void Tick(float DeltaSeconds) override;
	virtual void NotifyHit(class UPrimitiveComponent* MyComp, class AActor* Other, class UPrimitiveComponent* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit) override;
	// End AActor overrides
#endif

	float GetThrusterAcceleration() { return ThrusterAcceleration; }
	float GetMaxThrusterSpeed() { return MaxThrusterSpeed; }
	float GetMaxTurnSpeed() { return MaxTurnSpeed; }

	TMap<UShipSystem::ESystem, UShipSystem*> systems;

	void StartWarpJump(UWarpJump* jump);
	void FinishWarpJump(UWarpJump* jump);

protected:
	void Restart() override;

private:

	/** How quickly forward speed changes */
	UPROPERTY(Category = Ship, EditAnywhere)
	float ThrusterAcceleration;

	/** Max forward speed */
	UPROPERTY(Category = Ship, EditAnywhere)
	float MaxThrusterSpeed;

	/** How quickly pawn can steer */
	UPROPERTY(Category = Ship, EditAnywhere)
	float MaxTurnSpeed;

#ifdef WEB_SERVER_TEST
	FRotator actorRotation;
#endif

public:
#ifndef WEB_SERVER_TEST
	/** Returns ShipMesh subobject **/
	FORCEINLINE class UStaticMeshComponent* GetShipMesh() const { return ShipMesh; }
	/** Returns SpringArm subobject **/
	FORCEINLINE class USpringArmComponent* GetSpringArm() const { return SpringArm; }
	/** Returns Camera subobject **/
	FORCEINLINE class UCameraComponent* GetCamera() const { return Camera; }
#endif
	
	/** Current translational velocity, in local coordinates */
	FVector LocalVelocity;

	/** Current rotation speed about each axis */
	FRotator AngularVelocity;

#ifdef WEB_SERVER_TEST
	FRotator GetActorRotation() { return actorRotation; }
	void AddActorLocalRotation(FRotator rotation) { actorRotation = actorRotation + rotation; }
#endif
};