import { ShipState } from '../../data/ShipState';
import { durationToTimeSpan, getTime, getCompletedFraction } from '../../data/Progression';
import { Vector2D } from '../../data/Vector2D';
import { PartialInterpolation, Interpolation, discreteVectorValue } from '../../data/Interpolation';

function determineStepDuration(ship: ShipState, from: Vector2D, to: Vector2D) {
    return 10; // TODO: calculate this based on ship's helm power?
}

export function updateShipPosition(ship: ShipState, time: number) {
    const oldCurrent = ship.position.current;
    const oldNext = ship.position.next
        ?? {
            duration: 30,
            value: oldCurrent.endValue,
        }

    const previous = {
        value: { ...oldCurrent.startValue },
        duration: oldCurrent.duration,
    };

    const current = {
        startValue: { ...oldCurrent.endValue },
        endValue: { ...oldNext.value },
        duration: oldNext.duration,
        endTime: oldCurrent.endTime + durationToTimeSpan(oldNext.duration)
    };

    const nextPos = ship.futurePositions.shift()
        ?? { ...oldNext.value };

    const next = {
        value: {
            x: nextPos.x,
            y: nextPos.y,
        },
        duration: determineStepDuration(ship, current.endValue, nextPos),
    }

    ship.position = {
        previous,
        current,
        next,
    };
}

export function addToMovement(ship: ShipState, destination: Vector2D) {
    if (ship.position.next) {
        ship.futurePositions.push(destination);
    }
    else {
        const duration = determineStepDuration(ship, ship.position.current.endValue, destination);
        
        ship.position.next = {
            value: destination,
            duration,
        }
    }
}

export function replaceMovement(ship: ShipState, destination: Vector2D) {
    const time = getTime();

    const currentPos = discreteVectorValue(ship.position.current);

    const duration = determineStepDuration(ship, currentPos, destination);

    const current: Interpolation<Vector2D> = {
        startValue: currentPos,
        endValue: destination,
        duration,
        endTime: time + durationToTimeSpan(duration),
    };

    const previous: PartialInterpolation<Vector2D> = {
        value: ship.position.current.startValue,
        duration: getCompletedFraction(ship.position.current, time),
    };

    ship.position = {
        current,
        previous,
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
