import { MinimumResolvableBoardInfo } from '../types/CellBoard';
import { CellType, CountType } from '../types/CellState';
import { getAdjacentIndexes, getIndexesInRadius, getIndexesInRow } from './getAdjacentIndexes';

export interface ClueSolverInfo {
    clueIndex: number;
    associatedIndexes: Array<number | null>;
    loop: boolean;
    countType: CountType;
    resolved: boolean;
}

export type SolverInfo = Map<number, ClueSolverInfo>;

export function getSolverInfo(board: MinimumResolvableBoardInfo): SolverInfo {
    const info = new Map();
    
    addAvailableClues(board, info);

    return info;
}

export function resolveSolvedClues(board: MinimumResolvableBoardInfo, clueSolvers: SolverInfo) {
    const toResolve = [...clueSolvers.values()]
        .filter(clue => !clue.associatedIndexes.some(index => index !== null && board.cells[index]?.type === CellType.Obscured))
    
    for (const clue of toResolve) {
        clue.resolved = true;
    }
}

export function addAvailableClues(board: MinimumResolvableBoardInfo, clueSolvers: SolverInfo) {
    const rows = Math.ceil(board.cells.length / board.columns);

    for (let index = 0; index < board.cells.length; index++) {
        if (clueSolvers.has(index)) {
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
            clueSolvers.set(index, {
                clueIndex: index,
                associatedIndexes,
                countType: cell.countType,
                loop,
                resolved: false,
            });
        }
    }
}
