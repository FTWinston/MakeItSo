import { GameObjectInfo, ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from './SensorTarget';
import { ScanTreeState } from '../features/scanselect';
import { ReferenceInfo } from 'src/types/ReferenceInfo';

export interface SensorsStateInfo {
    possibleTargets: SensorTarget[];
    currentTarget: ReferenceInfo<GameObjectInfo>;
    scanTree?: ScanTreeState;
    currentScan?: string;
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
};