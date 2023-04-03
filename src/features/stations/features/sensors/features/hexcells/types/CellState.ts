export enum CellType {
    Obscured = 1,
    Flagged = 2,
    Empty = 3,
    Bomb = 4,
    Unknown = 5, // Revealed, but showing a ?
    RadiusClue = 6,
    IndicatorVertical = 7,
    IndicatorTLBR = 8,
    IndicatorTRBL = 9,
}

export enum CountType {
    Normal = 1,
    Contiguous = 2,
    Split = 3,
}

export type UnderlyingCellState = {
    type: CellType.Empty;
    countType: CountType;
    number: number;
} | {
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
    type: CellType.Obscured | CellType.Flagged | CellType.Unknown | CellType.Bomb;
}
