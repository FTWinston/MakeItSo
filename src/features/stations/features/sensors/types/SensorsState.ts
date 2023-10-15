import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from './SensorTarget';
import { ScanTreeState } from '../features/scanselect';

export interface SensorsState {
    possibleTargets: SensorTarget[];
    currentTarget?: {
        id: ObjectId;
        scanTree: ScanTreeState;
        currentScan?: string;
    }
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
    scan?: string;
};;