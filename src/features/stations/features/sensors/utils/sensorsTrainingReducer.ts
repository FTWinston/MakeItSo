import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsState';
import { RelationshipType } from 'src/types/RelationshipType';

export function sensorsTrainingReducer(state: Ship, action: SensorsAction): Ship {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship(1, RelationshipType.Self);
            newState.sensors = {
                possibleTargets: [],
            };
            return newState;
            
        case 'tick': {
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
