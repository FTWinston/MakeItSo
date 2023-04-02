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
            if (underlyingState?.type === CellType.Bomb) {
                // TODO: fail for bomb stuff?
            }

            // TODO: detect completion?

            state.cells[action.index] = underlyingState;
            return;

        case 'flag':
            // TODO: flag action
            return;
        
        default:
            throw new UnexpectedValueError(action);
    }
}

