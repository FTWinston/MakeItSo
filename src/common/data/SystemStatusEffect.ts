import { SystemState } from '../data/server/SystemState';
import { Progression } from './Progression';

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

    Swap,
    Offline,
    HotSwap,
    Supercharge,
}

interface SystemStatusEffectInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface SystemStatusEffectData extends SystemStatusEffectInfo {
    apply: (system: SystemState) => void;
    remove: (system: SystemState, forced: boolean) => void;
}

export type SystemStatusEffectInstance = Omit<SystemStatusEffectData, 'duration'> & Progression;

export type ClientSystemStatusEffectInstance = Omit<SystemStatusEffectInfo, 'duration'> & Progression;