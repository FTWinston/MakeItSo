import { Theme } from '@mui/material/styles';
import { ColorName } from 'src/types/Colors';
import { Vector2D } from 'src/types/Vector2D';

const packedWidthRatio = 1.7320508075688772;
const packedHeightRatio = 1.5;

export function drawHex(ctx: CanvasRenderingContext2D, radius: number, numPoints: number) {
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

export function drawHexGrid(
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = theme.palette[gridColor].light;
    ctx.fillStyle = theme.palette.primary.light;

    while (currentCell.y < maxY) {
        while (currentCell.x < maxX) {
            ctx.translate(currentCell.x, currentCell.y);
            
            drawHex(ctx, cellRadius, 3);
            ctx.stroke();

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
