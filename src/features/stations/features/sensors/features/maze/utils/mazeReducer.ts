import { Direction, MazeState, playerEntityID } from '../types/Maze';
import { findCell, getCell } from './getCell';
import { updateDamage, updateVisibility } from './updateVisibility';

export type MazeAction = {
    type: 'move';
    direction: Direction;
    entity: number;    
} | {
    type: 'tick';
} | {
    type: 'damage';
    fraction: number;
}

export function mazeReducer(state: MazeState, action: MazeAction): void {
    switch (action.type) {
        case 'move':
            state.moveQueue.push(action.direction);
            //tryMove(state, playerEntityID, action.direction);
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
        state.ignoreDamageCells.delete(entityCell.id);
        state.ignoreDamageCells.add(nextCell.id);
    }

    updateVisibility(state, nextCell);
    return true;
}