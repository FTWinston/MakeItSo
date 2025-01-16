import { CellState, Direction, east, Maze, MazeEntity, north, south, west } from '../types/Maze';
import { orthogonalDirectionsMap } from './directions';

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
                moveRepeatedly(entity, state, action.direction);
            }
            break;
    }
    return state;
}

function moveRepeatedly(entity: MazeEntity, maze: Maze, direction: Direction) {
    while (true) {
        const movedTo = tryMove(entity, maze, direction);

        if (movedTo === null) {
            break;
        }

        // Stop if destination cell has links in a perpendicular direction.
        const [perpDir1, perpDir2] = orthogonalDirectionsMap.get(direction)!;
        if (movedTo.links[perpDir1] || movedTo.links[perpDir2]) {
            break;
        }
    }
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
            x += 1;
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