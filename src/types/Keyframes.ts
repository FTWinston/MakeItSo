import { clampAngle, Vector2D } from './Vector2D';
import { Position } from './Position';
import { getTime } from 'src/utils/timeSpans';
import { getLast } from 'src/utils/arrays';

export interface Keyframe<T> {
    time: number;
    val: T;
}

export type Keyframes<T> = Keyframe<T>[];

export function getFirstFutureIndex<T>(keyframes: Keyframes<T>, currentTime: number): number {
    return keyframes.findIndex(keyframe => keyframe.time > currentTime);
}

/** Remove keyframes that are more than 2 frames into the past. Return true if any were removed. */
export function pruneKeyframes(keyframes: Keyframes<unknown>, currentTime: number): boolean {
    const firstFutureIndex = getFirstFutureIndex(keyframes, currentTime);

    if (firstFutureIndex >= 2) {
        keyframes.splice(0, firstFutureIndex - 2);
        return true;
    }

    return false;
}

export function wantsMoreKeyframes(keyframes: Keyframes<unknown>, currentTime: number): boolean {
    if (keyframes.length < 2) {
        return true;
    }
    
    // More keyframes are wanted when the penultimate one is past.
    return keyframes[keyframes.length - 2].time <= currentTime;
}

function getCompletedFraction(startFrame: Keyframe<unknown>, endFrame: Keyframe<unknown>, currentTime: number) {
    const fraction = (currentTime - startFrame.time) / (endFrame.time - startFrame.time);

    return Math.max(0, Math.min(1, fraction));
}

type KeyframesSegment<T> = [
    Keyframe<T> | undefined,
    Keyframe<T>,
    Keyframe<T> | undefined,
    Keyframe<T> | undefined,
];

function getSegmentToInterpolate<T>(keyframes: Keyframes<T>, currentTime: number): KeyframesSegment<T> {
    const firstFutureIndex = getFirstFutureIndex(keyframes, currentTime);

    if (firstFutureIndex >= 2) {
        // Get 4 full keyframes spaced around the current time interval.
        return keyframes.slice(firstFutureIndex - 2, firstFutureIndex + 2) as KeyframesSegment<T>;
    }
    else if (firstFutureIndex === -1) {
        // All keyframes are in the past. Now immobile.
        return [
            undefined,
            getLast(keyframes),
            undefined,
            undefined,
        ];
    }
    else if (firstFutureIndex === 1) {
        // Animation starts from the first keyframe.
        return [
            undefined,
            keyframes[0],
            keyframes[1],
            keyframes[2],
        ];
    }
    else {
        // All keyframes are in the future... Currently immobile.
        return [
            undefined,
            keyframes[0],
            undefined,
            undefined,
        ];
    }
}

function interpolate(val0: number | undefined, val1: number, val2: number, val3: number | undefined, fraction: number) {
    if (val0 === undefined) {
        val0 = val1;
    }
    if (val3 === undefined) {
        val3 = val2;
    }

    // Interpolate a Centripetal Catmull-Rom spline.
    // Note that this is only accurate if time steps are equal.
    const L01 = val0 * -fraction + val1 * (fraction + 1);
    const L12 = val1 * (1 - fraction) + val2 * fraction;
    const L23 = val2 * (2 - fraction) + val3 * (fraction - 1);
    const L012 = L01 * (1 - fraction) / 2 + L12 * (fraction + 1) / 2;
    const L123 = L12 * (2 - fraction) / 2 + L23 * fraction / 2;
    const C12 = L012 * (1 - fraction) + L123 * fraction;
    return C12;
}

export function getNumberValue(keyframes: Keyframes<number>, currentTime = getTime()): number {
    const [val0, val1, val2, val3] = getSegmentToInterpolate(keyframes, currentTime);

    if (!val2) {
        return val1.val;
    }

    const fraction = getCompletedFraction(val1, val2, currentTime);

    return interpolate(val0?.val, val1.val, val2.val, val3?.val, fraction);
}

function interpolateAngle(angle0: number | undefined, angle1: number, angle2: number, angle3: number | undefined, fraction: number) {
    if (angle3 !== undefined) {
        while (angle3 - angle2 > Math.PI) {
            angle3 -= Math.PI * 2;
        }
        while (angle2 - angle3 > Math.PI) {
            angle3 += Math.PI * 2;
        }
    }

    while (angle1 - angle2 > Math.PI) {
        angle1 -= Math.PI * 2;
    }
    while (angle2 - angle1 > Math.PI) {
        angle1 += Math.PI * 2;
    }

    if (angle0 !== undefined) {
        while (angle0 - angle1 > Math.PI) {
            angle0 -= Math.PI * 2;
        }
        while (angle1 - angle0 > Math.PI) {
            angle0 += Math.PI * 2;
        }
    }

    const result = interpolate(angle0, angle1, angle2, angle3, fraction);
    
    return clampAngle(result);
}

export function getAngleValue(keyframes: Keyframes<number>, currentTime = getTime()): number {
    const [val0, val1, val2, val3] = getSegmentToInterpolate(keyframes, currentTime);

    if (val2 === undefined) {
        return val1.val;
    }

    const fraction = getCompletedFraction(val1, val2, currentTime);

    return interpolateAngle(val0?.val, val1.val, val2.val, val3?.val, fraction);
}

export function getVectorValue(keyframes: Keyframes<Vector2D>, currentTime = getTime()): Vector2D {
    const [val0, val1, val2, val3] = getSegmentToInterpolate(keyframes, currentTime);

    if (val2 === undefined) {
        return val1.val;
    }

    const fraction = getCompletedFraction(val1, val2, currentTime);

    return {
        x: interpolate(val0?.val.x, val1.val.x, val2.val.x, val3?.val.x, fraction),
        y: interpolate(val0?.val.y, val1.val.y, val2.val.y, val3?.val.y, fraction),
    };
}

export function getPositionValue(keyframes: Keyframes<Position>, currentTime = getTime()): Position {
    const [val0, val1, val2, val3] = getSegmentToInterpolate(keyframes, currentTime);

    if (val2 === undefined) {
        return val1.val;
    }

    const fraction = getCompletedFraction(val1, val2, currentTime);

    return {
        x: interpolate(val0?.val.x, val1.val.x, val2.val.x, val3?.val.x, fraction),
        y: interpolate(val0?.val.y, val1.val.y, val2.val.y, val3?.val.y, fraction),
        angle: interpolateAngle(val0?.val.angle, val1.val.angle, val2.val.angle, val3?.val.angle, fraction),
    };
}
