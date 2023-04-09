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

export function getResolvableCells(board: BoardInfoIgnoringErrors): ResolvableCell[] {
    const rows = Math.ceil(board.cells.length / board.columns);

    const revealedCells = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Empty) {
                output.push({ index, cell });
            }
            return output;
        }, [] as EmptyCellWithIndex[]);
    
    const results: ResolvableCell[] = [];

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

        const numberUnrevealedBombs = revealedCell.cell.number
            - adjacentCells.filter(adjacent => adjacent.cell.type === CellType.Flagged).length;

        const adjacentObscuredCellIndexes = adjacentCells
            .reduce((output, adjacent) => {
                if (adjacent.cell.type === CellType.Obscured) {
                    output.push(adjacent.index);
                }
                return output;
            }, [] as number[]);

        // Where the number on an empty cell exactly matches the number of adjacent obscured cells minus the number of adjacent bombs,
        // all adjacent obscured cells can be resolved to be bombs.
        if (adjacentObscuredCellIndexes.length === numberUnrevealedBombs) {
            for (const adjacentObscuredCellIndex of adjacentObscuredCellIndexes) {
                results.push({
                    index: adjacentObscuredCellIndex,
                    type: CellType.Bomb,
                });
            }
        }

        // Where the number on an empty cell exactly matches the number of adjacent bombs,
        // all adjacent obscured cells can be resolved to be empty.
        else if (numberUnrevealedBombs === 0) {
            for (const adjacentObscuredCellIndex of adjacentObscuredCellIndexes) {
                results.push({
                    index: adjacentObscuredCellIndex,
                    type: CellType.Empty,
                });
            }
        }
    }

    return results;
}
