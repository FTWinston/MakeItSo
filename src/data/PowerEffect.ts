import { ShipState } from './ShipState';
import { System } from './System';

export enum PowerEffectType {
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

export interface PowerEffectInfo {
    type: PowerEffectType;
    duration: number;
    positive: boolean;
}

export interface PowerEffectData extends PowerEffectInfo {
    apply: (ship: ShipState, system: System) => void;
    remove: (ship: ShipState, system: System) => void;
}
