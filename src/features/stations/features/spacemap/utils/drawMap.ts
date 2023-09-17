import { drawHexGrid } from './drawHexGrid';
import { Vector2D } from 'src/types/Vector2D';
import { DiscreteColorName, Theme } from 'src/lib/mui';
import { getTime } from 'src/utils/timeSpans';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { Rectangle } from 'src/types/Rectangle';
import { scaleToRange } from 'src/utils/scaleToRange';
import { interpolatePosition } from 'src/utils/interpolate';
import { drawObject } from './drawObject';

export type drawFunction = (context: CanvasRenderingContext2D, bounds: Rectangle, pixelSize: number) => void;

export const worldScaleCellRadius = 1;

export function getWorldBounds(canvas: HTMLCanvasElement, cellRadius: number, worldCenter: Vector2D): Rectangle {
    return getViewWorldBounds(canvas.getBoundingClientRect(), cellRadius, worldCenter);
}

function getViewWorldBounds(viewBounds: DOMRect, cellRadius: number, worldCenter: Vector2D): Rectangle {
    const width = viewBounds.width / cellRadius;
    const height = viewBounds.height / cellRadius;

    return {
        x: worldCenter.x - width / 2,
        y: worldCenter.y - height / 2,
        width,
        height,
    };
}

export function screenToWorld(canvas: HTMLCanvasElement, cellRadius: number, worldCenter: Vector2D, screenPoint: Vector2D): Vector2D {
    const viewBounds = canvas.getBoundingClientRect();

    // Get offset from center of canvas to screenPoint.
    const screenCenterOffset = {
        x: screenPoint.x - viewBounds.width / 2 - viewBounds.x,
        y: screenPoint.y - viewBounds.height / 2 - viewBounds.y,
    }

    // Scale that by cellRadius, add on worldCenter.
    const result = {
        x: worldCenter.x + screenCenterOffset.x / cellRadius,
        y: worldCenter.y + screenCenterOffset.y / cellRadius,
    };

    return result;
}

function getGridAlpha(cellRadius: number): number {
    return scaleToRange(cellRadius, [16, 160], [0.15, 0.5]);
}

export function drawMap(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
    theme: Theme,
    gridColor: DiscreteColorName,
    cellRadius: number,
    center: Vector2D,
    objects: Iterable<GameObjectInfo>,
    drawExtraBackground?: drawFunction,
    drawExtraForeground?: drawFunction,
) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const worldBounds = getViewWorldBounds(viewBounds, cellRadius, center);

    ctx.scale(cellRadius, cellRadius);
    const pixelSize = 1 / cellRadius;

    ctx.translate(-worldBounds.x, -worldBounds.y);

    drawExtraBackground?.(ctx, worldBounds, pixelSize);

    ctx.globalAlpha = getGridAlpha(cellRadius);

    const gridStroke = theme.palette[gridColor].light;
    drawHexGrid(ctx, worldBounds, 1, pixelSize, gridStroke);

    ctx.globalAlpha = 1;

    const currentTime = getTime();
    
    for (const obj of objects) {
        const position = interpolatePosition(obj.motion, currentTime);

        ctx.translate(position.x, position.y);
        ctx.rotate(position.angle);

        drawObject(ctx, obj.draw, obj.rel, theme);
        
        ctx.rotate(-position.angle);
        ctx.translate(-position.x, -position.y);
    }

    drawExtraForeground?.(ctx, worldBounds, pixelSize);
}
