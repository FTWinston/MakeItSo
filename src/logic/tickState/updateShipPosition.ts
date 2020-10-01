import { ShipState } from '../../common/data/server/ShipState';
import { durationToTimeSpan } from '../../common/data/Progression';
import { Vector2D, determineAngle, determineMidAngle, vectorsEqual } from '../../common/data/Vector2D';
import { Position } from '../../common/data/Position';
import { Waypoint } from '../../common/data/Waypoint';
import { KeyFrame, getPositionValue, getLastPastKeyframe } from '../../common/data/Animation';
import { duration } from '@material-ui/core';

function determineStepDuration(ship: ShipState, fromPos: Vector2D, toPos: Vector2D) {
    return 10; // TODO: calculate this based on ship's helm power and distance. And angle?
}

export function shouldUpdatePosition(ship: ShipState, currentTime: number) {
    if (ship.forcePositionUpdate) {
        return true;
    }

    const position = ship.position;

    if (position.length === 0) {
        return ship.waypoints.length > 0;
    }

    let testKeyframe: number;

    if (position.length === 1) {
        testKeyframe = 0;
    }
    else if (ship.waypoints.length > 1) {
        // If we have waypoints, update once we're in last two keyframes
        testKeyframe = position.length - 2;
    }
    else {
        // Otherwise, wait for last one to be reached
        testKeyframe = position.length - 1;
    }
    
    return position[testKeyframe].time <= currentTime;
}

function getExistingFramesToKeep(ship: ShipState, currentTime: number) {
    const lastPastKeyframeIndex = getLastPastKeyframe(ship.position, currentTime);
    
    if (lastPastKeyframeIndex === -1) {
        return [
            {
                time: currentTime,
                val: getPositionValue(ship.position, currentTime),
            },
        ];
    }
    else if (ship.forcePositionUpdate || lastPastKeyframeIndex === 0) {
        return [
            ship.position[lastPastKeyframeIndex],
            {
                time: currentTime,
                val: getPositionValue(ship.position, currentTime),
            },
        ]
    }
    else {
        return ship.position.slice(lastPastKeyframeIndex - 1, lastPastKeyframeIndex + 1);
    }
}

export function updateShipPosition(ship: ShipState, currentTime: number) {
    switch (ship.waypoints.length) {
        case 0: {
            console.log(`updateShipPosition, 0 waypoints, ${ship.forcePositionUpdate ? 'forced' : 'unforced'},  holding position`);
            // Hold position
            const lastKeyframe = ship.position[ship.position.length - 1];

            ship.position = [{
                time: currentTime + durationToTimeSpan(5),
                val: lastKeyframe.val,
            }];

            break;
        }
        case 1: {
            const firstWaypoint = ship.waypoints[0];
            const currentPos = getPositionValue(ship.position, currentTime);

            if (vectorsEqual(firstWaypoint, currentPos)) {
                console.log(`updateShipPosition, 1 waypoint, ${ship.forcePositionUpdate ? 'forced' : 'unforced'}, reached it, holding position`);

                // If we have reached the only waypoint, remove it and hold position
                ship.position = [{
                    time: currentTime + durationToTimeSpan(5),
                    val: firstWaypoint.angle === undefined
                        ? {
                            x: firstWaypoint.x,
                            y: firstWaypoint.y,
                            angle: currentPos.angle,
                        }
                        : firstWaypoint as Position,
                }];
                ship.waypoints.shift();
            }
            else {
                console.log(`updateShipPosition, 1 waypoint, ${ship.forcePositionUpdate ? 'forced' : 'unforced'}, not reached it`);

                // Otherwise, animate movement to the waypoint
                const framesToKeep = getExistingFramesToKeep(ship, currentTime);
                
                const lastKeyframe = framesToKeep[framesToKeep.length - 1];

                ship.position = [
                    ...framesToKeep,
                    ...calculatePositions(ship, lastKeyframe.time, lastKeyframe.val, firstWaypoint, undefined),
                ];
            }
            break;
        }
        default: {
            let firstWaypoint = ship.waypoints[0];
            const currentPos = getPositionValue(ship.position, currentTime);

            if (vectorsEqual(firstWaypoint, currentPos)) {
                ship.waypoints.shift();
                firstWaypoint = ship.waypoints[0];
            }
            const framesToKeep = getExistingFramesToKeep(ship, currentTime);

            const secondWaypoint = ship.waypoints[1];

            const lastKeyframe = framesToKeep[framesToKeep.length - 1];

            ship.position = [
                ...framesToKeep,
                ...calculatePositions(ship, lastKeyframe.time, lastKeyframe.val, firstWaypoint, secondWaypoint),
            ];
            break;
        }
    }

    ship.forcePositionUpdate = false;
}

export function calculatePositions(ship: ShipState, currentTime: number, currentPosition: Position, destination: Waypoint, nextDestination?: Waypoint) {
    const moveAngle = determineAngle(currentPosition, destination, currentPosition.angle);

    const endPosition = destination.angle === undefined
        ? {
            x: destination.x,
            y: destination.y,
            angle: nextDestination 
                ? determineMidAngle(currentPosition, destination, nextDestination, currentPosition.angle)
                : moveAngle,
        }
        : destination as Position;

    const midPosition: Position = {
        x: (currentPosition.x + destination.x) / 2,
        y: (currentPosition.y + destination.y) / 2,
        angle: moveAngle,
    }

    const midTime = currentTime + durationToTimeSpan(determineStepDuration(ship, currentPosition, midPosition));
    const endTime = midTime + durationToTimeSpan(determineStepDuration(ship, midPosition, endPosition));

    return [
        {
            time: midTime,
            val: midPosition,
        },
        {
            time: endTime,
            val: endPosition,
        },
    ] as KeyFrame<Position>[];
}

export function addWaypoint(ship: ShipState, waypoint: Waypoint) {
    ship.waypoints.push(waypoint);

    if (ship.waypoints.length <= 2) {
        ship.forcePositionUpdate = true;
    }
}

export function clearMovement(ship: ShipState) {
    ship.waypoints = [];

    // TODO: recaclulate movement .. decelerate to a stop

    ship.forcePositionUpdate = true;
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
