import { System } from './System';
import { EngineeringCardInfo } from './EngineeringCard';
import { ClientSystemState } from './ClientSystemState';

export interface ClientShipState {
    clientsBySystem: Partial<Record<System, string>>;

    systemInfo: Record<System, ClientSystemState>;

    power: {
        systemOrder: System[];
        hand: EngineeringCardInfo[];
        draftChoices: Array<EngineeringCardInfo[]>;
    };
}