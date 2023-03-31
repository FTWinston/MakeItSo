export enum CellState {
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
    DoubleRadius = 4, // Not allowed for Rows of any sort
}
