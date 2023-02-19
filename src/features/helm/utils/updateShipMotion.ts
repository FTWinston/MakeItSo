import { GameObject } from 'src/types/GameObject';
import { Keyframe, Keyframes, getPositionValue, getFirstFutureIndex, wantsMoreKeyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { Ship } from 'src/types/Ship';
import { determineAngle, clampAngle, distance, unit } from 'src/types/Vector2D';
import { getLast } from 'src/utils/arrays';
import { durationToTicks } from 'src/utils/timeSpans';
import { ManeuverInfo } from '../features/maneuvers';
import { MotionConfiguration } from '../types/HelmState';

export function updateShipMotion(
    ship: GameObject,
    config: MotionConfiguration,
    changeMotion: boolean,
    destination: Keyframe<Position> | null,
    maneuvers: ManeuverInfo[],
    currentTime: number,
) {
    if (changeMotion) {
        if (maneuvers.length > 0) {
            changeMotionToNewManeuver(ship, config, maneuvers, currentTime);
            return;
        }
        else if (destination) {
            changeMotionToNewDestination(ship, config, destination, currentTime);
            return;
        }
    }
    
    if (wantsMoreKeyframes(ship.motion, currentTime)) {
        if (!updateMotionFromManeuvers(ship, maneuvers, currentTime)) {
            holdLastPosition(ship);
        }
    }
}

function holdLastPosition(ship: GameObject) {
    const lastFrame = getLast(ship.motion);
    const time = lastFrame.time + durationToTicks(5);

    ship.motion.push({
        val: lastFrame.val,
        time,
    });
}

function getPastFrames(ship: GameObject, currentTime: number) {
    const firstFutureIndex = getFirstFutureIndex(ship.motion, currentTime);
    const pastFrames = ship.motion.slice(0, firstFutureIndex === -1 ? ship.motion.length : firstFutureIndex);

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
    else {
        // console.log('keeping 1 frame, adding current time');
        return [
            getLast(pastFrames),
            {
                time: currentTime,
                val: getPositionValue(ship.motion, currentTime),
            },
        ]
    }
}

function changeMotionToNewDestination(ship: GameObject, config: MotionConfiguration, destination: Keyframe<Position>, currentTime: number) {
    const pastFrames = getPastFrames(ship, currentTime);
    const startPosition = getLast(pastFrames);
    const newFrames = getMotionBetweenPositions(startPosition, destination, config);

    ship.motion = [
        ...pastFrames,
        ...newFrames,
    ];
}

function changeMotionToNewManeuver(ship: GameObject, config: MotionConfiguration, maneuvers: ManeuverInfo[], currentTime: number) {
    const pastFrames = getPastFrames(ship, currentTime);
    const newFrames = getMotionFromManeuvers(maneuvers, currentTime, 3);

    ship.motion = [
        ...pastFrames,
        ...newFrames,
    ];
}

function getMotionBetweenPositions(startFrame: Keyframe<Position>, endFrame: Keyframe<Position>, config: MotionConfiguration): Keyframes<Position> {
    const { val: startPosition, time: startTime } = startFrame;
    const { val: endPosition } = endFrame;

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

function updateMotionFromManeuvers(ship: GameObject, maneuvers: ManeuverInfo[], currentTime: number) {
    const firstFutureIndex = getFirstFutureIndex(ship.motion, currentTime);

    const numFramesWanted = firstFutureIndex === -1
        ? 3
        : 3 + firstFutureIndex - ship.motion.length;

    if (numFramesWanted <= 0) {
        return true; // No more frames required.
    }

    const results = getMotionFromManeuvers(maneuvers, currentTime, numFramesWanted);
    ship.motion.push(...results);
    return results.length >= numFramesWanted;
}

function getMotionFromManeuvers(maneuvers: ManeuverInfo[], currentTime: number, numFramesWanted: number) {
    let results: Keyframes<Position> = [];

    /*
    for (const maneuver of maneuvers) {
        appendMotion(results, maneuver.motion);
    }
    */

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
