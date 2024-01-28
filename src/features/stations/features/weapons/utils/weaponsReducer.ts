import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import type { WeaponsAction } from '../types/WeaponsState';

export function weaponsReducer(state: Ship, action: WeaponsAction): void {
    switch (action.type) {
        case 'tick': {
            break;
        }

        case 'roll': {
            break;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
