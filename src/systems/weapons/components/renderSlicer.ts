import { Theme } from '@material-ui/core';
import { getBounds, Polygon } from '../../../common/data/Polygon';
import { Vector2D } from '../../../common/data/Vector2D';
import { SliceResult } from '../data/SliceResult';

const gridPadding = 3.25;

export interface DisplayInfo {
    pageOffset: Vector2D;
    unitSize: number;
    viewWidth: number;
    viewHeight: number;
    gridMin: Vector2D;
    gridMax: Vector2D;
    theme: Theme;
}

function getPaddedBounds(polygon: Polygon | undefined) {
    if (polygon === undefined) {
        return {
            minX: 0,
            minY: 0,
            maxX: 8,
            maxY: 8,
        };
    }

    // determine the extent of the polygon itself
    const polyBounds = getBounds(polygon);

    polyBounds.minX -= gridPadding;
    polyBounds.minY -= gridPadding;

    polyBounds.maxX += gridPadding;
    polyBounds.maxY += gridPadding;

    return polyBounds;
}

export function calculateDisplay(element: HTMLElement, theme: Theme, polygon?: Polygon): DisplayInfo {
    const gridSpaceBounds = getPaddedBounds(polygon);
    const viewWidth = element.clientWidth;
    const viewHeight = element.clientHeight;

    // X or Y bounds will probably be larger than required so as to keep the polygon in the center
    const gridCenterX = (gridSpaceBounds.maxX + gridSpaceBounds.minX) / 2;
    const gridCenterY = (gridSpaceBounds.maxY + gridSpaceBounds.minY) / 2;

    let gridExtentX = gridSpaceBounds.maxX - gridSpaceBounds.minX;
    let gridExtentY = gridSpaceBounds.maxY - gridSpaceBounds.minY;

    const requiredRatio = gridExtentX / gridExtentY;
    const displayRatio = viewWidth / viewHeight;
    let unitSize: number;

    if (requiredRatio < displayRatio) {
        // fit to height, extend X space
        unitSize = viewHeight / gridExtentY;

        const requiredWidth = gridExtentX * unitSize;
        gridExtentX *= viewWidth / requiredWidth;
    }
    else {
        // fit to width, extend Y space
        unitSize = viewWidth / gridExtentX;

        const requiredHeight = gridExtentY * unitSize;
        gridExtentY *= viewHeight / requiredHeight;
    }

    const bounds = (element.closest('.swipeableRoot') ?? element)
        .getBoundingClientRect();
    
    return {
        gridMin: {
            x: gridCenterX - gridExtentX / 2,
            y: gridCenterY - gridExtentY / 2,
        },
        gridMax: {
            x: gridSpaceBounds.maxX,
            y: gridSpaceBounds.maxY,
        },
        pageOffset: {
            x: bounds.left,
            y: bounds.top,
        },
        unitSize,
        viewWidth,
        viewHeight,
        theme,
    };
}

export function drawAll(
    ctx: CanvasRenderingContext2D,
    display: DisplayInfo,
    polygon?: Polygon,
    startPos?: Vector2D,
    endPos?: Vector2D,
    sliceResults?: SliceResult[]
) {
    drawBackground(ctx, display);

    if (polygon !== undefined && polygon.length > 0) {
        drawPolygon(ctx, polygon, display, startPos, endPos);
    }
    else {
        // TODO: some sort of message about no targeting solution
    }

    if (sliceResults) {
        drawResults(ctx, display, sliceResults);
    }
}

