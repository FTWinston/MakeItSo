import type { CellBoardInfo } from '../types/CellBoard';
import { CellState, CellType, EmptyCell } from '../types/CellState';
import { getAdjacentCells } from './getAdjacentCells';

export type BoardInfoIgnoringErrors = Omit<CellBoardInfo, 'numErrors'>;

interface ResolvableCell {
    index: number;
    type: CellType.Bomb | CellType.Empty;
}

interface CellWithIndex {
    index: number;
    cell: CellState;
}

interface EmptyCellWithIndex {
    index: number;
    cell: EmptyCell;
}

type ResolvableCells = Map<number, CellType.Bomb | CellType.Empty>;

export function getResolvableCells(board: BoardInfoIgnoringErrors): ResolvableCells {
    const rows = Math.ceil(board.cells.length / board.columns);

    const revealedCells = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Empty) {
                output.push({ index, cell });
            }
            return output;
        }, [] as EmptyCellWithIndex[]);
    
    const results: ResolvableCells = new Map();

    let numBombsRemainingTotal = board.numBombs;

    for (const revealedCell of revealedCells) {
        const adjacentCells = getAdjacentCells(revealedCell.index, board.columns, rows)
            .reduce((output, index) => {
                if (index !== null) {
                    const cell = board.cells[index];
                    
                    if (cell !== null) {
                        output.push({ index, cell });
                    }
                }
                return output;
            }, [] as CellWithIndex[]);

        const numRevealedBombsAdjacent = adjacentCells.filter(adjacent => adjacent.cell.type === CellType.Flagged).length
        const numUnrevealedBombsAdjacent = revealedCell.cell.number - numRevealedBombsAdjacent;

        const adjacentObscuredCellIndexes = adjacentCells
            .reduce((adjacencyResults, adjacent) => {
                if (adjacent.cell.type === CellType.Obscured) {
                    adjacencyResults.push(adjacent.index);
                }
                return adjacencyResults;
            }, [] as number[]);

        // Where the number on an empty cell exactly matches the number of adjacent obscured cells minus the number of adjacent bombs,
        // all adjacent obscured cells can be resolved to be bombs.
        if (adjacentObscuredCellIndexes.length === numUnrevealedBombsAdjacent) {
            for (const adjacentObscuredCellIndex of adjacentObscuredCellIndexes) {
                results.set(adjacentObscuredCellIndex, CellType.Bomb);
                numBombsRemainingTotal--;
            }
        }

        // Where the number on an empty cell exactly matches the number of adjacent bombs,
        // all adjacent obscured cells can be resolved to be empty.
        else if (numUnrevealedBombsAdjacent === 0) {
            for (const adjacentObscuredCellIndex of adjacentObscuredCellIndexes) {
                results.set(adjacentObscuredCellIndex, CellType.Empty);
            }
        }

        // If we have more bombs than we have obscured cells, we have a problem.
        else if (numUnrevealedBombsAdjacent > adjacentObscuredCellIndexes.length) {
            throw new Error(`Cell ${revealedCell.index}'s number (${revealedCell.cell.number}) is greater than the number of bombs that could surround it. (${adjacentObscuredCellIndexes.length} obscured cells, ${numRevealedBombsAdjacent} bombs)`);
        }

        else if (numUnrevealedBombsAdjacent > numBombsRemainingTotal) {
            throw new Error(`Cell ${revealedCell.index} has more bombs still to reveal (${numUnrevealedBombsAdjacent}) than the number of bombs remaining on the board (${numBombsRemainingTotal}).`);
        }

        if (numBombsRemainingTotal < 0) {
            throw new Error('Allocated more bombs than there are remaining on the board.');
        }
    }

    const allObscuredCellIndexes = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Obscured && !results.has(index)) {
                output.push(index);
            }
            return output;
        }, [] as number[]);

    if (numBombsRemainingTotal === 0) {
        // No bombs left, every obscured cell can resolve to being empty.
        for (const obscuredCellIndex of allObscuredCellIndexes) {
            if (results.get(obscuredCellIndex) === CellType.Bomb) {
                throw new Error(`Trying to mark cell ${obscuredCellIndex} as a bomb and empty at the same time`);
            }
            results.set(obscuredCellIndex, CellType.Empty);
        }
    }
    else if (numBombsRemainingTotal === allObscuredCellIndexes.length) {
        // Number of bombs left matches the number of obscured cells left.
        for (const obscuredCellIndex of allObscuredCellIndexes) {
            if (results.get(obscuredCellIndex) === CellType.Empty) {
                throw new Error(`Trying to mark cell ${obscuredCellIndex} as empty and a bomb at the same time`);
            }
            results.set(obscuredCellIndex, CellType.Bomb);
        }
    }
    else if (numBombsRemainingTotal > allObscuredCellIndexes.length) {
        // Number of bombs left is greater than the number of obscured cells left.
        throw new Error(`Board has ${numBombsRemainingTotal} bomb left, but only ${allObscuredCellIndexes.length} obscured cells.`);
    }

    return results;
}
