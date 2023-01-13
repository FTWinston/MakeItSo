import { ShipState } from 'src/types/ShipState';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { WeaponsAction } from '../types/WeaponsState';

export function weaponsTrainingReducer(state: ShipState, action: WeaponsAction): ShipState {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            return {
                ...state,
                weapons: {

                }
            };
            
        case 'tick': {
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
