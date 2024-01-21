import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { SensorsAction } from '../types/SensorsStateInfo';
import { playerShip } from 'src/assets/scenarios/testScenario';
import { Reference } from 'src/classes/Reference';
import { generateInstance, hexCellReducer } from '../features/hexcells';
import { expandScanTreeState, getMaxDepth, scanTreeReducer } from '../features/scanselect';
import { ShipSystem } from 'src/types/ShipSystem';

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
            
            // Update max scan tree depth, based on power level
            if (state.sensors.scanTree) {
                const newMaxDepth = getMaxDepth(state.systems.get(ShipSystem.Sensors).power);
                if (state.sensors.scanTree.maxScanDepth !== newMaxDepth) {
                    state.sensors.scanTree.maxScanDepth = newMaxDepth;
                }
            }

            return state;
        }

        case 'view': {
            state.viewTarget = action.target;
            break;
        }

        case 'target': {
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

                    // TODO: Clear all scan values from sensor state, damage the sensors slightly, and somehow make it clear to the user why this happened. (A toast?)
                }
            }
            break;

        default:
            throw new UnexpectedValueError(action);
    }
}
