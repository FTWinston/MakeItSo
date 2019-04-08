import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from '~/store';
import { Polygon } from './Polygon';

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
    CommunicationVulnerability,
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
    Impossible = 0,
    VeryEasy = 2,
    Easy,
    Medium,
    Hard,
    VeryHard,
}

export interface ITargetingSolution {
    type: TargetingSolutionType;
    difficulty: TargetingDifficulty;
    bestFacing: TargetingFace;
    polygonsByFace: { [key: number]: Polygon };
}

export interface WeaponState {
    selectedTargetID: number;
    selectedSolution?: ITargetingSolution;
    targetingSolutions: ITargetingSolution[];

    currentlyFacing: TargetingFace;
    targetPitch: number;
    targetYaw: number;
    targetRoll: number;
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
    solutions: ITargetingSolution[];
}

interface SetSingleTargetingSolutionAction {
    type: 'WPN_SOLUTION_SET';
    solution: ITargetingSolution;
}

interface RemoveTargetingSolutionAction {
    type: 'WPN_SOLUTION_REM';
    solutionType: TargetingSolutionType;
}

interface SetSelectedTargetingSolutionAction {
    type: 'WPN_SOLUTION_SELECT';
    solutionType: TargetingSolutionType;
}

interface FireAction {
    type: 'WPN_FIRE';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface SetCurrentlyFacingAction {
    type: 'WPN_FACE';
    face: TargetingFace;
}

interface SetTargetOrientationAction {
    type: 'WPN_ORIENT';
    pitch: number;
    yaw: number;
    roll: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetSelectedTargetAction | SetTargetingSolutionsAction | SetSingleTargetingSolutionAction | RemoveTargetingSolutionAction
    | SetSelectedTargetingSolutionAction | SetCurrentlyFacingAction | SetTargetOrientationAction | FireAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setSelectedTarget: (targetID?: number) => <SetSelectedTargetAction>{
        type: 'WPN_TARGET',
        targetID: targetID,
    },
    setTargetingSolutions: (solutions: ITargetingSolution[]) => <SetTargetingSolutionsAction>{
        type: 'WPN_SOLUTIONS',
        solutions: solutions,
    },
    setTargetingSolution: (solution: ITargetingSolution) => <SetSingleTargetingSolutionAction>{
        type: 'WPN_SOLUTION_SET',
        solution: solution,
    },
    removeTargetingSolution: (type: TargetingSolutionType) => <RemoveTargetingSolutionAction>{
        type: 'WPN_SOLUTION_REM',
        solutionType: type,
    },
    selectTargetingSolution: (type: TargetingSolutionType) => <SetSelectedTargetingSolutionAction>{
        type: 'WPN_SOLUTION_SELECT',
        solutionType: type,
    },
    fire: (x1: number, y1: number, x2: number, y2: number) => <FireAction>{
        type: 'WPN_FIRE',
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
    },
    setCurrentlyFacing: (face: TargetingFace) => <SetCurrentlyFacingAction>{
        type: 'WPN_FACE',
        face: face,
    },
    setTargetOrientation: (pitch: number, yaw: number, roll: number) => <SetTargetOrientationAction>{
        type: 'WPN_ORIENT',
        pitch: pitch,
        yaw: yaw,
        roll: roll,
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeaponState = {
    selectedTargetID: 0,
    targetingSolutions: [],
    currentlyFacing: TargetingFace.None,
    targetPitch: 0,
    targetYaw: 0,
    targetRoll: 0,
};

export const reducer: Reducer<WeaponState> = (state: WeaponState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'WPN_TARGET': {
            return {
                ...state,
                selectedTargetID: action.targetID,
                targetingSolutions: [],
            }
        }
        case 'WPN_SOLUTIONS': {
            const selectedSolution = state.selectedSolution === undefined
                ? undefined
                : action.solutions.find(s => s.type === state.selectedSolution!.type);

            return {
                ...state,
                selectedSolution,
                targetingSolutions: action.solutions,
            };
        }
        case 'WPN_SOLUTION_SET': {
            const targetingSolutions = state.targetingSolutions
                .filter(s => s.type !== action.solution.type);
            targetingSolutions.push(action.solution);

            return {
                ...state,
                targetingSolutions,
            };
        }
        case 'WPN_SOLUTION_REM': {
            const targetingSolutions = state.targetingSolutions
                .filter(s => s.type !== action.solutionType);

            return {
                ...state,
                targetingSolutions,
            };
        }
        case 'WPN_SOLUTION_SELECT': {
            const selectedSolution = state.targetingSolutions
                .find(s => s.type === action.solutionType);

            return {
                ...state,
                selectedSolution,
            }
        }
        case 'WPN_FIRE': {
            // TODO: something with x1 y1 x2 y2?
            // Display the numbers, at least briefly ...
            // Perhaps that doesn't ever reach the store.
            return {
                ...state,
            };
        }
        case 'WPN_FACE': {
            return {
                ...state,
                currentlyFacing: action.face,
            };
        }
        case 'WPN_ORIENT': {
            return {
                ...state,
                targetPitch: action.pitch,
                targetYaw: action.yaw,
                targetRoll: action.roll,
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};