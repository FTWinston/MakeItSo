import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType, DisplayCellState } from '../types/CellState';
import { areCluesResolved, markCluesAsResolved } from './resolved';

export function hexCellReducer(state: CellBoard, action: CellBoardAction): CellBoard | void {
    switch (action.type) {
        case 'reveal': {
            if (state.result) {
                return;
            }
            
            const currentState = state.cells[action.index];
            if (!currentState || currentState?.type !== CellType.Obscured) {
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
            
            if (underlyingState.type === CellType.Empty) {
                // Copy the underlying cell, without copying linked/associated cell data.
                const display: DisplayCellState = {
                    type: underlyingState.type,
                    countType: underlyingState.countType,
                    number: underlyingState.number,
                    resolved: areCluesResolved(state, underlyingState.clueIndexes),
                };

                state.cells[action.index] = display;
            }
            else {
                // Should just be "unknown" cells.
                state.cells[action.index] = underlyingState as DisplayCellState;
            }

            // Mark any associated clues as fully resolved.
            if (underlyingState.type === CellType.Empty || underlyingState.type === CellType.Unknown) {
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
            if (!currentState || currentState?.type !== CellType.Obscured) {
                return;
            }

            const underlyingState = state.underlying[action.index];
            if (underlyingState?.type !== CellType.Bomb) {
                state.errorIndex = action.index;
                state.numErrors ++;
                return;
            }

            state.cells[action.index] = { type: CellType.Bomb };

            state.numBombs--;

            // Mark any associated clues as fully resolved.
            markCluesAsResolved(state, underlyingState.clueIndexes);
            
            // Success when the last bomb is flagged.
            if (state.numBombs === 0) {
                state.result = 'success';
/*
                // Reveal all remaining obscured cells.
                for (let i = 0; i < state.cells.length; i++) {
                    if (state.cells[i]?.type === CellType.Obscured) {
                        state.cells[i] = state.underlying[i];
                    }
                }
*/
            }

            return;
        }
        case 'new': {
            return action.board;
        }
        default:
            throw new UnexpectedValueError(action);
    }
}

