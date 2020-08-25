import React, { useRef, useCallback, useState } from 'react';
import { Theme, useTheme } from '@material-ui/core';
import { useGesture } from 'react-use-gesture'
import { Canvas } from './Canvas';
import { Vector2D } from '../../data/Vector2D';
import { ClientVessel } from '../../data/ClientVessel';
import { continuousVectorValue, discreteNumberValue } from '../../data/Interpolation';
import { getTime } from '../../data/Progression';
import { ColorName } from './Colors';

export type CellHighlights = Partial<Record<ColorName, Vector2D[]>>;

interface Props {
    className?: string;
    gridColor: ColorName;
    vessels: ClientVessel[];
    localVessel?: ClientVessel;
    onCellTap?: (pos: Vector2D) => void;
    onCellLongPress?: (pos: Vector2D) => void; // TODO: use this
    highlightCells?: CellHighlights;
}

let startDistance = 32;

export const SpaceMap: React.FC<Props> = props => {
    const canvas = useRef<HTMLCanvasElement>(null);

    // TODO: could useSpring to have this snap back to the local vessel position when released?
    // ...but with a very low spring coefficient?
    const [offset, setOffset] = useState<Vector2D>(() => {
        if (!props.localVessel) {
            return { x: 0, y: 0 };
        }

        return continuousVectorValue(props.localVessel.position);
    });

    const [cellRadius, setCellRadius] = useState(32);

    const theme = useTheme();

    const { gridColor, onCellTap, onCellLongPress } = props;

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, bounds: DOMRect) => drawMap(ctx, bounds, theme, gridColor, cellRadius, offset, props.highlightCells, props.vessels, props.localVessel),
        [cellRadius, theme, offset, gridColor, props.highlightCells, props.vessels, props.localVessel]
    );

    const bind = useGesture({
        onDrag: ({ movement: [mx, my] }) => {
            setOffset({
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
        onClick: onCellTap
            ? e => {
                const { x, y } = getWorldCoordinates(canvas.current!, offset, e);
                onCellTap(getClosestCellCenter(x, y, cellRadius))
            }
            : undefined,
    }, {
        drag: {
            initial: () => [-offset.x, -offset.y],
        },
    });

    return (
        <Canvas
            ref={canvas}
            className={props.className}
            animate={true}
            draw={draw}
            {...bind()}
        />
    )
}

const packedWidthRatio = 1.7320508075688772;
const packedHeightRatio = 1.5;

function getWorldCoordinates(
    canvas: HTMLCanvasElement,
    offset: Vector2D,
    event: React.MouseEvent<Element, MouseEvent>
): Vector2D {
    const bounds = canvas.getBoundingClientRect();
    const x = event.pageX - bounds.x + offset.x - bounds.width / 2;
    const y = event.pageY - bounds.y + offset.y - bounds.height / 2;
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

function getClosestCellCenter(x: number, y: number, cellRadius: number) {
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
    
    ctx.fillStyle = isLocal
        ? theme.palette.text.primary
        : theme.palette.text.secondary;

    ctx.beginPath();

    ctx.arc(0, 0, 20, 0, Math.PI * 2);

    ctx.fill();

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
        const angle = discreteNumberValue(vessel.angle, currentTime);
        drawVessel(ctx, theme, vessel === localVessel, position, angle);
    }
}
