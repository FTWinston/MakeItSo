import { TextParameters } from 'src/types/TextParameters';
import { CellType, CountType } from '../features/hexcells/types/CellState';
import { BoostType } from '../features/hexcells';

export enum SensorBoostPowerSlot {
    First = 2,
    Second = 3,
    Third = 4,
}

export interface ScanBoostInfo {
    id: number;
    type: BoostType;
    minimumSlot:SensorBoostPowerSlot;
    chargeDuration: number;
    targetCellTypes?: Set<CellType>;
    targetCountTypes?: Set<CountType>;
    descParams?: TextParameters;
}

// TODO: still need to account for (pausable) charge status

export interface ScanBoost extends ScanBoostInfo {
    
}
