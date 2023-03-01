import { Theme } from 'src/lib/mui';

export function drawNeutral(
    ctx: CanvasRenderingContext2D,
    theme: Theme
) {
    ctx.fillStyle = theme.palette.text.disabled;
    ctx.beginPath();

    ctx.moveTo(0.625, 0);
    ctx.lineTo(-0.46875, 0.53125);
    ctx.lineTo(-0.28125, 0);
    ctx.lineTo(-0.46875, -0.53125);

    ctx.fill();
}