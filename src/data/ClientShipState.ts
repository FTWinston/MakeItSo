import { System } from './System';
import { EngineeringCardInfo } from './EngineeringCard';
import { ClientSystemState } from './ClientSystemState';
import { Progression } from './Progression';
import { ContinuousInterpolation, Interpolation } from './Interpolation';
import { Vector2D } from './Vector2D';

export interface ClientShipState {
    clientsBySystem: Partial<Record<System, string>>;

    systemInfo: Record<System, ClientSystemState>;

    position?: ContinuousInterpolation<Vector2D>;
    angle?: Interpolation<number>;

    engineering: {
        systemOrder: System[];
        hand: EngineeringCardInfo[];
        draftChoices: Array<EngineeringCardInfo[]>;
        cardGeneration?: Progression;
    };
}