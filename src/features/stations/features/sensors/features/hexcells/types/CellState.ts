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
    TopToBottom = 1,
    BottomToTop = 2,
    TLBR = 3,
    BLTR = 4,
    BRTL = 5,
    TRBL = 6,
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

export type RadiusClue = {
    type: CellType.RadiusClue;
    countType: CountType.Normal;
    number: number;
}

export type UnderlyingCellState = EmptyCell | RowClue | RadiusClue
 | {
    type: CellType.Unknown | CellType.Bomb;
}

export type CellState = UnderlyingCellState | {
    type: CellType.Obscured | CellType.Exploded | CellType.Hint;
}
