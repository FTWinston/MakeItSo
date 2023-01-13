import { SystemInfo } from 'src/features/engineering';

export const maxSystemHealth = 100;

export interface SystemState extends SystemInfo {
    unconstrainedPower: number;
    powerLevelChanged: boolean;
    nextEventId: number;
}