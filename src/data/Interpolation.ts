import { Progression, getTime, getCompletedFraction } from './Progression';
import { Vector2D } from './Vector2D';

export interface Interpolation<T> extends Progression {
    startValue: T;
    endValue: T;
}

export interface PartialInterpolation<T> {
    duration: number;
    value: T;
}

export interface ContinuousInterpolation<T> {
    previous?: PartialInterpolation<T>;
    current: Interpolation<T>;
    next?: PartialInterpolation<T>;
}

export function discreteNumberValue(interpolation: Interpolation<number>, currentTime = getTime()): number {
    const fraction = getCompletedFraction(interpolation, currentTime);

    return interpolation.startValue + (interpolation.endValue - interpolation.startValue) * fraction;
}

export function discreteAngleValue(interpolation: Interpolation<number>, currentTime = getTime()): number {
    const fraction = getCompletedFraction(interpolation, currentTime);

    // As per discreteNumberValue, but with clamping
    let { startValue, endValue } = interpolation;

    while (startValue - endValue > Math.PI) {
        startValue -= Math.PI * 2;
    }
    while (endValue - startValue > Math.PI) {
        endValue -= Math.PI * 2;
    }

    return startValue + (endValue - startValue) * fraction;
}

export function discreteVectorValue(interpolation: Interpolation<Vector2D>, currentTime = getTime()): Vector2D {
    const fraction = getCompletedFraction(interpolation, currentTime);

    return {
        x: interpolation.startValue.x + (interpolation.endValue.x - interpolation.startValue.x) * fraction,
        y: interpolation.startValue.y + (interpolation.endValue.y - interpolation.startValue.y) * fraction,
    };
}

function interpolate(val0: number, val1: number, val2: number, val3: number, fraction: number) {
    const fraction2 = fraction * fraction;
    const a0 = -0.5 * val0 + 1.5 * val1 - 1.5 * val2 + 0.5 * val3;
    const a1 = val0 - 2.5 * val1 + 2 * val2 - 0.5 * val3;
    const a2 = 0.5 * (val2 - val0);
    const a3 = val1;
    
    return a0 * fraction * fraction2 + a1 * fraction2 + a2 * fraction + a3;
}

export function continuousNumberValue(interpolation: ContinuousInterpolation<number>, currentTime = getTime()): number {
    const fraction = getCompletedFraction(interpolation.current, currentTime);

    const val0 = interpolation.previous?.value
        ?? interpolation.current.startValue;

    const val1 = interpolation.current.startValue;

    const val2 = interpolation.current.endValue;

    const val3 = interpolation.next?.value
        ?? interpolation.current.endValue;

    return interpolate(val0, val1, val2, val3, fraction);
}

export function continuousAngleValue(interpolation: ContinuousInterpolation<number>, currentTime = getTime()): number {
    const fraction = getCompletedFraction(interpolation.current, currentTime);

    let val0 = interpolation.previous?.value
        ?? interpolation.current.startValue;

    let val1 = interpolation.current.startValue;

    let val2 = interpolation.current.endValue;

    let val3 = interpolation.next?.value
        ?? interpolation.current.endValue;

    // as per continuousNumberValue, but with wrapping
    while (val3 - val2 > Math.PI) {
        val3 += Math.PI * 2;
    }
    while (val2 - val3 > Math.PI) {
        val3 -= Math.PI * 2;
    }

    while (val1 - val2 > Math.PI) {
        val1 += Math.PI * 2;
    }
    while (val2 - val1 > Math.PI) {
        val1 -= Math.PI * 2;
    }

    while (val0 - val1 > Math.PI) {
        val0 += Math.PI * 2;
    }
    while (val1 - val0 > Math.PI) {
        val0 -= Math.PI * 2;
    }

    return interpolate(val0, val1, val2, val3, fraction);
}

export function continuousVectorValue(interpolation: ContinuousInterpolation<Vector2D>, currentTime = getTime()): Vector2D {
    const fraction = getCompletedFraction(interpolation.current, currentTime);

    const vec0 = interpolation.previous?.value
        ?? interpolation.current.startValue;

    const vec1 = interpolation.current.startValue;

    const vec2 = interpolation.current.endValue;

    const vec3 = interpolation.next?.value
        ?? interpolation.current.endValue;

    return {
        x: interpolate(vec0.x, vec1.x, vec2.x, vec3.x, fraction),
        y: interpolate(vec0.y, vec1.y, vec2.y, vec3.y, fraction),
    };
}
