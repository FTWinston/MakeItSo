import { CountType } from './CellState';

export interface Clue {
    clueIndex: number;
    associatedIndexes: Array<number | null>;
    loop: boolean;
    countType: CountType;
    resolved: boolean;
}

export type ClueMap = Map<number, Clue>;
