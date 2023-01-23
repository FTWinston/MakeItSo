import { ShipInfo } from 'src/types/ShipInfo';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { WeaponsAction } from '../types/WeaponsState';

export function weaponsTrainingReducer(state: ShipInfo, action: WeaponsAction): ShipInfo {
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
