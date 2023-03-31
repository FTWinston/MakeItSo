export enum CellType {
    Obscured = 1,
    Flagged = 2,
    Revealed = 3,
    Unknown = 4, // Revealed, but showing a ?
    IndicatorVertical = 5,
    IndicatorTLBR = 6,
    IndicatorTRBL = 7,
}

export enum CountType {
    Normal = 1,
    Contiguous = 2,
    Split = 3,
    DoubleRadius = 4,
}

export type CellState = {
    type: CellType.Revealed;
    countType: CountType;
    number: number;
} | {
    type: CellType.Obscured | CellType.Flagged | CellType.Unknown;
} | {
    type: CellType.IndicatorVertical | CellType.IndicatorTLBR | CellType.IndicatorTRBL;
    countType: CountType.Normal | CountType.Contiguous | CountType.Split; // No double radius
    number: number;
}