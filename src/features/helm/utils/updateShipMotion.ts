import { Keyframe, Keyframes, getLastPastFrame, getPositionValue, wantsMoreKeyframes, getFirstFutureIndex } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';
import { vectorsEqual, determineAngle, determineMidAngle, clampAngle, distance, unit } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';
import { durationToTicks } from 'src/utils/timeSpans';

export function shouldUpdateMotion(ship: Ship, currentTime: number) {
    if (ship.helm.forceMotionUpdate) {
        return true;
    }

    if (ship.motion.length === 0) {
        return ship.helm.destination || ship.helm.maneuvers.length > 0;
    }

    return wantsMoreKeyframes(ship.motion, currentTime);
}

export function updateShipMotion(ship: Ship, currentTime: number) {
    if (shouldHoldPosition(ship)) {
        holdPosition(ship, currentTime);
    }
    else {
        updateMotionValue(ship, currentTime);
    }

    ship.helm.forceMotionUpdate = false;
}

function shouldHoldPosition(ship: Ship) {
    // Hold position if we've nowhere to go,
    if (ship.helm.destination === null && ship.helm.maneuvers.length === 0) {
        return true;
    }

    // Or if our motion already leads to our last-planned destination
    const lastMotionPos = getLast(ship.motion);

    const lastPlannedPos = ship.helm.destination ?? getLast(getLast(ship.helm.maneuvers).motion);

    return vectorsEqual(lastMotionPos.val, lastPlannedPos.val);
}

function holdPosition(ship: Ship, currentTime: number) {
    const lastFrame = getLast(ship.motion);
    const time = currentTime + durationToTicks(5);
    const framesToKeep = getExistingFramesToKeep(ship, currentTime);

    const hasAtLeastTwoFutureFrames = getFirstFutureIndex(framesToKeep, currentTime) < framesToKeep.length - 1;
    if (hasAtLeastTwoFutureFrames) {
        return;
    }

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
            getLast(pastFrames),
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

function updateMotionValue(ship: Ship, currentTime: number) {
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
    let secondWaypoint: Keyframe<Position> | undefined = undefined;
    let thirdWaypoint: Keyframe<Position> | undefined = undefined;

    // Is this just ASSUMING firstWaypoint is in the past?
    if (firstWaypoint.time !== undefined && !ship.helm.forceMotionUpdate && secondWaypoint) {
        firstWaypoint = secondWaypoint;
        secondWaypoint = thirdWaypoint;
    }

    const { val: startPosition, time: startTime } = getLast(framesToKeep);
    const moveAngle = determineAngle(startPosition, firstWaypoint.val, startPosition.angle);

    const endPosition = firstWaypoint.val.angle === undefined
        ? {
            x: firstWaypoint.val.x,
            y: firstWaypoint.val.y,
            angle: secondWaypoint
                ? determineMidAngle(startPosition, firstWaypoint.val, secondWaypoint/*.val*/, startPosition.angle)
                : moveAngle,
        }
        : firstWaypoint.val;

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
