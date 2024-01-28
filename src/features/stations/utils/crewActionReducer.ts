import { Ship } from 'src/classes/Ship';
import { CrewStation } from 'src/types/ShipSystem';
import { engineeringReducer, verifyEngineeringAction } from '../features/engineering';
import { helmReducer, verifyHelmAction } from '../features/helm';
import { sensorsReducer, verifySensorsAction } from '../features/sensors';
import { verifyWeaponsAction, weaponsReducer } from '../features/weapons';

export interface StationAction {
    station: CrewStation;
    action: object;
}

export function crewActionReducer(ship: Ship, { station, action }: StationAction): void {
    if (ship.destroyed) {
        return;
    }

    switch (station) {
        case CrewStation.Engineering:
            if (verifyEngineeringAction(action)) {
                return engineeringReducer(ship, action);
            }
            return;
        case CrewStation.Helm:
            if (verifyHelmAction(action)) {
                return helmReducer(ship, action);
            }
            return;
        case CrewStation.Sensors:
            if (verifySensorsAction(action)) {
                return sensorsReducer(ship, action);
            }
            return;
        case CrewStation.Weapons:
            if (verifyWeaponsAction(action)) {
                return weaponsReducer(ship, action);
            }
            return;
    }
}
