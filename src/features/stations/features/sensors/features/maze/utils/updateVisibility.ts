import { distance } from 'src/types/Vector2D';
import { MazeState, CellType, UnderylingCellState, CellLinks, north, east, south, west } from '../types/Maze';
import { getCell } from './getCell';
import { oppositeDirectionsMap, orthogonalDirectionsMap } from './directions';

const directions = [north, east, south, west];

export function updateVisibility(state: MazeState, playerCell: UnderylingCellState) {
    const noLongerVisibleCells = new Set(state.visibleCells);
    const newlyVisibleCells = new Set<UnderylingCellState>();

    const range = state.visibilityRange;

    const makeVisible = (cell: UnderylingCellState) => {
        if (state.visibleCells.has(cell)) {
            noLongerVisibleCells.delete(cell);
        }
        else {
            newlyVisibleCells.add(cell);
            state.visibleCells.add(cell);
        }
    }

    if (state.visibilityType === 'all') {
        // All cells are visible.
        for (let y = 0; y <= state.cells.length; y++) {
            for (let x = 0; x <= state.cells[0].length; x++) {
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
    }
    else if (state.visibilityType === 'range-allseen') {
        // All cells within range are visible. All others are obscured.
        for (let y = 0; y <= state.cells.length; y++) {
            for (let x = 0; x <= state.cells[0].length; x++) {
                const underlyingCell = getCell(state, x, y);
    
                if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                    continue;
                }
                
                if (distance(underlyingCell, playerCell) > range + 0.25) {
                    if (underlyingCell.type !== CellType.Obscured) {                    
                        const cell = state.cells[underlyingCell.y][underlyingCell.x];
                        cell.type = CellType.Obscured;
                        cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
                        delete cell.content;
                    }
                }
                else {
                    newlyVisibleCells.add(underlyingCell);
                    state.visibleCells.add(underlyingCell);
                }
            }
        }
    }
    else if (state.visibilityType === 'range') {
        // All cells within range are visible. All others are unseen, or obscured if seen previously.
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
    }
    else {
        // Cells within line of sight are visible. All others are unseen, or obscured if seen previously.
        makeVisible(playerCell);
    
        for (const direction of directions) {
            let viewCell = playerCell;
            for (let distance = 1; distance <= range; distance++) {
                const link = viewCell.links[direction];
                if (!link.linked) {
                    break;
                }
    
                viewCell = link.adjacentCell;
                makeVisible(viewCell);
    
                // Also do diagonal visibility.
                if (distance === 1) {
                    const orthogonalDirections = orthogonalDirectionsMap.get(direction)!;
                    
                    for (const orthogonalDirection of orthogonalDirections) {
                        const orthogonalLink = viewCell.links[orthogonalDirection];
                        if (orthogonalLink.linked) {
                            makeVisible(orthogonalLink.adjacentCell);
                        }
                    }
                }
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

