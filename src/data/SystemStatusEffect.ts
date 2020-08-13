import { ShipState } from './ShipState';
import { System } from './System';

export enum SystemStatusEffectType {
    Boost1,
    Boost2,
    Boost3,
    Reduce1,
    Reduce2,
    Reduce3,
    Overload,
    Damage,
    Repair,
}

export interface SystemStatusEffectInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface SystemStatusEffectData extends SystemStatusEffectInfo {
    apply: (ship: ShipState, system: System) => void;
    remove: (ship: ShipState, system: System) => void;
}
