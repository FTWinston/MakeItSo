import React, { useRef, useCallback, useState, forwardRef } from 'react';
import { Theme, useTheme } from '@material-ui/core';
import { useGesture } from 'react-use-gesture'
import { Canvas } from './Canvas';
import { Vector2D } from '../../data/Vector2D';
import { ClientVessel } from '../../data/ClientVessel';
import { continuousVectorValue, discreteAngleValue } from '../../data/Interpolation';
import { getTime } from '../../data/Progression';
import { ColorName } from './Colors';
import { clickMoveLimit } from '../hooks/useLongPress';
import { TouchEvents } from './TouchEvents';

export type CellHighlights = Partial<Record<ColorName, Vector2D[]>>;

interface Props extends TouchEvents {
    className?: string;
    gridColor: ColorName;
    vessels: ClientVessel[];
    localVessel?: ClientVessel;
    highlightCells?: CellHighlights;
    cellRadius: number;
    setCellRadius: (radius: number) => void;
    center: Vector2D;
    setCenter: (center: Vector2D) => void;
    drawExtra?: (context: CanvasRenderingContext2D, bounds: DOMRect) => void;
}

let startDistance = 32;

export const SpaceMap = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const theme = useTheme();

    const {
        gridColor,
        cellRadius,
        setCellRadius,
        center,
        setCenter,
        drawExtra,
        onClick,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = props;

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
            drawMap(ctx, bounds, theme, gridColor, cellRadius, center, props.highlightCells, props.vessels, props.localVessel);
            
            if (drawExtra) {
                drawExtra(ctx, bounds);
            }
        },
        [cellRadius, theme, center, gridColor, props.highlightCells, props.vessels, props.localVessel, props.drawExtra]
    );

    const bind = useGesture({
        onDrag: ({ movement: [mx, my] }) => {
            setCenter({
                x: -mx,
                y: -my,
            });
        },
        onPinchStart: ({ da: [distance] }) => {
            startDistance = distance;
        },
        onPinch: ({ da: [distance] }) => {
            const scale = distance / startDistance;
            setCellRadius(Math.max(16, cellRadius * scale));
        },
        onClick,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    }, {
        drag: {
            initial: () => [-center.x, -center.y],
            threshold: clickMoveLimit,
        },
    });

    return (
        <Canvas
            ref={ref}
            className={props.className}
            animate={true}
            draw={draw}
            {...bind()}
        />
    )
});

const packedWidthRatio = 1.7320508075688772;
const packedHeightRatio = 1.5;

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

function drawHex(ctx: CanvasRenderingContext2D, radius: number, numPoints: number) {
    ctx.beginPath();
    
    let angle, x, y;
    for (let point = 0; point <= numPoints; point++) {
        angle = 2 * Math.PI / 6 * (point + 0.5);
        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);

        if (point === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
}

export function getClosestCellCenter(x: number, y: number, cellRadius: number) {
    x -= cellRadius;
    y -= cellRadius;

    const fCol = (x * Math.sqrt(3) - y) / 3 / cellRadius;
    const fRow = y * 2 / 3 / cellRadius;
    const fThirdCoord = -fCol - fRow;

    let iCol = Math.round(fCol);
    let iRow = Math.round(fRow);
    const iThird = Math.round(fThirdCoord);

    const colDiff = Math.abs(iCol - fCol);
    const rowDiff = Math.abs(iRow - fRow);
    const thirdDiff = Math.abs(iThird - fThirdCoord);

    if (colDiff >= rowDiff) {
        if (colDiff >= thirdDiff) {
            iCol = -iRow - iThird;
        }
    }
    else if (rowDiff >= colDiff && rowDiff >= thirdDiff) {
        iRow = -iCol - iThird;
    }

    return {
        x: packedWidthRatio * (iCol + iRow / 2) * cellRadius + cellRadius,
        y: packedHeightRatio * iRow * cellRadius + cellRadius,
    }
}

function drawHexGrid(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
    center: Vector2D,
    cellRadius: number,
    maxX: number,
    maxY: number,
    theme: Theme,
    gridColor: ColorName,
) {
    let currentCell = getClosestCellCenter(
        center.x - viewBounds.width / 2,
        center.y - viewBounds.height / 2,
        cellRadius
    );

    const insetStartX = currentCell.x;
    const outsetStartX = currentCell.x - cellRadius * packedWidthRatio / 2;

    let outset = true;

    while (currentCell.y < maxY) {
        while (currentCell.x < maxX) {
            ctx.translate(currentCell.x, currentCell.y);
            
            drawHex(ctx, cellRadius, 3);
            ctx.strokeStyle = theme.palette[gridColor].light;
            ctx.stroke();

            ctx.fillStyle = theme.palette.primary.light;
            ctx.fillText('X', 0, 0);
            
            ctx.translate(-currentCell.x, -currentCell.y);

            currentCell.x += packedWidthRatio * cellRadius;
        }

        currentCell.y += packedHeightRatio * cellRadius;
        currentCell.x = outset
            ? outsetStartX
            : insetStartX;

        outset = !outset;
    }
}

function fillHexCell(
    ctx: CanvasRenderingContext2D,
    cell: Vector2D,
    cellRadius: number,
    theme: Theme,
    fillColor: ColorName
) {
    const currentCell = getClosestCellCenter(
        cell.x,
        cell.y,
        cellRadius
    );

    ctx.translate(currentCell.x, currentCell.y);
            
    drawHex(ctx, cellRadius, 6);

    ctx.fillStyle = theme.palette[fillColor].main;
    ctx.fill();

    ctx.translate(-currentCell.x, -currentCell.y);
}

function drawVessel(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    isLocal: boolean,
    position: Vector2D,
    angle: number,
) {
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    
    ctx.fillStyle = isLocal
        ? theme.palette.text.primary
        : theme.palette.text.secondary;

    ctx.beginPath();

    ctx.moveTo(20, 0);
    ctx.lineTo(-15, 17);
    ctx.lineTo(-9, 0);
    ctx.lineTo(-15, -17);

    ctx.fill();

    ctx.rotate(-angle);
    ctx.translate(-position.x, -position.y);
}

function drawMap(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
    theme: Theme,
    gridColor: ColorName,
    cellRadius: number,
    center: Vector2D,
    highlights: CellHighlights | undefined,
    vessels: ClientVessel[],
    localVessel?: ClientVessel,
) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const minX = (viewBounds.width + cellRadius) / 2 + center.x;
    const minY = (viewBounds.height + cellRadius) / 2 + center.y;
    const maxX = minX + viewBounds.width + cellRadius;
    const maxY = minY + viewBounds.height + cellRadius;

    ctx.translate(viewBounds.width / 2 - center.x, viewBounds.height / 2 - center.y);

    if (highlights) {
        ctx.globalAlpha = 0.33;
        for (const color in highlights) {
            for (const cell of highlights[color as ColorName]!) {
                fillHexCell(ctx, cell, cellRadius, theme, color as ColorName);
            }
        }
        ctx.globalAlpha = 1;
    }

    drawHexGrid(ctx, viewBounds, center, cellRadius, maxX, maxY, theme, gridColor);

    const currentTime = getTime();
    
    for (const vessel of vessels) {
        const position = continuousVectorValue(vessel.position, currentTime);
        // TODO: can it work with discrete, rather than continuous?
        const angle = discreteAngleValue(vessel.angle, currentTime);
        drawVessel(ctx, theme, vessel === localVessel, position, angle);
    }
}
