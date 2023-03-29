import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { WeaponsAction } from '../types/WeaponsState';

export function weaponsTrainingReducer(state: Ship, action: WeaponsAction): Ship {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship(state.id);
            newState.weapons = {

            };
            return newState;
            
        case 'tick': {
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
