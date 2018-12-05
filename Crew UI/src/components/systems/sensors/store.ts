import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum SensorSystemType {
    Power = 1,
    Helm,
    Warp,
    Weapons,
    Sensors,
    Shields,
    DamageControl,
    Comms,
}

export const enum SensorTargetCellType {
    Unknown = 0,
    Empty,
    Hit,
    Queued,
}

export interface SensorState {
    selectedTargetID: number;
    targetSystems: SensorSystemType[];
    targetSystemLevels: number[];
    targetSystemSizes: number[];
    selectableSystems: SensorSystemType[];
    targetCells: SensorTargetCellType[];
    targetGridSize: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetSelectedTargetAction {
    type: 'SENSOR_TARGET';
    targetID: number;
}

interface SetTargetSystemsAction {
    type: 'TARGET_SYSTEMS';
    systems: SensorSystemType[];
    levels: number[];
    sizes: number[];
}

interface SetSystemSelectableAction {
    type: 'SELECTABLE';
    system: SensorSystemType;
    selectable: boolean;
}

interface SetTargetCellsAction {
    type: 'SET_CELLS';
    cells: SensorTargetCellType[];
}

interface SetTargetCellAction {
    type: 'SET_CELL';
    index: number;
    value: SensorTargetCellType;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetSelectedTargetAction | SetTargetSystemsAction | SetSystemSelectableAction | SetTargetCellsAction | SetTargetCellAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setSelectedTarget: (targetID: number) => <SetSelectedTargetAction>{
        type: 'SENSOR_TARGET',
        targetID: targetID,
    },
    setTargetSystems: (systems: SensorSystemType[], levels: number[], sizes: number[]) => <SetTargetSystemsAction>{
        type: 'TARGET_SYSTEMS',
        systems: systems,
        levels: levels,
        sizes: sizes,
    },
    setSystemSelectable: (system: SensorSystemType, selectable: boolean) => <SetSystemSelectableAction>{
        type: 'SELECTABLE',
        system: system,
        selectable: selectable,
    },
    setTargetCells: (cells: SensorTargetCellType[]) => <SetTargetCellsAction>{
        type: 'SET_CELLS',
        cells: cells,
    },
    setTargetCell: (cellIndex: number, cellType: SensorTargetCellType) => <SetTargetCellAction>{
        type: 'SET_CELL',
        index: cellIndex,
        value: cellType,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SensorState = {
    selectedTargetID: 0,
    targetSystems: [],
    targetSystemLevels: [],
    targetSystemSizes: [],
    selectableSystems: [],
    targetCells: [],
    targetGridSize: 0,
};

export const reducer: Reducer<SensorState> = (state: SensorState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'SENSOR_TARGET': {
            return {
                ...state,
                selectedTargetID: action.targetID,
            }
        }
        case 'TARGET_SYSTEMS': {
            return {
                ...state,
                targetSystems: action.systems,
                targetSystemLevels: action.levels,
                targetSystemSizes: action.sizes,
                selectableSystems: [],
            };
        }
        case 'SELECTABLE': {
            const selectables = state.selectableSystems.slice();
            const existingIndex = state.selectableSystems.indexOf(action.system);

            if (action.selectable) {
                if (existingIndex === -1) {
                    selectables.push(action.system);
                }
            }
            else if (existingIndex !== -1) {
                selectables.splice(existingIndex, 1);
            }

            return {
                ...state,
                selectableSystems: selectables,
            };
        }
        case 'SET_CELLS': {
            return {
                ...state,
                targetCells: action.cells,
                targetGridSize: Math.ceil(Math.sqrt(action.cells.length)),
            };
        }
        case 'SET_CELL': {
            const cells = state.targetCells.slice();
            cells[action.index] = action.value;

            return {
                ...state,
                targetCells: cells,
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};