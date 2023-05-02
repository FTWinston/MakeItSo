import { MinimumResolvableBoardInfo } from '../types/CellBoard';
import { CellType } from '../types/CellState';
import { ClueMap } from '../types/Clue';
import { getAdjacentIndexes, getIndexesInRadius, getIndexesInRow } from './indexes';

/** Get a map of all clues currently on the board. */
export function getClues(board: MinimumResolvableBoardInfo): ClueMap {
    const info = new Map();
    
    addAvailableClues(board, info);

    return info;
}

/** Any clue with no associated obscured cells is resolved. */
function resolveSolvedClues(board: MinimumResolvableBoardInfo, clues: ClueMap) {
    for (const clue of clues.values()) {
        if (!clue.associatedIndexes.some(index => index !== null && board.cells[index]?.type === CellType.Obscured)) {
            clue.resolved = true;
        }
    }
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
            clues.set(index, {
                clueIndex: index,
                associatedIndexes,
                countType: cell.countType,
                loop,
                resolved: false,
            });
        }
    }
}

/** Resolve clues where appropriate, add any new ones. */
export function updateClues(board: MinimumResolvableBoardInfo, clues: ClueMap) {
    resolveSolvedClues(board, clues);
    addAvailableClues(board, clues);
}