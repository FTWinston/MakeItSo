import { ShipState } from 'src/types/ShipState';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsState';

export function sensorsTrainingReducer(state: ShipState, action: SensorsAction): ShipState {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            return {
                ...state,
                sensors: {

                }
            };
            
        case 'tick': {
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
