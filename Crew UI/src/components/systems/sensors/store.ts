import { Action, Reducer } from 'redux';
import { SensorTarget } from '~/functionality';
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
    Group1,
    Group2,
    Group3,
    Group4,
    Group5,
    Group6,
    Group7,
    Group8,
    Group9,
}

export interface SensorState {
    selectedTarget: SensorTarget | null;
    targetSystems: SensorSystemType[];
    openSystem: SensorSystemType | null;
    targetSystemCells: SensorTargetCellType[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetSelectedTargetAction {
    type: 'SENSOR_TARGET';
    target: SensorTarget | null;
}

interface SetTargetSystemsAction {
    type: 'TARGET_SYSTEMS';
    systems: SensorSystemType[];
}

interface OpenTargetSystemAction {
    type: 'OPEN_SYSTEM';
    system: SensorSystemType | null;
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
type KnownAction = SetSelectedTargetAction | SetTargetSystemsAction | OpenTargetSystemAction | SetTargetCellsAction | SetTargetCellAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setSelectedTarget: (target: SensorTarget | null) => <SetSelectedTargetAction>{
        type: 'SENSOR_TARGET',
        target: target,
    },
    setTargetSystems: (systems: SensorSystemType[]) => <SetTargetSystemsAction>{
        type: 'TARGET_SYSTEMS',
        systems: systems,
    },
    openTargetSystem: (system: SensorSystemType | null) => <OpenTargetSystemAction>{
        type: 'OPEN_SYSTEM',
        system: system,
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
    selectedTarget: null,
    targetSystems: [],
    openSystem: null,
    targetSystemCells: [],
};

export const reducer: Reducer<SensorState> = (state: SensorState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'SENSOR_TARGET': {
            return {
                ...state,
                selectedTarget: action.target,
            }
        }
        case 'TARGET_SYSTEMS': {
            return {
                ...state,
                targetSystems: action.systems,
            };
        }
        case 'OPEN_SYSTEM': {
            return {
                ...state,
                openSystem: action.system,
            };
        }
        case 'SET_CELLS': {
            return {
                ...state,
                targetSystemCells: action.cells,
            };
        }
        case 'SET_CELL': {
            const cells = state.targetSystemCells.slice();
            cells[action.index] = action.value;

            return {
                ...state,
                targetSystemCells: cells,
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};