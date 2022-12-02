import { ComponentProps } from 'react';
import { ShipSystem } from 'src/types/ShipSystem';
import { TimeSpan } from 'src/types/TimeSpan';
import type { Engineering } from '../components/Engineering';
import { EngineeringCardInfo } from '../features/Cards';
import { LogEvent, SystemInfo } from '../features/SystemTiles';
import { ClientSystemStatusEffectInstance } from './SystemStatusEffect';

export type EngineeringState = Omit<ComponentProps<typeof Engineering>, 'chooseCard' | 'playCard'>;

export type EngineeringAction = {
    type: 'reset';
    handCards: EngineeringCardInfo[];
    choiceCards: EngineeringCardInfo[];
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
    type: 'effect';
    system: ShipSystem;
    healthChange?: number;
    addEffects?: ClientSystemStatusEffectInstance[];
    events?: LogEvent[];
} | {
    type: 'cleanup';
    currentTime: number;
}