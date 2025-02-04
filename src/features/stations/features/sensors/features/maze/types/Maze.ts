export type Direction = 0 | 1 | 2 | 3;

export const north: Direction = 0;
export const east: Direction = 1;
export const south: Direction = 2;
export const west: Direction = 3;

export type CellLinks = [boolean, boolean, boolean, boolean];

export enum CellType {
    Outside,
    Damaged,
    Unseen,
    Obscured,
    Visible,
}

export type CellId = number;

export type CellState = {
    type: CellType;
    links: CellLinks;
    content?: 'entrance' | 'item' | 'goal';
}

export type UnderylingCellLink = {
    linked: true;
    adjacentCellId: CellId;
} | {
    linked: false;
    adjacentCellId: CellId | null;
}

export type UnderlyingCellState = Omit<CellState, 'links'> & {
    id: CellId;
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
    visibleCells: Set<CellId>;
    underlyingCells: CellId[][];
    cellsById: Map<CellId, UnderlyingCellState>;
    underlyingEntities: Partial<Record<number, MazeEntity>>;
    moveQueue: Direction[];
    cellDamageOrder: CellId[];
    damagedCells: Set<CellId>;
};

export const playerEntityID = 1;