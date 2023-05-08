import { CellBoard } from '../types/CellBoard';
import { CellType } from '../types/CellState';

export function isClueResolved(state: CellBoard, targetIndexes: number[]): boolean {
    const numResolved = targetIndexes.filter(index => {
        const cell = state.cells[index];
        return cell?.type !== CellType.Obscured;
    }).length;

    return targetIndexes.every(index => {
        const cell = state.cells[index];
        return cell?.type !== CellType.Obscured;
    });
}

export function areCluesResolved(state: CellBoard, clueIndexes: number[]): boolean {
    return clueIndexes.every(clueIndex => {
        const clueCell = state.underlying[clueIndex];
        if (!clueCell) {
            return true;
        }

        if (clueCell.type === CellType.Empty || clueCell.type === CellType.RowClue || clueCell.type === CellType.RadiusClue) {
            return isClueResolved(state, clueCell.targetIndexes);
        }

        return true;
    }); 
}

export function markCluesAsResolved(state: CellBoard, clueIndexes: number[]) {
    for (const clueIndex of clueIndexes) {
        const clueCell = state.underlying[clueIndex];

        if (!clueCell) {
            continue;
        }

        if (clueCell.type === CellType.Empty || clueCell.type === CellType.RowClue || clueCell.type === CellType.RadiusClue) {
            if (isClueResolved(state, clueCell.targetIndexes)) {
                const display = state.cells[clueIndex];
                if (!display) {
                    continue;
                }
                if (display.type === CellType.Empty || display.type === CellType.RowClue || display.type === CellType.RadiusClue) {
                    display.resolved = true;
                }
            }
        }
    }
}
