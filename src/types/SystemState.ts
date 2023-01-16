import { SystemInfo } from 'src/features/engineering';

export const maxSystemHealth = 100;

export interface SystemState extends SystemInfo {
    shieldScale: number;
    unconstrainedPower: number;
    powerLevelChanged: boolean;
    nextEventId: number;
}