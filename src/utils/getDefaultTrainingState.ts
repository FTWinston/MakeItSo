import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from './arrays';

export const getDefaultSystemStates: () => SystemState[] = () => [
    {
        system: ShipSystem.Hull,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
        nextEventId: 1,
    },
    {
        system: ShipSystem.Shields,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
        nextEventId: 1,
    },
    {
        system: ShipSystem.Sensors,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
        nextEventId: 1,
    },
    {
        system: ShipSystem.Weapons,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
        nextEventId: 1,
    },
    {
        system: ShipSystem.Engines,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
        nextEventId: 1,
    },
    {
        system: ShipSystem.Reactor,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
        nextEventId: 1,
    },
];

export function getDefaultTrainingState(): ShipState {
    const systems = getDefaultSystemStates();

    return {
        systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
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
            
        }
    }
}