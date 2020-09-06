import { getTime, getCompletedFraction, durationToTimeSpan } from './Progression';
import { Vector2D } from './Vector2D';
import { Position } from './Position';

const endTimespan = durationToTimeSpan(3);

export interface KeyFrame<T> {
    time: number;
    val: T;
}

export type Animation<T> = Array<KeyFrame<T>>;

type AnimationSegment<T> = [
    KeyFrame<T>,
    KeyFrame<T>,
    KeyFrame<T>,
    KeyFrame<T>,
];

function getCurrentSegment<T>(interpolation: Animation<T>, currentTime: number): AnimationSegment<T> {
    const firstFutureIndex = interpolation.findIndex(segment => segment.time > currentTime);

    if (firstFutureIndex >= 2) {
        if (interpolation.length >= firstFutureIndex + 2) {
            return interpolation.slice(firstFutureIndex - 2, firstFutureIndex + 1) as AnimationSegment<T>;
        }
        else {
            const firstFuture = interpolation[firstFutureIndex];

            // Add a "stationary" item on the end on the end.
            return [
                ...interpolation.slice(firstFutureIndex - 2),
                {
                    time: firstFuture.time + endTimespan,
                    val: firstFuture.val,
                }
            ] as AnimationSegment<T>;
        }
    }
    else if (firstFutureIndex === -1) {
        // It's all in the past...
        const { val } = interpolation[interpolation.length - 1];

        return [
            {
                time: currentTime - endTimespan,
                val,
            },
            {
                time: currentTime,
                val,
            },
            {
                time: currentTime + endTimespan,
                val,
            },
            {
                time: currentTime + endTimespan + endTimespan,
                val,
            },
        ]
    }

    let returnVal: KeyFrame<T>[];
    const firstVal = interpolation[0];

    if (firstFutureIndex === 1) {
        // Add one "stationary" item onto the start.
        returnVal = [
            {
                time: firstVal.time - endTimespan,
                val: firstVal.val,
            },
            firstVal,
            interpolation[firstFutureIndex],
        ];
    }
    else { // firstFutureIndex === 0
        // Add two "stationary" items onto the start.
        returnVal = [
            {
                time: firstVal.time - endTimespan - endTimespan,
                val: firstVal.val,
            },
            {
                time: firstVal.time - endTimespan,
                val: firstVal.val,
            },
            firstVal,
        ];
    }

    if (firstFutureIndex === interpolation.length - 1) {
        // Add one "stationary" value onto the end.
        const endVal = returnVal[2];

        returnVal.push({
            time: endVal.time + endTimespan,
            val: endVal.val,
        });
    }
    else {
        // Add the last value onto the end.
        returnVal.push(interpolation[firstFutureIndex + 1]);
    }

    return returnVal as AnimationSegment<T>;
}

function interpolate(val0: number, val1: number, val2: number, val3: number, fraction: number) {
    const fraction2 = fraction * fraction;
    const a0 = -0.5 * val0 + 1.5 * val1 - 1.5 * val2 + 0.5 * val3;
    const a1 = val0 - 2.5 * val1 + 2 * val2 - 0.5 * val3;
    const a2 = 0.5 * (val2 - val0);
    const a3 = val1;
    
    return a0 * fraction * fraction2 + a1 * fraction2 + a2 * fraction + a3;
}

export function getNumberValue(interpolation: Animation<number>, currentTime = getTime()): number {
    const [val0, val1, val2, val3] = getCurrentSegment(interpolation, currentTime);

    const fraction = getCompletedFraction(val1.time, val2.time, currentTime);

    return interpolate(val0.val, val1.val, val2.val, val3.val, fraction);
}

function interpolateAngle(angle0: number, angle1: number, angle2: number, angle3: number, fraction: number) {
    while (angle3 - angle2 > Math.PI) {
        angle3 += Math.PI * 2;
    }
    while (angle2 - angle3 > Math.PI) {
        angle3 -= Math.PI * 2;
    }

    while (angle1 - angle2 > Math.PI) {
        angle1 += Math.PI * 2;
    }
    while (angle2 - angle1 > Math.PI) {
        angle1 -= Math.PI * 2;
    }

    while (angle0 - angle1 > Math.PI) {
        angle0 += Math.PI * 2;
    }
    while (angle1 - angle0 > Math.PI) {
        angle0 -= Math.PI * 2;
    }

    return interpolate(angle0, angle1, angle2, angle3, fraction);
}

export function getAngleValue(animation: Animation<number>, currentTime = getTime()): number {
    const [val0, val1, val2, val3] = getCurrentSegment(animation, currentTime);

    const fraction = getCompletedFraction(val1.time, val2.time, currentTime);

    return interpolateAngle(val0.val, val1.val, val2.val, val3.val, fraction);
}

export function getVectorValue(interpolation: Animation<Vector2D>, currentTime = getTime()): Vector2D {
    const [val0, val1, val2, val3] = getCurrentSegment(interpolation, currentTime);

    const fraction = getCompletedFraction(val1.time, val2.time, currentTime);

    return {
        x: interpolate(val0.val.x, val1.val.x, val2.val.x, val3.val.x, fraction),
        y: interpolate(val0.val.y, val1.val.y, val2.val.y, val3.val.y, fraction),
    };
}

export function getPositionValue(interpolation: Animation<Position>, currentTime = getTime()): Position {
    const [val0, val1, val2, val3] = getCurrentSegment(interpolation, currentTime);

    const fraction = getCompletedFraction(val1.time, val2.time, currentTime);

    const pos0 = val0.val;
    const pos1 = val1.val;
    const pos2 = val2.val;
    const pos3 = val3.val;

    return {
        x: interpolate(pos0.x, pos1.x, pos2.x, pos3.x, fraction),
        y: interpolate(pos0.y, pos1.y, pos2.y, pos3.y, fraction),
        angle: interpolateAngle(pos0.angle, pos1.angle, pos2.angle, pos3.angle, fraction),
    };
}
