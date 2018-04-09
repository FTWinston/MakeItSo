import { Action, Reducer, ActionCreator } from 'redux';
import { JumpPath, JumpPathStatus } from '~/functionality/sensors';
import { Vector3 } from '~/functionality/math/Vector3';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum PowerCellType {
    Empty,
    ExhaustPort,
    Broken,
    NorthSouth,
    EastWest,
    NorthEast,
    SouthEast,
    SouthWest,
    NorthWest,
    NorthEastSouth,
    EastSouthWest,
    SouthWestNorth,
    WestNorthEast,
    NorthEastSouthWest,
}

export const enum PowerSystem {
    Helm = 0,
    Warp,
    Shields,
    Comms,
    BeamWeapons,
    Torpedoes,
    Sensors,
    DamageControl,
    NUM_VALUES,
}

export interface PowerState {
    systemsOnline: boolean[];
    cells: PowerCellType[];
    reactorPower: number;
    spareCells: PowerCellType[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetReactorPowerAction {
    type: 'REACTOR_POWER';
    value: number;
}

interface SetCellAction {
    type: 'SET_CELL';
    cellID: number;
    cellType: PowerCellType;
}

interface RotateCellAction {
    type: 'ROT_CELL';
    cellID: number;
}

interface SetSystemStateAction {
    type: 'SYSTEM_STATE';
    system: PowerSystem;
    online: boolean;
}

interface AddSpareCellAction {
    type: 'ADD_SPARE_CELL';
    cellType: PowerCellType;
}

interface RemoveSpareCellAction {
    type: 'REM_SPARE_CELL';
    spare: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetReactorPowerAction | SetCellAction | RotateCellAction | SetSystemStateAction | AddSpareCellAction | RemoveSpareCellAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setReactorPower: (val: number) => <SetReactorPowerAction>{
        type: 'REACTOR_POWER',
        value: val,
    },
    setCell: (cellID: number, cellType: PowerCellType) => <SetCellAction>{
        type: 'SET_CELL',
        cellID: cellID,
        cellType: cellType,
    },
    rotateCell: (cellID: number) => <RotateCellAction>{
        type: 'ROT_CELL',
        cellID: cellID,
    },
    setPathStatus: (system: PowerSystem, online: boolean) => <SetSystemStateAction>{
        type: 'SYSTEM_STATE',
        system: system,
        online: online,
    },
    addSpareCell: (cellType: PowerCellType) => <AddSpareCellAction>{
        type: 'ADD_SPARE_CELL',
        cellType: cellType,
    },
    removeSpareCell: (spareNum: number) => <RemoveSpareCellAction>{
        type: 'REM_SPARE_CELL',
        spare: spareNum,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: PowerState = {
    systemsOnline: new Array(PowerSystem.NUM_VALUES as number),
    cells: new Array(210),
    reactorPower: 100,
    spareCells: new Array(5),
};

export const reducer: Reducer<PowerState> = (state: PowerState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'REACTOR_POWER': {
            return {
                ...state,
                reactorPower: action.value,
            };
        }
        case 'SET_CELL': {
            let cells = state.cells.slice();
            cells[action.cellID] = action.cellType;
            return {
                ...state,
                cells: cells,
            }
        }
        case 'ROT_CELL': {
            let cells = state.cells.slice();
            cells[action.cellID] = getRotatedCellType(cells[action.cellID]);
            return {
                ...state,
                cells: cells,
            }
        }
        case 'SYSTEM_STATE': {
            let systemID: number = action.system;

            let systemsOnline = state.systemsOnline.slice();
            systemsOnline[systemID] = action.online;

            return {
                ...state,
                systemsOnline: systemsOnline,
            };
        }
        case 'ADD_SPARE_CELL': {
            let spares = state.spareCells.slice();
            spares.push(action.cellType);

            return {
                ...state,
                spareCells: spares,
            }
        }
        case 'REM_SPARE_CELL': {
            let spares = [...state.spareCells.slice(0, action.spare), ...state.spareCells.slice(action.spare + 1)];
            
            return {
                ...state,
                spareCells: spares,
            }
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};

function getRotatedCellType(type: PowerCellType) {
    switch (type) {
        case PowerCellType.NorthSouth:
            return PowerCellType.EastWest;
        case PowerCellType.EastWest:
            return PowerCellType.NorthSouth;
        case PowerCellType.NorthEast:
            return PowerCellType.SouthEast;
        case PowerCellType.SouthEast:
            return PowerCellType.SouthWest;
        case PowerCellType.SouthWest:
            return PowerCellType.NorthWest;
        case PowerCellType.NorthWest:
            return PowerCellType.NorthEast;
        case PowerCellType.NorthEastSouth:
            return PowerCellType.EastSouthWest;
        case PowerCellType.EastSouthWest:
            return PowerCellType.SouthWestNorth;
        case PowerCellType.SouthWestNorth:
            return PowerCellType.WestNorthEast;
        case PowerCellType.WestNorthEast:
            return PowerCellType.NorthEastSouth;
        default:
            return type;
    }
}