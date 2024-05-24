import { CellBoard } from '../types/CellBoard';
import { CellType, DisplayCellState } from '../types/CellState';

export function clearOverride(state: CellBoard, cellIndex: number) {    
    // Get the state to restore from overriddenCells.
    const stateToRestore = state.overriddenCells.get(cellIndex);

    if (stateToRestore === undefined) {
        return false;
    }

    // Take it out of overriddenCells, because it's no longer overridden.
    state.overriddenCells.delete(cellIndex);

    // Put its index into overridableCells, so it can be reused.
    state.overridableCells.push(cellIndex);

    // Replace the underlying cell state with this saved overridden state.
    state.underlying[cellIndex] = stateToRestore;

    // Additionally, replace the cell's display state if it isn't obscured.
    if (stateToRestore === null || state.cells[cellIndex]?.type !== CellType.Obscured) {
        state.cells[cellIndex] = stateToRestore as DisplayCellState;
    }

    return true;
}