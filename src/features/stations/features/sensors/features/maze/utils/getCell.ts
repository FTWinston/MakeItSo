import { MazeState, UnderylingCellState } from '../types/Maze';

export function getCell(state: MazeState, x: number, y: number): UnderylingCellState | null {
    const row = state.underlyingCells[y];

    if (!row || x < 0 || x >= row.length) {
        return null
    }

    return row[x];   
}
