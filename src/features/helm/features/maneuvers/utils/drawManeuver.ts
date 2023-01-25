import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { PowerLevel } from 'src/types/ShipSystem';

export function drawManeuver(
    ctx: CanvasRenderingContext2D,
    motion: Keyframes<Position>,
    minPower: PowerLevel,
    enabled: boolean
) {
    if (!enabled) {
        ctx.globalAlpha = 0.6;
    }

    // TODO: render those damn keyframes, with a nice arrowhead. (Possibly picking that from power level, for color-blindness sake?)
    // Pick color based on power level.

    if (!enabled) {
        ctx.globalAlpha = 1;
    }
}