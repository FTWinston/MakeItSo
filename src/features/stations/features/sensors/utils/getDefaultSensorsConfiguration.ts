import { ScanBoostType } from '../types/ScanBoost';
import { SensorsConfiguration } from '../types/SensorsConfiguration';

export function getDefaultSensorsConfiguration(): SensorsConfiguration {
    return {
        activeBoosts: [ScanBoostType.Hint, ScanBoostType.EnhanceClue, ScanBoostType.RadiusClue],
        inactiveBoosts: [],
    };
}