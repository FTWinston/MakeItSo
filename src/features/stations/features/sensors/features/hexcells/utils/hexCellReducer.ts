import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType, DisplayCellState } from '../types/CellState';
import { isClueResolved, isObscured, markCluesAsResolved } from './resolved';

export function hexCellReducer(state: CellBoard, action: CellBoardAction): void {
    switch (action.type) {
        case 'reveal': {
            if (state.result) {
                return;
            }
            
            const currentState = state.cells[action.index];
            if (!isObscured(currentState)) {
                return;
            }

            const underlyingState = state.underlying[action.index];
            if (underlyingState === null) {
                return;
            }

            if (underlyingState.type === CellType.Bomb) {
                state.cells[action.index] = {
                    type: CellType.Exploded,
                };

                state.result = 'failure';
                state.errorIndex = action.index;
                state.numErrors ++;
                return;
            }
            
            if (underlyingState.type === CellType.AdjacentClue) {
                // Copy the underlying cell, without copying linked/associated cell data.
                const display: DisplayCellState = {
                    type: underlyingState.type,
                    countType: underlyingState.countType,
                    number: underlyingState.number,
                    targetIndexes: underlyingState.targetIndexes,
                    resolved: isClueResolved(state, underlyingState.targetIndexes),
                };

                state.cells[action.index] = display;
            }
            else {
                // Should just be "unknown" cells.
                state.cells[action.index] = underlyingState as DisplayCellState;
            }

            // Mark any associated clues as fully resolved.
            if (underlyingState.type === CellType.AdjacentClue || underlyingState.type === CellType.Unknown) {
                markCluesAsResolved(state, underlyingState.clueIndexes);
            }

            // Success when the last obscured cell is revealed.
            if (!state.cells.some(cell => cell?.type === CellType.Obscured)) {
                state.result = 'success';
            }
            return;
        }
        case 'flag': {
            if (state.result) {
                return;
            }

            const currentState = state.cells[action.index];
            if (!isObscured(currentState)) {
                return;
            }

            const underlyingState = state.underlying[action.index];
            if (underlyingState?.type !== CellType.Bomb) {
                state.errorIndex = action.index;
                state.numErrors ++;
                return;
            }

            state.cells[action.index] = { type: CellType.Bomb };

            state.numBombsLeft--;

            // Mark any associated clues as fully resolved.
            markCluesAsResolved(state, underlyingState.clueIndexes);
            
            // Success when the last obscured cell is flagged.
            if (!state.cells.some(cell => cell?.type === CellType.Obscured)) {
                state.result = 'success';
            }

            return;
        }
        case 'override cell': {
            // Get the first overridable cell index.
            const indexToOverride = state.overridableCells.shift();
            if (indexToOverride === undefined) {
                return;
            }

            // Put state of that actual cell into overriddenCells.
            state.overriddenCells.push({ index: indexToOverride, state: state.underlying[indexToOverride]! });

            // Replace the underlying cell with the action's cell state.
            state.underlying[indexToOverride] = action.state;

            // Additionally, replace the cell's display state if it isn't obscured.
            if (action.state === null || state.cells[indexToOverride]?.type !== CellType.Obscured) {
                state.cells[indexToOverride] = action.state as DisplayCellState;
            }
            return;
        }
        case 'restore cell': {
            // Get the first overridden cell.
            const overriddenCell = state.overriddenCells.shift();
            if (overriddenCell === undefined) {
                return;
            }

            // Put its index into overridable cells, so it can be reused.
            state.overridableCells.push(overriddenCell.index);

            // Replace the underlying cell state with this saved overridden state.
            state.underlying[overriddenCell.index] = overriddenCell.state;

            // Additionally, replace the cell's display state if it isn't obscured.
            if (overriddenCell.state === null || state.cells[overriddenCell.index]?.type !== CellType.Obscured) {
                state.cells[overriddenCell.index] = overriddenCell.state as DisplayCellState;
            }
            return;
        }
        default:
            throw new UnexpectedValueError(action);
    }
}

