import { ShipState } from '../../common/data/server/ShipState';
import { durationToTimeSpan } from '../../common/data/Progression';
import { determineAngle, determineMidAngle, vectorsEqual, distance, clampAngle, unit } from '../../common/data/Vector2D';
import { Position } from '../../common/data/Position';
import { Waypoint } from '../../common/data/Waypoint';
import { Animation, getPositionValue, getLastPastFrame } from '../../common/data/Animation';

function updateWaypoints(ship: ShipState, currentTime: number) {
    if (ship.helm.waypoints.length === 0) {
        return;
    }

    const testWaypoint = ship.helm.waypoints[0];
    if (testWaypoint.time === undefined || testWaypoint.time > currentTime) {
        return;
    }

    ship.helm.lastWaypoint = testWaypoint;
    ship.helm.waypoints = ship.helm.waypoints.slice(1);
}

export function shouldUpdatePosition(ship: ShipState, currentTime: number) {
    updateWaypoints(ship, currentTime);

    if (ship.helm.forcePositionUpdate) {
        return true;
    }

    const position = ship.position;

    if (position.length === 0) {
        return ship.helm.waypoints.length > 0;
    }

    let testFrame: number;

    if (position.length === 1) {
        testFrame = 0;
    }
    else {
        // If we have waypoints, update once we're in last two frames
        testFrame = position.length - 2;
    }
    
    return position[testFrame].time <= currentTime;
}

export function updateShipPosition(ship: ShipState, currentTime: number) {
    if (shouldHoldPosition(ship)) {
        holdPosition(ship, currentTime);
    }
    else {
        updatePositionValue(ship, currentTime);
    }

    ship.helm.forcePositionUpdate = false;
}

function shouldHoldPosition(ship: ShipState) {
    // Hold position if we've nowhere to go,
    if (ship.helm.waypoints.length === 0) {
        return true;
    }

    // Or if we've only one waypoint and have plotted a course there already.
    if (ship.helm.waypoints.length === 1) {
        const lastPos = ship.position[ship.position.length - 1];
        const onlyWaypoint = ship.helm.waypoints[0];

        return vectorsEqual(lastPos.val, onlyWaypoint);
    }

    return false;
}

function holdPosition(ship: ShipState, currentTime: number) {
    const lastFrame = ship.position[ship.position.length - 1];

    const time = currentTime + durationToTimeSpan(5);

    if (ship.helm.waypoints.length > 0) {
        const waypoint = ship.helm.waypoints[0];
        if (waypoint.time === undefined) {
            waypoint.time = time;
        }
    }

    const framesToKeep = getExistingFramesToKeep(ship, currentTime);

    ship.position = [
        ...framesToKeep,
        {
            time,
            val: lastFrame.val,
        }
    ];
}

function getExistingFramesToKeep(ship: ShipState, currentTime: number) {
    const pastFrames = ship.position.slice(0, getLastPastFrame(ship.position, currentTime) + 1);

    if (pastFrames.length === 0) {
        // console.log('keeping 0 frames, adding current time twice');
        const currentPos = getPositionValue(ship.position, currentTime);
        return [
            {
                time: currentTime - durationToTimeSpan(1), // TODO: account for ship acceleration?
                val: currentPos,
            },
            {
                time: currentTime,
                val: currentPos,
            },
        ];
    }
    else if (ship.helm.forcePositionUpdate || pastFrames.length === 1) {
        // console.log('keeping 1 frame, adding current time');
        return [
            pastFrames[pastFrames.length - 1],
            {
                time: currentTime,
                val: getPositionValue(ship.position, currentTime),
            },
        ]
    }
    else {
        // console.log(`keeping ${ship.position.length - numPastFrames} frames`);
        return ship.position.slice(pastFrames.length - 2);
    }
}

function updatePositionValue(ship: ShipState, currentTime: number) {
    const framesToKeep = getExistingFramesToKeep(ship, currentTime);
    const newFrames = determineFutureFrames(ship, framesToKeep);

    /*
    console.log(`updating position ... time is ${currentTime}`);
    console.log('updating position ... frames to keep are', JSON.parse(JSON.stringify(framesToKeep)));
    console.log('updating position ... new frames are', JSON.parse(JSON.stringify(newFrames)));
    console.log('');
    */

    ship.position = [
        ...framesToKeep,
        ...newFrames,
    ];
}

