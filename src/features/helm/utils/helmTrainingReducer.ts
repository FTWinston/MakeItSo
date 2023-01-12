import { ShipState } from 'src/types/ShipState';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { HelmAction } from '../types/HelmState';

export function helmTrainingReducer(state: ShipState, action: HelmAction): ShipState {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            return {
                ...state,
                helm: {

                }
            };
            
        case 'tick': {
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
