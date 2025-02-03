import { CellId, MazeState, UnderlyingCellState } from '../types/Maze';

export function findCell(state: MazeState, x: number, y: number): UnderlyingCellState | null {
    const row = state.underlyingCells[y];

    if (!row || x < 0 || x >= row.length) {
        return null;
    }

    return getCellById(state.cellsById, row[x]);
}

export function getCell(state: MazeState, id: CellId): UnderlyingCellState {
    const cell = state.cellsById.get(id);

    if (!cell) {
        throw new Error(`Cell ${id} not found`);
    }

    return cell;
}

export function getCellById(cellsById: ReadonlyMap<CellId, UnderlyingCellState>, id: CellId): UnderlyingCellState {
    const cell = cellsById.get(id);

    if (!cell) {
        throw new Error(`Cell ${id} not found`);
    }

    return cell;
}
