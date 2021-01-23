import { System } from '../System';
import { EngineeringCardData } from '../../../systems/engineering/data/EngineeringCard';
import { SystemState } from './SystemState';
import { Progression } from '../Progression';
import { Vessel } from './Vessel';
import { Waypoint } from '../Waypoint';
import { TargetingSolution } from '../../../systems/weapons/data/TargetingSolution';

export interface ShipState extends Vessel {
    clientsBySystem: Partial<Record<System, string>>;
    systemsByClient: Partial<Record<string, System>>;

    systemInfo: Record<System, SystemState>;
    
    helm: {
        speed: number;
        speedWhileRotating: number;
        rotationalSpeed: number;
        forcePositionUpdate: boolean;
        waypoints: Waypoint[];
        lastWaypoint: Waypoint;
    }

    engineering: {
        systemOrder: System[];
        hand: EngineeringCardData[];
        draftChoices: Array<EngineeringCardData[]>;
        nextCardId: number;
        cardGeneration?: Progression;
    };

    weapons: {
        targetVesselId?: number;
        targetSolution?: number;
        solutionsByTarget: Record<number, TargetingSolution[]>;
    }
}
