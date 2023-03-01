import { Keyframes } from './Keyframes';
import { ObjectAppearance } from './ObjectAppearance';
import { Position } from './Position';

export type ObjectId = number;

export interface GameObjectInfo {
    id: ObjectId;
    draw: ObjectAppearance;
    motion: Keyframes<Position>;
}