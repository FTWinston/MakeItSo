export interface Vector2D {
    x: number;
    y: number;
}

const tolerance = 0.001;

export function vectorsEqual(v1: Vector2D, v2: Vector2D) {
    return v1.x >= v2.x - tolerance
        && v1.x <= v2.x + tolerance
        && v1.y >= v2.y - tolerance
        && v1.y <= v2.y + tolerance;
}