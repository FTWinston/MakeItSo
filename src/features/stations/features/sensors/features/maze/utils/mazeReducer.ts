import { CellType, Direction, MazeState, playerEntityID, UnderlyingCellState } from '../types/Maze';
import { findCell, getCell } from './getCell';
import { disableDamage, enableDamage, updateDamage, updateVisibility } from './updateVisibility';

export type MazeAction = {
    type: 'move';
    direction: Direction;
    entity: number;    
} | {
    type: 'tick';
} | {
    type: 'damage';
    fraction: number;
} | {
    type: 'visibility';
    range: number;
}

export function mazeReducer(state: MazeState, action: MazeAction): void {
    switch (action.type) {
        case 'move':
            if (state.moveQueue.length < 3) {
                state.moveQueue.push(action.direction);
            }
            break;
        case 'tick': {
            let moved: boolean;
            do {
                const moveDir = state.moveQueue.shift();
                if (moveDir === undefined) {
                    break;
                }
                moved = tryMove(state, playerEntityID, moveDir);
            } while (!moved);
            break;
        }
        case 'damage': {
            updateDamage(state, action.fraction);
            break;
        }
        case 'visibility': {
            state.visibilityRange = action.range;
            updateVisibility(state, state.underlyingEntities[playerEntityID]!);
            break;
        }
    }
}

function tryMove(state: MazeState, entityId: number, direction: Direction): boolean {
    const underlyingEntity = state.underlyingEntities[entityId];

    if (!underlyingEntity) {
        return false;
    }

    const entityCell = findCell(state, underlyingEntity.x, underlyingEntity.y);

    if (!entityCell) {
        return false;
    }

    const link = entityCell.links[direction];

    if (!link?.linked) {
        return false;
    }

    const nextCell = getCell(state, link.adjacentCellId);

    // TODO: check nextCell is empty?

    underlyingEntity.x = nextCell.x;
    underlyingEntity.y = nextCell.y;

    const clientEntity = state.entities[entityId];

    if (clientEntity) {
        clientEntity.x = nextCell.x;
        clientEntity.y = nextCell.y;
    }

    if (entityId === playerEntityID) {
        enableDamage(state, entityCell);
        disableDamage(state, nextCell);
        updateVisibility(state, nextCell);
    }

    return true;
}
