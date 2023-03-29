import { SystemInfo } from 'src/features/stations';

export const maxSystemHealth = 100;

export interface SystemState extends SystemInfo {
    shieldScale: number;
    unconstrainedPower: number;
    powerLevelChanged: boolean;
    nextEventId: number;
}