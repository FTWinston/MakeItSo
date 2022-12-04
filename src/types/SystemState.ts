import { SystemInfo } from 'src/features/engineering';

export interface SystemState extends SystemInfo {
    power: number;
}