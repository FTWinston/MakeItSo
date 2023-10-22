import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { WeaponsAction } from '../types/WeaponsState';
import { playerShip } from 'src/assets/settings/shipTypes';

export function weaponsTrainingReducer(state: Ship, action: WeaponsAction): Ship {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset': // TODO: remove from here
            const space = state.space;
            state.delete();

            const newState = new Ship(space, playerShip, { x: 0, y: 0, angle: 0 });
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
