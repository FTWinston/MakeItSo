import { Ship } from 'src/types/Ship';
import { ShipInfo } from 'src/types/ShipInfo';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsState';

export function sensorsTrainingReducer(state: Ship, action: SensorsAction): Ship {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship();
            newState.sensors = {

            };
            return newState;
            
        case 'tick': {
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
