import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from './SensorTarget';
import { ScanTreeState } from '../features/scanselect';

export interface SensorsState {
    possibleTargets: SensorTarget[];
    currentTarget?: ObjectId;
    currentScan?: string;
    scanTreesByTarget: Map<ObjectId, ScanTreeState>; // TODO: either plan to clean these up, or only store one and reset when you change target.
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