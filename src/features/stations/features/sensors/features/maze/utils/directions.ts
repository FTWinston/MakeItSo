import { Direction, east, north, south, west } from '../types/Maze';

export const oppositeDirectionsMap: ReadonlyMap<Direction, Direction> = new Map<Direction, Direction>(
    [
        [north, south],
        [south, north],
        [east, west],
        [west, east],
    ]
);

export const orthogonalDirectionsMap: ReadonlyMap<Direction, [Direction, Direction]> = new Map<Direction, [Direction, Direction]>(
    [
        [north, [east, west]],
        [south, [east, west]],
        [east, [north, south]],
        [west, [north, south]],
    ]
);