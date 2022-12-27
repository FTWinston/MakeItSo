import { ShipState } from 'src/types/ShipState';
import { SystemState } from 'src/types/SystemState';
import type { TimeSpan } from 'src/types/TimeSpan';

export enum SystemStatusEffectType {
    AuxPower = 'auxPower',
    StoreCharge = 'storing',
    StoredCharge = 'stored',
    Relocating = 'relocate',
    Relocated = 'relocated',



    Boost1 = 'boost1',
    Boost2 = 'boost2',
    Reduce1 = 'reduce1',
    Reduce2 = 'reduce2',
    Overload = 'overload',
    Damage = 'damage',
    Repair = 'repair',
    SwapHorizontal = 'swapH',
    SwapVertical = 'swapV',
    Offline = 'offline',
    HotSwap = 'hotSwap',
    Supercharge = 'superCharge',
}

interface SystemStatusEffectInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface SystemStatusEffect extends SystemStatusEffectInfo {
    apply: (system: SystemState, ship: ShipState) => void;
    remove: (system: SystemState, ship: ShipState, forced: boolean) => void;
}

export type SystemStatusEffectInstance = Omit<SystemStatusEffect, 'duration'> & TimeSpan;

export type ClientSystemStatusEffectInstance = Omit<SystemStatusEffectInfo, 'duration'> & TimeSpan;
