#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "PowerSystem.Generated.h"

#define DAMAGE_GRID_WIDTH 15
#define DAMAGE_GRID_HEIGHT 15

UCLASS()
class MAKEITSO_API UPowerSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EPowerCellType {
		Cell_Empty = 0,
		Cell_Broken,
		Cell_ExhaustPort,
		Cell_NorthSouth,
		Cell_EastWest,
		Cell_NorthEast,
		Cell_SouthEast,
		Cell_SouthWest,
		Cell_NorthWest,
		Cell_NorthEastSouth,
		Cell_EastSouthWest,
		Cell_SouthWestNorth,
		Cell_WestNorthEast,
		Cell_NorthEastSouthWest,
	};

	enum EPowerSystem {
		Power_Engines = 0,
		Power_Sensors,
		Power_Weapons,
		Power_Shields,
		Power_DamageControl,
		Power_Deflector,
		MAX_POWER_SYSTEMS
	};

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::PowerManagement; }
	EPowerCellType Rotate(EPowerCellType cell);

private:
	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_ReactorPower)
	uint8 reactorPower;

	UFUNCTION()
	void OnReplicated_ReactorPower(uint8 beforeChange);

	void Client_SendReactorPower();


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SystemsOnline)
	TArray<bool> systemsOnline;

	void OnReplicated_SystemsOnline(TArray<bool> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendSystemState(EPowerSystem system, bool state);
#ifdef WEB_SERVER_TEST
	void SendSystemState_Implementation(EPowerSystem system, bool state);
#endif

	UFUNCTION(Client, Reliable)
	void SendAllSystems();
#ifdef WEB_SERVER_TEST
	void SendAllSystems_Implementation();
#endif


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_Cells)
	TArray<EPowerCellType> cells;

	void OnReplicated_Cells(TArray<EPowerCellType> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendCell(uint8 cell, EPowerCellType cellType);
#ifdef WEB_SERVER_TEST
	void SendCell_Implementation(uint8 cell, EPowerCellType cellType);
#endif

	UFUNCTION(Client, Reliable)
	void SendAllCells();
#ifdef WEB_SERVER_TEST
	void SendAllCells_Implementation();
#endif


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SpareCells)
	TArray<EPowerCellType> spareCells;

	void OnReplicated_SpareCells(TArray<EPowerCellType> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendAllSpares();
#ifdef WEB_SERVER_TEST
	void SendAllSpares_Implementation();
#endif
};
