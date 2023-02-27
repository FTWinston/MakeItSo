import { clampAngle, Vector2D } from './Vector2D';
import { Position } from './Position';
import { getTime } from 'src/utils/timeSpans';

interface CurveParameters<T> {
    a: T;
    b: T;
    c: T;
}

export interface Keyframe<T> {
    time: number;
    val: T;
    curve?: CurveParameters<T>;
}

type ResolvedKeyframe<T> = Required<Keyframe<T>>;

export type Keyframes<T> = Keyframe<T>[];

/** Get the index of the first keyframe whose time is greater than currentTime. */
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

/** Indicates whether additional frames should be added to properly animate these keyframes. */
export function wantsMoreKeyframes(keyframes: Keyframes<unknown>, currentTime: number): boolean {
    if (keyframes.length < 2) {
        return true;
    }
    
    // More keyframes are wanted when the penultimate one is past.
    return keyframes[keyframes.length - 2].time <= currentTime;
}

/** Get a non-zero distance between two keypoints. Don't let the distance between two values ever actually be zero, or we get divide by zero errors. */
function distance(from: number, to: number) {
    let distance = Math.abs(to - from);
    return Math.max(distance, 0.00000001);
}


// Value resolving layer 1, part 1: determining curve parameters for a keypoint, based on values of surrounding keypoints.

function determineCurveParameters(val0: number | undefined, val1: number, val2: number, val3: number | undefined): CurveParameters<number> {
    if (val0 === undefined) {
        val0 = val1;
    }

    if (val3 === undefined) {
        val3 = val2;
    }

    // Exponent of 0.5 makes this a centripetal Catmull-Rom spline.
    const t01 = Math.pow(distance(val0, val1), 0.5);
    const t12 = Math.pow(distance(val1, val2), 0.5);
    const t23 = Math.pow(distance(val2, val3), 0.5);

    const m1 = val2 - val1 + t12 * ((val1 - val0) / t01 - (val2 - val0) / (t01 + t12));
    const m2 = val2 - val1 + t12 * ((val3 - val2) / t23 - (val3 - val1) / (t12 + t23));

    return {
        a: 2 * (val1 - val2) + m1 + m2,
        b: -3 * (val1 - val2) - m1 - m1 - m2,
        c: m1,
    };
}

function determineCurveParametersForAngle(angle0: number | undefined, angle1: number, angle2: number, angle3: number | undefined) {
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

    return determineCurveParameters(angle0, angle1, angle2, angle3);
}

function determineCurveForObject<T extends object>(
    keyframes: Keyframes<T>,
    frame1: Keyframe<T>,
    frame2: Keyframe<T>,
    index2: number,
    keys: ReadonlyArray<keyof T & string>
): CurveParameters<T> {
    const frame0 = keyframes[index2 - 2];
    const frame3 = keyframes[index2 + 1];

    const a: Partial<Record<keyof T, number>> = {};
    const b: Partial<Record<keyof T, number>> = {};
    const c: Partial<Record<keyof T, number>> = {};

    const val0 = (frame0?.val ?? {}) as Record<keyof T, number>;
    const val1 = frame1.val as Record<keyof T, number>;
    const val2 = frame2.val as Record<keyof T, number>;
    const val3 = (frame3?.val ?? {})  as Record<keyof T, number>;

    for (const key of keys) {
        const keyCurve = determineCurveParameters(val0[key], val1[key], val2[key], val3[key]);

        a[key] = keyCurve.a;
        b[key] = keyCurve.b;
        c[key] = keyCurve.c;
    }

    return { a, b, c } as CurveParameters<T>;
}


// Value rendering layer 1, part 2: Resolving values based on last keypoint's parameters.

function resolveNumberValue(a: number, b: number, c: number, d: number, fraction: number) {
    return a * fraction * fraction * fraction
         + b * fraction * fraction
         + c * fraction
         + d;
}

function resolveAngleValue(a: number, b: number, c: number, d: number, fraction: number) {
    const unclamped = resolveNumberValue(a, b, c, d, fraction);

    return clampAngle(unclamped);
}

