export type Direction = 0 | 1 | 2 | 3;

export const north: Direction = 0;
export const east: Direction = 1;
export const south: Direction = 2;
export const west: Direction = 3;

export type CellLinks = [boolean, boolean, boolean, boolean];

export type CellState = {
    links: CellLinks;
    content?: 'start' | 'item' | 'goal';
}

export type Maze = {
    cells: CellState[][];
}