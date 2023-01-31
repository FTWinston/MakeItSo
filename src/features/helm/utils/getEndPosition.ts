import { Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';

export function getEndPosition(ship: Ship): Keyframe<Position> {
    // TODO: if motion covers maneuvers also, can just always look there.
    const keyframes = ship.helm.maneuvers.length > 0
        ? ship.helm.maneuvers[ship.helm.maneuvers.length - 1].motion
        : ship.motion;

    return keyframes[keyframes.length - 1];
}
