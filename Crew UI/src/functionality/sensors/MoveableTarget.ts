import { RelatableTarget, Relationship } from './RelatableTarget';
import { Vector3 } from '~/functionality/math';
import { SensorTargetType } from './SensorTarget';

export abstract class MoveableTarget extends RelatableTarget {
    constructor(id: number, type: SensorTargetType, position: Vector3, public velocity: Vector3, relationship: Relationship) {
        super(id, type, position, relationship);
    }

    interpolate(interval: number) {
        this.position.x += this.velocity.x * interval;
        this.position.y += this.velocity.y * interval;
        this.position.z += this.velocity.z * interval;
    }
}