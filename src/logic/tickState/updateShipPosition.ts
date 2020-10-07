import { ShipState } from '../../common/data/server/ShipState';
import { durationToTimeSpan } from '../../common/data/Progression';
import { Vector2D, determineAngle, determineMidAngle } from '../../common/data/Vector2D';
import { Position } from '../../common/data/Position';
import { Waypoint } from '../../common/data/Waypoint';
import { Animation, getPositionValue, getLastPastFrame, Frame } from '../../common/data/Animation';

function determineStepDuration(ship: ShipState, fromPos: Vector2D, toPos: Vector2D) {
    return 5; // TODO: calculate this based on ship's helm power and distance. And angle?
}

export function shouldUpdatePosition(ship: ShipState, currentTime: number) {
    if (ship.forcePositionUpdate) {
        return true;
    }

    const position = ship.position;

    if (position.length === 0) {
        return ship.waypoints.length > 0;
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
    if (ship.waypoints.length === 0) {
        holdPosition(ship, currentTime);
    }
    else {
        const pastFrames = ship.position.slice(0, getLastPastFrame(ship.position, currentTime) + 1);
        /*
        console.log(`past frames are ${pastFrames.length} of ${ship.position.length}, apparently.`);
        console.log(`current time is ${currentTime}.`);
        console.log(`${pastFrames.filter(frame => frame.isKey).length} are key`, JSON.parse(JSON.stringify(ship.position)));
        */
        if (ship.waypoints.length === 1) {
            updatePositionSingleWaypoint(ship, currentTime, pastFrames);
        }
        else {
            updatePositionMultipleWaypoints(ship, currentTime, pastFrames);
        }
    }

    ship.forcePositionUpdate = false;
}

function holdPosition(ship: ShipState, currentTime: number) {
    const lastFrame = ship.position[ship.position.length - 1];

    ship.position = [{
        time: currentTime + durationToTimeSpan(5),
        val: lastFrame.val,
    }];
}

function getExistingFramesToKeep(ship: ShipState, currentTime: number, numPastFrames: number) {
    if (numPastFrames === 0) {
        console.log('keeping 0 frames, adding current time twice');
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
    else if (ship.forcePositionUpdate || numPastFrames === 1) {
        console.log('keeping 1 frame, adding current time');
        return [
            ship.position[numPastFrames - 1],
            {
                time: currentTime,
                val: getPositionValue(ship.position, currentTime),
            },
        ]
    }
    else {
        console.log(`keeping ${ship.position.length - numPastFrames} frames`);
        return ship.position.slice(numPastFrames - 2);
    }
}

function updatePositionSingleWaypoint(ship: ShipState, currentTime: number, pastFrames: Animation<Position>) {
    if (pastFrames.some(frame => frame.isKey)) {
        ship.waypoints = [];
        holdPosition(ship, currentTime);
    }
    else {
        updatePositionValue(ship, currentTime, pastFrames.length);
    }
}

function updatePositionMultipleWaypoints(ship: ShipState, currentTime: number, pastFrames: Animation<Position>) {
    const numPassedWaypoints = pastFrames.filter(frame => frame.isKey).length;
    
    if (numPassedWaypoints > 0) {
        ship.waypoints = ship.waypoints.slice(numPassedWaypoints);
    }

    updatePositionValue(ship, currentTime, pastFrames.length);
}

function updatePositionValue(ship: ShipState, currentTime: number, numPastFrames: number) {
    const framesToKeep = getExistingFramesToKeep(ship, currentTime, numPastFrames);
    const newFrames = determineFutureFrames(ship, framesToKeep);

    console.log(`updating position ... time is ${currentTime}`);
    console.log('updating position ... frames to keep are', JSON.parse(JSON.stringify(framesToKeep)));
    console.log('updating position ... new frames are', JSON.parse(JSON.stringify(newFrames)));
    console.log('');
    
    ship.position = [
        ...framesToKeep,
        ...newFrames,
    ];
}

function determineFutureFrames(ship: ShipState, framesToKeep: Animation<Position>) {
    let waypointIndex = framesToKeep.filter(frame => frame.isKey).length;
    if (waypointIndex >= ship.waypoints.length) {
        waypointIndex = ship.waypoints.length - 1;
    }

    const firstWaypoint = ship.waypoints[waypointIndex];
    const secondWaypoint = ship.waypoints[waypointIndex + 1];

    const lastFrame = framesToKeep[framesToKeep.length - 1];
    const moveAngle = determineAngle(lastFrame.val, firstWaypoint, lastFrame.val.angle);

    const endPosition = firstWaypoint.angle === undefined
        ? {
            x: firstWaypoint.x,
            y: firstWaypoint.y,
            angle: secondWaypoint
                ? determineMidAngle(lastFrame.val, firstWaypoint, secondWaypoint, lastFrame.val.angle)
                : moveAngle,
        }
        : firstWaypoint as Position;

    const midPosition: Position = {
        x: (lastFrame.val.x + firstWaypoint.x) / 2,
        y: (lastFrame.val.y + firstWaypoint.y) / 2,
        angle: moveAngle,
    };

    const midTime = lastFrame.time + durationToTimeSpan(determineStepDuration(ship, lastFrame.val, midPosition));
    const endTime = midTime + durationToTimeSpan(determineStepDuration(ship, midPosition, endPosition));

    const futureFrames: Animation<Position> = [{
        time: midTime,
        val: midPosition,
    },
    {
        time: endTime,
        val: endPosition,
        isKey: true,
    }];
    return futureFrames;
}

export function addWaypoint(ship: ShipState, waypoint: Waypoint) {
    ship.waypoints.push(waypoint);

    if (ship.waypoints.length <= 2) {
        ship.forcePositionUpdate = true;
    }
}

export function clearMovement(ship: ShipState) {
    ship.waypoints = [];

    // TODO: recalculate movement .. decelerate to a stop

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


/*

addWaypoint
    add to waypoints
    if waypoints.length < calculatedWaypoint + 2
        recalculateMovement

clearMovement
    determine "stop position"
    set that to be only waypoint
    forcePositionUpdate = true;

adjustEnginePower
    just adjust timings of existing Frames?

recaluculateMovement
    calculatedWaypoint = -1
    get current pos, angle & velocity
    forcePositionUpdate = true;

shouldUpdatePosition
    forcePositionUpdate or
    time of penultimate Frame reached

updateShipPosition
    if a past frame is key, remove a waypoint

    keep last two frames

    always purge future frames? Make no use of forceUpdatePosition?
    dump calculatedWaypoint?

    frames marked as key correspond to waypoints?

    uh
    piss
*/