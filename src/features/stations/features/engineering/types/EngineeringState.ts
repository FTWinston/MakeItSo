import { ShipSystem } from 'src/types/ShipSystem';
import { TimeSpan } from 'src/types/TimeSpan';
import { EngineeringCard } from '../features/Cards';
import { EngineeringCardType } from '../features/Cards/types/EngineeringCard';
import { SystemStatusEffectType } from './SystemStatusEffect';
import { EngineeringConfiguration } from './EngineeringConfiguration';

export interface EngineeringState {
    configuration: EngineeringConfiguration;
    systemOrder: ShipSystem[];
    handCards: EngineeringCard[];
    maxHandSize: number;
    choiceCards: EngineeringCard[];
    // TODO: draw pile and discard pile. Reshuffle!
    numChoices: number;
    choiceProgress?: TimeSpan;
    nextCardId: number;
    nextEffectId: number;
    lastReactorDamageEffect?: number;
}

export type DamageAction = {
    type: 'damage';
    system: ShipSystem;
    healthChange: number;
}

export type EngineeringAction = {
    type: 'play';
    cardId: number;
    targetSystem: ShipSystem;
    repair: boolean;
} | {
    type: 'draw';
    cardId: number;
} | {
    type: 'add custom card';
    cardType: EngineeringCardType;
} | {
    type: 'add custom effect';
    system: ShipSystem;
    effectType: SystemStatusEffectType;
} | {
    type: 'tick';
    currentTime: number;
} | DamageAction;