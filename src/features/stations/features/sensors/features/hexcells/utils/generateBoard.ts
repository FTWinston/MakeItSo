import { getRandomInt } from 'src/utils/random';
import type { CellBoardDefinition } from '../types/CellBoard';
import { CellState, CellType, CountType, UnderlyingCellState } from '../types/CellState';
import { getAdjacentCells, getCellsInRadius } from './getAdjacentCells';
import { ShapeConfig, generateBoardShape } from './generateBoardShape';

/** Replace random cells with copies of the given template. */
function assignCells(board: Array<UnderlyingCellState | null>, numToAssign: number, assignTemplate: UnderlyingCellState) {
    for (let i = 0; i < numToAssign; i++) {
        let boardIndex: number;
        let existingCell: UnderlyingCellState | null;

        do {
            boardIndex = getRandomInt(board.length);
            existingCell = board[boardIndex];
        } while (existingCell?.type !== CellType.Empty);

        board[boardIndex] = { ...assignTemplate };
    }
}

/** Replace random display cells with their underlying version. */
function revealCells(underlying: Array<UnderlyingCellState | null>, display: Array<CellState | null>, numToReveal: number) {
    for (let i = 0; i < numToReveal; i++) {
        let testIndex: number;
        let testUnderlying: UnderlyingCellState | null;
        let testDisplay: CellState | null;

        do {
            testIndex = getRandomInt(underlying.length);
            testUnderlying = underlying[testIndex];
            testDisplay = display[testIndex];
        } while (testUnderlying?.type !== CellType.Empty || testDisplay?.type !== CellType.Obscured);

        display[testIndex] = underlying[testIndex]
    }
}

/** Returns true of there are `numTrue` true values consecutively in `values`, looping from the end of the array back to the start. */
function areContiguous(values: boolean[], numTrue: number) {
    const startIndex = values[0]
        ? values.lastIndexOf(false) // If first value is true, start at last false value.
        : values.indexOf(true) - 1; // If first value is false, start at first true value - 1.

    for (let i = startIndex + 1; numTrue > 0; i++, numTrue--) {
        if (i >= values.length) {
            i = 0;
        }

        if (!values[i]) {
            return false;
        }
    }

    return true;
}

/** Count number of adjacent bombs for each cell. */
function setCounts(
    board: Array<UnderlyingCellState | null>,
    columns: number,
    rows: number,
    contiguousClueFraction: number,
    splitClueFraction: number,
) {
    for (let i = 0; i < board.length; i++) {
        const cell = board[i];
        if (cell?.type === CellType.Empty) {
            const adjacentCellsAreBombs = getAdjacentCells(i, columns, rows)
                .map(test => test !== null && board[test]?.type === CellType.Bomb);

            const numAdjacent = adjacentCellsAreBombs.filter(isBomb => isBomb).length;

            cell.countType = CountType.Normal;
            cell.number = numAdjacent;

            if (numAdjacent > 1) {
                if (areContiguous(adjacentCellsAreBombs, numAdjacent)) {
                    if (Math.random() < contiguousClueFraction) {
                        cell.countType = CountType.Contiguous;
                    }
                }
                else if (Math.random() < splitClueFraction) {
                    cell.countType = CountType.Split;
                }
            }
        }
        else if (cell?.type === CellType.RadiusClue) {
            const numInRadius = getCellsInRadius(i, columns, rows)
                .filter(test => board[test]?.type === CellType.Bomb)
                .length;

            cell.countType = CountType.Normal;
            cell.number = numInRadius;
        }
    }
}

export interface GenerationConfig extends ShapeConfig {
    /** Fraction of valid cells that are bombs. Lower values are easier. */
    bombFraction: number;

    /** Fraction of cells that start revealed. Higher values are easier. */
    revealFraction?: number;

    /** Fraction of valid (non-bomb) cells that are replaced by a "radius" clue. Higher values are easier. */
    radiusClueFraction?: number;

    /** Fraction of valid (non-bomb) cells that show a ? instead of a cell count. Lower values are easier. */
    unknownFraction?: number;

    /** Fraction of rows (along any axis) that get a row clue. Higher values are easier. */
    rowClueFraction?: number;

    /** Chance of using a contiguous clue when a cell has contiguous bombs. */
    contiguousClueFraction?: number;

    /** Chance of using a split clue when a cell has non-contiguous bombs. */
    splitClueFraction?: number;
}

function mustStartedRevealed(cell: UnderlyingCellState | null) {
    return cell === null
        || cell.type === CellType.RadiusClue
        || cell.type === CellType.IndicatorVertical
        || cell.type === CellType.IndicatorTLBR
        || cell.type === CellType.IndicatorTRBL;
}

export function generateBoard(config: GenerationConfig): CellBoardDefinition { 
    const { rows, columns, cells: underlying } = generateBoardShape(config, {
        type: CellType.Empty,
        countType: CountType.Normal,
        number: 0,
    });

    let numNormalCells = config.numCells;
    
    if (config.bombFraction && config.bombFraction > 0) {
        const numBombCells = Math.round(numNormalCells * config.bombFraction);
        assignCells(underlying, numBombCells, { type: CellType.Bomb });
        numNormalCells -= numBombCells;
    }

    if (config.unknownFraction && config.unknownFraction > 0) {
        const numUnknownCells = Math.round(numNormalCells * config.unknownFraction);
        assignCells(underlying, numUnknownCells, { type: CellType.Unknown });
        numNormalCells -= numUnknownCells;
    }

    if (config.radiusClueFraction && config.radiusClueFraction > 0) {
        const numRadiusClues = Math.round(numNormalCells * config.radiusClueFraction);
        assignCells(underlying, numRadiusClues, { type: CellType.RadiusClue, countType: CountType.Normal, number: 0 });
        numNormalCells -= numRadiusClues;
    }

    // TODO: use rowClueFraction

    setCounts(underlying, columns, rows, config.contiguousClueFraction ?? 0, config.splitClueFraction ?? 0);

    const display: Array<CellState | null> = underlying
        .map(cell => mustStartedRevealed(cell) ? cell : { type: CellType.Obscured });

    if (config.revealFraction && config.revealFraction > 0) {
        const numToReveal = Math.round(numNormalCells * config.revealFraction);
        revealCells(underlying, display, numToReveal);
    }

    return {
        cells: display,
        columns,
        underlying,
    }
}
