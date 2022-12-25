import { SystemInfo } from 'src/features/engineering';

export type PowerLevel = 0 | 1 | 2 | 3 | 4;

export interface SystemState extends SystemInfo {
    power: PowerLevel;
    unconstrainedPower: number;
}