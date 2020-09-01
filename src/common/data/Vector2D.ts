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

export function distanceSq(v1: Vector2D, v2: Vector2D) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return dx * dx + dy * dy;
}

export function determineAngle(fromPos: Vector2D, toPos: Vector2D, valueIfEqual: number) {
    return vectorsEqual(fromPos, toPos)
        ? valueIfEqual
        : Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
}