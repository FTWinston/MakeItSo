import { Ship } from 'src/types/Ship';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { HelmAction } from '../types/HelmState';

export function helmTrainingReducer(state: Ship, action: HelmAction): Ship {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship();
            newState.helm = {
                destination: null,
                waypoints: [],
                forceMotionUpdate: true,
                rotationalSpeed: 0.75,
                speedWhileRotating: 0.1,
                speed: 1,
            };
            return newState;
            
        case 'tick': {
            state.updateMotion(action.currentTime);
            return state;
        }

        case 'set destination': {
            if (action.destination) {
                state.helm.destination = { ...action.destination };
                state.helm.waypoints = [{
                    ...action.destination,
                    time: getTime() + durationToTicks(5000), // TODO: determine time to reach destination
                }];
                state.helm.forceMotionUpdate = true;
            } else {
                state.helm.destination = null;
                state.helm.waypoints = [];
                state.helm.forceMotionUpdate = true;
            }
            
            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
