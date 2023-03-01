import { Keyframes } from './Keyframes';
import { Position } from './Position';
import { GameObjectInfo, ObjectId } from './GameObjectInfo';
import { immerable } from 'immer';
import { durationToTicks } from 'src/utils/timeSpans';
import { Vector2D } from './Vector2D';
import { interpolatePosition, interpolateVector } from 'src/utils/interpolate';

const twoTicks = durationToTicks(2);

export abstract class GameObject implements GameObjectInfo {
    [immerable] = true;

    constructor(public readonly id: ObjectId) {}

    motion: Keyframes<Position> = [];

    abstract updateMotion(currentTime: number): void;

    getPosition(currentTime: number): Position {
        return interpolatePosition(this.motion, currentTime);
    }

    getVelocity(currentTime: number): Vector2D {
        const pos1 = interpolateVector(this.motion, currentTime - 1);
        const pos2 = interpolateVector(this.motion, currentTime + 1);

        return {
            x: (pos2.x - pos1.x) / twoTicks,
            y: (pos2.y - pos1.y) / twoTicks,
        }
    }
}
