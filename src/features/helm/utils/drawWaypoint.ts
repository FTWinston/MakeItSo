import { drawHex, getClosestCellCenter } from 'src/features/spacemap';
import { DiscreteColorName, Theme } from 'src/lib/mui';
import { Waypoint } from 'src/types/Waypoint';

export function drawWaypoint(
    ctx: CanvasRenderingContext2D,
    waypoint: Waypoint,
    cellRadius: number,
    theme: Theme,
    fillColor: DiscreteColorName,
    number?: number,
) {
    const cell = getClosestCellCenter(
        waypoint.x,
        waypoint.y,
        cellRadius
    );

    ctx.translate(cell.x, cell.y);
    
    ctx.globalAlpha = 0.33;
    drawHex(ctx, cellRadius, 6);

    ctx.fillStyle = theme.palette[fillColor].main;
    ctx.fill();

    ctx.globalAlpha = 1;

    ctx.fillStyle = theme.palette.background.default;

    if (waypoint.angle !== undefined) {
        drawArrow(ctx, waypoint.angle, theme, cellRadius);
    }
    else if (number !== undefined) {
        ctx.beginPath();
        ctx.arc(0, 0, cellRadius * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    if (number !== undefined) {
        ctx.fillStyle = theme.palette.primary.main;
        ctx.fillText(number.toString(), 0, 0);
    }

    ctx.translate(-cell.x, -cell.y);
}

function drawArrow(ctx: CanvasRenderingContext2D, angle: number, theme: Theme, cellRadius: number) {
    ctx.rotate(angle);

    ctx.beginPath();

    const stemWidth = cellRadius * 0.275;
    const arrowWidth = cellRadius * 0.65;

    ctx.moveTo(-cellRadius * 0.5, stemWidth);
    ctx.lineTo(0, stemWidth);
    ctx.lineTo(0, arrowWidth);
    ctx.lineTo(cellRadius * 0.65, 0);
    ctx.lineTo(0, -arrowWidth);
    ctx.lineTo(0, -stemWidth);
    ctx.lineTo(-cellRadius * 0.5, -stemWidth);
    ctx.fill();

    ctx.rotate(-angle);
}
