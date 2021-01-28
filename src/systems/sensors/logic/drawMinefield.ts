import { Theme } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';
import { Vector2D } from '../../../common/data/Vector2D';
import { CellState, ClientCell, ClientMinefield, Clue, ClueType } from '../data/MinefieldData';

export interface DisplayInfo {
    pageOffset: Vector2D;
    cellRadius: number;
    viewWidth: number;
    viewHeight: number;
    gridMin: Vector2D;
    gridMax: Vector2D;
    theme: Theme;
}

const gridPadding = 0.5;
const packedWidthRatio = 1.5;
const packedHeightRatio = 1.7320508075688772;

function getPaddedBounds(minefield?: ClientMinefield) {
    if (minefield === undefined) {
        return {
            minX: 0,
            minY: 0,
            maxX: 8,
            maxY: 8,
        };
    }

    let minX = 0;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = packedWidthRatio * minefield.grid.length - 1.5;
    let maxY = Number.MIN_SAFE_INTEGER;

    const insetStartY = packedHeightRatio / 2;
    const outsetStartY = 0;

    let outset = true;

    for (let x = 0; x < minefield.grid.length; x++) {
        const col = minefield.grid[x];

        let yPos = outset
            ? outsetStartY
            : insetStartY;

        for (let y = 0; y < col.length; y++) {
            const cell = col[y];

            if (cell !== null) {
                minY = Math.min(yPos, minY);
                maxY = Math.max(yPos, maxY);
            }

            yPos += packedHeightRatio;
        }
        
        outset = !outset;
    }
    
    minX -= gridPadding + packedWidthRatio * 0.5;
    minY -= gridPadding + packedHeightRatio * 1;

    maxX += gridPadding + packedWidthRatio * 0.5;
    maxY += gridPadding + packedHeightRatio * 1;

    return {
        minX,
        minY,
        maxX,
        maxY
    };
}

export function calculateDisplay(element: HTMLElement, theme: Theme, minefield?: ClientMinefield): DisplayInfo {
    const gridSpaceBounds = getPaddedBounds(minefield);
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

    const bounds = (element.parentElement ?? element)
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
        cellRadius: unitSize,
        viewWidth,
        viewHeight,
        theme,
    };
}

function drawHex(ctx: CanvasRenderingContext2D, radius: number) {
    ctx.beginPath();
    
    let angle, x, y;
    for (let point = 0; point <= 6; point++) {
        angle = 2 * Math.PI / 6 * point;
        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);

        if (point === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
}

// TODO: this was for pointy-top hexagons, not flat-top ones like we use here.
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

function drawBackground(ctx: CanvasRenderingContext2D, display: DisplayInfo) {
    ctx.fillStyle = display.theme.palette.background.paper;
    ctx.fillRect(0, 0, display.viewWidth, display.viewHeight);
}

function getFillColor(state: CellState, palette: Palette) {
    switch (state) {
        case CellState.Unknown:
            return palette.secondary.main;
        case CellState.Marked:
            return palette.primary.main;
        default:
            return palette.background.default;
    }
}

function drawClue(ctx: CanvasRenderingContext2D, display: DisplayInfo, clue: Clue) {
    ctx.fillStyle = display.theme.palette.text.primary;

    ctx.beginPath();

    let text: string;
    switch (clue.type) {
        case ClueType.Adjacent:
            text = `{${clue.number}}`;
            break;
        case ClueType.NonAdjacent:
            text = `-${clue.number}-`;
            break;
        case ClueType.Nearby:
            text = `[${clue.number}]`;
            break;
        default:
            text = `${clue.number}`;
            break;
    }

    ctx.fillText(text, 0, 0);
    ctx.fill();
}

function drawCell(ctx: CanvasRenderingContext2D, display: DisplayInfo, cell: ClientCell) {
    ctx.fillStyle = getFillColor(cell.state, display.theme.palette);
    drawHex(ctx, display.cellRadius * 0.9);
    ctx.fill();

    ctx.clip();
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = display.cellRadius * 0.2;
    ctx.strokeStyle = '#111';
    ctx.stroke();

    ctx.globalAlpha = 1;

    if (cell.state === CellState.Revealed && cell.content?.clue) {
        drawClue(ctx, display, cell.content.clue);
    }
}

export function drawMinefield(ctx: CanvasRenderingContext2D, display: DisplayInfo, minefield?: ClientMinefield) {
    drawBackground(ctx, display);

    if (!minefield) {
        return;
    }

    ctx.translate(-display.gridMin.x * display.cellRadius, -display.gridMin.y * display.cellRadius);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(display.cellRadius * 0.75)}px ${display.theme.typography.fontFamily}`;

    const insetStartY = display.cellRadius * packedHeightRatio / 2;
    const outsetStartY = 0;

    // Draw the cells themselves.
    let outset = true;

    for (let x = 0; x < minefield.grid.length; x++) {
        const col = minefield.grid[x];

        let xPos = packedWidthRatio * display.cellRadius * x;
        
        let yPos = outset
            ? outsetStartY
            : insetStartY;

        for (let y = 0; y < col.length; y++) {
            const cell = col[y];

            if (cell !== null) {
                ctx.save();
                ctx.translate(xPos, yPos);
                drawCell(ctx, display, cell);
                ctx.restore();
            }

            yPos += packedHeightRatio * display.cellRadius;
        }
        
        outset = !outset;
    }

    // Now draw column clues.
    if (minefield.columns) {
        outset = true;

        for (let x = 0; x < minefield.columns.length; x++) {
            const clue = minefield.columns[x];
            if (clue !== null) {
                let xPos = packedWidthRatio * display.cellRadius * x;
                
                let yPos = outset
                    ? outsetStartY - packedHeightRatio * display.cellRadius
                    : insetStartY - packedHeightRatio * display.cellRadius;

                ctx.translate(xPos, yPos);

                drawClue(ctx, display, clue);
                
                ctx.translate(-xPos, -yPos);
            }

            outset = !outset;
        }
    }
}