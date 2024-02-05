import { SensorBoostType } from './SensorBoost';

export interface SensorsConfiguration {
    activeBoosts: SensorBoostType[];
    inactiveBoosts: SensorBoostType[];
}