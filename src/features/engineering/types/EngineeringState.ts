import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { TimeSpan } from 'src/types/TimeSpan';
import { EngineeringCard } from '../features/Cards';
import { LogEvent } from '../features/SystemTiles';
import { SystemStatusEffectInstance } from './SystemStatusEffect';

export interface EngineeringState {
    systemOrder: ShipSystem[];
    handCards: EngineeringCard[];
    choiceCards: EngineeringCard[];
    numChoices: number;
    choiceProgress?: TimeSpan;
}

export type EffectAction = {
    type: 'effect';
    system: ShipSystem;
    healthChange?: number;
    addEffects?: SystemStatusEffectInstance[];
    events?: LogEvent[];
}

export type EngineeringAction = {
    type: 'reset';
    handCards: EngineeringCard[];
    choiceCards: EngineeringCard[];
    numChoices: number;
    systems: SystemState[];
    choiceProcess: TimeSpan | undefined;
} | {
    type: 'play';
    cardId: number;
    targetSystem: ShipSystem;
} | {
    type: 'draw';
    cardId: number;
} | {
    type: 'tick';
    currentTime: number;
} | EffectAction;