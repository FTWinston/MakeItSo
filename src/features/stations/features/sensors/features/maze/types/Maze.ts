export type Direction = 0 | 1 | 2 | 3;

export const north: Direction = 0;
export const east: Direction = 1;
export const south: Direction = 2;
export const west: Direction = 3;

export type CellLinks = [boolean, boolean, boolean, boolean];

export enum CellType {
    Normal,
    Outside,
}

export type CellState = {
    type: CellType;
    links: CellLinks;
    group: number;
    content?: 'entrance' | 'item' | 'goal';
}

export type MazeEntity = {
    x: number;
    y: number;
    type: 'player';
}

export type Maze = {
    cells: CellState[][];
    entities: Partial<Record<number, MazeEntity>>;
}