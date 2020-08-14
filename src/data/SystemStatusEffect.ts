import { SystemState } from './SystemState';

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
    apply: (system: SystemState) => void;
    remove: (system: SystemState) => void;
}

export interface SystemStatusEffectInstance extends SystemStatusEffectData {
    removeTime: number;
}