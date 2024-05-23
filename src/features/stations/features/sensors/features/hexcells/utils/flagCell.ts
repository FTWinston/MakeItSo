import { CellBoard } from '../types/CellBoard';
import { CellType, DisplayCellState, UnderlyingCellState } from '../types/CellState';
import { markCluesAsResolved } from './resolved';

/**
 * Return a display state for a given cell being successfully flagged as a bomb,
 * and update the state to account for the flagging.
 */
export function flagCell(state: CellBoard, underlyingCell: UnderlyingCellState & { type: CellType.Bomb }): DisplayCellState {
    state.numBombsLeft--;

    // Mark any associated clues as fully resolved.
    markCluesAsResolved(state, underlyingCell.clueIndexes);
    
    // Success when the last obscured cell is flagged.
    if (!state.cells.some(cell => cell?.type === CellType.Obscured)) {
        state.result = 'success';
    }
    // Success when the last obscured cell is revealed.
    if (!state.cells.some(cell => cell?.type === CellType.Obscured)) {
        state.result = 'success';
    }

    return { type: CellType.Bomb };
}
