// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
#pragma once
#include "GameFramework/Pawn.h"
#include "MakeItSoPawn.generated.h"

UCLASS(config=Game)
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

	// Begin AActor overrides
	virtual void Tick(float DeltaSeconds) override;
	virtual void NotifyHit(class UPrimitiveComponent* MyComp, class AActor* Other, class UPrimitiveComponent* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit) override;
	// End AActor overrides

	float GetThrusterAcceleration() { return ThrusterAcceleration; }
	float GetMaxThrusterSpeed() { return MaxThrusterSpeed; }
	float GetMaxTurnSpeed() { return MaxTurnSpeed; }

private:

	/** How quickly forward speed changes */
	UPROPERTY(Category = Plane, EditAnywhere)
	float ThrusterAcceleration;

	/** Max forward speed */
	UPROPERTY(Category = Pitch, EditAnywhere)
	float MaxThrusterSpeed;

	/** How quickly pawn can steer */
	UPROPERTY(Category = Plane, EditAnywhere)
	float MaxTurnSpeed;

	/** Current translational velocity, in local coordinates */
	FVector LocalVelocity;

	/** Current rotation speed about each axis */
	FRotator RotationSpeed;

public:
	/** Returns ShipMesh subobject **/
	FORCEINLINE class UStaticMeshComponent* GetShipMesh() const { return ShipMesh; }
	/** Returns SpringArm subobject **/
	FORCEINLINE class USpringArmComponent* GetSpringArm() const { return SpringArm; }
	/** Returns Camera subobject **/
	FORCEINLINE class UCameraComponent* GetCamera() const { return Camera; }

	FVector GetLocalVelocity();
	void AddLocalVelocity(FVector diff) { LocalVelocity += diff; }

	FRotator GetRotationSpeed() { return RotationSpeed; }
	void AddRotation(FRotator value) { RotationSpeed += value; }
};
