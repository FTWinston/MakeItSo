import { Ship } from 'src/classes/Ship';
import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import type { SensorsAction } from '../types/SensorsState';
import { generateInstance, hexCellReducer } from '../features/hexcells';
import { expandScanTreeState, getMaxDepth, scanTreeReducer } from '../features/scanselect';
import { ShipSystem } from 'src/types/ShipSystem';
import { adjustHealth } from '../../engineering/utils/systemActions';
import { projectValuesBetweenArrays } from 'src/utils/projectValuesBetweenArrays';
import { anyMatches } from 'src/utils/arrays';
import { maxSystemHealth } from 'src/types/SystemState';

function getObscuredCellFractionForHealth(sensorsHealth: number) {
    // A quadratic relationship ensures that the punishment isn't too harsh when health is high.
    const fraction = sensorsHealth / maxSystemHealth;
    return 0.9836241 - 1.483475 * fraction + 0.4998383 * fraction * fraction;
}

export function sensorsReducer(state: Ship, action: SensorsAction): void {
    switch (action.type) {
        case 'tick': {
            const visibleObjects = [...state.space.objects.values()]
                .filter(object => object.id !== state.id && object.isVisibleTo(state));

            // Keep list of possible targets up-to-date with this list of visible objects.
            projectValuesBetweenArrays(visibleObjects, state.sensors.possibleTargets, object => object.id, object => ({
                id: object.id,
                draw: object.draw,
                faction: object.faction,
                description: 'Some Target',
            }));
            
            // Validate that state.sensors.currentTarget is in possibleTargets, clear it if not.
            if (state.sensors.currentTarget.id && !anyMatches(state.sensors.possibleTargets, target => target.id === state.sensors.currentTarget.id)) {
                state.sensors.currentTarget.clear();
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

        case 'health': {
            // If there's a current scan, adjust the overridden cells based on this change in sensor system health.
            if (state.sensors.scanCellBoard) {
                hexCellReducer(state.sensors.scanCellBoard, { type: 'override cells', fraction: getObscuredCellFractionForHealth(action.newHealth) });
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
                    state.sensors.currentScan = action.scan;

                    // Generate a hexcell board for this scan.
                    const scanConfig = state.sensors.currentTarget.value.getScanConfig(action.scan);
                    state.sensors.scanCellBoard = generateInstance(scanConfig);

                    // If sensors health isn't at max, override some cells so that their contents is obscured.
                    const sensorsHealth = state.systems.get(ShipSystem.Sensors).health;
                    if (sensorsHealth !== maxSystemHealth) {
                        hexCellReducer(state.sensors.scanCellBoard, { type: 'override cells', fraction: getObscuredCellFractionForHealth(sensorsHealth) });
                    }
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
                    adjustHealth(state.systems.get(ShipSystem.Sensors), state, -state.sensors.scanCellBoard.numErrors - 10);

                    // TODO: Clear all scan values from sensor state, and somehow make it clear to the user why this happened. (A toast?)
                }
                else if (state.sensors.scanCellBoard.numErrors > errorsBefore) {
                    // Just triggered an error. Damage this system, by a small amount that increases with each error the current scan.
                    adjustHealth(state.systems.get(ShipSystem.Sensors), state, -state.sensors.scanCellBoard.numErrors);
                }
            }
            break;

        default:
            throw new UnexpectedValueError(action);
    }
}
