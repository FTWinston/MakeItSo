import { ClientSystemStatusEffectInstance, SystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { ShipSystem } from 'src/types/ShipSystem';

export interface TileInfo {
    system: ShipSystem;
    health: number;
    restoration?: number;
    effects: SystemStatusEffectInstance[];
}

export interface TileDisplayInfo extends Omit<TileInfo, 'effects'> {
    effects: ClientSystemStatusEffectInstance[];
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
