import { distance } from 'src/types/Vector2D';
import { MazeState, CellType, UnderlyingCellState, CellLinks, north, east, south, west, CellId, UnderlyingCellLinks } from '../types/Maze';
import { findCell, getCell } from './getCell';
import { oppositeDirectionsMap } from './directions';

const directions = [north, east, south, west];

export function updateVisibility(state: MazeState, playerCell: UnderlyingCellState) {
    const range = state.visibilityRange + 0.25;

    // All cells within range are visible, and all cells outside range are obscured.
    for (let y = 0; y <= state.cells.length; y++) {
        for (let x = 0; x <= state.cells[0].length; x++) {
            const underlyingCell = findCell(state, x, y);

            if (!underlyingCell || underlyingCell.type === CellType.Outside) {
                continue;
            }
            
            if (distance(underlyingCell, playerCell) > range) {
                obscureCell(state, underlyingCell.id);
            }
            else {
                revealCell(state, underlyingCell.id);
            }
        }
    }
}

function obscureCell(state: MazeState, cellId: CellId) {
    if (!state.visibleCells.has(cellId)) {
        return;
    }
        
    state.visibleCells.delete(cellId);

    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    delete cell.visible;
    delete cell.content;
    
    if (state.damagedCells.has(cellId)) {
        cell.type = CellType.Damaged;
    }
}

function revealCell(state: MazeState, cellId: CellId) {
    if (state.visibleCells.has(cellId)) {
        return;
    }

    state.visibleCells.add(cellId);

    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];
    cell.visible = true;

    cell.content = underlyingCell.content;
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
    if (state.ignoreDamageCells.has(cellId)) {
        return;
    }

    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];

    cell.type = CellType.Damaged;
    delete cell.content;

    cell.links = setDamagedCellBorders(state, underlyingCell);
}

function repairCell(state: MazeState, cellId: CellId) {
    const underlyingCell = getCell(state, cellId);
    const cell = state.cells[underlyingCell.y][underlyingCell.x];

    cell.links = setVisibleCellBorders(state, underlyingCell);
}

export function disableDamage(state: MazeState, underlyingCell: UnderlyingCellState) {
    state.ignoreDamageCells.add(underlyingCell.id);
    
    if (state.damagedCells.has(underlyingCell.id)) {
        const cell = state.cells[underlyingCell.y][underlyingCell.x];
        cell.type = CellType.Normal;

        cell.links = setVisibleCellBorders(state, underlyingCell);
    }
}

export function enableDamage(state: MazeState, underlyingCell: UnderlyingCellState) {
    state.ignoreDamageCells.delete(underlyingCell.id);

    if (state.damagedCells.has(underlyingCell.id)) {
        const cell = state.cells[underlyingCell.y][underlyingCell.x];
        cell.type = CellType.Damaged;

        cell.links = setDamagedCellBorders(state, underlyingCell);
    }
}

function setDamagedCellBorders(state: MazeState, underlyingCell: UnderlyingCellState): CellLinks {
    // Any damaged adjacent cell should have its this-cell-facing border hide.
    setDamagedAdjacentBorderVisibility(state, underlyingCell.links, false);

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

    return cellLinks;
}


function setVisibleCellBorders(state: MazeState, underlyingCell: UnderlyingCellState): CellLinks {
    // Any damaged adjacent cell should have its this-cell-facing border show.
    setDamagedAdjacentBorderVisibility(state, underlyingCell.links, true);

    // This cell's borders should just match its underlying cell's links.
    return underlyingCell.links.map(link => link.linked) as CellLinks;
}

function setDamagedAdjacentBorderVisibility(state: MazeState, links: UnderlyingCellLinks, visible: boolean) {
    for (const direction of directions) {
        const link = links[direction];

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
        adjacentCell.links[oppositeDir] = !visible;
    }
}