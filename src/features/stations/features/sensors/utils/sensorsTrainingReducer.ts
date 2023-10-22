import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsStateInfo';
import { Reference } from 'src/classes/Reference';
import { expandScanTreeState } from '../features/scanselect';
import { playerShip } from 'src/assets/settings/shipTypes';

export function sensorsTrainingReducer(state: Ship, action: SensorsAction): Ship | void {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset': // TODO: remove from here
            const space = state.space;
            state.delete();

            const newState = new Ship(space, playerShip, { x: 0, y: 0, angle: 0 });
            newState.sensors = {
                possibleTargets: [],
                currentTarget: Reference.empty(),
            };
            return newState;
            
        case 'tick': {
            // TODO: update state.sensors.possibleTargets
            // ... don't just replace it each time, merge existing values.
            // Map instead of array?

            if (state.sensors.currentTarget.id) {
                // TODO: validate that state.sensors.currentTarget is in possibleTargets, clear it if not.
            }
            return state;
        }

        case 'view': {
            state.viewTarget = action.target;
            break;
        }

        case 'target': {
            if (action.target) {
                const targetObject = state.space.objects.get(action.target);

                if (targetObject) {
                    state.sensors.currentTarget = state.space.createReference(targetObject);
                    state.sensors.scanTree = expandScanTreeState(targetObject.getScanTree());
                    break;
                }
            }
            
            state.sensors.currentTarget.clear();
            break;
        }

        case 'scan': {
            if (!state.sensors.currentTarget.id) {
                break;
            }
            if (action.scan) {
                // TODO: validate that scan is an allowed option
                state.sensors.currentScan = action.scan;
            }
            else {
                delete state.sensors.currentScan;
            }
            break;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
