import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType } from '../types/CellState';

export function hexCellReducer(state: CellBoard, action: CellBoardAction): CellBoard | void {
    if (state.result) {
        return;
    }

    switch (action.type) {
        case 'reveal': {
            const currentState = state.cells[action.index];
            if (!currentState || currentState?.type !== CellType.Obscured) {
                return;
            }

            const underlyingState = state.underlying[action.index];
            state.cells[action.index] = underlyingState;

            if (underlyingState?.type === CellType.Bomb) {
                state.result = 'failure';
                state.errorIndex = action.index;
            }

            // Success when the last obscured cell is revealed.
            if (!state.cells.some(cell => cell?.type === CellType.Obscured)) {
                state.result = 'success';
            }
            return;
        }
        case 'flag': {
            const currentState = state.cells[action.index];
            if (!currentState || currentState?.type !== CellType.Obscured) {
                return;
            }

            const underlyingState = state.underlying[action.index];
            if (underlyingState?.type === CellType.Bomb) {
                state.cells[action.index] = {
                    type: CellType.Flagged,
                };
                
                // Success when the last bomb is flagged, even if there are still obscured cells
                if (state.cells.filter(cell => cell?.type === CellType.Bomb).length === state.numBombs) {
                    state.result = 'success';
                }
            }
            else {
                state.errorIndex = action.index;
                // TODO: penalty for mis-flagging
            }

            return;
        }
        default:
            throw new UnexpectedValueError(action);
    }
}

