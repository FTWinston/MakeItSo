import { Keyframe, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { getLast } from 'src/utils/arrays';
import { ManeuverInfo } from '../features/maneuvers';

export function getEndPosition(motion: Keyframes<Position>, maneuvers: ManeuverInfo[]): Keyframe<Position> {
    const keyframes = maneuvers.length > 0
        ? getLast(maneuvers).motion
        : motion;
    
    return getLast(keyframes);
}
