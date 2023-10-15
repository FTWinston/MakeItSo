import { SensorTarget } from './SensorTarget';
import { ScanTreeState } from '../features/scanselect';
import { SensorsStateInfo } from './SensorsStateInfo';
import { GameObject } from 'src/classes/GameObject';
import { Reference } from 'src/classes/Reference';

export interface SensorsState extends SensorsStateInfo {
    possibleTargets: SensorTarget[];

    currentTarget: Reference<GameObject>;
    scanTree?: ScanTreeState;
    currentScan?: string;
}
