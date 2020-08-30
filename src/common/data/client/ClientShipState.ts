import { System } from '../System';
import { EngineeringCardInfo } from '../../../systems/engineering/data/EngineeringCard';
import { ClientSystemState } from './ClientSystemState';
import { Progression } from '../Progression';
import { ClientVessel } from './ClientVessel';
import { Vector2D } from '../Vector2D';

export interface ClientShipState extends ClientVessel {
    clientsBySystem: Partial<Record<System, string>>;

    systemInfo: Record<System, ClientSystemState>;

    futurePositions: Vector2D[];

    engineering: {
        systemOrder: System[];
        hand: EngineeringCardInfo[];
        draftChoices: Array<EngineeringCardInfo[]>;
        cardGeneration?: Progression;
    };
}