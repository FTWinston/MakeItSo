import { Ship } from 'src/types/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { drawCard } from 'src/utils/drawCard';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { applyOffset, getManeuver } from '../features/maneuvers';
import { HelmAction } from '../types/HelmState';
import { getEndPosition } from './getEndPosition';

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

        case 'maneuver': {
            if (!state.helm.maneuverChoice.options.includes(action.choice)) {
                return state;
            }

            const maneuver = getManeuver(action.choice);
            
            if (state.systems.get(ShipSystem.Engines).power < maneuver.minPower) {
                return state;
            }

            const startPosition = getEndPosition(state);
            maneuver.motion = applyOffset(maneuver.motion, startPosition.val, startPosition.time);

            // Discard current choice, and get a new choice. Shuffle if needed.
            const [newChoice, didShuffle] = drawCard(state.helm.manueverDrawPile, state.helm.manueverDiscardPile, state.helm.maneuverChoice);
            state.helm.maneuverChoice = newChoice;

            if (didShuffle) {
                // TODO: indicate shuffle?
            }

            state.helm.maneuvers.push(maneuver);

            return state;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
