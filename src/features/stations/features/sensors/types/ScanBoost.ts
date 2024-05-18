import { TextParameters } from 'src/types/TextParameters';
import { CellState, CellType, CountType } from '../features/hexcells/types/CellState';
import { Ship } from 'src/classes/Ship';

export enum SensorBoostPowerSlot {
    First = 2,
    Second = 3,
    Third = 4,
}

export enum ScanBoostType {
    Hint = 'hint',
    RevealCell = 'revealCell',
    Takeback = 'takeback',
    Detector = 'detector',
    SolveSmall = 'solveSmall',
    SolveLarge = 'solveLarge',
    EnhanceClue = 'enhance1',
    EnhanceClues = 'enhance2',
    RadiusClue = 'radius',
}

export interface ScanBoostInfo {
    id: number;
    type: ScanBoostType;
    minimumSlot:SensorBoostPowerSlot;
    chargeDuration: number;
    targetCellTypes?: Set<CellType>;
    targetCountTypes?: Set<CountType>;
    descParams?: TextParameters;
}

// TODO: the above is a definition ... still need to account for ACTUAL slot, plus (pausable) charge status

export interface ScanBoost extends ScanBoostInfo {
    use: (ship: Ship, cell?: CellState) => void | false;
}
