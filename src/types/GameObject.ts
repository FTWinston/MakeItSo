import { Keyframes } from './Keyframes';
import { Position } from './Position';
import { GameObjectInfo } from './GameObjectInfo';
import { immerable } from 'immer';

export abstract class GameObject implements GameObjectInfo {
    [immerable] = true;

    motion: Keyframes<Position> = [];

    abstract updateMotion(currentTime: number): void;
}
