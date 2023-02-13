import { Keyframes, getLastPastFrame, getPositionValue, wantsMoreKeyframes, getLastFrame } from 'src/types/Keyframes';
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
        return ship.helm.destination !== null;
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
    if (ship.helm.destination === null) {
        return true;
    }

    // Or if we've got a destination and have plotted a course there already.
    const lastPos = getLastFrame(ship.motion);

    return vectorsEqual(lastPos.val, ship.helm.destination);
}

function holdPosition(ship: Ship, currentTime: number) {
    const lastFrame = getLastFrame(ship.motion);
    const time = currentTime + durationToTicks(5);
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
            getLastFrame(pastFrames),
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
    // TODO: THIS FOR MANEUVERS?
    /*
    let [
        firstWaypoint,
        secondWaypoint,
        thirdWaypoint,
    ] = ship.helm.waypoints;
    */
    let firstWaypoint = ship.helm.destination ?? undefined;
    if (firstWaypoint === undefined) {
        return [];
    }
    let secondWaypoint: Waypoint | undefined = undefined;
    let thirdWaypoint: Waypoint | undefined = undefined;

    // Is this just ASSUMING firstWaypoint is in the past?
    if (firstWaypoint.time !== undefined && !ship.helm.forceMotionUpdate && secondWaypoint) {
        firstWaypoint = secondWaypoint;
        secondWaypoint = thirdWaypoint;
    }

    const { val: startPosition, time: startTime } = getLastFrame(framesToKeep);
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
