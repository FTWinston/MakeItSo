import { drawChevron, drawHex, getBackgroundColor, getClosestCellCenter } from '../../../features/spacemap';
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

    const color = getBackgroundColor(theme);

    ctx.rotate(destination.angle);

    drawChevron(ctx, color, color)

    ctx.rotate(-destination.angle);
    ctx.translate(-cell.x, -cell.y);
    ctx.scale(cellRadius, cellRadius);
}
