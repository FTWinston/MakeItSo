import { CellBoard } from '../types/CellBoard';
import { CellType, DisplayCellState, UnderlyingCellState } from '../types/CellState';

export function clearOverride(state: CellBoard, cellIndex: number, stateToRestore: UnderlyingCellState | null) {    
    // Put its index into overridable cells, so it can be reused.
    state.overridableCells.push(cellIndex);

    // Replace the underlying cell state with this saved overridden state.
    state.underlying[cellIndex] = stateToRestore;

    // Additionally, replace the cell's display state if it isn't obscured.
    if (stateToRestore === null || state.cells[cellIndex]?.type !== CellType.Obscured) {
        state.cells[cellIndex] = stateToRestore as DisplayCellState;
    }
}