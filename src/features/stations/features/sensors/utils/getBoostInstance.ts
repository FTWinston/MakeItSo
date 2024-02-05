import { SensorBoost, SensorBoostPowerSlot, SensorBoostType } from '../types/SensorBoost';

export function getBoostInstance(type: SensorBoostType): SensorBoost {
    // TODO: this! Maintain a list of each boost's state, probably.
    return {
        type,
        minimumSlot: SensorBoostPowerSlot.First,
    } as SensorBoost;
}