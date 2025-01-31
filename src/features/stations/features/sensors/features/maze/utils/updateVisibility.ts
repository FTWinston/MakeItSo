import { distance } from 'src/types/Vector2D';
import { MazeState, CellType, UnderylingCellState, CellLinks } from '../types/Maze';
import { getCell } from './getCell';

export function updateVisibility(state: MazeState, playerCell: UnderylingCellState) {
    const noLongerVisibleCells = new Set(state.visibleCells);
    const newlyVisibleCells = new Set<UnderylingCellState>();

    const range = state.visibilityRange;

    for (let y = playerCell.y - range; y <= playerCell.y + range; y++) {
        for (let x = playerCell.x - range; x <= playerCell.x + range; x++) {
            const underlyingCell = getCell(state, x, y);

            if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                continue;
            }
            
            if (distance(underlyingCell, playerCell) > range + 0.25) {
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

