import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType } from '../types/CellState';

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

            if (underlyingState?.type === CellType.Bomb) {
                state.cells[action.index] = {
                    type: CellType.Exploded,
                };

                state.result = 'failure';
                state.errorIndex = action.index;
                state.numErrors ++;
            }
            else {    
                state.cells[action.index] = underlyingState;
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
            if (underlyingState?.type === CellType.Bomb) {
                state.cells[action.index] = {
                    type: CellType.Bomb,
                };

                state.numBombs--;
                
                // Success when the last bomb is flagged.
                if (state.numBombs === 0) {
                    state.result = 'success';

                    // Reveal all remaining obscured cells.
                    for (let i = 0; i < state.cells.length; i++) {
                        if (state.cells[i]?.type === CellType.Obscured) {
                            state.cells[i] = state.underlying[i];
                        }
                    }
                }
            }
            else {
                state.errorIndex = action.index;
                state.numErrors ++;
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

