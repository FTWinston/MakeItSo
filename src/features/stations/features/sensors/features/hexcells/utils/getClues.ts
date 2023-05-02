import { MinimumResolvableBoardInfo } from '../types/CellBoard';
import { CellType, EmptyCell, RadiusClue, RowClue } from '../types/CellState';
import { Clue, ClueMap } from '../types/Clue';
import { getAdjacentIndexes, getIndexesInRadius, getIndexesInRow } from './indexes';

/** Get a map of all clues currently on the board. */
export function getClues(board: MinimumResolvableBoardInfo): ClueMap {
    const info = new Map();
    
    addAvailableClues(board, info);

    return info;
}

/** Get the number of indexes provided that represent obscured cells. */
function updateClue(clue: Clue, board: MinimumResolvableBoardInfo) {
    let obscuredIndexes: number[] = [];
    let numBombsRevealed = 0;

    for (const index of clue.associatedIndexes) {
        if (index === null) {
            continue;
        }

        const cell = board.cells[index];
        if (cell === null) {
            continue;
        }

        if (cell.type === CellType.Obscured) {
            obscuredIndexes.push(index);
        }
        else if (cell.type === CellType.Bomb) {
            numBombsRevealed ++;
        }
    }

    const cell = board.cells[clue.clueIndex] as EmptyCell | RowClue | RadiusClue;

    clue.associatedObscuredIndexes = obscuredIndexes;
    clue.numObscuredBombs = cell.number - numBombsRevealed;
}

/** Any empty, row or radius clue cell without an associated clue should have one added. */
function addAvailableClues(board: MinimumResolvableBoardInfo, clues: ClueMap) {
    const rows = Math.ceil(board.cells.length / board.columns);

    for (let index = 0; index < board.cells.length; index++) {
        if (clues.has(index)) {
            continue;
        }

        const cell = board.cells[index];
        if (!cell) {
            continue;
        }

        let associatedIndexes: Array<number | null>;
        let loop: boolean;

        if (cell.type === CellType.Empty) {
            associatedIndexes = getAdjacentIndexes(index, board.columns, rows);
            loop = true;
        }
        else if (cell.type === CellType.RowClue) {
            associatedIndexes = getIndexesInRow(index, cell.direction, board.columns, rows)
            loop = false;
        }
        else if (cell.type === CellType.RadiusClue) {
            associatedIndexes = getIndexesInRadius(index, board.columns, rows);
            loop = false;
        }
        else {
            continue;
        }

        if (associatedIndexes.some(index => index !== null && board.cells[index]?.type === CellType.Obscured)) {
            const clue: Clue = {
                clueIndex: index,
                associatedIndexes,
                countType: cell.countType,
                loop,
                associatedObscuredIndexes: [],
                numObscuredBombs: 0,
            };

            updateClue(clue, board);

            clues.set(index, clue);
        }
    }
}

/** Update numUnresolved on existing clues, and add any new clues. */
export function updateClues(board: MinimumResolvableBoardInfo, clues: ClueMap) {
    for (const clue of clues.values()) {
        if (clue.numObscuredBombs !== 0) { // If a clue previously resolved all of its bombs, don't bother updating it.
            updateClue(clue, board);
        }
    }

    addAvailableClues(board, clues);
}