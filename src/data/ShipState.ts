import { System } from './System';
import { EngineeringCardData } from './EngineeringCard';
import { SystemState } from './SystemState';
import { Progression } from './Progression';

export interface ShipState {
    clientsBySystem: Partial<Record<System, string>>;
    systemsByClient: Partial<Record<string, System>>;

    systemInfo: Record<System, SystemState>;

    power: {
        systemOrder: System[];
        hand: EngineeringCardData[];
        draftChoices: Array<EngineeringCardData[]>;
        nextCardId: number;
        cardGeneration?: Progression;
    };
}
