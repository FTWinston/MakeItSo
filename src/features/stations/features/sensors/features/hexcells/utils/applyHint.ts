import { CellBoard } from '../types/CellBoard';
import { DisplayCellState } from '../types/CellState';
import { isObscured } from './resolved';

/**
 * Find the first valid hint cell, and assign it to the result of the apply function, unless that returns false.
 * Also removes invalid hints prior to the applied one.
 * Returns true if a hint was found and successfully applied.
 */
export function applyHint(state: CellBoard, apply: (index: number) => DisplayCellState | false): boolean {
    for (let i = 0; i < state.hints.length; i++) {
        const hintIndex = state.hints[i];
        const hintCell = state.cells[hintIndex];

        // When we find a still-valid hint, apply that, and remove any prior hints, as they're all no longer valid.
        if (isObscured(hintCell)) {
            const result = apply(hintIndex);
            if (result === false) {
                return false;
            }
            state.cells[hintIndex] = result;
            state.hints.splice(0, i);
            return true;
        }
    }

    return false;
}

