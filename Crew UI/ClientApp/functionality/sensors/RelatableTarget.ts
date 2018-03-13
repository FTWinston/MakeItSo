import { CanvasBounds3D } from '~/functionality';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math';

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

    draw(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, screenPos: Vector2, markerZ: number) {
        ctx.strokeStyle = ctx.fillStyle = this.getRelationColor();
        super.draw(ctx, display, screenPos, markerZ);
    }
}