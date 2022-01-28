import { SystemState } from 'src/types/SystemState';
import type { TimeSpan } from 'src/types/TimeSpan';

export enum SystemStatusEffectType {
    Boost1,
    Boost2,
    Reduce1,
    Reduce2,
    Overload,
    Damage,
    Repair,

    SwapHorizontal,
    SwapVertical,
    Offline,
    HotSwap,
    Supercharge,
}

interface SystemStatusEffectInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface SystemStatusEffect extends SystemStatusEffectInfo {
    apply: (system: SystemState) => void;
    remove: (system: SystemState, forced: boolean) => void;
}

export type SystemStatusEffectInstance = Omit<SystemStatusEffect, 'duration'> & TimeSpan;

export type ClientSystemStatusEffectInstance = Omit<SystemStatusEffectInfo, 'duration'> & TimeSpan;
