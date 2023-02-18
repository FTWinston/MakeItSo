import { getClosestCellCenter } from 'src/features/spacemap';
import { getPositionValue, Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { distance, getClosestOrthogonalAngle } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';
import { durationToTicks } from 'src/utils/timeSpans';
import { ManeuverInfo } from '../features/maneuvers';
import { MotionConfiguration } from '../types/HelmState';

export function getManeuverStartPosition(motion: Keyframes<Position>, maneuvers: ManeuverInfo[], speedToStart: number, currentTime: number): Keyframe<Position> {
    // If existing maneuvers are queued, start from the end of them.
    if (maneuvers.length > 0) {
        return getLast(getLast(maneuvers).motion);
    }

    // Find a cell center AHEAD of the ship rather than behind. Search 1 second ahead, as a quick workaround.
    const currentPos = getPositionValue(motion, currentTime);
    const nearFuturePosition = getPositionValue(motion, currentTime + durationToTicks(1));
    const cellCenter = getClosestCellCenter(nearFuturePosition.x, nearFuturePosition.y, 1);
    
    // Leave time to move to cellCenter before starting maneuver.
    const distanceToStart = distance(currentPos, cellCenter);
    const timeToStart = speedToStart / distanceToStart;

    return {
        time: currentTime + durationToTicks(timeToStart),
        val: {
            x: cellCenter.x,
            y: cellCenter.y,
            angle: getClosestOrthogonalAngle(nearFuturePosition.angle),
        }
    };
}
