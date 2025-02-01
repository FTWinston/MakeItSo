export type Direction = 0 | 1 | 2 | 3;

export const north: Direction = 0;
export const east: Direction = 1;
export const south: Direction = 2;
export const west: Direction = 3;

export type CellLinks = [boolean, boolean, boolean, boolean];

export enum CellType {
    Outside,
    Unseen,
    Obscured,
    Visible,
}

export type CellState = {
    type: CellType;
    links: CellLinks;
    content?: 'entrance' | 'item' | 'goal';
}

export type UnderylingCellLink = {
    linked: true;
    adjacentCell: UnderylingCellState;
} | {
    linked: false;
    adjacentCell: UnderylingCellState | null;
}

export type UnderylingCellState = Omit<CellState, 'links'> & {
    links: [UnderylingCellLink, UnderylingCellLink, UnderylingCellLink, UnderylingCellLink];
    group: number;
    x: number;
    y: number;
}

export type MazeEntity = {
    x: number;
    y: number;
    type: 'player';
}

export type MazeClientState = {
    cells: CellState[][];
    entities: Partial<Record<number, MazeEntity>>;
}

export type MazeState = MazeClientState & {
    visibilityRange: number;
    visibilityType: 'los' | 'range' | 'range-allseen' | 'all';
    visibleCells: Set<UnderylingCellState>;
    underlyingCells: UnderylingCellState[][];
    underlyingEntities: Partial<Record<number, MazeEntity>>;
    moveQueue: Direction[];
};

export const playerEntityID = 1;