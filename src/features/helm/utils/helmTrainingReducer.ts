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
                    destination: null
                }
            };
            
        case 'tick': {
            return state;
        }

        case 'set destination': {
            if (action.destination) {
                state.helm.destination = { ...action.destination };
            } else {
                state.helm.destination = null;
            }
            
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
