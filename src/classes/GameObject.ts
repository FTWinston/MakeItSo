import { immerable } from 'immer';
import { Keyframes } from 'src/types/Keyframes';
import { GameObjectInfo, ObjectId } from 'src/types/GameObjectInfo';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { Position } from 'src/types/Position';
import { RelationshipType } from 'src/types/RelationshipType';
import { Vector2D } from 'src/types/Vector2D';
import { interpolatePosition, interpolateVector } from 'src/utils/interpolate';
import { durationToTicks } from 'src/utils/timeSpans';
import { Space } from './Space';
import { ScanTreeDefinition } from 'src/features/stations/features/sensors/features/scanselect/types/ScanTreeState';

const twoTicks = durationToTicks(2);

export abstract class GameObject implements GameObjectInfo {
    [immerable] = true;

    constructor(public readonly space: Space, public readonly draw: ObjectAppearance, public rel: RelationshipType) {
        this.id = space.getNewId();
    }

    public readonly id: ObjectId;

    public delete() {
        this.space.remove(this.id);
    }

    motion: Keyframes<Position> = [];

    abstract updateMotion(currentTime: number): void;

    public get evasionChance() { return 0; }

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

    getScanTree(): ScanTreeDefinition {
        throw new Error('not implemented');
    }
}
