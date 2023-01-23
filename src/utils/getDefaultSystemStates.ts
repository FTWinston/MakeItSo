import { getClosestCellCenter, worldScaleCellRadius } from 'src/features/spacemap';
import { DefiniteMap } from 'src/types/DefiniteMap';
import { Ship } from 'src/types/Ship';
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

export const getDefaultSystemStates = () => arrayToMap([
    getDefaultSystemState(ShipSystem.Hull),
    getDefaultSystemState(ShipSystem.Shields),
    getDefaultSystemState(ShipSystem.Sensors),
    getDefaultSystemState(ShipSystem.Weapons),
    getDefaultSystemState(ShipSystem.Engines),
    getDefaultSystemState(ShipSystem.Reactor),
], info => info.system) as DefiniteMap<ShipSystem, SystemState>;

export function getDefaultTrainingState(): Ship {
    const fromPos = getClosestCellCenter(0, 0, worldScaleCellRadius);
    const toPos = getClosestCellCenter(100, 0, worldScaleCellRadius);

    const ship = new Ship();

    ship.motion = [
        {
            time: 0,
            val: {
                ...fromPos,
                angle: 0,
            }
        }, {
            time: 5000,
            val: {
                ...toPos,
                angle: 0,
            }
        }
    ];

    return ship;
}