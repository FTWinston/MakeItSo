import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum TargetingSolution {
    None = 0,

    Misc,

    Engines,
    Warp,
    Weapons,
    Sensors,
    PowerManagement,
    DamageControl,
    Communications,

    MiscVulnerability,
    EngineVulnerability,
    WarpVulnerability,
    WeaponVulnerability,
    SensorVulnerability,
    PowerVulnerability,
    DamageControlVulnerability,
}

export interface WeaponState {
    selectedTargetID: number;
    targetingSolutions: TargetingSolution[];
    selectedTargetingSolution: TargetingSolution;

    puzzleWidth: number;
    puzzleStartCell: number;
    puzzleCells: boolean[]
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetSelectedTargetAction {
    type: 'WPN_TARGET';
    targetID: number;
}

interface SetTargetingSolutionsAction {
    type: 'WPN_SOLUTIONS';
    solutions: TargetingSolution[];
}

interface SetSelectedTargetingSolutionAction {
    type: 'WPN_SOLUTION';
    solution: TargetingSolution;
}

interface SetPuzzleAction {
    type: 'WPN_PUZZLE';
    width: number;
    startCell: number;
    cells: boolean[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetSelectedTargetAction | SetTargetingSolutionsAction | SetSelectedTargetingSolutionAction | SetPuzzleAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setSelectedTarget: (targetID?: number) => <SetSelectedTargetAction>{
        type: 'WPN_TARGET',
        targetID: targetID,
    },
    setTargetingSolutions: (solutions: TargetingSolution[]) => <SetTargetingSolutionsAction>{
        type: 'WPN_SOLUTIONS',
        solutions: solutions,
    },
    setSelectedTargetingSolution: (solution: TargetingSolution) => <SetSelectedTargetingSolutionAction>{
        type: 'WPN_SOLUTION',
        solution: solution,
    },
    setTargetingPuzzle: (width: number, startCell: number, cells: boolean[]) => <SetPuzzleAction>{
        type: 'WPN_PUZZLE',
        width: width,
        startCell: startCell,
        cells: cells,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeaponState = {
    selectedTargetID: 0,
    targetingSolutions: [],
    selectedTargetingSolution: TargetingSolution.None,
    puzzleWidth: 0,
    puzzleStartCell: 0,
    puzzleCells: [],
};

export const reducer: Reducer<WeaponState> = (state: WeaponState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'WPN_TARGET': {
            return {
                ...state,
                selectedTargetID: action.targetID,
            }
        }
        case 'WPN_SOLUTIONS': {
            return {
                ...state,
                targetingSolutions: action.solutions,
            };
        }
        case 'WPN_SOLUTION': {
            return {
                ...state,
                selectedTargetingSolution: action.solution,
            };
        }
        case 'WPN_PUZZLE': {
            return {
                ...state,
                puzzleWidth: action.width,
                puzzleStartCell: action.startCell,
                puzzleCells: action.cells,
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};