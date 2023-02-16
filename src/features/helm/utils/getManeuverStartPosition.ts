import { getClosestCellCenter } from 'src/features/spacemap';
import { getPositionValue, Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { getClosestOrthogonalAngle } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';
import { durationToTicks } from 'src/utils/timeSpans';
import { ManeuverInfo } from '../features/maneuvers';

export function getManeuverStartPosition(motion: Keyframes<Position>, maneuvers: ManeuverInfo[], currentTime: number): Keyframe<Position> {
    // If existing maneuvers are queued, start from the end of them.
    if (maneuvers.length > 0) {
        return getLast(getLast(maneuvers).motion);
    }

    // TODO: find a cell center AHEAD of the ship rather than behind.

    const currentPosition = getPositionValue(motion, currentTime);
    const cellCenter = getClosestCellCenter(currentPosition.x, currentPosition.y, 1);
    
    return {
        time: currentTime/* + durationToTicks(0.5)*/,
        val: {
            x: cellCenter.x,
            y: cellCenter.y,
            angle: getClosestOrthogonalAngle(currentPosition.angle),
        }
    };
}
