import { ClientSystemStatusEffectInstance, SystemStatusEffectInstance } from '../../../types/SystemStatusEffect';
import { ShipSystem } from 'src/types/ShipSystem';

export interface TileInfo {
    system: ShipSystem;
    health: number;
    effects: SystemStatusEffectInstance[];
}

export interface TileDisplayInfo extends Omit<TileInfo, 'effects'> {
    effects: ClientSystemStatusEffectInstance[];
}

export interface LogEvent {
    identifier: string;
    parameters: Record<string, string>;
}

export interface SystemInfo extends TileDisplayInfo {
    eventLog: LogEvent[];
}