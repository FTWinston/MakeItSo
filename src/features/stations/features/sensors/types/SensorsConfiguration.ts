import { ScanBoostType } from './ScanBoost';

export interface SensorsConfiguration {
    activeBoosts: ScanBoostType[];
    inactiveBoosts: ScanBoostType[];
}