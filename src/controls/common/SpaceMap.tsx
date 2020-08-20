import React, { useRef, useCallback, useState } from 'react';
import { Theme, useTheme } from '@material-ui/core';
import { useGesture } from 'react-use-gesture'
import { Canvas } from './Canvas';
import { Vector2D } from '../../data/Vector2D';

type ColorName = 'primary' | 'secondary';

interface Props {
    className?: string;
    gridColor: ColorName;
}

let startDistance = 32;

export const SpaceMap: React.FC<Props> = props => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const [offset, setOffset] = useState<Vector2D>({ x: 0, y: 0 });

    const [cellRadius, setCellRadius] = useState(32);

    const theme = useTheme();

    const { gridColor } = props;

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, bounds: DOMRect) => drawSpace(ctx, bounds, theme, gridColor, cellRadius, offset),
        [cellRadius, theme, offset, gridColor]
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
    }, {
        drag: {
            initial: () => [offset.x, offset.y],
        },
    });

    return (
        <Canvas
            ref={canvas}
            className={props.className}
            draw={draw}
            {...bind()}
        />
    )
}

const packedWidthRatio = 1.7320508075688772;
const packedHeightRatio = 1.5;

function drawHex(ctx: CanvasRenderingContext2D, theme: Theme, color: ColorName, radius: number) {
    ctx.beginPath();
    
    let angle, x, y;
    for (let point = 0; point < 4; point++) {
        angle = 2 * Math.PI / 6 * (point + 0.5);
        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);

        if (point === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = theme.palette[color].light;
    ctx.stroke();

    ctx.fillStyle = theme.palette.primary.light;
    ctx.fillText('X', 0, 0);
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

function drawSpace(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
    theme: Theme,
    gridColor: 'primary' | 'secondary',
    cellRadius: number,
    center: Vector2D,
) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const minX = (viewBounds.width + cellRadius) / 2 + center.x;
    const minY = (viewBounds.height + cellRadius) / 2 + center.y;
    const maxX = minX + viewBounds.width + cellRadius;
    const maxY = minY + viewBounds.height + cellRadius;

    ctx.translate(viewBounds.width / 2 - center.x, viewBounds.height / 2 - center.y);

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
            drawHex(ctx, theme, gridColor, cellRadius);
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
