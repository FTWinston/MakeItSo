import { Direction, east, MazeState, north, south, west } from '../types/Maze';
import { getCell } from './getCell';
import { updateVisibility } from './updateVisibility';

export type MazeAction = {
    type: 'move';
    direction: Direction;
    entity: number;    
}

export function mazeReducer(state: MazeState, action: MazeAction): MazeState {
    switch (action.type) {
        case 'move':
            tryMove(state, action.entity, action.direction);
            break;
    }
    return state;
}

function tryMove(state: MazeState, entityId: number, direction: Direction) {
    const underlyingEntity = state.underlyingEntities[entityId];

    if (!underlyingEntity) {
        return;
    }

    const entityCell = getCell(state, underlyingEntity.x, underlyingEntity.y);

    const link = entityCell?.links[direction];

    if (!link?.linked) {
        return;
    }

    let x = underlyingEntity.x;
    let y = underlyingEntity.y;

    switch (direction) {
        case north:
            y -= 1;
            break;
        case east:
            x += 1;
            break;
        case south:
            y += 1;
            break;
        case west:
            x -= 1;
            break;
    }

    const nextCell = getCell(state, x, y);
    
    if (!nextCell) {
        return null;
    }

    // TODO: check nextCell is empty?

    underlyingEntity.x = x;
    underlyingEntity.y = y;

    const clientEntity = state.entities[entityId];

    if (clientEntity) {
        clientEntity.x = x;
        clientEntity.y = y;
    }

    updateVisibility(state, nextCell);
}