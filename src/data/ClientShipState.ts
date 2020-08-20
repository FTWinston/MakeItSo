import { System } from './System';
import { EngineeringCardInfo } from './EngineeringCard';
import { ClientSystemState } from './ClientSystemState';
import { Progression } from './Progression';
import { ClientVessel } from './ClientVessel';

export interface ClientShipState extends ClientVessel {
    clientsBySystem: Partial<Record<System, string>>;

    systemInfo: Record<System, ClientSystemState>;

    engineering: {
        systemOrder: System[];
        hand: EngineeringCardInfo[];
        draftChoices: Array<EngineeringCardInfo[]>;
        cardGeneration?: Progression;
    };
}