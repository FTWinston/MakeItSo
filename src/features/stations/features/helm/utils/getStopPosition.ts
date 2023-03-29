import { getClosestCellCenter } from '../../../features/spacemap';
import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { getClosestOrthogonalAngle } from 'src/types/Vector2D';
import { interpolatePosition } from 'src/utils/interpolate';
import { durationToTicks } from 'src/utils/timeSpans';
import { MotionConfiguration } from '../types/HelmState';
import { getTravelTime } from './getTravelTime';

export function getStopPosition(motion: Keyframes<Position>, config: MotionConfiguration, currentTime: number): Keyframe<Position> {
    // Find a cell center AHEAD of the ship rather than behind. Search 1 second ahead, as a quick workaround.
    const currentPos = interpolatePosition(motion, currentTime);
    const nearFuturePosition = interpolatePosition(motion, currentTime + durationToTicks(1));
    const startAt = getClosestCellCenter(nearFuturePosition.x, nearFuturePosition.y, 1);
    const startAngle = getClosestOrthogonalAngle(nearFuturePosition.angle);

    const stopPosition: Position = {
        x: startAt.x,
        y: startAt.y,
        angle: startAngle,
    };
    
    const timeToReachStopPosition = getTravelTime(currentPos, stopPosition, config);
    
    return {
        time: currentTime + durationToTicks(timeToReachStopPosition),
        val: stopPosition,
    };
}
