import { SystemState } from './SystemState';
import { Countdown } from './Countdown';

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

interface SystemStatusEffectInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface SystemStatusEffectData extends SystemStatusEffectInfo {
    apply: (system: SystemState) => void;
    remove: (system: SystemState) => void;
}

export type SystemStatusEffectInstance = SystemStatusEffectData & Countdown;

export type ClientSystemStatusEffectInstance = SystemStatusEffectInfo & Countdown;