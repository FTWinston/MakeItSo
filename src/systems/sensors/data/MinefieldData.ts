export enum ClueType {
    Normal,
    Adjacent,
    NonAdjacent,
    Nearby,
}

export interface Clue {
    number: number;
    type: ClueType;
}

export type ServerCellContent = {
    mine: 1;
} | {
    mine: 0;
    clue?: Clue;
}

export type ClientCellContent = {
    clue?: Clue;
}

export enum CellState {
    Unknown,
    Marked,
    Revealed,
}

export type ServerCell = {
    state: CellState;
    content: ServerCellContent;
}

export type ClientCell = {
    state: CellState.Unknown | CellState.Marked;
} | {
    state: CellState.Revealed;
    content: ClientCellContent;
}

export interface ServerMinefield {
    grid: Array<Array<ServerCell | null>>;
    columns?: Array<Clue | null>;
}

export interface ClientMinefield {
    grid: Array<Array<ClientCell | null>>;
    columns?: Array<Clue | null>;
}
