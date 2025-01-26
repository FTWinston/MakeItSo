import { MazeState, CellType, UnderylingCellState, CellLinks } from '../types/Maze';
import { getCell } from './getCell';

export function updateVisibility(state: MazeState, playerCell: UnderylingCellState) {
    const noLongerVisibleCells = new Set(state.visibleCells);
    const newlyVisibleCells = new Set<UnderylingCellState>();

    for (let y = playerCell.y - state.visibilityRange; y <= playerCell.y + state.visibilityRange; y++) {
        for (let x = playerCell.x - state.visibilityRange; x <= playerCell.x + state.visibilityRange; x++) {
            const underlyingCell = getCell(state, x, y);
            
            if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                continue;
            }

            if (state.visibleCells.has(underlyingCell)) {
                noLongerVisibleCells.delete(underlyingCell);
            }
            else {
                newlyVisibleCells.add(underlyingCell);
                state.visibleCells.add(underlyingCell);
            }
        }
    }

    for (const underlyingCell of noLongerVisibleCells) {
        obscureCell(state, underlyingCell);
    }

    for (const underlyingCell of newlyVisibleCells) {
        revealCell(state, underlyingCell);
    }
}

function obscureCell(state: MazeState, underlyingCell: UnderylingCellState) {
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    cell.type = CellType.Obscured;
    delete cell.content;
}

function revealCell(state: MazeState, underlyingCell: UnderylingCellState) {
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    cell.type = underlyingCell.type;
    cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
    cell.content = underlyingCell.content;
}

