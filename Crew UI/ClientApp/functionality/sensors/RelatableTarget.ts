import { CanvasBounds3D } from '../CanvasBounds';
import { SensorTarget } from './SensorTarget';
import { Vector3 } from '../math';

export const enum Relationship {
    Neutral = 0,
    Friendly = 1,
    Enemy = 2,
    Unknown = 3,
}

export abstract class RelatableTarget extends SensorTarget {
    constructor(id: number, position: Vector3, public relationship: Relationship) {
        super(id, position);
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

    draw(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, markerZ: number) {
        ctx.strokeStyle = ctx.fillStyle = this.getRelationColor();
        super.draw(ctx, display, markerZ);
    }
}