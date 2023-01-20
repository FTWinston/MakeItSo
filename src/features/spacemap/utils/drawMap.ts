import { drawHexGrid } from './drawHexGrid';
import { Vector2D } from 'src/types/Vector2D';
import { ColorName, Theme } from 'src/lib/mui';
import { Position } from 'src/types/Position';
import { getTime } from 'src/utils/timeSpans';
import { getPositionValue } from 'src/types/Animation';
import { VesselInfo } from 'src/types/VesselInfo';

export type drawFunction = (context: CanvasRenderingContext2D, bounds: DOMRect) => void;

export function getWorldCoordinates(
    canvas: HTMLCanvasElement,
    offset: Vector2D,
    pagePos: Vector2D,
): Vector2D {
    const bounds = canvas.getBoundingClientRect();
    const x = pagePos.x - bounds.x + offset.x - bounds.width / 2;
    const y = pagePos.y - bounds.y + offset.y - bounds.height / 2;
    return { x, y };
}

function drawVessel(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    isLocal: boolean,
    position: Position,
) {
    ctx.translate(position.x, position.y);
    ctx.rotate(position.angle);
    
    ctx.fillStyle = isLocal
        ? theme.palette.text.primary
        : theme.palette.text.secondary;

    ctx.beginPath();

    ctx.moveTo(20, 0);
    ctx.lineTo(-15, 17);
    ctx.lineTo(-9, 0);
    ctx.lineTo(-15, -17);

    ctx.fill();

    ctx.rotate(-position.angle);
    ctx.translate(-position.x, -position.y);
}

export function drawMap(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
    theme: Theme,
    gridColor: ColorName,
    cellRadius: number,
    center: Vector2D,
    vessels: VesselInfo[],
    localVessel?: VesselInfo,
    drawExtraBackground?: drawFunction,
    drawExtraForeground?: drawFunction,
) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const minX = (viewBounds.width + cellRadius) / 2 + center.x;
    const minY = (viewBounds.height + cellRadius) / 2 + center.y;
    const maxX = minX + viewBounds.width + cellRadius;
    const maxY = minY + viewBounds.height + cellRadius;

    ctx.translate(viewBounds.width / 2 - center.x, viewBounds.height / 2 - center.y);

    drawExtraBackground?.(ctx, viewBounds);

    ctx.globalAlpha = 0.5;
    drawHexGrid(ctx, viewBounds, center, cellRadius, maxX, maxY, theme, gridColor);

    ctx.globalAlpha = 1;
    const currentTime = getTime();
    
    for (const vessel of vessels) {
        const position = getPositionValue(vessel.position, currentTime);
        drawVessel(ctx, theme, vessel === localVessel, position);
    }

    drawExtraForeground?.(ctx, viewBounds);
}
