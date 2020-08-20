import { ShipState } from '../../data/ShipState';
import { durationToTimeSpan } from '../../data/Progression';

// This assumes movement is progressing from previous movement.
// If it's being interrupted, the previous value should be recalculated,
// and the futurePositions list should be cleared.
export function updateShipPosition(ship: ShipState, tickTime: number) {
    ship.position.previous = ship.position.current;

    if (ship.position.next) {
        ship.position.current = ship.position.next;
        ship.futurePositions.pop();

        const stepDuration = 10; // TODO: determine how long this step should take

        ship.position.next = {
            startValue: ship.position.next.endValue,
            endValue: ship.futurePositions[0],
            duration: stepDuration,
            endTime: tickTime + durationToTimeSpan(stepDuration),
        }

        return;
    }
    
    const stepDuration = 30;

    ship.position.next = {
        startValue: ship.position.current.endValue,
        endValue: ship.position.current.endValue,
        duration: stepDuration,
        endTime: tickTime + durationToTimeSpan(stepDuration),
    };
}
