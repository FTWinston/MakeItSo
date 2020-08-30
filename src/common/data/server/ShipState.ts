import { System } from '../System';
import { EngineeringCardData } from '../../../systems/engineering/data/EngineeringCard';
import { SystemState } from './SystemState';
import { Progression } from '../Progression';
import { Vessel } from './Vessel';

export interface ShipState extends Vessel {
    clientsBySystem: Partial<Record<System, string>>;
    systemsByClient: Partial<Record<string, System>>;

    systemInfo: Record<System, SystemState>;
    
    engineering: {
        systemOrder: System[];
        hand: EngineeringCardData[];
        draftChoices: Array<EngineeringCardData[]>;
        nextCardId: number;
        cardGeneration?: Progression;
    };
}
