import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import type { SensorsAction } from '../types/SensorsState';
import { generateInstance, hexCellReducer } from '../features/hexcells';
import { expandScanTreeState, getMaxDepth, scanTreeReducer } from '../features/scanselect';
import { ShipSystem } from 'src/types/ShipSystem';
import { adjustHealth } from '../../engineering/utils/systemActions';

export function sensorsReducer(state: Ship, action: SensorsAction): void {
    switch (action.type) {
        case 'tick': {
            // TODO: update state.sensors.possibleTargets
            // ... don't just replace it each time, merge existing values.
            // Map instead of array?

            if (state.sensors.currentTarget.id) {
                // TODO: validate that state.sensors.currentTarget is in possibleTargets, clear it if not.
            }
            
            // Update max scan tree depth, based on power level
            if (state.sensors.scanTree) {
                const newMaxDepth = getMaxDepth(state.systems.get(ShipSystem.Sensors).power);
                if (state.sensors.scanTree.maxScanDepth !== newMaxDepth) {
                    state.sensors.scanTree.maxScanDepth = newMaxDepth;
                }
            }

            break;
        }

        case 'view': {
            state.viewTarget = action.target;
            break;
        }

        case 'target': {
            if (state.sensors.currentTarget.id === action.target) {
                break;
            }
            
            delete state.sensors.currentScan;
            delete state.sensors.scanCellBoard;

            if (action.target) {
                const targetObject = state.space.objects.get(action.target);

                if (targetObject) {
                    state.sensors.currentTarget = state.space.createReference(targetObject);
                    const sensorsPower = state.systems.get(ShipSystem.Sensors).power;
                    state.sensors.scanTree = expandScanTreeState(targetObject.getScanTree(), sensorsPower);
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

                if (state.sensors.currentScan !== action.scan) {
                    console.log(`current scan is ${state.sensors.currentScan}, ${action.scan}`);
                    state.sensors.currentScan = action.scan;

                    const scanConfig = state.sensors.currentTarget.value.getScanConfig(action.scan);

                    // TODO: does anything about the scanning ship (e.g. sensor damage) affect the board config?
                    state.sensors.scanCellBoard = generateInstance(scanConfig);
                }
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
                const errorsBefore = state.sensors.scanCellBoard.numErrors;
                hexCellReducer(state.sensors.scanCellBoard, action);

                if (state.sensors.scanCellBoard.result === 'success') {
                    // Mark this tree as "selected"
                    if (state.sensors.scanTree && state.sensors.currentScan) {
                        scanTreeReducer(state.sensors.scanTree, { type: 'select', item: state.sensors.currentScan });
                    }

                    // TODO: add values for currentScan to the sensor state! (and keep them updated hereafter!)
                }
                else if (state.sensors.scanCellBoard.result === 'failure') {
                    delete state.sensors.currentScan;

                    // Deselect all scan items
                    if (state.sensors.scanTree) {
                        scanTreeReducer(state.sensors.scanTree, { type: 'reset' });
                    }

                    // Damage the sensors, by an amount that's bigger if you've already made errors on this scan.
                    adjustHealth(state.systems.get(ShipSystem.Sensors), state, state.sensors.scanCellBoard.numErrors + 10);

                    // TODO: Clear all scan values from sensor state, and somehow make it clear to the user why this happened. (A toast?)
                }
                else if (state.sensors.scanCellBoard.numErrors > errorsBefore) {
                    // Just triggered an error. Damage this system, by a small amount that increases with each error the current scan.
                    adjustHealth(state.systems.get(ShipSystem.Sensors), state, state.sensors.scanCellBoard.numErrors);
                }
            }
            break;

        default:
            throw new UnexpectedValueError(action);
    }
}
