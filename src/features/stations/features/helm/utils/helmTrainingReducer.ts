import { Ship } from 'src/classes/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { interpolatePosition } from 'src/utils/interpolate';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { getManeuver } from '../features/maneuvers';
import { HelmAction } from '../types/HelmState';
import { getManeuverStartPosition } from './getManeuverStartPosition';
import { getTravelTime } from './getTravelTime';
import { moveToNextManeuverCard } from './moveToNextManeuverCard';
import { RelationshipType } from 'src/types/RelationshipType';

export function helmTrainingReducer(state: Ship, action: HelmAction): Ship | void {
    if (state.destroyed) {
        return;
    }

    switch (action.type) {
        case 'reset':
            const space = state.space;
            state.delete();

            const newState = new Ship(space, RelationshipType.Self);
            return newState;
            
        case 'tick': {
            state.updateMotion(action.currentTime);
            break;
        }

        case 'stop': {
            state.helm.destination = null;
            state.helm.maneuvers = [];
            state.helm.replaceMotion = true;
            break;
        }

        case 'set destination': {
            const currentTime = getTime();
            const currentPos = interpolatePosition(state.motion, currentTime);
            const timeToReachDestination = getTravelTime(currentPos, action.destination, state.helm);

            state.helm.destination = {
                val: { ...action.destination },
                time: currentTime + durationToTicks(timeToReachDestination),
            };
            
            if (state.helm.maneuvers.length === 0) {
                state.helm.replaceMotion = true;
            }
            break;
        }

        case 'discard': {
            moveToNextManeuverCard(state);
            break;
        }

        case 'maneuver': {
            if (!state.helm.maneuverChoice.options.includes(action.choice)) {
                break;
            }

            const startPosition = getManeuverStartPosition(state.motion, state.helm.maneuvers, state.helm, getTime());
            const maneuver = getManeuver(action.choice, startPosition);
            
            if (state.systems.get(ShipSystem.Engines).power < maneuver.minPower) {
                break;
            }

            moveToNextManeuverCard(state);

            state.helm.destination = null;
            state.helm.maneuvers.push(maneuver);
            state.helm.replaceMotion = state.helm.maneuvers.length < 3;
            break;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}

