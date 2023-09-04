import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from './SensorTarget';

export interface SensorsState {
    possibleTargets: SensorTarget[];
    currentTarget?: ObjectId;
}

export type SensorsAction = {
    type: 'reset';
} | {
    type: 'tick';
    currentTime: number;
};