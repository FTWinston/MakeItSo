#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "PowerSystem.Generated.h"

#define POWER_GRID_WIDTH 15
#define POWER_GRID_SEND_HEIGHT 15
#define POWER_GRID_SERVER_HEIGHT (POWER_GRID_SEND_HEIGHT + 2)
#define POWER_GRID_SEND_SIZE POWER_GRID_WIDTH * POWER_GRID_SEND_HEIGHT
#define POWER_GRID_SERVER_SIZE POWER_GRID_WIDTH * POWER_GRID_SERVER_HEIGHT

class PowerCell;

UCLASS()
class MAKEITSO_API UPowerSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EPowerCellType {
		Cell_Empty = 0,
		Cell_Reactor,
		Cell_System,
		Cell_ExhaustPort,
		Cell_Broken,
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
	
	enum EPowerDirection {
		Dir_None = 0,
		Dir_North = 1,
		Dir_South = 2,
		Dir_East = 4,
		Dir_West = 8,
	};

	UPowerSystem();
	virtual void BeginPlay() override;
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

private:
	void DistributePower();

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


	UPROPERTY()
	TArray<PowerCell> cells; // the cell objects exist only on the server, and "two dumb arrays" are networked to the client

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CellTypes)
	TArray<EPowerCellType> cellTypes;

	void OnReplicated_CellTypes(TArray<EPowerCellType> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendCellType(uint8 cell, EPowerCellType cellType);
#ifdef WEB_SERVER_TEST
	void SendCellType_Implementation(uint8 cell, EPowerCellType cellType);
#endif

	UFUNCTION(Client, Reliable)
	void SendAllCellTypes();
#ifdef WEB_SERVER_TEST
	void SendAllCellTypes_Implementation();
#endif


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_CellPower)
	TArray<int8> cellPower;

	void OnReplicated_CellPower(TArray<int8> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendCellPower(uint8 cell, int8 power);
#ifdef WEB_SERVER_TEST
	void SendCellPower_Implementation(uint8 cell, int8 power);
#endif

	UFUNCTION(Client, Reliable)
	void SendAllCellPower();
#ifdef WEB_SERVER_TEST
	void SendAllCellPower_Implementation();
#endif


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SpareCells)
	TArray<EPowerCellType> spareCells;

	void OnReplicated_SpareCells(TArray<EPowerCellType> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendAllSpares();
#ifdef WEB_SERVER_TEST
	void SendAllSpares_Implementation();
#endif

	bool recalculatingCellPower;
	friend class PowerCell;
};

inline UPowerSystem::EPowerDirection operator|(UPowerSystem::EPowerDirection a, UPowerSystem::EPowerDirection b)
{
	return static_cast<UPowerSystem::EPowerDirection>(static_cast<uint8>(a) | static_cast<uint8>(b));
}

inline UPowerSystem::EPowerDirection operator|=(UPowerSystem::EPowerDirection a, UPowerSystem::EPowerDirection b)
{
	return static_cast<UPowerSystem::EPowerDirection>(static_cast<uint8>(a) | static_cast<uint8>(b));
}



class PowerCell
{
public:
	void SetType(UPowerSystem::EPowerCellType type);
	UPowerSystem::EPowerCellType GetType() { return type; }

	UPowerSystem* system;
	int32 cellIndex;
	uint8 powerLevel;
	UPowerSystem::EPowerDirection powerArrivesFrom;

	void SetNeighbour(UPowerSystem::EPowerDirection dir, PowerCell *neighbour);
	
	void RotateCellType();
	PowerCell *GetOutputConnection(UPowerSystem::EPowerDirection dir);
private:
	UPowerSystem::EPowerDirection GetConnectedDirections();
	UPowerSystem::EPowerDirection GetOppositeDirection(UPowerSystem::EPowerDirection cell);

	UPowerSystem::EPowerCellType type;

	TMap<UPowerSystem::EPowerDirection, PowerCell*> neighbours;
};