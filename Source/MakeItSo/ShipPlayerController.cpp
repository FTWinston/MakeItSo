#include "ShipPlayerController.h"
#include "CrewManager.h"
#include "MakeItSoPawn.h"
#include "UnrealNetwork.h"
#include "WarpSystem.h"

void AShipPlayerController::InitInputSystem()
{
	Super::InitInputSystem();

	if (GEngine == nullptr || GEngine->GetNetMode(GetWorld()) == NM_DedicatedServer)
		return; // no crew manager on the server, please

	if (!UCrewManager::Instance)
	{
		UCrewManager::Instance = NewObject<UCrewManager>(GetTransientPackage(), NAME_None, RF_Standalone | RF_MarkAsRootSet);
		UCrewManager::Instance->Init(this);
	}
	else
		UCrewManager::Instance->LinkController(this);

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

		if (!bGamePaused)
			UCrewManager::Instance->TickSystems(DeltaTime);
	}
}


void AShipPlayerController::GetLifetimeReplicatedProps(TArray<FLifetimeProperty> &OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(AShipPlayerController, currentJumpCalculation);
	DOREPLIFETIME(AShipPlayerController, calculatedJumps);
}

bool AShipPlayerController::StartJumpCalculation_Validate(FVector startPos, FRotator direction, float power)
{
	if (power <= 0 || power > 100)
		return false;

	return true;
}

void AShipPlayerController::StartJumpCalculation_Implementation(FVector startPos, FRotator direction, float power)
{
	// TODO: create a JumpCalculation object, reference it as currentJumpCalculation

	// every tick (or whatever interval), calculate another step for it

	// call JumpCalculationStep with the updated "end" point
}

void AShipPlayerController::JumpCalculationStep_Implementation(FVector newPoint)
{
	if (UCrewManager::Instance)
	{
		auto warpSystem = Cast<UWarpSystem>(UCrewManager::Instance->GetSystem(UCrewManager::ESystem::Warp));
		warpSystem->AddCalculationStep(newPoint);
	}
}

void AShipPlayerController::FinishJumpCalculation_Implementation(FVector endPoint, bool isSafe)
{
	if (UCrewManager::Instance)
	{
		auto warpSystem = Cast<UWarpSystem>(UCrewManager::Instance->GetSystem(UCrewManager::ESystem::Warp));
		warpSystem->FinishCalculation(endPoint, isSafe);
	}
}

bool AShipPlayerController::PerformWarpJump_Validate(int32 jumpID)
{
	return calculatedJumps.Contains(jumpID);
}

void AShipPlayerController::PerformWarpJump_Implementation(int32 jumpID)
{
	// TODO: actually perform jump
}