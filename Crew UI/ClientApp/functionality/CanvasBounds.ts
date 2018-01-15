import { Vector2, Vector3 } from './math';

export interface RenderCoord {
    position: Vector2,
    zDepth: number,
}

export interface CanvasBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    onePixel: number;
}

export interface CanvasBounds3D extends CanvasBounds {
    transform: (world: Vector3) => RenderCoord;
}