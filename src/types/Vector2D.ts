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

export function distance(v1: Vector2D, v2: Vector2D) {
    return Math.sqrt(distanceSq(v1, v2));
}

export function unit(v1: Vector2D, v2: Vector2D) {
    const dist = distance(v1, v2);

    return {
        x: (v2.x - v1.x) / dist,
        y: (v2.y - v1.y) / dist,
    };
}

export function determineAngle(fromPos: Vector2D, toPos: Vector2D, valueIfEqual: number) {
    return vectorsEqual(fromPos, toPos)
        ? valueIfEqual
        : Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
}

export function determineMidAngle(fromPos: Vector2D, midPos: Vector2D, endPos: Vector2D, valueIfEqual: number) {
    const firstAngle = determineAngle(fromPos, midPos, valueIfEqual);
    const secondAngle = determineAngle(midPos, endPos, valueIfEqual);
    return combineAngles(firstAngle, secondAngle);
}

export function clampAngle(angle: number) {
    while (angle <= -Math.PI) {
        angle += Math.PI * 2;
    }

    while (angle > Math.PI) {
        angle -= Math.PI * 2;
    }

    return angle;
}

export function combineAngles(angle1: number, angle2: number) {
    if (angle2 < angle1) {
        [angle1, angle2] = [angle2, angle1];
    }

    if (angle2 - angle1 > Math.PI) {
        angle1 += Math.PI * 2;
    }

    let midAngle = (angle1 + angle2) / 2;

    return clampAngle(midAngle);
}