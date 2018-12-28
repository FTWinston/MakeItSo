import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum TargetingSolutionType {
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

export const enum TargetingFace { // These are numbered stupidly to easily identify opposite faces
    None = 0,
    Front = 1,
    Rear = -1,
    Left = 2,
    Right = -2,
    Top = 3,
    Bottom = -3,
};

export const enum TargetingDifficulty {
    VeryEasy = 0,
    Easy,
    Medium,
    Hard,
    VeryHard,
    Impossible,
}

export interface TargetingSolution {
    type: TargetingSolutionType;
    difficulty: TargetingDifficulty;
    bestFacing: TargetingFace;
}

export interface WeaponState {
    selectedTargetID: number;
    targetingSolutions: TargetingSolution[];
    selectedTargetingSolution?: TargetingSolution;

    currentlyFacing: TargetingFace;

    puzzleWidth: number;
    puzzleHeight: number;
    puzzleStartCell: number;
    puzzleCells: boolean[];
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
    solutionIndex: number | undefined;
}

interface SetPuzzleAction {
    type: 'WPN_PUZZLE';
    width: number;
    height: number;
    startCell: number;
    cells: boolean[];
}

interface SetCurrentlyFacingAction {
    type: 'WPN_FACE';
    face: TargetingFace;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetSelectedTargetAction | SetTargetingSolutionsAction | SetSelectedTargetingSolutionAction
    | SetPuzzleAction | SetCurrentlyFacingAction;

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
    setSelectedTargetingSolution: (index?: number) => <SetSelectedTargetingSolutionAction>{
        type: 'WPN_SOLUTION',
        solutionIndex: index,
    },
    setTargetingPuzzle: (width: number, height: number, startCell: number, cells: boolean[]) => <SetPuzzleAction>{
        type: 'WPN_PUZZLE',
        width: width,
        height: height,
        startCell: startCell,
        cells: cells,
    },
    setCurrentlyFacing: (face: TargetingFace) => <SetCurrentlyFacingAction>{
        type: 'WPN_FACE',
        face: face,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeaponState = {
    selectedTargetID: 0,
    targetingSolutions: [],
    currentlyFacing: TargetingFace.None,
    puzzleWidth: 0,
    puzzleHeight: 0,
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
            const solution = action.solutionIndex !== undefined && action.solutionIndex < state.targetingSolutions.length
                ? state.targetingSolutions[action.solutionIndex]
                : undefined;

            return {
                ...state,
                selectedTargetingSolution: solution,
            };
        }
        case 'WPN_PUZZLE': {
            return {
                ...state,
                puzzleWidth: action.width,
                puzzleHeigh: action.height,
                puzzleStartCell: action.startCell,
                puzzleCells: action.cells,
            };
        }
        case 'WPN_FACE': {
            return {
                ...state,
                currentlyFacing: action.face,
            }
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};