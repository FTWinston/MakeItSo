import { drawHexGrid, horizontalHexSpacing } from 'src/features/spacemap';
import { getVectorValue, Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Rectangle } from 'src/types/Rectangle';
import { PowerLevel } from 'src/types/ShipSystem';
import { project } from 'src/types/Vector2D';

function getSquareBounds(keyframes: Keyframes<Position>): Rectangle {
    let { x: minX, y: minY } = keyframes[0].val;
    let maxX = minX;
    let maxY = minY;

    const padding = horizontalHexSpacing * 0.5;
    
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
        else if (keyframe.val.y > minY) {
            minY = keyframe.val.y;
        }
    }

    let width = maxX - minX;
    let height = maxY - minY;

    if (width < height) {
        let midX = (maxX + minX) / 2;
        minX = midX - height / 2;
        width = height;
    }
    else {
        let midY = (maxY + minY) / 2;
        minY = midY - width / 2;
        height = width;
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

export function pickColor(minPower: PowerLevel, enabled: boolean) {
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

export function drawManeuver(
    ctx: CanvasRenderingContext2D,
    bounds: DOMRect,
    motion: Keyframes<Position>,
    minPower: PowerLevel,
    enabled: boolean
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

    ctx.strokeStyle = pickColor(minPower, enabled);
    ctx.lineWidth = 0.15;

    const startPoint = motion[0].val;
    const { val: endPoint, time: endTime } = motion[motion.length - 1];
    
    // Interpolate from startPoint to endPoint
    ctx.beginPath();
    const timeStep = (endTime /*- motion[0].time*/) / 50;    
    ctx.moveTo(startPoint.x, startPoint.y);

    for (let t = timeStep; t < endTime; t += timeStep) {
        const point = getVectorValue(motion, t);
        ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();



    // Now draw an arrowhead.
    ctx.beginPath();
    const endPoint1 = project(endPoint, endPoint.angle - Math.PI * 0.74, worldBounds.width * 0.225);
    ctx.moveTo(endPoint1.x, endPoint1.y);
    const endPoint2 = project(endPoint, endPoint.angle + Math.PI * 0.74, worldBounds.width * 0.225);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint2.x, endPoint2.y);
    ctx.stroke();

    if (!enabled) {
        ctx.globalAlpha = 1;
    }
}