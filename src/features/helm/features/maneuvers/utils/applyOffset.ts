import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { clampAngle, rotatePolar } from 'src/types/Vector2D';

/* Get the closest multiple of Pi / 3 */
export function getStartAngle(shipAngle: number) {
    const factor = Math.PI / 3;
    return Math.round(shipAngle / factor) * factor;
}

export function applyOffset(motion: Keyframes<Position>, positionOffset: Position, delay: number): Keyframes<Position> {
    const roundedOffsetAngle = getStartAngle(positionOffset.angle);

    return motion
        .map(keyframe => {
            const rotatedPosition = rotatePolar(keyframe.val, roundedOffsetAngle);

            return {
                time: keyframe.time + delay,
                val: {
                    angle: clampAngle(keyframe.val.angle + roundedOffsetAngle),
                    x: rotatedPosition.x + positionOffset.x,
                    y: rotatedPosition.y + positionOffset.y,
                }
            };
        });
}