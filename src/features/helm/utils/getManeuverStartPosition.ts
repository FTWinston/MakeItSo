import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { getLast } from 'src/utils/arrays';
import { ManeuverInfo } from '../features/maneuvers';
import { getStopPosition } from './getStopPosition';

export function getManeuverStartPosition(motion: Keyframes<Position>, maneuvers: ManeuverInfo[], speedToStart: number, currentTime: number): Keyframe<Position> {
    // If existing maneuvers are queued, start from the end of them.
    if (maneuvers.length > 0) {
        return getLast(getLast(maneuvers).motion);
    }

    return getStopPosition(motion, speedToStart, currentTime);
}
