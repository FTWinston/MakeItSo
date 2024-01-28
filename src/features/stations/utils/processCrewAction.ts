import { Ship } from 'src/classes/Ship';
import { CrewStation } from 'src/types/ShipSystem';
import { engineeringReducer, verifyEngineeringAction } from '../features/engineering';
import { helmReducer, verifyHelmAction } from '../features/helm';
import { sensorsReducer, verifySensorsAction } from '../features/sensors';
import { verifyWeaponsAction, weaponsReducer } from '../features/weapons';

// TODO: just calling the reducers here isn't enough. To update state in an immutable way server side, they need to hook into state management! Don't they?

export function processCrewAction(ship: Ship, action: object, station: CrewStation) {
    if (ship.destroyed) {
        return;
    }

    switch (station) {
        case CrewStation.Engineering:
            if (verifyEngineeringAction(action)) {
                engineeringReducer(ship, action);
            }
            return;
        case CrewStation.Helm:
            if (verifyHelmAction(action)) {
                helmReducer(ship, action);
            }
            return;
        case CrewStation.Sensors:
            if (verifySensorsAction(action)) {
                sensorsReducer(ship, action);
            }
            return;
        case CrewStation.Weapons:
            if (verifyWeaponsAction(action)) {
                weaponsReducer(ship, action);
            }
            return;
    }
}
