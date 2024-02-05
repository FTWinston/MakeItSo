import { ScanBoost, SensorBoostPowerSlot, ScanBoostType } from '../types/ScanBoost';

export function getBoostInstance(type: ScanBoostType): ScanBoost {
    // TODO: this! Maintain a list of each boost's state, probably.
    return {
        type,
        minimumSlot: SensorBoostPowerSlot.First,
    } as ScanBoost;
}