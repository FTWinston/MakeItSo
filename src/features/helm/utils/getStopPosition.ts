import { getClosestCellCenter } from 'src/features/spacemap';
import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { clampAngle, distance, getClosestOrthogonalAngle } from 'src/types/Vector2D';
import { interpolatePosition } from 'src/utils/interpolate';
import { durationToTicks } from 'src/utils/timeSpans';
import { MotionConfiguration } from '../types/HelmState';

export function getStopPosition(motion: Keyframes<Position>, config: MotionConfiguration, currentTime: number): Keyframe<Position> {
    // Find a cell center AHEAD of the ship rather than behind. Search 1 second ahead, as a quick workaround.
    const currentPos = interpolatePosition(motion, currentTime);
    const nearFuturePosition = interpolatePosition(motion, currentTime + durationToTicks(1));
    const startAt = getClosestCellCenter(nearFuturePosition.x, nearFuturePosition.y, 1);
    
    // Leave time to move to cellCenter before starting maneuver.
    const translationDistanceToStart = distance(currentPos, startAt);
    const translationTimeToStart = translationDistanceToStart / config.speed;

    const startAngle = getClosestOrthogonalAngle(nearFuturePosition.angle);
    const rotationDistanceToStart = Math.abs(clampAngle(currentPos.angle - startAngle));
    const rotationTimeToStart = rotationDistanceToStart / config.rotationalSpeed;

    const timeToStart = Math.max(translationTimeToStart, rotationTimeToStart);

    return {
        time: currentTime + durationToTicks(timeToStart),
        val: {
            x: startAt.x,
            y: startAt.y,
            angle: startAngle,
        }
    };
}
