import { SensorBoostType } from '../types/SensorBoost';
import { SensorsConfiguration } from '../types/SensorsConfiguration';

export function getDefaultSensorsConfiguration(): SensorsConfiguration {
    return {
        activeBoosts: [SensorBoostType.Hint, SensorBoostType.EnhanceClue, SensorBoostType.RadiusClue],
        inactiveBoosts: [],
    };
}