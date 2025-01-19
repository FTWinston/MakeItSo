import { CellState, Direction, east, Maze, MazeEntity, north, south, west } from '../types/Maze';

export type MazeAction = {
    type: 'move';
    direction: Direction;
    entity: number;    
}

export function mazeReducer(state: Maze, action: MazeAction): Maze {
    switch (action.type) {
        case 'move':
            const entity = state.entities[action.entity];
            if (entity !== undefined) {
                tryMove(entity, state, action.direction);
            }
            break;
    }
    return state;
}

function tryMove(entity: MazeEntity, maze: Maze, direction: Direction): CellState | null {
    const entityCell = maze.cells[entity.y][entity.x];
    const link = entityCell?.links[direction];

    if (!link) {
        return null;
    }

    let x = entity.x;
    let y = entity.y;

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

    let nextCell = maze.cells[y][x];

    if (!nextCell) {
        return null;
    }

    // TODO: check nextCell is empty?
    entity.x = x;
    entity.y = y;

    return nextCell;
}