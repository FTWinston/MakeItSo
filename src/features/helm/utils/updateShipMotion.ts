import { Keyframe, Keyframes, getLastPastFrame, getPositionValue, wantsMoreKeyframes, getFirstFutureIndex } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';
import { vectorsEqual, determineAngle, clampAngle, distance, unit } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';
import { durationToTicks } from 'src/utils/timeSpans';
import { ManeuverInfo } from '../features/maneuvers';
import { MotionConfiguration } from '../types/HelmState';
import { appendMotion } from './appendMotion';

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
    const framesToKeep = getPastFrames(ship, currentTime);
    const firstFutureIndex = getFirstFutureIndex(framesToKeep, currentTime);

    const hasAtLeastTwoFutureFrames = firstFutureIndex !== -1 && firstFutureIndex < framesToKeep.length - 1;
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

function getPastFrames(ship: Ship, currentTime: number) {
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
    const pastFrames = getPastFrames(ship, currentTime);
    const startPosition = getLast(pastFrames);

    const newFrames = ship.helm.destination
        ? getMotionBetweenPositions(startPosition, ship.helm.destination, ship.helm)
        : getMotionFromManeuvers(ship.helm.maneuvers, currentTime)

    /*
    console.log(`updating position ... time is ${currentTime}`);
    console.log('updating position ... frames to keep are', JSON.parse(JSON.stringify(framesToKeep)));
    console.log('updating position ... new frames are', JSON.parse(JSON.stringify(newFrames)));
    console.log('');
    */

    ship.motion = [
        ...pastFrames,
        ...newFrames,
    ];
}

function getMotionBetweenPositions(startFrame: Keyframe<Position>, endFrame: Keyframe<Position>, config: MotionConfiguration): Keyframes<Position> {
    const { val: startPosition, time: startTime } = startFrame;
    const { val: endPosition/*, time: endTime*/ } = endFrame;

    const moveAngle = determineAngle(startPosition, endPosition, startPosition.angle);

    const startRotationAngularDistance = clampAngle(startPosition.angle - moveAngle);
    const startRotationDuration = Math.abs(startRotationAngularDistance / config.rotationalSpeed);

    const endRotationAngularDistance = clampAngle(endPosition.angle - moveAngle);
    const endRotationDuration = Math.abs(endRotationAngularDistance / config.rotationalSpeed);

    const fullRotationDuration = distance(startPosition, endPosition) / config.speedWhileRotating;

    if (startRotationDuration + endRotationDuration >= fullRotationDuration) {
        // Rotate directly to the end position.
        const endTime = startTime + durationToTicks(fullRotationDuration);

        // Update time on endFrame that was passed in.
        endFrame.time = endTime;

        return [{
            val: endPosition,
            time: endTime,
        }];
    }
    
    const results: Keyframes<Position> = [];

    // Rotate, go straight, rotate again.
    const moveDirection = unit(startPosition, endPosition);

    let latestTime = startTime;
    let startStraightPos: Position;

    if (startRotationDuration > 0.01) {
        const startRotationDistance = config.speedWhileRotating * startRotationDuration;

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
        const endRotationDistance = config.speedWhileRotating * endRotationDuration;

        endStraightPos = {
            x: endPosition.x - moveDirection.x * endRotationDistance,
            y: endPosition.y - moveDirection.y * endRotationDistance,
            angle: moveAngle,
        };
    }
    else {
        endStraightPos = endPosition;
    }
    
    const straightTimeSpan = durationToTicks(distance(startStraightPos, endStraightPos) / config.speed);

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

    // Update time on endFrame that was passed in.
    endFrame.time = latestTime;
    
    return results;
}

function getMotionFromManeuvers(maneuvers: ManeuverInfo[], currentTime: number) {
    let results: Keyframes<Position> = [];

    for (const maneuver of maneuvers) {
        appendMotion(results, maneuver.motion);
    }

    /*
    const numFramesWanted = 2;

    for (const maneuver of maneuvers) {
        let firstIndexToTake = getFirstFutureIndex(maneuver.motion, currentTime);
        if (firstIndexToTake === -1) {
            continue;
        }
        
        // The first frame of a maneuver will be the same as the last frame as the previous one,
        // so skip it if we have a previous.
        if (firstIndexToTake === 0 && results.length > 0) {
            firstIndexToTake = 1;
        }

        const framesFromManeuver = maneuver.motion.slice(firstIndexToTake, numFramesWanted);
        results.push(...framesFromManeuver);

        if (results.length >= numFramesWanted) {
            break;
        }
    }
    */   
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
