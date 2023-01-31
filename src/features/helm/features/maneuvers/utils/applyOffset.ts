import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { clampAngle, rotatePolar } from 'src/types/Vector2D';

export function applyOffset(motion: Keyframes<Position>, positionOffset: Position, delay: number): Keyframes<Position> {
    return motion
        .map(keyframe => {
            const rotatedPosition = rotatePolar(keyframe.val, positionOffset.angle);

            return {
                time: keyframe.time + delay,
                val: {
                    angle: clampAngle(keyframe.val.angle + positionOffset.angle),
                    x: rotatedPosition.x + positionOffset.x,
                    y: rotatedPosition.y + positionOffset.y,
                }
            };
        });
}