import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType, DisplayCellState } from '../types/CellState';
import { isObscured } from './resolved';
import { applyBoost } from './applyBoost';
import { revealCell } from './revealCell';
import { flagCell } from './flagCell';

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
                state.errorIndex = action.index;
                
                if (state.protectErrors) {
                    state.protectErrors = false;
                }
                else {
                    state.cells[action.index] = {
                        type: CellType.Exploded,
                    };
                    
                    state.result = 'failure';
                    state.numErrors ++;
                }
                return;
            }
            
            state.cells[action.index] = revealCell(state, underlyingState);
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
            if (underlyingState?.type === CellType.Bomb) {
                state.cells[action.index] = flagCell(state, underlyingState);
            }
            else {
                state.errorIndex = action.index;
                if (state.protectErrors) {
                    state.protectErrors = false;
                }
                else {
                    state.numErrors ++;
                }
            }

            return;
        }
        case 'override cells': {
            const fraction = Math.min(1, Math.max(0, action.fraction));
            const targetOverridenNumber = Math.round(fraction * (state.overridableCells.length + state.overriddenCells.size));
            
            if (targetOverridenNumber > state.overriddenCells.size) {
                // Override this many cells.
                const numToOverride = targetOverridenNumber - state.overriddenCells.size;

                for (let i = 0; i < numToOverride; i++) {
                    // Get the first overridable cell index.
                    const indexToOverride = state.overridableCells.shift()!;

                    // Put state of that actual cell into overriddenCells.
                    const overriddenCell = state.underlying[indexToOverride]!;
                    state.overriddenCells.set(indexToOverride, overriddenCell);

                    // Replace the underlying cell with the action's cell state.
                    state.underlying[indexToOverride] = { type: CellType.Unknown, clueIndexes: overriddenCell.type === CellType.AdjacentClue ? overriddenCell.clueIndexes : [] };

                    // Additionally, replace the cell's display state if it isn't obscured.
                    if (state.cells[indexToOverride]?.type !== CellType.Obscured) {
                        state.cells[indexToOverride] = { type: CellType.Unknown }
                    }
                }
            }
            else {
                // Restore this many cells.
                const numToRestore = state.overriddenCells.size - targetOverridenNumber;

                for (let i = 0; i < numToRestore; i++) {
                    // Get the first overridden cell.                
                    const [firstOverride] = state.overriddenCells;
                    if (firstOverride === undefined) {
                        return;
                    }

                    const [overriddenIndex, overriddenState] = firstOverride;

                    // Put its index into overridable cells, so it can be reused.
                    state.overridableCells.push(overriddenIndex);

                    // Replace the underlying cell state with this saved overridden state.
                    state.underlying[overriddenIndex] = overriddenState;

                    // Additionally, replace the cell's display state if it isn't obscured.
                    if (overriddenState === null || state.cells[overriddenIndex]?.type !== CellType.Obscured) {
                        state.cells[overriddenIndex] = overriddenState as DisplayCellState;
                    }
                }
            }
            return;
        }
        case 'boost': {
            applyBoost(state, action.boost, action.index);
            return;
        }
        default:
            throw new UnexpectedValueError(action);
    }
}

