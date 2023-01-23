import { Keyframes } from './Keyframes';
import { Position } from './Position';
import { GameObjectInfo } from './GameObjectInfo';

export abstract class GameObject implements GameObjectInfo {
    readonly motion: Keyframes<Position> = [];

    abstract updateMotion(currentTime: number): void;
}
