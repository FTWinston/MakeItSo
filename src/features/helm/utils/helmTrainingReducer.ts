import { Ship } from 'src/types/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { drawCard } from 'src/utils/drawCard';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { getManeuver } from '../features/maneuvers';
import { HelmAction } from '../types/HelmState';
import { getEndPosition } from './getEndPosition';
import { moveToNextManeuverCard } from './moveToNextManeuverCard';

export function helmTrainingReducer(state: Ship, action: HelmAction): Ship {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship();
            return newState;
            
        case 'tick': {
            state.updateMotion(action.currentTime);
            return state;
        }

        case 'stop': {
            state.helm.destination = null;
            state.helm.waypoints = [];
            state.helm.maneuvers = [];
            state.helm.forceMotionUpdate = true;

            return state;
        }

        case 'set destination': {
            state.helm.destination = { ...action.destination };
            state.helm.waypoints = [{
                ...action.destination,
                time: getTime() + durationToTicks(5000), // TODO: determine time to reach destination
            }];
            state.helm.forceMotionUpdate = true;

            return state;
        }

        case 'discard': {
            moveToNextManeuverCard(state);
            return state;
        }

        case 'maneuver': {
            if (!state.helm.maneuverChoice.options.includes(action.choice)) {
                return state;
            }

            const startPosition = getEndPosition(state);
            const maneuver = getManeuver(action.choice, startPosition);
            
            if (state.systems.get(ShipSystem.Engines).power < maneuver.minPower) {
                return state;
            }

            moveToNextManeuverCard(state);

            state.helm.maneuvers.push(maneuver);
            state.motion.push(...maneuver.motion);

            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}

