import { ShipState } from '../../data/ShipState';
import { durationToTimeSpan } from '../../data/Progression';

// This assumes movement is progressing from previous movement.
// If it's being interrupted, the previous value should be recalculated,
// and the futurePositions list should be cleared.
export function updateShipPosition(ship: ShipState, tickTime: number) {
    const oldCurrent = ship.position.current;
    const oldNext = ship.position.next
        ?? {
            duration: 30,
            value: oldCurrent.endValue,
        }

    const previous = {
        value: { ...oldCurrent.startValue },
        duration: oldCurrent.duration,
    };

    const current = {
        startValue: { ...oldCurrent.endValue },
        endValue: { ...oldNext.value },
        duration: oldNext.duration,
        endTime: oldCurrent.endTime + durationToTimeSpan(oldNext.duration)
    };

    const stepDuration = 10; // TODO: determine how long this step should take

    const nextPos = ship.futurePositions.shift()
        ?? { ...oldNext.value };

    const next = {
        value: {
            x: nextPos.x,
            y: nextPos.y,
        },
        duration: stepDuration,
    }

    ship.position = {
        previous,
        current,
        next,
    };
}
