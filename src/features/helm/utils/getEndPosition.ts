import { Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';
import { getLast } from 'src/utils/arrays';

export function getEndPosition(ship: Ship): Keyframe<Position> {
    return getLast(ship.motion);
}
