import { BoostType } from '../features/hexcells';
import { ScanBoost, SensorBoostPowerSlot } from '../types/ScanBoost';

type BoostBehavior = Omit<ScanBoost, 'id' | 'type'>;

const boostBehaviorByIdentifier: Map<BoostType, BoostBehavior> = new Map([
    [BoostType.Hint, {
        minimumSlot: SensorBoostPowerSlot.First,
        chargeDuration: 20,
        descParams: {
            power: 1,
            duration: 60,
        }
    }],
]);

export function createBoost(id: number, type: BoostType): ScanBoost {
    const behavior = boostBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Boost not found: ${type}`);
    }
    
    return {
        id,
        type,
        ...behavior,
    };
}
