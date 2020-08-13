import { System } from './System';
import { PowerLevel } from './PowerLevel';
import { EngineeringCardData } from './EngineeringCard';
import { SystemStatusEffectData } from './SystemStatusEffect';

export interface ShipState {
    clientsBySystem: Partial<Record<System, string>>;
    systemsByClient: Partial<Record<string, System>>;
    powerLevels: Record<System, PowerLevel>;

    power: {
        systemOrder: System[];
        effects: Record<System, SystemStatusEffectData[]>;
        hand: EngineeringCardData[];
        draftChoices: Array<EngineeringCardData[]>;
        nextCardId: number;
    };
}