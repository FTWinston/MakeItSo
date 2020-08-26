import { ShipState } from '../../data/ShipState';
import { Interpolation, discreteVectorValue } from '../../data/Interpolation';
import { durationToTimeSpan, getTime, getCompletedFraction } from '../../data/Progression';
import { Vector2D, vectorsEqual } from '../../data/Vector2D';

function determineStepDuration(ship: ShipState, from: Vector2D, to: Vector2D) {
    return 10; // TODO: calculate this based on ship's helm power?
}

export function updateShipPosition(ship: ShipState) {
    const oldCurrent = ship.position.current;
    const oldNext = ship.position.next
        ?? {
            duration: 30,
            value: oldCurrent.endValue,
        };

    const previous = {
        value: { ...oldCurrent.startValue },
        duration: oldCurrent.duration,
    };

    const current = oldNext
        ? {
            startValue: { ...oldCurrent.endValue },
            endValue: { ...oldNext.value },
            duration: oldNext.duration,
            endTime: oldCurrent.endTime + durationToTimeSpan(oldNext.duration),
        }
        : {
            startValue: { ...oldCurrent.endValue },
            endValue: { ...oldCurrent.endValue },
            duration: 30,
            endTime: oldCurrent.endTime + durationToTimeSpan(30),
        }

    const nextPos = ship.futurePositions.shift();

    ship.position = nextPos
        ? {
            previous,
            current,
            next: {
                value: {
                    x: nextPos.x,
                    y: nextPos.y,
                },
                duration: determineStepDuration(ship, current.endValue, nextPos),
            },
        }
        : {
            previous,
            current,
        };
}

export function addToMovement(ship: ShipState, destination: Vector2D) {
    if (ship.position.next) {
        if (ship.futurePositions.length > 0) {
            const lastPos = ship.futurePositions[ship.futurePositions.length - 1];
            if (vectorsEqual(lastPos, destination)) {
                return; // Don't add the same position again
            }
        }
        else {
            if (vectorsEqual(ship.position.next.value, destination)) {
                return; // Don't add the same position again
            }
        }
        ship.futurePositions.push(destination);
    }
    else if (vectorsEqual(ship.position.current.startValue, ship.position.current.endValue)) {
        replaceMovement(ship, destination); // currently immobile, override immediately
    } else {
        const time = getTime();
        const oldCurrent = ship.position.current;
        
        const completedFraction = getCompletedFraction(oldCurrent, time);
        
        // Update previous and current too, in order to stop it jerking.
        // TODO: this doesn't stop the jerk...
        ship.position = {
            /*
            previous: {
                value: oldCurrent.startValue,
                duration: completedFraction * oldCurrent.duration,
            },
            */
            current: {
                startValue: discreteVectorValue(oldCurrent, time),
                endValue: oldCurrent.endValue,
                duration: (1 - completedFraction) * oldCurrent.duration,
                endTime: oldCurrent.endTime,
            },
            next: {
                value: destination,
                duration: determineStepDuration(ship, oldCurrent.endValue, destination),
            },
        };
    }
}

export function replaceMovement(ship: ShipState, destination: Vector2D) {
    const time = getTime();

    const oldCurrent = ship.position.current;

    const currentPos = discreteVectorValue(oldCurrent, time);

    const duration = determineStepDuration(ship, currentPos, destination);

    const current: Interpolation<Vector2D> = {
        startValue: currentPos,
        endValue: destination,
        duration,
        endTime: time + durationToTimeSpan(duration),
    };

    ship.position = vectorsEqual(oldCurrent.startValue, oldCurrent.endValue)
        ? {
            current,
        }
        : {
            current,
            previous: {
                value: oldCurrent.startValue,
                duration: getCompletedFraction(oldCurrent, time) * oldCurrent.duration,
            },
        };

    ship.futurePositions = [];
}

export function adjustSpeed(ship: ShipState, time: number) {
    const { current, next } = ship.position;

    const fullDuration = determineStepDuration(ship, current.startValue, current.endValue);
    if (fullDuration === current.duration) {
        return; // no change
    }

    const remainingFraction = 1 - getCompletedFraction(current);
    current.duration = fullDuration;
    current.endTime = time + fullDuration * remainingFraction;

    if (next) {
        next.duration = determineStepDuration(ship, current.endValue, next?.value);
    }   
}
