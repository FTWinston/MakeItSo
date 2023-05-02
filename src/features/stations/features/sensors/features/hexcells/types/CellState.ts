export enum CellType {
    Obscured = 1,
    Empty = 2,
    Bomb = 3,
    Unknown = 4, // Revealed, but showing a ?
    RowClue = 5,
    RadiusClue = 6,
    Exploded = 7,
    Hint = 8,
}

export enum CountType {
    Normal = 1,
    Contiguous = 2,
    Split = 3,
}

export enum RowDirection {
    Vertical = 1,
    TLBR = 2,
    BLTR = 3,
}

export type EmptyCell = {
    type: CellType.Empty;
    countType: CountType;
    number: number;
};

export type RowClue = {
    type: CellType.RowClue;
    direction: RowDirection;
    countType: CountType;
    number: number;
}

export type UnderlyingCellState = EmptyCell | RowClue
 | {
    type: CellType.Unknown | CellType.Bomb;
} | {
    type: CellType.RadiusClue;
    countType: CountType.Normal;
    number: number;
}

export type CellState = UnderlyingCellState | {
    type: CellType.Obscured | CellType.Exploded | CellType.Hint;
}
