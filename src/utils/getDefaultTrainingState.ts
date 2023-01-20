import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from './arrays';

export const getDefaultSystemState: (system: ShipSystem) => SystemState = system => ({
    system,
    health: 100,
    power: 2,
    unconstrainedPower: 2,
    powerLevelChanged: false,
    shieldScale: 1,
    effects: [],
    eventLog: [],
    nextEventId: 1,
});

export const getDefaultSystemStates: () => SystemState[] = () => [
    getDefaultSystemState(ShipSystem.Hull),
    getDefaultSystemState(ShipSystem.Shields),
    getDefaultSystemState(ShipSystem.Sensors),
    getDefaultSystemState(ShipSystem.Weapons),
    getDefaultSystemState(ShipSystem.Engines),
    getDefaultSystemState(ShipSystem.Reactor),
];

export function getDefaultTrainingState(): ShipState {
    const systems = getDefaultSystemStates();

    return {
        systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
        position: [],
        engineering: {
            systemOrder: systems.map(system => system.system),
            handCards: [],
            maxHandSize: 7,
            choiceCards: [],
            numChoices: 0,
            nextCardId: 1,
            nextEffectId: 1,
        },
        helm: {
            destination: null,
        },
        weapons: {

        },
        sensors: {

        }
    }
}