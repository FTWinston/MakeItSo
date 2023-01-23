import { DefiniteMap } from 'src/types/DefiniteMap';
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
