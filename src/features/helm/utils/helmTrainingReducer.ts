import { Ship } from 'src/classes/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { getManeuver } from '../features/maneuvers';
import { HelmAction } from '../types/HelmState';
import { getManeuverStartPosition } from './getManeuverStartPosition';
import { moveToNextManeuverCard } from './moveToNextManeuverCard';

export function helmTrainingReducer(state: Ship, action: HelmAction): Ship | void {
    if (state.destroyed) {
        return;
    }

    switch (action.type) {
        case 'reset':
            const newState = new Ship(1);
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
            state.helm.destination = {
                val: { ...action.destination },
                time: getTime() + durationToTicks(5000), // TODO: determine time to reach destination
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

