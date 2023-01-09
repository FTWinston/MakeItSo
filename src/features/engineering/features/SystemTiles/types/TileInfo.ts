import { SystemStatusEffectInfo, SystemStatusEffect } from '../../../types/SystemStatusEffect';
import { PowerLevel, ShipSystem } from 'src/types/ShipSystem';

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

export type LogIdentifier = 'play card'
    | 'effect add'
    | 'effect remove complete'
    | 'effect remove early'
    | 'effect remove link'
    | 'effect remove zeroHealth'
    | 'power increase'
    | 'power decrease'
    | 'damage disable'
    | 'heal'
    | 'damage'
    | 'restore finished'
    | 'restore'
    | 'damage restore';

export interface LogEvent {
    id: number;
    identifier: LogIdentifier;
    parameters: Record<string, string | number>;
}

type SystemEvents = {
    eventLog: LogEvent[];
};

export type ClientSystemInfo = TileDisplayInfo & SystemEvents;

export type SystemInfo = TileInfo & SystemEvents;
