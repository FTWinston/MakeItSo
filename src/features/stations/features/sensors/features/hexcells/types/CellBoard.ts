import { CellState, UnderlyingCellState } from './CellState';

export interface CellBoardDefinition {
    columns: number;
    cells: Array<CellState | null>;
    underlying: Array<UnderlyingCellState | null>;
}

interface InstanceInfo {
    numBombs: number;
    numErrors: number;
    result?: 'success' | 'failure';
    errorIndex?: number;
}

export type CellBoardInfo = Omit<CellBoardDefinition, 'underlying'> & InstanceInfo

export type CellBoard = CellBoardDefinition & InstanceInfo;

export type MinimumResolvableBoardInfo = Pick<CellBoardInfo, 'cells' | 'columns'>
    & Partial<Pick<CellBoardInfo, 'numBombs'>>;

export type CellBoardAction = {
    type: 'reveal';
    index: number;
} | {
    type: 'flag';
    index: number;
} | {
    type: 'new';
    board: CellBoard;
}