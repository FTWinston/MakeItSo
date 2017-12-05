export enum ShipSystem {
    Helm = 1,
    Warp = 2,
    Weapons = 4,
    Sensors = 8,
    PowerManagement = 16,
    DamageControl = 32,
    ViewScreen = 64,
    Communications = 128,
}

export const allSystems = [
    ShipSystem.Helm,
    ShipSystem.Warp,
    ShipSystem.Weapons,
    ShipSystem.Sensors,
    ShipSystem.PowerManagement,
    ShipSystem.DamageControl,
    ShipSystem.Communications,
    ShipSystem.ViewScreen,
];