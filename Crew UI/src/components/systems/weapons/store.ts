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

export enum ElementShape {
    Star = 0,
    Triangle,
    Square,
    Pentagon,
    Hexagon,
    Octagon,
    Circle,
    
    NUM_SHAPES
}

export enum ElementColor {
    Red = 0,
    Yellow,
    Green,
    Blue,

    Orange,
    Purple,
    Lime,
    Teal,
    Brown,
    Mauve,
    Violet,
    Black,
    White,
    LightGrey,
    DarkGrey,

    NUM_COLORS
}

export interface ITargetingSymbol {
    shape: ElementShape;
    color: ElementColor;
}

export interface ITargetingSolution {
    type: TargetingSolutionType;
    difficulty: TargetingDifficulty;
    bestFacing: TargetingFace;
    sequence: ITargetingSymbol[];
}

export interface WeaponState {
    selectedTargetID: number;
    targetingSymbols: ITargetingSymbol[];
    targetingSolutions: ITargetingSolution[];
    selectedSymbols: ITargetingSymbol[];
    lastUsedSolution: TargetingSolutionType;
    lastFireTime: number;

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

interface SetTargetingElementsAction {
    type: 'WPN_ELEMENTS';
    elementSymbols: ITargetingSymbol[];
}

interface FireAction {
    type: 'WPN_FIRE';
    solution: TargetingSolutionType;
    fireTime: number;
}

interface SelectSymbolAction {
    type: 'WPN_SYMBOL';
    symbol: ITargetingSymbol;
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
type KnownAction = SetSelectedTargetAction | SetTargetingSolutionsAction | SetTargetingElementsAction
    | SelectSymbolAction | SetCurrentlyFacingAction | SetTargetOrientationAction | FireAction;

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
    setTargetingElements: (elements: ITargetingSymbol[]) => <SetTargetingElementsAction>{
        type: 'WPN_ELEMENTS',
        elementSymbols: elements,
    },
    fire: (lastSolution: TargetingSolutionType) => <FireAction>{
        type: 'WPN_FIRE',
        solution: lastSolution,
        fireTime: Date.now(),
    },
    selectSymbol: (symbol: ITargetingSymbol) => <SelectSymbolAction>{
        type: 'WPN_SYMBOL',
        symbol: symbol,
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
    targetingSymbols: [],
    targetingSolutions: [],
    lastFireTime: Date.now(),
    lastUsedSolution: TargetingSolutionType.None,
    selectedSymbols: [],
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
            }
        }
        case 'WPN_SOLUTIONS': {
            return {
                ...state,
                targetingSolutions: action.solutions,
            };
        }
        case 'WPN_ELEMENTS': {
            return {
                ...state,
                targetingSymbols: action.elementSymbols,
            };
        }
        case 'WPN_FIRE': {
            return {
                ...state,
                lastFireTime: action.fireTime,
                lastSolution: action.solution,
                selectedSymbols: [],
            };
        }
        case 'WPN_SYMBOL': {
            return {
                ...state,
                selectedSymbols: [...state.selectedSymbols, action.symbol],
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