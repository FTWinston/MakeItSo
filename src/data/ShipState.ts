import { System } from './System';
import { EngineeringCardData } from './EngineeringCard';
import { SystemState } from './SystemState';
import { Progression } from './Progression';
import { ContinuousInterpolation, Interpolation } from './Interpolation';
import { Vector2D } from './Vector2D';

export interface ShipState {
    clientsBySystem: Partial<Record<System, string>>;
    systemsByClient: Partial<Record<string, System>>;

    systemInfo: Record<System, SystemState>;
    
    position: ContinuousInterpolation<Vector2D>;
    futurePositions: Vector2D[];
    angle: Interpolation<number>;

    engineering: {
        systemOrder: System[];
        hand: EngineeringCardData[];
        draftChoices: Array<EngineeringCardData[]>;
        nextCardId: number;
        cardGeneration?: Progression;
    };
}
