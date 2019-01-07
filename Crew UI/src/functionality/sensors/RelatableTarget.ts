import { SensorTarget, SensorTargetType } from './SensorTarget';
import { Vector3 } from '~/functionality/math';

export const enum Relationship {
    Neutral = 0,
    Friendly = 1,
    Enemy = 2,
    Unknown = 3,
}

export abstract class RelatableTarget extends SensorTarget {
    constructor(id: number, type: SensorTargetType, position: Vector3, public relationship: Relationship) {
        super(id, type, position);
    }

    protected getRelationColor() {
        switch (this.relationship) {
            case Relationship.Friendly:
                return '#0c0';
            case Relationship.Enemy:
                return '#f33';
            case Relationship.Unknown:
                return '#cc0';
            default:
                return '#06c';
        }
    }
}