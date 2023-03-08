import { getClosestCellCenter } from 'src/features/spacemap';
import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { distance, getClosestOrthogonalAngle } from 'src/types/Vector2D';
import { interpolatePosition } from 'src/utils/interpolate';
import { durationToTicks } from 'src/utils/timeSpans';

export function getStopPosition(motion: Keyframes<Position>, speedToStart: number, currentTime: number): Keyframe<Position> {
    // Find a cell center AHEAD of the ship rather than behind. Search 1 second ahead, as a quick workaround.
    const currentPos = interpolatePosition(motion, currentTime);
    const nearFuturePosition = interpolatePosition(motion, currentTime + durationToTicks(1));
    const cellCenter = getClosestCellCenter(nearFuturePosition.x, nearFuturePosition.y, 1);
    
    // Leave time to move to cellCenter before starting maneuver.
    const distanceToStart = distance(currentPos, cellCenter);
    const timeToStart = distanceToStart < 0.1 ? 0 : speedToStart / distanceToStart;

    return {
        time: currentTime + durationToTicks(timeToStart),
        val: {
            x: cellCenter.x,
            y: cellCenter.y,
            angle: getClosestOrthogonalAngle(nearFuturePosition.angle),
        }
    };
}
