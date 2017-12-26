// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
#pragma once
#include "MakeItSoPawn.generated.h"

#ifndef WEB_SERVER_TEST
#include "GameFramework/Pawn.h"
#endif

#ifdef WEB_SERVER_TEST
class APawn { };
#endif

UCLASS(config=Game)
class AMakeItSoPawn : public APawn
{
	GENERATED_BODY()

#ifndef WEB_SERVER_TEST

	/** StaticMesh component that will be the visuals for our flying pawn */
	UPROPERTY(Category = Mesh, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
	class UStaticMeshComponent* ShipMesh;

	/** Spring arm that will offset the camera */
	UPROPERTY(Category = Camera, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
	class USpringArmComponent* SpringArm;

	/** Camera component that will be our viewpoint */
	UPROPERTY(Category = Camera, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
	class UCameraComponent* Camera;
#endif
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

private:

#ifndef WEB_SERVER_TEST
	/** How quickly forward speed changes */
	UPROPERTY(Category = Plane, EditAnywhere)
#endif
	float ThrusterAcceleration;

#ifndef WEB_SERVER_TEST
	/** Max forward speed */
	UPROPERTY(Category = Pitch, EditAnywhere)
#endif
	float MaxThrusterSpeed;

#ifndef WEB_SERVER_TEST
	/** How quickly pawn can steer */
	UPROPERTY(Category = Plane, EditAnywhere)
#endif
	float MaxTurnSpeed;

#ifdef WEB_SERVER_TEST
	FRotator actorRotation;
#endif

	/** Current translational velocity, in local coordinates */
	FVector LocalVelocity;

	/** Current rotation speed about each axis */
	FRotator RotationSpeed;

public:
#ifndef WEB_SERVER_TEST
	/** Returns ShipMesh subobject **/
	FORCEINLINE class UStaticMeshComponent* GetShipMesh() const { return ShipMesh; }
	/** Returns SpringArm subobject **/
	FORCEINLINE class USpringArmComponent* GetSpringArm() const { return SpringArm; }
	/** Returns Camera subobject **/
	FORCEINLINE class UCameraComponent* GetCamera() const { return Camera; }
#endif
	FVector GetLocalVelocity();
	void AddLocalVelocity(FVector diff) { LocalVelocity += diff; }

	FRotator GetRotationSpeed() { return RotationSpeed; }
#ifdef WEB_SERVER_TEST
	FRotator GetActorRotation() { return actorRotation; }
	void AddActorLocalRotation(FRotator rotation) { actorRotation = actorRotation + rotation; }
#endif
	void AddRotation(FRotator value) { RotationSpeed += value; }
};