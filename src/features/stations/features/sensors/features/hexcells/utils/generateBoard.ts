import { getRandomInt } from 'src/utils/random';
import type { CellBoardDefinition } from '../types/CellBoard';
import { CellState, CellType, CountType, UnderlyingCellState } from '../types/CellState';
import { getAdjacentCells } from './getAdjacentCells';

/** Decide bounds based on number of cells */
function determineSize(numCells: number) {
    const sqrt = Math.sqrt(numCells);
    
    let rows = Math.ceil(sqrt);
    let columns = Math.floor(sqrt);

    return { rows, columns };
}

/** Mark random cells as null */
function removeCells(board: Array<UnderlyingCellState | null>, targetNumCells: number) {
    const numToRemove = board.length - targetNumCells

    for (let i = 0; i < numToRemove; i++) {
        let testIndex: number;
        do {
            testIndex = getRandomInt(board.length);
        } while (board[testIndex] === null);

        board[testIndex] = null;
    }
}

/** Mark random cells as bombs */
function placeBombs(board: Array<UnderlyingCellState | null>, numBombs: number) {
    for (let i = 0; i < numBombs; i++) {
        let testCell: UnderlyingCellState | null;

        do {
            let testIndex = getRandomInt(board.length);
            testCell = board[testIndex];
        } while (testCell === null || testCell.type === CellType.Bomb);

        testCell.type = CellType.Bomb;
    }
}

/** Count number of adjacent bombs for each cell */
function setCounts(board: Array<UnderlyingCellState | null>, columns: number, rows: number) {
    for (let i = 0; i < board.length; i++) {
        const cell = board[i];
        if (cell?.type !== CellType.Revealed) {
            continue;
        }

        const numAdjacent = getAdjacentCells(i, columns, rows)
            .filter(test => board[test]?.type === CellType.Bomb)
            .length;

        cell.countType = CountType.Normal;
        cell.number = numAdjacent;
    }
}


export function generateBoard(numCells: number, numBombs: number): CellBoardDefinition {
    const { rows, columns } = determineSize(numCells);

    const underlying: Array<UnderlyingCellState | null> = new Array(rows * columns)
        .fill(0)
        .map(() => ({
            type: CellType.Revealed,
            countType: CountType.Normal,
            number: 0,
        }));

    removeCells(underlying, numCells);
    
    placeBombs(underlying, numBombs);

    setCounts(underlying, columns, rows);

    const display: Array<CellState | null> = underlying
        .map(cell => cell === null ? null : { type: CellType.Obscured });

    return {
        cells: display,
        columns,
        underlying,
    }
}
