export enum CellType {
    Obscured = 1,
    Empty = 2,
    Bomb = 3,
    Unknown = 4, // Revealed, but showing a ?
    RadiusClue = 5,
    IndicatorVertical = 6,
    IndicatorTLBR = 7,
    IndicatorTRBL = 8,
    Exploded = 9,
    Hint = 10,
}

export enum CountType {
    Normal = 1,
    Contiguous = 2,
    Split = 3,
}

export type EmptyCell = {
    type: CellType.Empty;
    countType: CountType;
    number: number;
};

export type UnderlyingCellState = EmptyCell
 | {
    type: CellType.Unknown | CellType.Bomb;
} | {
    type: CellType.IndicatorVertical | CellType.IndicatorTLBR | CellType.IndicatorTRBL;
    countType: CountType;
    number: number;
} | {
    type: CellType.RadiusClue;
    countType: CountType.Normal;
    number: number;
}

export type CellState = UnderlyingCellState | {
    type: CellType.Obscured | CellType.Exploded | CellType.Hint;
}
