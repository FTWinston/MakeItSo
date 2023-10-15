import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsState';
import { RelationshipType } from 'src/types/RelationshipType';

export function sensorsTrainingReducer(state: Ship, action: SensorsAction): Ship | void {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const space = state.space;
            state.delete();

            const newState = new Ship(space, RelationshipType.Self);
            newState.sensors = {
                possibleTargets: [],
            };
            return newState;
            
        case 'tick': {
            return state;
        }

        case 'view': {
            state.viewTarget = action.target;
            break;
        }

        case 'target': {
            if (action.target) {
                state.sensors.currentTarget = {
                    id: action.target,
                    scanTree: state.getScanTreeForTarget(action.target),
                }
            }
            else {
                delete action.target;
            }
            break;
        }

        case 'scan': {
            if (!state.sensors.currentTarget) {
                break;
            }
            if (action.scan) {
                // TODO: validate that scan is an allowed option
                state.sensors.currentTarget.currentScan = action.scan;
            }
            else {
                delete state.sensors.currentTarget?.currentScan;
            }
            break;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
