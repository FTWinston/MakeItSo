import { System } from './System';
import { PowerLevel } from './PowerLevel';
import { PowerCardData } from './PowerCard';
import { PowerEffectData } from './PowerEffect';

export interface ShipState {
    systemOccupancy: Partial<Record<System, string>>;
    powerLevels: Record<System, PowerLevel>;

    power: {
        systemOrder: System[];
        effects: Record<System, PowerEffectData[]>;
        hand: PowerCardData[];
        draftChoices: Array<PowerCardData[]>;
    };
}