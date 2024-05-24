import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType } from '../types/CellState';
import { isObscured } from './resolved';
import { applyBoost } from './applyBoost';
import { revealCell } from './revealCell';
import { flagCell } from './flagCell';
import { clearOverride } from './clearOverride';
import { overrideCell } from './overrideCell';

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
                // Override this many cells, in order, from overridableCells.
                const numToOverride = targetOverridenNumber - state.overriddenCells.size;

                const indexesToOverride = state.overridableCells
                    .slice(0, numToOverride);

                for (const indexToOverride of indexesToOverride) {
                    const overriddenCell = state.underlying[indexToOverride]!;
                    overrideCell(state
                        , indexToOverride
                        , { type: CellType.Unknown, clueIndexes: overriddenCell.type === CellType.AdjacentClue ? overriddenCell.clueIndexes : [] }
                        , { type: CellType.Unknown });
                }
            }
            else {
                // Restore this many cells, in order, from overriddenCells.
                const numToRestore = state.overriddenCells.size - targetOverridenNumber;

                const indexesToRestore = [...state.overriddenCells.keys()]
                    .slice(0, numToRestore);

                for (const indexToRestore of indexesToRestore) {
                    clearOverride(state, indexToRestore);
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

