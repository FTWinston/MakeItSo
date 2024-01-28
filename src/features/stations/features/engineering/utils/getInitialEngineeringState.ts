import { ShipSystem } from 'src/types/ShipSystem';
import { EngineeringState } from '../types/EngineeringState';
import { ShipType } from 'src/types/ShipType';
import { EngineeringConfiguration } from '../types/EngineeringConfiguration';

export function getInitialEngineeringState(shipType: ShipType, configuration: EngineeringConfiguration): EngineeringState {
    // TODO: use configuration for initial cards!

    // TODO: use ship type for system order?

    return {
        configuration,
        systemOrder: [ShipSystem.Hull, ShipSystem.Shields, ShipSystem.Sensors, ShipSystem.Weapons, ShipSystem.Engines, ShipSystem.Reactor],
        handCards: [],
        maxHandSize: 7,
        choiceCards: [],
        numChoices: 0,
        nextCardId: 1,
        nextEffectId: 1,
    }
}