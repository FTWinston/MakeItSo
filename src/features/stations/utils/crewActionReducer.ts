import { Ship } from 'src/classes/Ship';
import { CrewStation } from 'src/types/ShipSystem';
import { engineeringReducer, verifyEngineeringAction } from '../features/engineering';
import { helmReducer, verifyHelmAction } from '../features/helm';
import { sensorsReducer, verifySensorsAction } from '../features/sensors';
import { verifyWeaponsAction, weaponsReducer } from '../features/weapons';

export interface CrewAction {
    station: CrewStation;
    action: object;
}

export function crewActionReducer(ship: Ship, { station, action }: CrewAction): void {
    if (ship.destroyed) {
        return;
    }

    switch (station) {
        case CrewStation.Engineering:
            if (verifyEngineeringAction(action)) {
                return engineeringReducer(ship, action);
            }
            else {
                console.error('Invalid engineering action', action);
                return;
            }
        case CrewStation.Helm:
            if (verifyHelmAction(action)) {
                return helmReducer(ship, action);
            }
            else {
                console.error('Invalid helm action', action);
                return;
            }
        case CrewStation.Science:
            if (verifySensorsAction(action)) {
                return sensorsReducer(ship, action);
            }
            else {
                console.error('Invalid sensors action', action);
                return;
            }
        case CrewStation.Tactical:
            if (verifyWeaponsAction(action)) {
                return weaponsReducer(ship, action);
            }
            else {
                console.error('Invalid weapons action', action);
                return;
            }
    }
}
