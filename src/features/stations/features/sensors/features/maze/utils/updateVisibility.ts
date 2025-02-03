import { distance } from 'src/types/Vector2D';
import { MazeState, CellType, UnderlyingCellState, CellLinks, north, east, south, west, CellId } from '../types/Maze';
import { findCell, getCell } from './getCell';
import { oppositeDirectionsMap, orthogonalDirectionsMap } from './directions';

const directions = [north, east, south, west];

export function updateVisibility(state: MazeState, playerCell: UnderlyingCellState) {
    const noLongerVisibleCells = new Set(state.visibleCells);
    const newlyVisibleCells = new Set<CellId>();

    const range = state.visibilityRange;

    const makeVisible = (cellId: CellId) => {
        if (state.visibleCells.has(cellId)) {
            noLongerVisibleCells.delete(cellId);
        }
        else {
            newlyVisibleCells.add(cellId);
        }
    }

    if (state.visibilityType === 'all') {
        // All cells are visible.
        for (let y = 0; y <= state.cells.length; y++) {
            for (let x = 0; x <= state.cells[0].length; x++) {
                const underlyingCell = findCell(state, x, y);
    
                if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                    continue;
                }
                
                makeVisible(underlyingCell.id);
            }
        }
    }
    else if (state.visibilityType === 'range-allseen') {
        // All cells within range are visible. All others are obscured.
        for (let y = 0; y <= state.cells.length; y++) {
            for (let x = 0; x <= state.cells[0].length; x++) {
                const underlyingCell = findCell(state, x, y);
    
                if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                    continue;
                }
                
                if (distance(underlyingCell, playerCell) > range + 0.25) {
                    if (underlyingCell.type !== CellType.Obscured) {
                        noLongerVisibleCells.add(underlyingCell.id);
                        const cell = state.cells[underlyingCell.y][underlyingCell.x];
                        cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
                    }
                }
                else {
                    newlyVisibleCells.add(underlyingCell.id);
                }
            }
        }
    }
    else if (state.visibilityType === 'range') {
        // All cells within range are visible. All others are unseen, or obscured if seen previously.
        for (let y = playerCell.y - range; y <= playerCell.y + range; y++) {
            for (let x = playerCell.x - range; x <= playerCell.x + range; x++) {
                const underlyingCell = findCell(state, x, y);
    
                if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                    continue;
                }
                
                if (distance(underlyingCell, playerCell) > range + 0.25) {
                    continue;
                }
    
                makeVisible(underlyingCell.id);
            }
        }
    }
    else {
        // Cells within line of sight are visible. All others are unseen, or obscured if seen previously.
        makeVisible(playerCell.id);
    
        for (const direction of directions) {
            let viewCell = playerCell;
            for (let distance = 1; distance <= range; distance++) {
                const link = viewCell.links[direction];
                if (!link.linked) {
                    break;
                }
    
                viewCell = getCell(state, link.adjacentCellId);
                makeVisible(link.adjacentCellId);
    
                // Also do diagonal visibility.
                if (distance === 1) {
                    const orthogonalDirections = orthogonalDirectionsMap.get(direction)!;
                    
                    for (const orthogonalDirection of orthogonalDirections) {
                        const orthogonalLink = viewCell.links[orthogonalDirection];
                        if (orthogonalLink.linked) {
                            makeVisible(orthogonalLink.adjacentCellId);
                        }
                    }
                }
            }
        }
    }

    for (const cellId of noLongerVisibleCells) {
        state.visibleCells.delete(cellId);
        if (state.damagedCells.has(cellId)) {
            damageCell(state, cellId);
        }
        else {
            obscureCell(state, cellId);
        }
    }

    for (const cellId of newlyVisibleCells) {
        state.visibleCells.add(cellId);
        revealCell(state, cellId);
    }
}

function obscureCell(state: MazeState, cellId: CellId) {
    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    cell.type = CellType.Obscured;
    delete cell.content;
}

function revealCell(state: MazeState, cellId: CellId) {
    const underlyingCell = getCell(state, cellId);
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

        const adjacentUnderlyingId = link.adjacentCellId;

        if (adjacentUnderlyingId === null) {
            continue;
        }

        const adjacentUnderlying = getCell(state, adjacentUnderlyingId);
        const adjacentCell = state.cells[adjacentUnderlying.y][adjacentUnderlying.x];
        const oppositeDir = oppositeDirectionsMap.get(direction)!;
        adjacentCell.links[oppositeDir] = adjacentUnderlying.links[oppositeDir].linked;
    }
}

export function updateDamage(state: MazeState, fraction: number) {
    const numDamageCells = state.cellDamageOrder.length * fraction;
    const prevNumDamageCells = state.damagedCells.size;

    // We need to fully update damagedCells before marking individual cells as damaged,
    // so they can set up their border visibility based on their neighbours.
    const changedCells = new Set<CellId>();
    
    if (numDamageCells > prevNumDamageCells) {
        // Damage more cells.
        for (let i = prevNumDamageCells; i < numDamageCells; i++) {
            const cellId = state.cellDamageOrder[i];
            state.damagedCells.add(cellId);
            changedCells.add(cellId);
        }
        for (const cellId of changedCells) {
            damageCell(state, cellId);
        }
    }
    else if (numDamageCells < prevNumDamageCells) {
        // Undamage cells.
        for (let i = numDamageCells; i < prevNumDamageCells; i++) {
            const cellId = state.cellDamageOrder[i];
            state.damagedCells.delete(cellId);
            changedCells.add(cellId);
        }
        for (const cellId of changedCells) {
            repairCell(state, cellId);
        }
    }
}

function damageCell(state: MazeState, cellId: CellId) {
    if (state.visibleCells.has(cellId)) {
        return;
    }
    
    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];

    cell.type = CellType.Damaged;
    delete cell.content;

    // Where a cell is NOT linked to an adjacent cell, and the adjacent cell isn't damaged, that border should still be visible.
    const cellLinks: CellLinks = [true, true, true, true];

    for (const direction of directions) {
        const link = underlyingCell.links[direction];

        if (link.linked) {
            continue;
        }

        const adjacentId = link.adjacentCellId;

        if (!adjacentId || state.damagedCells.has(adjacentId)) {
            continue;
        }

        cellLinks[direction] = false;
    }
    
    cell.links = cellLinks;
}

function repairCell(state: MazeState, cellId: CellId) {
    if (state.visibleCells.has(cellId)) {
        return;
    }
    
    if (state.visibleCells.has(cellId)) {
        revealCell(state, cellId);
    }
    else {
        obscureCell(state, cellId);
        // cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
    }
}
