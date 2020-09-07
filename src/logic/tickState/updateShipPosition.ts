import { ShipState } from '../../common/data/server/ShipState';
import { Interpolation, getVectorValue } from '../../common/data/Interpolation';
import { durationToTimeSpan, getTime, getCompletedFraction } from '../../common/data/Progression';
import { Vector2D, vectorsEqual, determineAngle } from '../../common/data/Vector2D';
import { Waypoint } from '../../common/data/Waypoint';

function determineStepDuration(ship: ShipState, fromPos: Vector2D, toPos: Vector2D) {
    return 10; // TODO: calculate this based on ship's helm power and distance. And angle?
}

export function updateShipPosition(ship: ShipState) {
    /*
    const oldCurrent = ship.movement.current;
    const oldNext = ship.movement.next
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

    const nextPos = ship.waypoints.shift();

    ship.movement = nextPos
        ? {
            previous,
            current,
            next: {
                value: {
                    position: {
                        x: nextPos.x,
                        y: nextPos.y,
                    },
                    angle: nextPos.angle,
                },
                duration: determineStepDuration(ship, current.endValue.position, nextPos),
            },
        }
        : {
            previous,
            current,
        };
    */
}

/*
export function addToMovement(ship: ShipState, destination: Vector2D, targetAngle?: number) {
    // TODO: make use of targetAngle

    if (ship.movement.next) {
        if (ship.waypoints.length > 0) {
            const lastPos = ship.waypoints[ship.waypoints.length - 1];
            if (vectorsEqual(lastPos, destination)) {
                return; // Don't add the same position again
            }
        }
        else {
            if (vectorsEqual(ship.movement.next.value.position, destination)) {
                return; // Don't add the same position again
            }
        }
        ship.waypoints.push(destination);
    }
    else if (vectorsEqual(ship.movement.current.startValue.position, ship.movement.current.endValue.position)) {
        replaceMovement(ship, destination); // currently immobile, override immediately
    } else {
        const time = getTime();
        const oldCurrent = ship.movement.current;
        
        const completedFraction = getCompletedFraction(oldCurrent, time);
        
        // Update previous and current too, in order to stop it jerking.
        // TODO: this doesn't stop the jerk...
        ship.movement = {
            current: {
                startValue: getVectorValue(oldCurrent, time),
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

    const oldCurrent = ship.movement.current;

    const currentPos = getVectorValue(oldCurrent, time);

    const duration = determineStepDuration(ship, currentPos, destination);

    const current: Interpolation<Vector2D> = {
        startValue: currentPos,
        endValue: destination,
        duration,
        endTime: time + durationToTimeSpan(duration),
    };

    ship.movement = vectorsEqual(oldCurrent.startValue, oldCurrent.endValue)
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

    ship.angle = {
        startValue: ship.angle.endValue,
        endValue: determineAngle(current.startValue, current.endValue, ship.angle.endValue),
        duration: current.duration * 0.33,
        endTime: current.endTime - durationToTimeSpan(current.duration * 0.67),
    };
    
    ship.waypoints = [];
}
*/

export function addWaypoint(ship: ShipState, waypoint: Waypoint) {
    ship.waypoints.push(waypoint);

    if (ship.waypoints.length > 2) {
        return;
    }

    // TODO: recalculate movement
}

export function clearMovement(ship: ShipState) {
    ship.waypoints = [];

    // TODO: recaclulate movement .. decelerate to a stop
}

export function adjustSpeed(ship: ShipState, time: number) {
    /*
    const { current, next } = ship.movement;

    const fullDuration = determineStepDuration(ship, current.startValue, current.endValue);
    if (fullDuration === current.duration) {
        return; // no change
    }

    const remainingFraction = 1 - getCompletedFraction(current);
    current.duration = ship.angle.duration = fullDuration;
    current.endTime = ship.angle.endTime = time + fullDuration * remainingFraction;

    if (next) {
        next.duration = determineStepDuration(ship, current.endValue, next?.value);
    }
    */
}
