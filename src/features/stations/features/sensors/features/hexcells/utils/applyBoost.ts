import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { CellBoard } from '../types/CellBoard';
import { CellType } from '../types/CellState';
import { BoostType } from '../types/BoostType';
import { applyHint } from './applyHint';
import { revealCell } from './revealCell';
import { flagCell } from './flagCell';
import { getAdjacentIndexes } from './indexes';
import { clearOverride } from './clearOverride';
import { overrideCell } from './overrideCell';

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
        case BoostType.RerouteDamage:
            if (index === undefined) {
                return;
            }

            // This affects the specified cell index, plus all adjacent cells.
            // It only affects actual cells, and not empty spaces.
            const rows = Math.ceil(state.cells.length / state.columns);
            const adjacentIndexes = getAdjacentIndexes(index, state.columns, rows)
                .filter(index => index !== null) as number[];
            const indexesToClear = [index, ...adjacentIndexes]
                .filter(index => state.cells[index] !== null);

            // For each, clear its override, and remove it from the list of overridable cells.
            let numOverrideCleared = 0;

            for (const cellIndex of indexesToClear) {
                if (clearOverride(state, cellIndex)) {
                    numOverrideCleared++;
                }

                const overrideIndex = state.overridableCells.indexOf(cellIndex);
                state.overridableCells.splice(overrideIndex, 1);
            }

            // We then add all the affected cells back onto the end of the set of overridableCells, so they will be considered last.
            state.overridableCells.splice(state.overridableCells.length, 0, ...indexesToClear);

            // Lastly, we add damage overrides again, the same number as were actually cleared,
            // so that the quantity of overridden cells stays consistent.
            const indexesToOverride = state.overridableCells
                .slice(0, numOverrideCleared);

            for (const indexToOverride of indexesToOverride) {
                const overriddenCell = state.underlying[indexToOverride]!;
                overrideCell(state
                    , indexToOverride
                    , { type: CellType.Unknown, clueIndexes: overriddenCell.type === CellType.AdjacentClue ? overriddenCell.clueIndexes : [] }
                    , { type: CellType.Unknown });
            }
            return;
        default:
            throw new UnexpectedValueError(type);
    }
}

