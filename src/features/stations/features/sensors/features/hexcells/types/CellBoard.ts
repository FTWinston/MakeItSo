import { CellState, UnderlyingCellState } from './CellState';

export interface CellBoardInfo {
    cells: Array<CellState | null>;
    columns: number;
    result?: 'success' | 'failure';
    errorIndex?: number;
}

export interface CellBoard extends CellBoardInfo {
    underlying: Array<UnderlyingCellState | null>;
}

export type CellBoardDefinition = Omit<CellBoard, 'result'>;

export type CellBoardAction = {
    type: 'reveal';
    index: number;
} | {
    type: 'flag';
    index: number;
}