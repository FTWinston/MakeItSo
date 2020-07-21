export enum System {
    None = 0,
    Helm = 1,
    FTL = 2,
    Weapons = 4,
    Sensors = 8,
    Engineering = 16,
    DamageControl = 32,
}

export const allSystems = [
    System.Helm,
    System.FTL,
    System.Weapons,
    System.Sensors,
    System.Engineering,
    System.DamageControl,
];