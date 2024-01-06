import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsStateInfo';
import { playerShip } from 'src/assets/scenarios/testScenario';
import { Reference } from 'src/classes/Reference';
import { generateInstance, hexCellReducer } from '../features/hexcells';
import { expandScanTreeState } from '../features/scanselect';

export function sensorsTrainingReducer(state: Ship, action: SensorsAction): Ship | void {
    if (state.destroyed) {
        return state;
    }

    switch (action.type) {
        case 'reset': // TODO: remove from here
            const space = state.space;
            state.delete();

            const newState = new Ship(space, playerShip, { x: 0, y: 0, angle: 0 });
            newState.sensors = {
                possibleTargets: [],
                currentTarget: Reference.empty(),
            };
            return newState;
            
        case 'tick': {
            // TODO: update state.sensors.possibleTargets
            // ... don't just replace it each time, merge existing values.
            // Map instead of array?

            if (state.sensors.currentTarget.id) {
                // TODO: validate that state.sensors.currentTarget is in possibleTargets, clear it if not.
            }
            return state;
        }

        case 'view': {
            state.viewTarget = action.target;
            break;
        }

        case 'target': {
            if (action.target) {
                const targetObject = state.space.objects.get(action.target);

                if (targetObject) {
                    state.sensors.currentTarget = state.space.createReference(targetObject);
                    state.sensors.scanTree = expandScanTreeState(targetObject.getScanTree());
                    break;
                }
            }
            
            state.sensors.currentTarget.clear();
            break;
        }

        case 'scan': {
            if (!state.sensors.currentTarget.id || !state.sensors.currentTarget.value) {
                break;
            }
            if (action.scan) {
                // TODO: validate that scan is an allowed option
                state.sensors.currentScan = action.scan;

                const scanConfig = state.sensors.currentTarget.value.getScanConfig(action.scan);

                // TODO: does anything about the scanning ship (e.g. sensor damage) affect the board config?
                state.sensors.scanCellBoard = generateInstance(scanConfig);
            }
            else {
                delete state.sensors.currentScan;
                delete state.sensors.scanCellBoard;
            }
            break;
        }

        case 'reveal':
        case 'flag':
            if (state.sensors.scanCellBoard) {
                hexCellReducer(state.sensors.scanCellBoard, action);

                if (state.sensors.scanCellBoard.numBombs === 0) {
                    // TODO: board has been solved! Brief delay before going back to the scan tree.
                    // Let's just use css for that delay. Do we want the detail dialog on top of the scan result, or on the tree?
                    // Having it here might be nice. Future "looks" would then still be on the tree.
                    // (Perhaps the background could change to the tree on its own, after an extra delay?!)

                    // TODO: add values for currentScan to the sensor state! (and keep them updated hereafter!)
                }
            }
            break;

        // TODO: fold scanTreeReducer into this? (it handles ensuring only one item is selected per row, etc)

        default:
            throw new UnexpectedValueError(action);
    }
}
