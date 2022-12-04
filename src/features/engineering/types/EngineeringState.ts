import { ShipSystem } from 'src/types/ShipSystem';
import { TimeSpan } from 'src/types/TimeSpan';
import { EngineeringCard } from '../features/Cards';
import { LogEvent, SystemInfo } from '../features/SystemTiles';
import { ClientSystemStatusEffectInstance } from './SystemStatusEffect';

export interface EngineeringState {
    systems: SystemInfo[];
    handCards: EngineeringCard[];
    choiceCards: EngineeringCard[];
    numChoices: number;
    choiceProgress?: TimeSpan;
}

export type EffectAction = {
    type: 'effect';
    system: ShipSystem;
    healthChange?: number;
    addEffects?: ClientSystemStatusEffectInstance[];
    events?: LogEvent[];
}

export type EngineeringAction = {
    type: 'reset';
    handCards: EngineeringCard[];
    choiceCards: EngineeringCard[];
    numChoices: number;
    systems: SystemInfo[];
    choiceProcess: TimeSpan | undefined;
} | {
    type: 'play';
    cardId: number;
    targetSystem: ShipSystem;
} | {
    type: 'draw';
    cardId: number;
} | {
    type: 'cleanup';
    currentTime: number;
} | EffectAction;