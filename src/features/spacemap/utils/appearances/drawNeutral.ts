import { Theme } from 'src/lib/mui';
import { shipPath } from './drawShip';

export function drawNeutral(
    ctx: CanvasRenderingContext2D,
    theme: Theme
) {
    ctx.fillStyle = theme.palette.text.disabled;
    ctx.beginPath();
    shipPath(ctx);
    ctx.fill();
}