import { getPositionValue, getVectorValue, Keyframes } from './Keyframes';
import { Position } from './Position';
import { GameObjectInfo } from './GameObjectInfo';
import { immerable } from 'immer';
import { durationToTicks, ticksToDuration } from 'src/utils/timeSpans';
import { Vector2D } from './Vector2D';

const twoTicks = durationToTicks(2);

export abstract class GameObject implements GameObjectInfo {
    [immerable] = true;

    motion: Keyframes<Position> = [];

    abstract updateMotion(currentTime: number): void;

    getPosition(currentTime: number): Position {
        return getPositionValue(this.motion, currentTime);
    }

    getVelocity(currentTime: number): Vector2D {
        const pos1 = getVectorValue(this.motion, currentTime - 1);
        const pos2 = getVectorValue(this.motion, currentTime + 1);

        return {
            x: (pos2.x - pos1.x) / twoTicks,
            y: (pos2.y - pos1.y) / twoTicks,
        }
    }
}
