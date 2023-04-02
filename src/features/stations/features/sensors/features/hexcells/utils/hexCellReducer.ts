import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType } from '../types/CellState';

export function hexCellReducer(state: CellBoard, action: CellBoardAction): CellBoard | void {
    switch (action.type) {
        case 'reveal':
            const currentState = state.cells[action.index];
            if (!currentState || currentState?.type !== CellType.Obscured) {
                return;
            }

            const underlyingState = state.underlying[action.index];
            state.cells[action.index] = underlyingState;

            if (underlyingState?.type === CellType.Bomb) {
                state.result = 'failure';
            }

            // TODO: detect completion
            if (false) {
                state.result = 'success';
            }
            return;

        case 'flag':
            // TODO: flag action
            return;
        
        default:
            throw new UnexpectedValueError(action);
    }
}

