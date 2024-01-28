import { SensorTarget } from './SensorTarget';
import { ScanItemId, ScanTreeState } from '../features/scanselect';
import { SensorsStateInfo } from './SensorsStateInfo';
import { GameObject } from 'src/classes/GameObject';
import { Reference } from 'src/classes/Reference';
import { CellBoard, CellBoardAction } from '../features/hexcells';
import { ObjectId } from 'src/types/GameObjectInfo';

export interface SensorsState extends SensorsStateInfo {
    possibleTargets: SensorTarget[];

    currentTarget: Reference<GameObject>;
    scanTree?: ScanTreeState;

    currentScan?: ScanItemId;
    scanCellBoard?: CellBoard;
}

export type SensorsAction = {
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
} | Extract<CellBoardAction, { type: 'reveal' | 'flag' }>;