import { ShipSystem } from 'src/types/ShipSystem';
import { EngineeringState } from '../types/EngineeringState';

export const getDefaultEngineeringState: () => EngineeringState = () => ({
    systemOrder: [ShipSystem.Hull, ShipSystem.Shields, ShipSystem.Sensors, ShipSystem.Weapons, ShipSystem.Engines, ShipSystem.Reactor],
    handCards: [],
    maxHandSize: 7,
    choiceCards: [],
    numChoices: 0,
    nextCardId: 1,
    nextEffectId: 1,
});