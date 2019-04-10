#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "CrewManager.h"
#include "ViewscreenSystem.Generated.h"

UCLASS()
class MAKEITSO_API UViewscreenSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	virtual void ResetData() override;
	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::ViewScreen; }
private:
	void DetermineTargetAngles();

	void SendViewAngles();
	void SendViewZoom();
	void SendChase();
	void SendTarget();


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ViewAngle)
	FRotator viewAngle;
	void OnReplicated_ViewAngle(FRotator beforeChange) { SendViewAngles(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ViewAngle)
	float viewZoom;
	void OnReplicated_ViewZoom(float beforeChange) { SendViewZoom(); }
	
	UPROPERTY(Replicated)
	float viewChaseDist;

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ViewChase)
	bool viewChase;
	void OnReplicated_ViewChase(bool beforeChange) { SendChase(); }

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ViewTargetID)
	uint16 viewTargetID;
	void OnReplicated_ViewTargetID(uint16 beforeChange) { SendTarget(); }

	UPROPERTY(Replicated)
	WEAK_PTR_DECLARE(AActor) viewTarget;


	UFUNCTION(Server, Reliable)
	void AdjustAngle(float pitch, float yaw)
#ifdef WEB_SERVER_TEST
	{ AdjustAngle_Implementation(pitch, yaw); }
	void AdjustAngle_Implementation(float pitch, float yaw);
#endif
	;

	UFUNCTION(Server, Reliable)
	void SetAngle(float pitch, float yaw)
#ifdef WEB_SERVER_TEST
	{ SetAngle_Implementation(pitch, yaw); }
	void SetAngle_Implementation(float pitch, float yaw);
#endif
	;

	UFUNCTION(Server, Reliable)
	void AdjustZoom(bool in)
#ifdef WEB_SERVER_TEST
	{ AdjustZoom_Implementation(in); }
	void AdjustZoom_Implementation(bool in);
#endif
	;

	UFUNCTION(Server, Reliable)
	void SetZoom(float magnification)
#ifdef WEB_SERVER_TEST
	{ SetZoom_Implementation(magnification); }
	void SetZoom_Implementation(float magnification);
#endif
	;

	UFUNCTION(Server, Reliable)
	void SetChase(bool chase)
#ifdef WEB_SERVER_TEST
	{ SetChase_Implementation(chase); }
	void SetChase_Implementation(bool chase);
#endif
	;

	UFUNCTION(Server, Reliable)
	void LockOnTarget(uint16 identifier)
#ifdef WEB_SERVER_TEST
	{ LockOnTarget_Implementation(identifier); }
	void LockOnTarget_Implementation(uint16 identifier);
#endif
	;

	UFUNCTION(Server, Reliable)
	void ClearTarget()
#ifdef WEB_SERVER_TEST
	{ ClearTarget_Implementation(); }
	void ClearTarget_Implementation();
#endif
	;

	UFUNCTION(Server, Reliable)
	void Reset()
#ifdef WEB_SERVER_TEST
	{ Reset_Implementation(); }
	void Reset_Implementation();
#endif
	;
};