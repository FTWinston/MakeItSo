import { Keyframes } from './Keyframes';
import { Position } from './Position';

export type ObjectId = number;

export interface GameObjectInfo {
    id: ObjectId;
    motion: Keyframes<Position>;
}