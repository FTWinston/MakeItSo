import { TextLocalisation } from './Localisation';

export enum ShipSystem {
    None = 0,
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

export function getSystemName(system: ShipSystem, text: TextLocalisation) {
    switch (system) {
        case ShipSystem.Helm:
            return text.systemNames.helm;
        case ShipSystem.Warp:
            return text.systemNames.warp;
        case ShipSystem.Weapons:
            return text.systemNames.weapons;
        case ShipSystem.Sensors:
            return text.systemNames.sensors;
        case ShipSystem.PowerManagement:
            return text.systemNames.power;
        case ShipSystem.DamageControl:
            return text.systemNames.damage;
        case ShipSystem.Communications:
            return text.systemNames.comms;
        case ShipSystem.ViewScreen:
            return text.systemNames.view;
        case ShipSystem.None:
            return '';
        default:
            var exhaustiveCheck: never = system;
    }
}