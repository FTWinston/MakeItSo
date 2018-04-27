#pragma once

#ifndef WEB_SERVER_TEST
#include "CoreMinimal.h"
#endif

#include "ShipSystem.h"
#include "PowerSystem.Generated.h"

#define POWER_GRID_WIDTH 11
#define POWER_GRID_HEIGHT 11
#define POWER_GRID_SIZE POWER_GRID_WIDTH * POWER_GRID_HEIGHT

class PowerCell;
class PowerSystemOutput;

UCLASS()
class MAKEITSO_API UPowerSystem : public UShipSystem
{
	GENERATED_BODY()

public:
	enum EPowerCellType {
		Cell_Empty = 0,
		Cell_Reactor,
		Cell_System,
		Cell_Broken,
		Cell_Radiator,
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
		Power_None = -1,
		Power_Reactor = 0,
		Power_Helm,
		Power_Warp,
		Power_BeamWeapons,
		Power_Torpedoes,
		Power_Sensors,
		Power_Shields,
		Power_DamageControl,
		Power_Comms,
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
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

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

	virtual void SetPowerLevel_Implementation(uint8 newLevel) override;

	static UPowerSystem::EPowerDirection GetOppositeDirection(EPowerDirection cell);
protected:
	virtual UShipSystem::ESystem GetSystem() override { return UShipSystem::ESystem::PowerManagement; }

	virtual void ApplySystemDamage(uint8 prevValue, uint8 newValue) override;
	virtual void RepairSystemDamage(uint8 prevValue, uint8 newValue) override;

	UFUNCTION(Server, Reliable)
	void JogReactorPowerOutput();
#ifdef WEB_SERVER_TEST
	void JogReactorPowerOutput_Implementation();
#endif

private:
	void DistributePower();
	EPowerCellType GetRandomCellType();
	uint8 GetDamageCellCountForDamage(uint8 minHealth, uint8 maxHealth);


	UPROPERTY()
	TArray<PowerCell*> cells; // the cell objects exist only on the server, and "two dumb arrays" are networked to the client
	TArray<PowerCell*> damagedCells;
	TArray<PowerCell*> undamagedCells;

	UPROPERTY()
	TArray<PowerSystemOutput*> systems;

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
	TArray<uint8> cellPower;

	void OnReplicated_CellPower(TArray<uint8> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendCellPower(uint8 cell, uint8 power);
#ifdef WEB_SERVER_TEST
	void SendCellPower_Implementation(uint8 cell, uint8 power);
#endif

	UFUNCTION(Client, Reliable)
	void SendAllCellPower();
#ifdef WEB_SERVER_TEST
	void SendAllCellPower_Implementation();
#endif

	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SystemLayout)
	TArray<uint8> systemLayout;

	void OnReplicated_SystemLayout(TArray<uint8> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendAllSystems();
#ifdef WEB_SERVER_TEST
	void SendAllSystems_Implementation();
#endif


	void DetermineOverheatRate(uint8 numPoweredRadiators, uint8 numOutputs);


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_OverheatRate)
	int8 overheatRate;

	void OnReplicated_OverheatRate(uint8 beforeChange);


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_OverheatValue)
	uint8 overheatValue;

	void OnReplicated_OverheatValue(uint8 beforeChange);


	UFUNCTION(Client, Reliable)
	void SendOverheat();
#ifdef WEB_SERVER_TEST
	void SendOverheat_Implementation();
#endif


	UPROPERTY(Replicated, ReplicatedUsing = OnReplicated_SpareCells)
	TArray<EPowerCellType> spareCells;

	void OnReplicated_SpareCells(TArray<EPowerCellType> beforeChange);

	UFUNCTION(Client, Reliable)
	void SendAllSpares();
#ifdef WEB_SERVER_TEST
	void SendAllSpares_Implementation();
#endif


	UShipSystem *LookupSystem(EPowerSystem system);

	friend class PowerCell;
	friend class PowerSystem;
	static TMap<int32, EPowerCellType> initialCells;
};

inline UPowerSystem::EPowerDirection operator|(UPowerSystem::EPowerDirection a, UPowerSystem::EPowerDirection b)
{
	return static_cast<UPowerSystem::EPowerDirection>(static_cast<uint8>(a) | static_cast<uint8>(b));
}

inline UPowerSystem::EPowerCellType operator|(UPowerSystem::EPowerCellType a, UPowerSystem::EPowerCellType b)
{
	return static_cast<UPowerSystem::EPowerCellType>(static_cast<uint8>(a) | static_cast<uint8>(b));
}

class PowerCell
{
public:
	void SetType(UPowerSystem::EPowerCellType type);
	UPowerSystem::EPowerCellType GetType() { return type; }

	UPowerSystem* system;
	uint16 cellIndex;
	uint16 powerLevel;
	UPowerSystem::EPowerDirection powerArrivesFrom;

	TMap<UPowerSystem::EPowerDirection, PowerCell*> neighbours;
	
	void RotateCellType();
	PowerCell *GetOutputConnection(UPowerSystem::EPowerDirection dir);
	bool alreadyOutputPower;

	uint8 GetVisualPowerLevel();
private:
	UPowerSystem::EPowerDirection GetConnectedDirections();

	UPowerSystem::EPowerCellType type;
};

class PowerSystemOutput
{
public:
	PowerSystemOutput(uint8 index, uint8 x, uint8 y, uint8 w, uint8 h, UPowerSystem::EPowerSystem system, TArray<PowerCell*> allCells);

	uint8 sysIndex, firstCell, lastCell;
	UPowerSystem::EPowerSystem system;

	virtual uint16 GetPowerLevel();

	TArray<PowerCell*> cells;
};

class PowerReactor : public PowerSystemOutput
{
public:
	PowerReactor(uint8 index, uint8 x, uint8 y, uint8 w, uint8 h, TArray<PowerCell*> allCells, UPowerSystem *system);
	uint16 GetPowerLevel() override;
private:
	UPowerSystem * powerSystem;
};