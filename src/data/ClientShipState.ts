import { System } from './System';
import { PowerLevel } from './PowerLevel';
import { EngineeringCardInfo } from './EngineeringCard';
import { SystemStatusEffectInfo } from './SystemStatusEffect';

export interface ClientShipState {
    clientsBySystem: Partial<Record<System, string>>;
    powerLevels: Record<System, PowerLevel>;

    power: {
        systemOrder: System[];
        effects: Record<System, SystemStatusEffectInfo[]>;
        hand: EngineeringCardInfo[];
        draftChoices: Array<EngineeringCardInfo[]>;
    };
}