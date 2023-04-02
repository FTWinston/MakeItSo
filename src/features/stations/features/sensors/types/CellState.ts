export enum CellType {
    Obscured = 1,
    Flagged = 2,
    Revealed = 3,
    Bomb = 4,
    Unknown = 5, // Revealed, but showing a ?
    IndicatorVertical = 6,
    IndicatorTLBR = 7,
    IndicatorTRBL = 8,
}

export enum CountType {
    Normal = 1,
    Contiguous = 2,
    Split = 3,
    DoubleRadius = 4,
}

export type UnderlyingCellState = {
    type: CellType.Revealed;
    countType: CountType;
    number: number;
} | {
    type: CellType.Unknown | CellType.Bomb;
} | {
    type: CellType.IndicatorVertical | CellType.IndicatorTLBR | CellType.IndicatorTRBL;
    countType: CountType.Normal | CountType.Contiguous | CountType.Split; // No double radius
    number: number;
}

export type CellState = UnderlyingCellState | {
    type: CellType.Obscured | CellType.Flagged | CellType.Unknown | CellType.Bomb;
}
