import { ShipState } from '../../data/ShipState';
import { durationToTimeSpan } from '../../data/Progression';

// This assumes movement is progressing from previous movement.
// If it's being interrupted, the previous value should be recalculated,
// and the futurePositions list should be cleared.
export function updateShipPosition(ship: ShipState, tickTime: number) {
    ship.position.previous = ship.position.current;

    if (ship.position.next) {
        ship.position.current = ship.position.next;
        ship.futurePositions.shift();

        const stepDuration = 10; // TODO: determine how long this step should take

        // TODO: if changing multiple properties, patches are nicer if we just replace the whole of ship.position

        // TODO: store just a single position and duration in prev & next
        // ... prev's end and next's start can be determined from current, as can their endTimes.

        const nextPos = ship.futurePositions[0] ?? ship.position.current.endValue;

        ship.position.next = {
            startValue: ship.position.current.endValue,
            endValue: {
                x: nextPos.x,
                y: nextPos.y,
            },
            duration: stepDuration,
            endTime: tickTime + durationToTimeSpan(stepDuration),
        }

        return;
    }
    
    const stepDuration = 30;
    // TODO: if next always has a value, don't need this?
    ship.position.current = {
        startValue: ship.position.current.endValue,
        endValue: ship.position.current.endValue,
        duration: stepDuration,
        endTime: tickTime + durationToTimeSpan(stepDuration),
    };
}
