import { Theme } from 'src/lib/mui';
import { shipPath } from './drawShip';

export function drawEnemy(
    ctx: CanvasRenderingContext2D,
    theme: Theme
) {
    ctx.fillStyle = theme.palette.error.dark;
    ctx.beginPath();
    shipPath(ctx);
    ctx.fill();
}