function drawPolygon(
    ctx: CanvasRenderingContext2D,
    polygon: Polygon,
    display: DisplayInfo,
    sliceStart?: Vector2D,
    sliceEnd?: Vector2D
) {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = display.unitSize * 0.1;

    if (sliceEnd === undefined || sliceStart === undefined || (sliceStart.x === sliceEnd.x && sliceStart.y === sliceEnd.y)) {
        ctx.fillStyle = display.theme.palette.primary.main;
        drawSinglePolygon(ctx, polygon, display);

        if (sliceStart) {
            // draw "start point" for what will become the clipping line
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(gridToScreen(sliceStart.x, display.gridMin.x, display.unitSize), gridToScreen(sliceStart.y, display.gridMin.y, display.unitSize), display.unitSize * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
        return;
    }

    const clippingInfo = getClippingInfo(display, sliceStart, sliceEnd);

    // clip on one side of the line and draw the polygon in one color
    ctx.save();
    clipPath(ctx, clippingInfo.bounds1);
    ctx.fillStyle = '#f60';
    drawSinglePolygon(ctx, polygon, display);
    ctx.restore();

    // clip on the other side of line and draw the polygon in another color
    ctx.save();
    clipPath(ctx, clippingInfo.bounds2);
    ctx.fillStyle = '#09f';
    drawSinglePolygon(ctx, polygon, display);
    ctx.restore();
    
    // draw "extended" clipping line thinly
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(clippingInfo.extendedLine.x1, clippingInfo.extendedLine.y1);
    ctx.lineTo(clippingInfo.extendedLine.x2, clippingInfo.extendedLine.y2);
    ctx.stroke();

    // draw main clipping line thickly
    ctx.lineWidth = display.unitSize * 0.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(
        gridToScreen(sliceStart.x, display.gridMin.x, display.unitSize),
        gridToScreen(sliceStart.y, display.gridMin.y, display.unitSize)
    );
    ctx.lineTo(
        gridToScreen(sliceEnd.x, display.gridMin.x, display.unitSize),
        gridToScreen(sliceEnd.y, display.gridMin.y, display.unitSize)
    );
    ctx.stroke();
    ctx.lineCap = 'butt';
}

function drawBackground(ctx: CanvasRenderingContext2D, display: DisplayInfo) {
    // first, fill the background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, display.viewWidth, display.viewHeight);

    if (display.unitSize <= 1) {
        return;
    }

    // determine where to draw the top left point
    const startX = gridToScreen(Math.ceil(display.gridMin.x), display.gridMin.x, display.unitSize);
    const startY = gridToScreen(Math.ceil(display.gridMin.y), display.gridMin.y, display.unitSize);

    // draw a grid of points
    ctx.fillStyle = '#666';
    const radius = display.unitSize * 0.075;
    const twoPi = Math.PI * 2;

    ctx.beginPath();

    for (let x = startX; x <= display.viewWidth; x += display.unitSize) {
        for (let y = startY; y <= display.viewHeight; y += display.unitSize) {
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, 0, twoPi);
        }
    }

    ctx.fill();
}

function drawSinglePolygon(ctx: CanvasRenderingContext2D, polygon: Polygon, display: DisplayInfo) {
    // assume color and clip already set; just fill then stroke the shape

    ctx.beginPath();

    const firstPoint = polygon[0];

    const startX = gridToScreen(firstPoint.x, display.gridMin.x, display.unitSize);
    const startY = gridToScreen(firstPoint.y, display.gridMin.y, display.unitSize);
    ctx.moveTo(startX, startY);

    for (const point of polygon) {
        const x = gridToScreen(point.x, display.gridMin.x, display.unitSize);
        const y = gridToScreen(point.y, display.gridMin.y, display.unitSize);
        ctx.lineTo(x, y);
    }

    ctx.lineTo(startX, startY);

    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();
}

function drawResults(ctx: CanvasRenderingContext2D, display: DisplayInfo, sliceResults: SliceResult[]) {
    ctx.fillStyle = '#fff';
    
    ctx.font = `${Math.round(display.unitSize)}px ${display.theme.typography.fontFamily}`;
    ctx.globalAlpha = 0.75;
    ctx.textAlign = 'center';

    for (const result of sliceResults) {
        ctx.fillText(result.percent.toString(), gridToScreen(result.x, display.gridMin.x, display.unitSize), gridToScreen(result.y, display.gridMin.y, display.unitSize));
    }

    ctx.globalAlpha = 1;
}

export function screenToGrid(screenX: number, screenY: number, display: DisplayInfo) {
    return {
        x: Math.round((screenX - display.pageOffset.x) / display.unitSize + display.gridMin.x),
        y: Math.round((screenY - display.pageOffset.y) / display.unitSize + display.gridMin.y),
    };
}

export function gridToScreen(val: number, offset: number, unitSize: number) {
    return (val - offset) * unitSize;
}

function getClippingInfo(display: DisplayInfo, sliceStart: Vector2D, sliceEnd: Vector2D) {
    // determine the "full length" version of the clipping line,
    // plus two clipping paths to use to separate each "half" of the polygon, based on that line
    
    let x1 = gridToScreen(sliceStart.x, display.gridMin.x, display.unitSize);
    let y1 = gridToScreen(sliceStart.y!, display.gridMin.y, display.unitSize);
    let x2 = gridToScreen(sliceEnd.x!, display.gridMin.x, display.unitSize);
    let y2 = gridToScreen(sliceEnd.y!, display.gridMin.y, display.unitSize);

    let bounds1;
    let bounds2;

    if (x1 === x2) {
        y1 = 0;
        y2 = display.viewHeight

        bounds1 = [
            { x: 0, y: 0 },
            { x: x1, y: 0 },
            { x: x2, y: display.viewHeight },
            { x: 0, y: display.viewHeight },
        ];

        bounds2 = [
            { x: x1, y: 0 },
            { x: display.viewWidth, y: 0 },
            { x: display.viewWidth, y: display.viewHeight },
            { x: x2, y: display.viewHeight },
        ];
    }
    else {
        // ensure that 1 is left of 2
        if (x1 > x2) {
            [x1, x2] = [x2, x1];
            [y1, y2] = [y2, y1];
        }

        const gradient = (y2 - y1) / (x2 - x1);
        // y = mx + c
        // c = y - mx
        const yIntercept = y2 - gradient * x2;

        // x = (y - c) / m
        const xIntercept = (0 - yIntercept) / gradient;
        const xTopIntercept = (display.viewHeight - yIntercept) / gradient;

        if (gradient >= 0) {
            if (xIntercept >= 0) {
                // left end touches y=0
                x1 = xIntercept;
                y1 = 0;

                bounds1 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: 0, y: 0 },
                    { x: 0, y: display.viewHeight },
                ];

                bounds2 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: display.viewWidth, y: 0 },
                ]
            }
            else {
                // left end touches the left
                x1 = 0;
                y1 = yIntercept;

                bounds1 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: 0, y: display.viewHeight },
                ];

                bounds2 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: 0, y: 0 },
                    { x: display.viewWidth, y: 0 },
                ];
            }

            if (xTopIntercept <= display.viewWidth) {
                // right end touches y = display.viewHeight
                x2 = xTopIntercept;
                y2 = display.viewHeight;

                bounds1.push({ x: x2, y: y2 }); // anticlockwise

                bounds2.push({ x: display.viewWidth, y: display.viewHeight }); // clockwise
                bounds2.push({ x: x2, y: y2 });
            }
            else {
                // right end touches the right
                x2 = display.viewWidth;
                y2 = gradient * display.viewWidth + yIntercept;

                bounds1.push({ x: display.viewWidth, y: display.viewHeight }); // anticlockwise
                bounds1.push({ x: x2, y: y2 });

                bounds2.push({ x: x2, y: y2 }); // clockwise
            }
        }
        else {
            if (xTopIntercept >= 0) {
                // left end touches y = display.viewHeight
                x1 = xTopIntercept;
                y1 = display.viewHeight;

                bounds1 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: 0, y: display.viewHeight },
                    { x: 0, y: 0 },
                ];

                bounds2 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: display.viewWidth, y: display.viewHeight },
                ];
            }
            else {
                // left end touches the left
                x1 = 0;
                y1 = yIntercept;

                bounds1 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: 0, y: 0 },
                ];

                bounds2 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: 0, y: display.viewHeight },
                    { x: display.viewWidth, y: display.viewHeight },
                ];
            }

            if (xIntercept <= display.viewWidth) {
                // right end touches y = 0
                x2 = xIntercept;
                y2 = 0;

                bounds1.push({ x: x2, y: y2 }); // clockwise

                bounds2.push({ x: display.viewWidth, y: 0 }); // anticlockwise
                bounds2.push({ x: x2, y: y2 });
            }
            else {
                // right end touches the right
                x2 = display.viewWidth;
                y2 = gradient * display.viewWidth + yIntercept;
                bounds1.push({ x: display.viewWidth, y: 0 }); // clockwise
                bounds1.push({ x: x2, y: y2 });

                bounds2.push({ x: x2, y: y2 }); // anticlockwise
            }
        }
    }

    return {
        extendedLine: {
            x1,
            y1,
            x2,
            y2,
        },
        bounds1,
        bounds2,
    }
}

function clipPath(ctx: CanvasRenderingContext2D, bounds: Vector2D[]) {
    ctx.beginPath();

    const first = bounds.shift()!;

    ctx.moveTo(first.x, first.y);

    for (const point of bounds) {
        ctx.lineTo(point.x, point.y);
    }

    ctx.clip();
}
