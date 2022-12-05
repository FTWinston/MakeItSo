export enum ShipSystem {
    Hull = 1,
    Engines = 2,
    Sensors = 4,
    Weapons = 8,
    Reactor = 16,
    Shields = 32,
}

export const allSystems: ShipSystem = ShipSystem.Hull | ShipSystem.Engines | ShipSystem.Sensors | ShipSystem.Weapons | ShipSystem.Reactor | ShipSystem.Shields;

export enum CrewStation {
    Helm = ShipSystem.Engines,
    Sensors = ShipSystem.Sensors,
    Weapons = ShipSystem.Weapons,
    Engineering = ShipSystem.Reactor,
}