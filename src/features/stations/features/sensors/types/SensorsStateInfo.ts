import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { ReferenceInfo } from 'src/types/ReferenceInfo';
import { SensorTarget } from './SensorTarget';
import { ScanItemId, ScanTreeState } from '../features/scanselect';
import { CellBoardInfo } from '../features/hexcells';

export interface SensorsStateInfo {
    possibleTargets: SensorTarget[];
    currentTarget: ReferenceInfo<GameObjectInfo>;
    scanTree?: ScanTreeState;
    currentScan?: ScanItemId;
    scanCellBoard?: CellBoardInfo;
}
