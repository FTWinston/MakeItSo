import { distance } from 'src/types/Vector2D';
import { MazeState, CellType, UnderylingCellState, CellLinks, north, east, south, west } from '../types/Maze';
import { getCell } from './getCell';
import { oppositeDirectionsMap } from './directions';

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

const directions = [north, east, south, west];

function revealCell(state: MazeState, underlyingCell: UnderylingCellState) {
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    cell.type = underlyingCell.type;
    cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
    cell.content = underlyingCell.content;

    // Where a cell is NOT linked to an adjacent cell, reveal the adjacent cell's adjoining wall.
    // This stops us from displaying "half width" walls.
    for (const direction of directions) {
        const link = underlyingCell.links[direction];

        if (link.linked) {
            continue;
        }

        const adjacentUnderlying = link.adjacentCell;

        if (!adjacentUnderlying) {
            continue;
        }

        const adjacentCell = state.cells[adjacentUnderlying.y][adjacentUnderlying.x];
        const oppositeDir = oppositeDirectionsMap.get(direction)!;
        adjacentCell.links[oppositeDir] = adjacentUnderlying.links[oppositeDir].linked;
    }
}

