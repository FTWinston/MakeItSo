import { CellBoard } from '../types/CellBoard';
import { CellType, DisplayCellState, UnderlyingCellState } from '../types/CellState';

export function overrideCell(state: CellBoard, cellIndex: number, overridingCellState: UnderlyingCellState, overridingDisplayCellState: DisplayCellState) {
    // Put state of that actual cell into overriddenCells.
    const overriddenCell = state.underlying[cellIndex]!;
    state.overriddenCells.set(cellIndex, overriddenCell);

    // Replace the underlying cell with the action's cell state.
    state.underlying[cellIndex] = overridingCellState;

    // Additionally, replace the cell's display state if it isn't obscured.
    if (state.cells[cellIndex]?.type !== CellType.Obscured) {
        state.cells[cellIndex] = overridingDisplayCellState;
    }
}