import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from './SensorTarget';

export interface SensorsState {
    possibleTargets: SensorTarget[];
    currentTarget?: ObjectId;
    currentScan?: undefined; // TODO: define this
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
    scan: number;
};;