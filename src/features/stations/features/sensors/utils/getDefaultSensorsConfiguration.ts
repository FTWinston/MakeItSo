import { BoostType } from '../features/hexcells';
import { SensorsConfiguration } from '../types/SensorsConfiguration';

export function getDefaultSensorsConfiguration(): SensorsConfiguration {
    return {
        activeBoosts: [BoostType.Hint, BoostType.EnhanceClue, BoostType.RadiusClue],
        inactiveBoosts: [],
    };
}