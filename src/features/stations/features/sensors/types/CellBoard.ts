import { CellState, UnderlyingCellState } from './CellState';

export interface CellBoard {
    cells: Array<CellState | null>;
    underlying: Array<UnderlyingCellState | null>;
    columns: number;
}

export type CellBoardAction = {
    type: 'reveal';
    index: number;
} | {
    type: 'flag';
    index: number;
}