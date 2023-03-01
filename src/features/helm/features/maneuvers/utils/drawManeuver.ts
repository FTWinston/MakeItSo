import { drawHexGrid } from 'src/features/spacemap';
import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Rectangle } from 'src/types/Rectangle';
import { PowerLevel } from 'src/types/ShipSystem';
import { polarToCartesian } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';
import { interpolatePosition } from 'src/utils/interpolate';
import { scaleToRange } from 'src/utils/scaleToRange';

function getSquareBounds(keyframes: Keyframes<Position>): Rectangle {
    let { x: minX, y: minY } = keyframes[0].val;
    let maxX = minX;
    let maxY = minY;

    const padding = 0.9; // Multiple of a cell radius.
    
    for (const keyframe of keyframes) {
        if (keyframe.val.x < minX) {
            minX = keyframe.val.x;
        }
        else if (keyframe.val.x > maxX) {
            maxX = keyframe.val.x;
        }

        if (keyframe.val.y < minY) {
            minY = keyframe.val.y;
        }
        else if (keyframe.val.y > maxY) {
            maxY = keyframe.val.y;
        }
    }

    let width = maxX - minX;
    let height = maxY - minY;

    if (width < height) {
        let midX = (maxX + minX) / 2;
        minX = midX - height / 2;
        width = height;
        maxX = minX + width;
    }
    else {
        let midY = (maxY + minY) / 2;
        minY = midY - width / 2;
        height = width;
        maxY = minY + height;
    }

    return {
        x: minX - padding,
        y: minY - padding,
        width: width + padding + padding,
        height: height + padding + padding,
    };
}

function fitCanvasToBounds(
    ctx: CanvasRenderingContext2D,
    canvasBounds: Rectangle,
    contentBounds: Rectangle
) {
    const xScale = canvasBounds.width / contentBounds.width;
    const yScale = canvasBounds.height / contentBounds.height;
    const scale = Math.min(xScale, yScale);

    ctx.scale(scale, scale);
    ctx.translate(-contentBounds.x, -contentBounds.y);

    return 1 / scale;
}

export function pickColor(minPower: PowerLevel) {
    switch (minPower) {
        case 0:
        case 1:
            return '#999';
        case 2:
            return '#1e88e5';
        case 3:
            return '#8e24aa';
        case 4:
            return '#f4511e';
    }
}

const evasionRange: readonly [number, number] = [0, 0.75];
const lineWidthRange: readonly [number, number] = [0.1, 0.5];

function determineLineWidth(evade: number): number {
    return scaleToRange(evade, evasionRange, lineWidthRange);
}

export function drawArrowHead(
    ctx: CanvasRenderingContext2D,
    position: Position,
) {
    ctx.lineWidth = 0.15;
    ctx.beginPath();

    const armEnd1 = polarToCartesian(position.angle - Math.PI * 0.74, 0.85);
    const armEnd2 = polarToCartesian(position.angle + Math.PI * 0.74, 0.85);

    ctx.moveTo(position.x + armEnd1.x, position.y + armEnd1.y);
    ctx.lineTo(position.x, position.y);
    ctx.lineTo(position.x + armEnd2.x, position.y + armEnd2.y);

    ctx.stroke();
}

export function drawManeuver(
    ctx: CanvasRenderingContext2D,
    motion: Keyframes<Position>,
    minPower: PowerLevel,
    drawArrow: boolean,
    currentTime = 0,
) {
    ctx.strokeStyle = pickColor(minPower);
    ctx.lineCap = 'round';
    ctx.lineWidth = 0.15;

    const { time: startTime } = motion[0];
    const { time: endTime, val: endPoint } = getLast(motion);
    
    // Interpolate from startPoint (or the current point, if a time is given) to endPoint.
    
    const timeStep = (endTime - startTime) / 50;

    let prevPoint: Position | undefined = undefined;
    for (let t = Math.max(startTime, currentTime); t <= endTime; t += timeStep) {
        const point = interpolatePosition(motion, t);
        
        if (prevPoint) {
            ctx.lineWidth = determineLineWidth(point.evade);
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }
        prevPoint = point;
    }

    if (drawArrow) {
        drawArrowHead(ctx, endPoint);
    }
}

export function drawManeuverWithGrid(
    ctx: CanvasRenderingContext2D,
    bounds: Rectangle,
    motion: Keyframes<Position>,
    minPower: PowerLevel,
    enabled: boolean,
) {
    const worldBounds = getSquareBounds(motion);
    const pixelSize = fitCanvasToBounds(ctx, bounds, worldBounds);

    if (!enabled) {
        ctx.globalAlpha = 0.5;
    }
    
    drawHexGrid(ctx, worldBounds, 1, pixelSize, '#333');

    if (!enabled) {
        ctx.globalAlpha = 0.2;
    }

    drawManeuver(ctx, motion, minPower, true);

    if (!enabled) {
        ctx.globalAlpha = 1;
    }
}
