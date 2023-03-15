import { drawHex, getBackgroundColor, getClosestCellCenter, shipPath, transformFrom, transformTo } from 'src/features/spacemap';
import { DiscreteColorName, Theme } from 'src/lib/mui';
import { Position } from 'src/types/Position';

export function drawDestination(
    ctx: CanvasRenderingContext2D,
    destination: Position,
    cellRadius: number,
    theme: Theme,
    fillColor: DiscreteColorName,
) {
    const cell = getClosestCellCenter(
        destination.x,
        destination.y,
        cellRadius
    );

    ctx.scale(1 / cellRadius, 1 / cellRadius);
    ctx.translate(cell.x, cell.y);
    
    ctx.globalAlpha = 0.33;
    drawHex(ctx, 1, 6);

    ctx.fillStyle = theme.palette[fillColor].main;
    ctx.fill();

    ctx.globalAlpha = 1;

    ctx.fillStyle = getBackgroundColor(theme);

    ctx.rotate(destination.angle);

    ctx.beginPath();
    shipPath(ctx);
    ctx.fill();

    ctx.rotate(-destination.angle);
    ctx.translate(-cell.x, -cell.y);
    ctx.scale(cellRadius, cellRadius);
}
