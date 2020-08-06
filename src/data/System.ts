export enum System {
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

export function getSystemName(system?: System) {
    switch (system) {
        case System.Helm:
            return 'Helm';
        case System.FTL:
            return 'FTL';
        case System.Weapons:
            return 'Weapons';
        case System.Sensors:
            return 'Sensors';
        case System.Engineering:
            return 'Engineering';
        case System.DamageControl:
            return 'Damage Control';
        default:
            return '';
    }
}