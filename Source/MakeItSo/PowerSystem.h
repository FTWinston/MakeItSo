#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "PowerSystem.Generated.h"

#define POWER_GRID_WIDTH 15
#define POWER_GRID_HEIGHT 15
#define POWER_GRID_SIZE POWER_GRID_WIDTH * POWER_GRID_HEIGHT

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
	
	UPowerSystem();
	virtual void ResetData() override;

	virtual bool ReceiveCrewMessage(UIConnectionInfo *info, websocket_message *msg) override;
	virtual void SendAllData_Implementation() override;

	UFUNCTION(Server, Reliable)
	void RotateCell(uint8 cellID);
#ifdef WEB_SERVER_TEST
	void RotateCell_Implementation(uint8 cellID);
#endif

	UFUNCTION(Server, Reliable)
	void PlaceCell(uint8 cellID, uint8 spareCellNum);
#ifdef WEB_SERVER_TEST
	void PlaceCell_Implementation(uint8 cellID, uint8 spareCellNum);
#endif

	UFUNCTION(Server, Reliable)
	void ToggleSystem(EPowerSystem system);
#ifdef WEB_SERVER_TEST
	void ToggleSystem_Implementation(EPowerSystem system);
#endif

protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::PowerManagement; }
	EPowerCellType GetRotatedCellType(EPowerCellType cell);

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
