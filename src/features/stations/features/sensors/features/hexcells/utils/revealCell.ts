import { CellBoard } from '../types/CellBoard';
import { CellType, DisplayCellState, UnderlyingCellState } from '../types/CellState';
import { isClueResolved, markCluesAsResolved } from './resolved';

/**
 * Return a display state for a given cell being successfully revealed,
 * and update the state to account for the revealing.
 */
export function revealCell(state: CellBoard, underlyingCell: UnderlyingCellState): DisplayCellState {
    const displayCell: DisplayCellState = underlyingCell.type === CellType.AdjacentClue
        ? { // Copy the underlying cell, without copying linked/associated cell data.
            type: underlyingCell.type,
            countType: underlyingCell.countType,
            number: underlyingCell.number,
            targetIndexes: underlyingCell.targetIndexes,
            resolved: isClueResolved(state, underlyingCell.targetIndexes),
        }
        : underlyingCell as DisplayCellState; // Should just be "unknown" cells.

    // Mark any associated clues as fully resolved.
    if (underlyingCell.type === CellType.AdjacentClue || underlyingCell.type === CellType.Unknown) {
        markCluesAsResolved(state, underlyingCell.clueIndexes);
    }

    // Success when the last obscured cell is revealed.
    if (!state.cells.some(cell => cell?.type === CellType.Obscured)) {
        state.result = 'success';
    }

    return displayCell;
}
