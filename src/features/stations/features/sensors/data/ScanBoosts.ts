import { ScanBoost, ScanBoostType, SensorBoostPowerSlot } from '../types/ScanBoost';

type BoostBehavior = Omit<ScanBoost, 'id' | 'type'>;

const boostBehaviorByIdentifier: Map<ScanBoostType, BoostBehavior> = new Map([
    [ScanBoostType.Hint, {
        minimumSlot: SensorBoostPowerSlot.First,
        chargeDuration: 20,
        use: (ship, cell) => {
            const cellBoard = ship.sensors.scanCellBoard;

            if (!cellBoard) {
                return false;
            }

            // TODO: this is does my hexcells thingy does in the reducer. Put all these actions in the reducer!?

            /*
            for (let i = 0; i < state.hints.length; i++) {
                const hintIndex = state.hints[i];
                const hintCell = state.cells[hintIndex];

                // When we find a still-valid hint, apply that, and remove any prior hints, as they're all no longer valid.
                if (isObscured(hintCell)) {
                    const notAlreadyHinted = state.cells[hintIndex]?.type !== CellType.Hint;
                    state.cells[hintIndex] = { type: CellType.Hint };
                    state.hints.splice(0, i);
                    if (notAlreadyHinted) {
                        state.hintsUsed++;
                    }
                    break;
                }
            }
            */
        },
        descParams: {
            power: 1,
            duration: 60,
        }
    }],
]);

export function createBoost(id: number, type: ScanBoostType): ScanBoost {
    const behavior = boostBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Boost not found: ${type}`);
    }
    
    return {
        id,
        type,
        ...behavior,
    };
}
