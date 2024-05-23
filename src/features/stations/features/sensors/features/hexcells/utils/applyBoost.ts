import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard, CellBoardAction } from '../types/CellBoard';
import { CellType, DisplayCellState } from '../types/CellState';
import { isObscured } from './resolved';
import { BoostType } from '../types/BoostType';
import { applyHint } from './applyHint';
import { revealCell } from './revealCell';
import { flagCell } from './flagCell';

export function applyBoost(state: CellBoard, type: BoostType, index?: number): void {
    switch (type) {
        case BoostType.Hint: {
            applyHint(state, () => ({ type: CellType.Hint }));
            return;
        }
        case BoostType.RevealCell: {
            applyHint(state, hintIndex => {
                const underlyingCell = state.underlying[hintIndex];
                if (underlyingCell == null) {
                    return false;
                }

                return underlyingCell.type === CellType.Bomb
                    ? flagCell(state, underlyingCell)
                    : revealCell(state, underlyingCell);
            });
            return;
        }
        case BoostType.RevealMulti: {
            let canContinue = true;
            while (canContinue) {
                canContinue &&= applyHint(state, hintIndex => {
                    const underlyingCell = state.underlying[hintIndex];
                    if (underlyingCell == null) {
                        return false;
                    }
    
                    if (underlyingCell.type === CellType.Bomb) {
                        canContinue = false;
                        return flagCell(state, underlyingCell);
                    }

                    return revealCell(state, underlyingCell);
                });
            }
            return;
        }
        case BoostType.Takeback:
            state.protectErrors = true;
            return;
        default:
            throw new UnexpectedValueError(type);
    }
}

