import { Position } from 'src/types/Position';
import { clampAngle, distance } from 'src/types/Vector2D';
import { MotionConfiguration } from '../types/HelmState';

export function getTravelTime(from: Position, to: Position, config: MotionConfiguration): number {
    const translationDistanceToStart = distance(from, to);
    const translationTimeToStart = translationDistanceToStart / config.speed;

    const rotationDistanceToStart = Math.abs(clampAngle(from.angle - to.angle));
    const rotationTimeToStart = rotationDistanceToStart / config.rotationalSpeed;

    return Math.max(translationTimeToStart, rotationTimeToStart);
}
