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
}

// The "Info" types represent stripped-down versions of the "full" types, for use client-side.
interface EffectBehaviorInfo {
    type: SystemStatusEffectType;
    duration: number;
    positive: boolean;
}

export interface EffectBehavior extends EffectBehaviorInfo {
    apply: (system: SystemState, ship: ShipState) => void;
    remove: (system: SystemState, ship: ShipState, forced: boolean) => void;
    tick?: (system: SystemState, ship: ShipState) => void;
}

type Primary = 'primary';
type Secondary = 'secondary'

interface LinkedEffectInfo {
    effectType: SystemStatusEffectType;
}

type PrimaryEffectInfo = {
    link: Primary;
};

type SecondaryEffectInfo = {
    link: Secondary;
    primaryEffect: LinkedEffectInfo;
}

type BaseStatusEffectInfo = Omit<EffectBehaviorInfo, 'duration'> & TimeSpan & {
    id: number;
};

type SecondaryStatusEffectInfo = BaseStatusEffectInfo & SecondaryEffectInfo;

type PrimaryStatusEffectInfo = BaseStatusEffectInfo & PrimaryEffectInfo;

export type SystemStatusEffectInfo = BaseStatusEffectInfo | PrimaryStatusEffectInfo | SecondaryStatusEffectInfo;

export type BaseStatusEffect = Omit<EffectBehavior, 'duration'> & TimeSpan & {
    id: number;
};

export interface TickingStatusEffect extends BaseStatusEffect {
    tick: (system: SystemState, ship: ShipState) => void;
    nextTick: number;
}

export interface LinkedEffect extends LinkedEffectInfo {
    effectId: number;
    system: ShipSystem;
}

export interface PrimaryEffectLink {
    link: Primary;
    secondaryEffects: LinkedEffect[];
};

export interface SecondaryEffectLink {
    link: Secondary;
    primaryEffect: LinkedEffect;
    canRemove: boolean;
}

export type SecondaryStatusEffect = BaseStatusEffect & SecondaryEffectLink;

export type PrimaryStatusEffect = BaseStatusEffect & PrimaryEffectLink;

export type SystemStatusEffect = BaseStatusEffect | TickingStatusEffect | PrimaryStatusEffect | SecondaryStatusEffect;
