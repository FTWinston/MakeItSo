import { Ship } from 'src/classes/Ship';
import { CrewStation } from 'src/types/ShipSystem';
import { EngineeringAction, engineeringReducer } from '../features/engineering';
import { HelmAction, helmReducer } from '../features/helm';
import { SensorsAction, sensorsReducer } from '../features/sensors';
import { WeaponsAction, weaponsReducer } from '../features/weapons';

export type CrewAction = {
    station: CrewStation.Engineering;
    action: EngineeringAction;
} | {
    station: CrewStation.Helm;
    action: HelmAction;
} | {
    station: CrewStation.Sensors;
    action: SensorsAction;
} | {
    station: CrewStation.Weapons;
    action: WeaponsAction;
}

/** Like crewActionReducer, but without verification that the action is one that a user is allowed to run. */
export function storySystemReducer(ship: Ship, { station, action }: CrewAction): void {
    if (ship.destroyed) {
        return;
    }

    switch (station) {
        case CrewStation.Engineering:
            return engineeringReducer(ship, action);
        case CrewStation.Helm:
            return helmReducer(ship, action);
        case CrewStation.Sensors:
            return sensorsReducer(ship, action);
        case CrewStation.Weapons:
            return weaponsReducer(ship, action);
    }
}
