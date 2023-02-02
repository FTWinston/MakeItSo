import { getLastFrame, Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';

export function getEndPosition(ship: Ship): Keyframe<Position> {
    return getLastFrame(ship.motion);
}
