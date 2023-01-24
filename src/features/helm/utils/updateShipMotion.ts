import { Keyframes, getLastPastFrame, getPositionValue, wantsMoreKeyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';
import { vectorsEqual, determineAngle, determineMidAngle, clampAngle, distance, unit } from 'src/types/Vector2D';
import { Waypoint } from 'src/types/Waypoint';
import { durationToTicks } from 'src/utils/timeSpans';

export function shouldUpdateMotion(ship: Ship, currentTime: number) {
    if (ship.helm.forceMotionUpdate) {
        return true;
    }

    const motion = ship.motion;

    if (motion.length === 0) {
        return ship.helm.waypoints.length > 0;
    }

    return wantsMoreKeyframes(ship.motion, currentTime);
}

export function updateShipMotion(ship: Ship, currentTime: number) {
    if (shouldHoldPosition(ship)) {
        holdPosition(ship, currentTime);
    }
    else {
        updatePositionValue(ship, currentTime);
    }

    ship.helm.forceMotionUpdate = false;
}

function shouldHoldPosition(ship: Ship) {
    // Hold position if we've nowhere to go,
    if (ship.helm.waypoints.length === 0) {
        return true;
    }

    // Or if we've only one waypoint and have plotted a course there already.
    if (ship.helm.waypoints.length === 1) {
        const lastPos = ship.motion[ship.motion.length - 1];
        const onlyWaypoint = ship.helm.waypoints[0];

        return vectorsEqual(lastPos.val, onlyWaypoint);
    }

    return false;
}

function holdPosition(ship: Ship, currentTime: number) {
    const lastFrame = ship.motion[ship.motion.length - 1];

    const time = currentTime + durationToTicks(5);

    if (ship.helm.waypoints.length > 0) {
        const waypoint = ship.helm.waypoints[0];
        if (waypoint.time === undefined) {
            waypoint.time = time;
        }
    }

    const framesToKeep = getExistingFramesToKeep(ship, currentTime);

    ship.motion = [
        ...framesToKeep,
        {
            time,
            val: lastFrame.val,
        }
    ];
}

function getExistingFramesToKeep(ship: Ship, currentTime: number) {
    const pastFrames = ship.motion.slice(0, getLastPastFrame(ship.motion, currentTime) + 1);

    if (pastFrames.length === 0) {
        // console.log('keeping 0 frames, adding current time twice');
        const currentPos = getPositionValue(ship.motion, currentTime);
        return [
            {
                time: currentTime - durationToTicks(1), // TODO: account for ship acceleration?
                val: currentPos,
            },
            {
                time: currentTime,
                val: currentPos,
            },
        ];
    }
    else if (ship.helm.forceMotionUpdate || pastFrames.length === 1) {
        // console.log('keeping 1 frame, adding current time');
        return [
            pastFrames[pastFrames.length - 1],
            {
                time: currentTime,
                val: getPositionValue(ship.motion, currentTime),
            },
        ]
    }
    else {
        // console.log(`keeping ${ship.position.length - numPastFrames} frames`);
        return ship.motion.slice(pastFrames.length - 2);
    }
}

function updatePositionValue(ship: Ship, currentTime: number) {
    const framesToKeep = getExistingFramesToKeep(ship, currentTime);
    const newFrames = determineFutureFrames(ship, framesToKeep);

    /*
    console.log(`updating position ... time is ${currentTime}`);
    console.log('updating position ... frames to keep are', JSON.parse(JSON.stringify(framesToKeep)));
    console.log('updating position ... new frames are', JSON.parse(JSON.stringify(newFrames)));
    console.log('');
    */

    ship.motion = [
        ...framesToKeep,
        ...newFrames,
    ];
}

function determineFutureFrames(ship: Ship, framesToKeep: Keyframes<Position>): Keyframes<Position> {
    let [
        firstWaypoint,
        secondWaypoint,
        thirdWaypoint,
    ] = ship.helm.waypoints;

    if (firstWaypoint.time !== undefined && !ship.helm.forceMotionUpdate) {
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
        const endTime = startTime + durationToTicks(fullRotationDuration);
        firstWaypoint.time = endTime;

        return [{
            val: endPosition,
            time: endTime,
        }];
    }
    
    const results: Keyframes<Position> = [];

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

        latestTime += durationToTicks(startRotationDuration);
        
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
    
    const straightTimeSpan = durationToTicks(distance(startStraightPos, endStraightPos) / ship.helm.speed);

    latestTime += straightTimeSpan;
    
    if (endRotationDuration > 0.01) {
        results.push({
            val: endStraightPos,
            time: latestTime,
        });

        latestTime += durationToTicks(endRotationDuration);
    }

    results.push({
        val: endPosition,
        time: latestTime,
    });

    firstWaypoint.time = latestTime;

    return results;
}

export function addWaypoint(ship: Ship, waypoint: Waypoint) {
    ship.helm.waypoints.push(waypoint);

    if (ship.helm.waypoints.length <= 2) {
        ship.helm.forceMotionUpdate = true;
    }
}

export function clearMovement(ship: Ship) {
    ship.helm.waypoints = [];

    // TODO: recalculate movement .. decelerate to a stop

    ship.helm.forceMotionUpdate = true;
}

export function adjustSpeed(ship: Ship, time: number) {
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
