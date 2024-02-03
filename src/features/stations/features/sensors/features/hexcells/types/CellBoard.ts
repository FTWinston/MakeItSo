import { CellState, DisplayCellState, UnderlyingCellState } from './CellState';

export interface CellBoardDefinition {
    columns: number;
    cells: Array<CellState | null>;
    underlying: Array<UnderlyingCellState | null>;
    hints: number[];
}

interface InstanceInfo {
    cells: Array<DisplayCellState | null>;
    numBombsLeft: number;
    numErrors: number;
    hintsUsed: number;
    result?: 'success' | 'failure';
    errorIndex?: number;
    overridableCells: number[];
    overriddenCells: { index: number, state: UnderlyingCellState | null }[]
}

export interface MinimumResolvableBoardInfo {
    columns: number;
    cells: Array<CellState | null>;
    numBombs?: number;
}

export type CellBoard = Omit<CellBoardDefinition, 'cells'> & InstanceInfo;

export type CellBoardInfo = Omit<CellBoardDefinition, 'cells' | 'underlying' | 'hints'> & Omit<InstanceInfo, 'overriddenCells' | 'overridableCells'>;

export type CellBoardAction = {
    type: 'reveal';
    index: number;
} | {
    type: 'flag';
    index: number;
} | {
    type: 'override cells';
    fraction: number;
}