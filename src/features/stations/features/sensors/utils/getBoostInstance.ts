import { BoostType } from '../features/hexcells';
import { ScanBoost, SensorBoostPowerSlot } from '../types/ScanBoost';

export function getBoostInstance(type: BoostType): ScanBoost {
    // TODO: this! Maintain a list of each boost's state, probably.
    return {
        type,
        minimumSlot: SensorBoostPowerSlot.First,
    } as ScanBoost;
}