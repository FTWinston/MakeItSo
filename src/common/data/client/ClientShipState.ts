import { System } from '../System';
import { EngineeringCardInfo } from '../../../systems/engineering/data/EngineeringCard';
import { ClientSystemState } from './ClientSystemState';
import { Progression } from '../Progression';
import { ClientVessel } from './ClientVessel';
import { Waypoint } from '../Waypoint';
import { TargetingSolution } from '../../../systems/weapons/data/TargetingSolution';
import { ClientMinefield } from '../../../systems/sensors/data/MinefieldData';

export interface ClientShipState extends ClientVessel {
    clientsBySystem: Partial<Record<System, string>>;

    systemInfo: Record<System, ClientSystemState>;

    helm: {
        waypoints: Waypoint[];
    };

    engineering: {
        systemOrder: System[];
        hand: EngineeringCardInfo[];
        draftChoices: Array<EngineeringCardInfo[]>;
        cardGeneration?: Progression;
    };

    weapons: {
        targetVesselId?: number;
        targetSolution?: number;
        targetSolutions: TargetingSolution[];
    }
    
    sensors: {
        targetVesselId?: number;
        targetSystem?: System;
        minefield?: ClientMinefield;
    }
}