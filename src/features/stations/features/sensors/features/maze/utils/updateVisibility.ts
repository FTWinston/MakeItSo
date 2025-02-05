import { distance } from 'src/types/Vector2D';
import { MazeState, CellType, UnderlyingCellState, CellLinks, north, east, south, west, CellId } from '../types/Maze';
import { findCell, getCell } from './getCell';
import { oppositeDirectionsMap } from './directions';

const directions = [north, east, south, west];

export function updateVisibility(state: MazeState, playerCell: UnderlyingCellState) {
    const range = state.visibilityRange + 0.25;

    // All cells within range are visible, unless they're damaged. All others are obscured.
    for (let y = 0; y <= state.cells.length; y++) {
        for (let x = 0; x <= state.cells[0].length; x++) {
            const underlyingCell = findCell(state, x, y);

            if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                continue;
            }
            
            if (state.damagedCells.has(underlyingCell.id) && !state.ignoreDamageCells.has(underlyingCell.id)) {
                damageCell(state, underlyingCell.id);
            }
            else if (distance(underlyingCell, playerCell) > range) {
                obscureCell(state, underlyingCell.id);
            }
            else {
                revealCell(state, underlyingCell.id);
            }
        }
    }
}

function obscureCell(state: MazeState, cellId: CellId) {
    if (state.visibleCells.has(cellId)) {
        state.visibleCells.delete(cellId);
    }

    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    cell.type = CellType.Obscured;
    delete cell.content;
}

function revealCell(state: MazeState, cellId: CellId) {
    if (state.visibleCells.has(cellId)) {
        return;
    }

    state.visibleCells.add(cellId);

    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];

    cell.type = underlyingCell.type;

    if (state.damagedCells.has(cellId)) {
        cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
    }

    cell.content = underlyingCell.content;

    /*
    // Where an adjacent cells is damaged, and this cell does NOT link to it, reveal the adjacent cell's adjoining wall.
    // This stops us from displaying "half width" walls.
    for (const direction of directions) {
        const link = underlyingCell.links[direction];

        if (link.linked) {
            continue;
        }

        const adjacentCellId = link.adjacentCellId;

        if (adjacentCellId === null || !state.damagedCells.has(adjacentCellId)) {
            continue;
        }

        const adjacentUnderlying = getCell(state, adjacentCellId);
        const adjacentCell = state.cells[adjacentUnderlying.y][adjacentUnderlying.x];
        
        const oppositeDir = oppositeDirectionsMap.get(direction)!;
        adjacentCell.links[oppositeDir] = adjacentUnderlying.links[oppositeDir].linked;
    }
    */
}

export function updateDamage(state: MazeState, fraction: number) {
    const numDamageCells = Math.max(0, Math.min(state.cellDamageOrder.length * fraction, state.cellDamageOrder.length));
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
        state.visibleCells.delete(cellId);
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

        if (adjacentId && state.damagedCells.has(adjacentId) && !state.ignoreDamageCells.has(adjacentId)) {
            continue;
        }

        cellLinks[direction] = false;
    }
    
    cell.links = cellLinks;
}

function repairCell(state: MazeState, cellId: CellId) {
    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];

    if (state.visibleCells.has(cellId)) {
        revealCell(state, cellId);
    }
    else {
        obscureCell(state, cellId);
    }

    cell.links = underlyingCell.links.map(link => link.linked) as CellLinks;
}
