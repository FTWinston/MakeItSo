import { GameObjectInfo } from 'src/types/GameObjectInfo';

export interface SensorTarget extends Omit<GameObjectInfo, 'motion'> {
    description: string;
}