function resolveObjValue<T extends object>(keyframe: ResolvedKeyframe<T>, fraction: number, keys: ReadonlyArray<keyof T & string>): T {
    const result: Partial<Record<keyof T, number>> = {};

    const a = keyframe.curve.a as Record<keyof T, number>;
    const b = keyframe.curve.b as Record<keyof T, number>;
    const c = keyframe.curve.c as Record<keyof T, number>;
    const val = keyframe.val as Record<keyof T, number>;

    for (const key of keys) {
        result[key] = a[key] * fraction * fraction * fraction
            + b[key] * fraction * fraction
            + c[key] * fraction
            + val[key];
    }

    return result as T;
}


// Value resolving layer 2: numeric and object-property-looping implementations.

function getCompletedFraction(startFrame: Keyframe<unknown>, endFrame: Keyframe<unknown>, currentTime: number) {
    const fraction = (currentTime - startFrame.time) / (endFrame.time - startFrame.time);

    return Math.max(0, Math.min(1, fraction));
}

function getNumericValue(
    keyframes: Keyframes<number>,
    currentTime: number,
    determineCurve: typeof determineCurveParameters,
    resolveValue: typeof resolveNumberValue,
): number {
    const index2 = getFirstFutureIndex(keyframes, currentTime);

    if (index2 === -1) {
        // If the whole curve is in the past, hold on the last position.
        return keyframes[keyframes.length - 1].val;
    }

    const frame2 = keyframes[index2];

    if (index2 === 0) {
        // If the whole curve is in the future, hold on the first position.
        return frame2.val;
    }

    const frame1 = keyframes[index2 - 1];

    if (!frame1.curve) {
        const frame0 = keyframes[index2 - 2];
        const frame3 = keyframes[index2 + 1];
        frame1.curve = determineCurve(frame0?.val, frame1.val, frame2.val, frame3?.val);
    }

    const fraction = getCompletedFraction(frame1, frame2, currentTime);
    return resolveValue(frame1.curve.a, frame1.curve.b, frame1.curve.c, frame1.val, fraction);
}

function getObjectValue<T extends object>(keyframes: Keyframes<T>, currentTime: number, keys: ReadonlyArray<keyof T & string>): T {
    const index2 = getFirstFutureIndex(keyframes, currentTime);

    if (index2 === -1) {
        // If the whole curve is in the past, hold on the last position.
        return keyframes[keyframes.length - 1].val;
    }

    const frame2 = keyframes[index2];

    if (index2 === 0) {
        // If the whole curve is in the future, hold on the first position.
        return frame2.val;
    }

    const frame1 = keyframes[index2 - 1];

    if (!frame1.curve) {
        frame1.curve = determineCurveForObject<T>(keyframes, frame1, frame2, index2, keys);
    }

    const fraction = getCompletedFraction(frame1, frame2, currentTime);
    return resolveObjValue<T>(frame1 as Required<typeof frame1>, fraction, keys);
}


// Value resolving layer 3: type-specific functions.

export function getNumberValue(keyframes: Keyframes<number>, currentTime = getTime()): number {
    return getNumericValue(keyframes, currentTime, determineCurveParameters, resolveNumberValue);
}

export function getAngleValue(keyframes: Keyframes<number>, currentTime = getTime()): number {
    return getNumericValue(keyframes, currentTime, determineCurveParametersForAngle, resolveAngleValue);
}

const vectorKeys: ReadonlyArray<keyof Vector2D> = ['x', 'y'];

export function getVectorValue(keyframes: Keyframes<Vector2D>, currentTime = getTime()): Vector2D {
    return getObjectValue<Vector2D>(keyframes, currentTime, vectorKeys);
}

const positionKeys: ReadonlyArray<keyof Position> = ['x', 'y', 'angle', 'evade'];

export function getPositionValue(keyframes: Keyframes<Position>, currentTime = getTime()): Position {
    return getObjectValue<Position>(keyframes, currentTime, positionKeys);
}
