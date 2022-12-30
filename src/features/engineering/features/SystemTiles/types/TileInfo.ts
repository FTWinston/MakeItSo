import { SystemStatusEffectInfo, SystemStatusEffect } from '../../../types/SystemStatusEffect';
import { ShipSystem } from 'src/types/ShipSystem';
import type { PowerLevel } from 'src/types/SystemState';

export interface TileInfo {
    system: ShipSystem;
    health: number;
    power: PowerLevel;
    restoration?: number;
    effects: SystemStatusEffect[];
}

export interface TileDisplayInfo extends Omit<TileInfo, 'effects'> {
    effects: SystemStatusEffectInfo[];
}

export interface LogEvent {
    identifier: string;
    parameters: Record<string, string>;
}

type SystemEvents = {
    eventLog: LogEvent[];
};

export type ClientSystemInfo = TileDisplayInfo & SystemEvents;

export type SystemInfo = TileInfo & SystemEvents;
