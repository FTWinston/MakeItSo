import { ShipSystem } from 'src/types/ShipSystem';

export type Direction = 0 | 1 | 2 | 3;

export const north: Direction = 0;
export const east: Direction = 1;
export const south: Direction = 2;
export const west: Direction = 3;

export type CellLinks = [boolean, boolean, boolean, boolean];

export enum CellType {
    Outside,
    Normal,
    Damaged,
}

export type CellId = number;

export type CellState = {
    type: CellType;
    visible?: true;
    links: CellLinks;
    content?: 'entrance' | 'item' | 'exit';
    system?: ShipSystem;
}

export type UnderylingCellLink = {
    linked: true;
    adjacentCellId: CellId;
} | {
    linked: false;
    adjacentCellId: CellId | null;
}

export type UnderlyingCellLinks = [UnderylingCellLink, UnderylingCellLink, UnderylingCellLink, UnderylingCellLink];

export type UnderlyingCellState = Omit<CellState, 'links'> & {
    id: CellId;
    links: UnderlyingCellLinks;
    group: number;
    x: number;
    y: number;
}

export type MazeEntity = {
    x: number;
    y: number;
} & ({
        type: 'player';
    }
);

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
    ignoreDamageCells: Set<CellId>;
};

export const playerEntityID = 1;