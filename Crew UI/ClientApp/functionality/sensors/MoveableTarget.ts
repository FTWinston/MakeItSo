import { CanvasBounds3D } from '../CanvasBounds';
import { RelatableTarget, Relationship } from './RelatableTarget';
import { Vector2, Vector3 } from '../math';

export abstract class MoveableTarget extends RelatableTarget {
    constructor(id: number, position: Vector3, public velocity: Vector3, relationship: Relationship) {
        super(id, position, relationship);
    }

    interpolate(interval: number) {
        this.position.x += this.velocity.x * interval;
        this.position.y += this.velocity.y * interval;
        this.position.z += this.velocity.z * interval;
    }
}