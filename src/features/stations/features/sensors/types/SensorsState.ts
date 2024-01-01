import { SensorTarget } from './SensorTarget';
import { ScanItemId, ScanTreeState } from '../features/scanselect';
import { SensorsStateInfo } from './SensorsStateInfo';
import { GameObject } from 'src/classes/GameObject';
import { Reference } from 'src/classes/Reference';
import { CellBoard } from '../features/hexcells';

export interface SensorsState extends SensorsStateInfo {
    possibleTargets: SensorTarget[];

    currentTarget: Reference<GameObject>;
    scanTree?: ScanTreeState;

    currentScan?: ScanItemId;
    scanCellBoard?: CellBoard;
}
