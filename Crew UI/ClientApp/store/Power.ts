import { Action, Reducer, ActionCreator } from 'redux';
import { JumpPath, JumpPathStatus } from '~/functionality/sensors';
import { Vector3 } from '~/functionality/math/Vector3';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum PowerCellType {
    Empty = 0,
    Reactor,
    System,
    Broken,
    Radiator,
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
}

export const enum PowerSystem {
    Helm = 0,
    Warp,
    BeamWeapons,
    Torpedoes,
    Sensors,
    Shields,
    DamageControl,
    Comms,
}

export const numSystems = 8;
export const numCells = 121;
export const maxNumSpare = 5;
export const fullPowerLevel = 8;

export interface PowerCell {
    index: number;
    type: PowerCellType;
    power: number;
}

export interface PowerState {
    systemsOnline: boolean[];
    cells: PowerCell[];
    reactorPower: number;
    heatLevel: number;
    heatRate: number;
    spareCells: PowerCellType[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetReactorPowerAction {
    type: 'REACTOR_POWER';
    value: number;
}

interface SetHeatLevelAction {
    type: 'HEAT_LEVELS';
    value: number;
    rate: number;
}

interface SetCellTypeAction {
    type: 'SET_CELL_T';
    cellID: number;
    cellType: PowerCellType;
}

interface SetAllCellTypesAction {
    type: 'SET_ALL_CELLS_T';
    cellTypes: PowerCellType[];
}

interface SetCellPowerAction {
    type: 'SET_CELL_P';
    cellID: number;
    cellPower: number;
}

interface SetAllCellPowerAction {
    type: 'SET_ALL_CELLS_P';
    cellPower: number[];
}

interface SetSystemStateAction {
    type: 'SYSTEM_STATE';
    system: PowerSystem;
    online: boolean;
}

interface SetAllSystemStateAction {
    type: 'SYSTEM_ALL_STATE';
    states: boolean[];
}

interface AddSpareCellAction {
    type: 'ADD_SPARE_CELL';
    cellType: PowerCellType;
}

interface RemoveSpareCellAction {
    type: 'REM_SPARE_CELL';
    spare: number;
}

interface SetAllSpareCellsAction {
    type: 'ALL_SPARE_CELL';
    cellTypes: PowerCellType[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetReactorPowerAction | SetHeatLevelAction | SetCellTypeAction | SetAllCellTypesAction | SetCellPowerAction | SetAllCellPowerAction
    | SetSystemStateAction | SetAllSystemStateAction | AddSpareCellAction | RemoveSpareCellAction | SetAllSpareCellsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setReactorPower: (val: number) => <SetReactorPowerAction>{
        type: 'REACTOR_POWER',
        value: val,
    },
    setHeatLevels: (val: number, rate: number) => <SetHeatLevelAction>{
        type: 'HEAT_LEVELS',
        value: val,
        rate: rate,
    },
    setCellType: (cellID: number, cellType: PowerCellType) => <SetCellTypeAction>{
        type: 'SET_CELL_T',
        cellID: cellID,
        cellType: cellType,
    },
    setAllCellTypes: (cellTypes: PowerCellType[]) => <SetAllCellTypesAction>{
        type: 'SET_ALL_CELLS_T',
        cellTypes: cellTypes,
    },
    setCellPower: (cellID: number, cellPower: number) => <SetCellPowerAction>{
        type: 'SET_CELL_P',
        cellID: cellID,
        cellPower: cellPower,
    },
    setAllCellPower: (cellPower: number[]) => <SetAllCellPowerAction>{
        type: 'SET_ALL_CELLS_P',
        cellPower: cellPower,
    },
    setSystemStatus: (system: PowerSystem, online: boolean) => <SetSystemStateAction>{
        type: 'SYSTEM_STATE',
        system: system,
        online: online,
    },
    setAllSystems: (online: boolean[]) => <SetAllSystemStateAction>{
        type: 'SYSTEM_ALL_STATE',
        states: online,
    },
    addSpareCell: (cellType: PowerCellType) => <AddSpareCellAction>{
        type: 'ADD_SPARE_CELL',
        cellType: cellType,
    },
    removeSpareCell: (spareNum: number) => <RemoveSpareCellAction>{
        type: 'REM_SPARE_CELL',
        spare: spareNum,
    },
    setAllSpareCells: (cellTypes: PowerCellType[]) => <SetAllSpareCellsAction>{
        type: 'ALL_SPARE_CELL',
        cellTypes: cellTypes,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

let cells: PowerCell[] = [];
for (let i=0; i<numCells; i++) {
    cells.push({
        index: i,
        type: PowerCellType.Empty,
        power: 0
    });
}

const unloadedState: PowerState = {
    systemsOnline: new Array(numSystems).fill(false),
    cells: cells,
    reactorPower: 100,
    heatLevel: 0,
    heatRate: 0,
    spareCells: [],
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
        case 'HEAT_LEVELS': {
            return {
                ...state,
                heatLevel: action.value,
                heatRate: action.rate,
            };
        }
        case 'SET_CELL_T': {
            let cells = state.cells.slice();
            cells[action.cellID].type = action.cellType;

            return {
                ...state,
                cells: cells,
            }
        }
        case 'SET_ALL_CELLS_T': {
            let cells = state.cells.slice();
            for (let i=0; i<cells.length; i++) {
                cells[i].type = action.cellTypes[i];
            }

            return {
                ...state,
                cells: cells,
            }
        }
        case 'SET_CELL_P': {
            let cells = state.cells.slice();
            cells[action.cellID].power = action.cellPower;

            return {
                ...state,
                cells: cells,
            }
        }
        case 'SET_ALL_CELLS_P': {
            let cells = state.cells.slice();
            for (let i=0; i<cells.length; i++) {
                cells[i].power = action.cellPower[i];
            }

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
        case 'SYSTEM_ALL_STATE': {
            return {
                ...state,
                systemsOnline: action.states,
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
        case 'ALL_SPARE_CELL': {
            return {
                ...state,
                spareCells: action.cellTypes,
            };
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};