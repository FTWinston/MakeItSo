import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
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
    Boost3 = 'boost3',
    Reduce1 = 'reduce1',
    Reduce2 = 'reduce2',
    Reduce3 = 'reduce3',
    Overcharge = 'overcharge',
    ReactorOverload = 'reactorOverload',
    Reset = 'reset',


    Overload = 'overload',
    Damage = 'damage',
    Repair = 'repair',
    SwapHorizontal = 'swapH',
    SwapVertical = 'swapV',
    Offline = 'offline',
    HotSwap = 'hotSwap',
    Supercharge = 'superCharge',
}

interface EffectBehaviorInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface EffectBehavior extends EffectBehaviorInfo {
    apply: (system: SystemState, ship: ShipState) => void;
    remove: (system: SystemState, ship: ShipState, forced: boolean) => void;
}

export type SystemStatusEffectInfo = Omit<EffectBehaviorInfo, 'duration'> & TimeSpan & {
    id: number;
    link?: 'primary' | 'secondary';
};

export type BaseStatusEffect = Omit<EffectBehavior, 'duration'> & TimeSpan & {
    id: number;
};

export type PrimaryEffectLinkInfo = {
    link: 'primary';
    secondaryEffects: LinkedEffectInfo[];
};

export type SecondaryEffectLinkInfo = {
    link: 'secondary';
}

export type LinkedEffectInfo = {
    effectId: number;
    system: ShipSystem;
}

export type EffectLinkInfo = PrimaryEffectLinkInfo | SecondaryEffectLinkInfo;

export type SecondaryStatusEffect = BaseStatusEffect & SecondaryEffectLinkInfo;

export type PrimaryStatusEffect = BaseStatusEffect & PrimaryEffectLinkInfo;

export type SystemStatusEffect = BaseStatusEffect | PrimaryStatusEffect | SecondaryStatusEffect;
