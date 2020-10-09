import { Progression, getTime, getCompletedFraction } from './Progression';
import { Vector2D } from './Vector2D';

export interface Interpolation<T> extends Progression {
    startVal: T;
    endVal: T;
}

export function getNumberValue(interpolation: Interpolation<number>, currentTime = getTime()): number {
    const fraction = getCompletedFraction(interpolation.startTime, interpolation.endTime, currentTime);

    return interpolation.startVal + (interpolation.endVal - interpolation.startVal) * fraction;
}

export function getAngleValue(interpolation: Interpolation<number>, currentTime = getTime()): number {
    const fraction = getCompletedFraction(interpolation.startTime, interpolation.endTime, currentTime);

    // As per discreteNumberValue, but with clamping
    let { startVal, endVal } = interpolation;

    while (startVal - endVal > Math.PI) {
        startVal -= Math.PI * 2;
    }
    while (endVal - startVal >= Math.PI) {
        endVal -= Math.PI * 2;
    }

    return startVal + (endVal - startVal) * fraction;
}

export function getVectorValue(interpolation: Interpolation<Vector2D>, currentTime = getTime()): Vector2D {
    const fraction = getCompletedFraction(interpolation.startTime, interpolation.endTime, currentTime);

    return {
        x: interpolation.startVal.x + (interpolation.endVal.x - interpolation.startVal.x) * fraction,
        y: interpolation.startVal.y + (interpolation.endVal.y - interpolation.startVal.y) * fraction,
    };
}
