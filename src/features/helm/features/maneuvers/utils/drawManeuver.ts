import { drawHexGrid, packedWidthRatio } from 'src/features/spacemap';
import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Rectangle } from 'src/types/Rectangle';
import { PowerLevel } from 'src/types/ShipSystem';
import { determineAngle, project } from 'src/types/Vector2D';

function getSquareBounds(keyframes: Keyframes<Position>): Rectangle {
    let { x: minX, y: minY } = keyframes[0].val;
    let maxX = minX;
    let maxY = minY;

    const padding = packedWidthRatio * 0.5;
    
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

function pickColor(minPower: PowerLevel, enabled: boolean) {
    switch (minPower) {
        case 0:
        case 1:
            return '#757575';
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
    if (!enabled) {
        ctx.globalAlpha = 0.6;
    }

    const worldBounds = getSquareBounds(motion);
    const pixelSize = fitCanvasToBounds(ctx, bounds, worldBounds);

    drawHexGrid(ctx, worldBounds, 1, pixelSize, '#333');

    ctx.strokeStyle = pickColor(minPower, enabled);
    ctx.lineWidth = 0.1;

    ctx.beginPath();

    let point = motion[0].val;
    let prevPoint = point;
    ctx.moveTo(point.x, point.y);

    // TODO: interpolate these keyframes.
    for (let i=1; i<motion.length; i++) {
        prevPoint = point;
        point = motion[i].val;
        ctx.lineTo(point.x, point.y);
    }

    // Now draw an arrowhead.
    const endPoint1 = project(point, determineAngle(point, prevPoint, 0) + 0.75, worldBounds.width * 0.225);
    ctx.lineTo(endPoint1.x, endPoint1.y);
    const endPoint2 = project(point, determineAngle(point, prevPoint, 0) - 0.75, worldBounds.width * 0.225);
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(endPoint2.x, endPoint2.y);

    ctx.stroke();

    if (!enabled) {
        ctx.globalAlpha = 1;
    }
}