import { ShipState } from 'src/types/ShipState';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { HelmAction } from '../types/HelmState';
import { shouldUpdatePosition, updateShipPosition } from './updateShipPosition';

export function helmTrainingReducer(state: ShipState, action: HelmAction): ShipState {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            return {
                ...state,
                helm: {
                    destination: null,
                    waypoints: [],
                    forcePositionUpdate: true,
                    rotationalSpeed: 0.75,
                    speedWhileRotating: 0.1,
                    speed: 1,
                }
            };
            
        case 'tick': {
            if (shouldUpdatePosition(state, action.currentTime)) {
                updateShipPosition(state, action.currentTime);
            }
            return state;
        }

        case 'set destination': {
            if (action.destination) {
                state.helm.destination = { ...action.destination };
                state.helm.waypoints = [{
                    ...action.destination,
                    time: getTime() + durationToTicks(5000), // TODO: determine time to reach destination
                }];
                state.helm.forcePositionUpdate = true;
            } else {
                state.helm.destination = null;
                state.helm.waypoints = [];
                state.helm.forcePositionUpdate = true;
            }
            
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
