import { Theme } from 'src/lib/mui';

export function shipPath(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(0.625, 0);
    ctx.lineTo(-0.46875, 0.53125);
    ctx.lineTo(-0.28125, 0);
    ctx.lineTo(-0.46875, -0.53125);
    ctx.closePath();
}

export function drawShip(
    ctx: CanvasRenderingContext2D,
    theme: Theme
) {
    ctx.fillStyle = theme.palette.text.primary;
    ctx.beginPath();
    shipPath(ctx);
    ctx.fill();
}