import { System } from './System';
import { PowerLevel } from './PowerLevel';
import { PowerCardInfo } from './PowerCard';
import { PowerEffectInfo } from './PowerEffect';

export interface ClientShipState {
    systemOccupancy: Partial<Record<System, string>>;
    powerLevels: Record<System, PowerLevel>;

    power: {
        systemOrder: System[];
        effects: Record<System, PowerEffectInfo[]>;
        hand: PowerCardInfo[];
        draftChoices: Array<PowerCardInfo[]>;
    };
}