import { GameObjectInfo, ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from './SensorTarget';
import { ScanItemId, ScanTreeState } from '../features/scanselect';
import { ReferenceInfo } from 'src/types/ReferenceInfo';
import { CellBoardInfo } from '../features/hexcells';

export interface SensorsStateInfo {
    possibleTargets: SensorTarget[];
    currentTarget: ReferenceInfo<GameObjectInfo>;
    scanTree?: ScanTreeState;
    currentScan?: ScanItemId;
    scanCellBoard?: CellBoardInfo;
}

export type SensorsAction = {
    type: 'reset';
} | {
    type: 'tick';
    currentTime: number;
} | {
    type: 'view';
    target?: ObjectId;
} | {
    type: 'target';
    target?: ObjectId;
} | {
    type: 'scan';
    scan?: ScanItemId;
};