function determineFutureFrames(ship: ShipState, framesToKeep: Animation<Position>): Animation<Position> {
    let [
        firstWaypoint,
        secondWaypoint,
        thirdWaypoint,
    ] = ship.helm.waypoints;

    if (firstWaypoint.time !== undefined && !ship.helm.forcePositionUpdate) {
        firstWaypoint = secondWaypoint;
        secondWaypoint = thirdWaypoint;
    }

    const { val: startPosition, time: startTime } = framesToKeep[framesToKeep.length - 1];
    const moveAngle = determineAngle(startPosition, firstWaypoint, startPosition.angle);

    const endPosition = firstWaypoint.angle === undefined
        ? {
            x: firstWaypoint.x,
            y: firstWaypoint.y,
            angle: secondWaypoint
                ? determineMidAngle(startPosition, firstWaypoint, secondWaypoint, startPosition.angle)
                : moveAngle,
        }
        : firstWaypoint as Position;

    const startRotationAngularDistance = clampAngle(startPosition.angle - moveAngle);
    const startRotationDuration = Math.abs(startRotationAngularDistance / ship.helm.rotationalSpeed);

    const endRotationAngularDistance = clampAngle(endPosition.angle - moveAngle);
    const endRotationDuration = Math.abs(endRotationAngularDistance / ship.helm.rotationalSpeed);

    const fullRotationDuration = distance(startPosition, endPosition) / ship.helm.speedWhileRotating;

    if (startRotationDuration + endRotationDuration >= fullRotationDuration) {
        // rotate directly to the end position
        const endTime = startTime + durationToTimeSpan(fullRotationDuration);
        firstWaypoint.time = endTime;

        return [{
            val: endPosition,
            time: endTime,
        }];
    }
    
    const results: Animation<Position> = [];

    // rotate, go straight, rotate again
    const moveDirection = unit(startPosition, endPosition);

    let latestTime = startTime;
    let startStraightPos: Position;

    if (startRotationDuration > 0.01) {
        const startRotationDistance = ship.helm.speedWhileRotating * startRotationDuration;

        startStraightPos = {
            x: startPosition.x + moveDirection.x * startRotationDistance,
            y: startPosition.y + moveDirection.y * startRotationDistance,
            angle: moveAngle,
        };

        latestTime += durationToTimeSpan(startRotationDuration);
        
        results.push({
            val: startStraightPos,
            time: latestTime,
        })
    }
    else {
        startStraightPos = startPosition;
    }
    
    let endStraightPos: Position;

    if (endRotationDuration > 0.01) {
        const endRotationDistance = ship.helm.speedWhileRotating * endRotationDuration;

        endStraightPos = {
            x: endPosition.x - moveDirection.x * endRotationDistance,
            y: endPosition.y - moveDirection.y * endRotationDistance,
            angle: moveAngle,
        };
    }
    else {
        endStraightPos = endPosition;
    }
    
    const straightTimeSpan = durationToTimeSpan(distance(startStraightPos, endStraightPos) / ship.helm.speed);

    latestTime += straightTimeSpan;
    
    if (endRotationDuration > 0.01) {
        results.push({
            val: endStraightPos,
            time: latestTime,
        });

        latestTime += durationToTimeSpan(endRotationDuration);
    }

    results.push({
        val: endPosition,
        time: latestTime,
    });

    firstWaypoint.time = latestTime;

    return results;
}

export function addWaypoint(ship: ShipState, waypoint: Waypoint) {
    ship.helm.waypoints.push(waypoint);

    if (ship.helm.waypoints.length <= 2) {
        ship.helm.forcePositionUpdate = true;
    }
}

export function clearMovement(ship: ShipState) {
    ship.helm.waypoints = [];

    // TODO: recalculate movement .. decelerate to a stop

    ship.helm.forcePositionUpdate = true;
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
