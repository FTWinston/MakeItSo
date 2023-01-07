import { SystemInfo } from 'src/features/engineering';

export interface SystemState extends SystemInfo {
    unconstrainedPower: number;
    powerLevelChanged: boolean;
}