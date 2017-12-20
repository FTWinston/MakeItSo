import { Action, Reducer, ActionCreator } from 'redux';
import { Quaternion } from '../functionality';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HelmState {
    orientation: Quaternion;

    // rotation feedback info
    pitchRate: number;
    yawRate: number;
    rollRate: number;
    pitchRateMax: number;
    yawRateMax: number;
    rollRateMax: number;

    // translation feedback info
    translationRateX: number;
    translationRateY: number;
    translationRateXMax: number;
    translationRateYMax: number;

    // forward/back speed info (separate from sideways motion)
    translationRateForward: number;
    translationRateForwardMax: number;
    translationRateReverseMax: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetManoeveringLimitsAction {
    type: 'SET_MANOEVERING_LIMITS';
    pitchRateMax: number;
    yawRateMax: number;
    rollRateMax: number;
    translationRateXMax: number;
    translationRateYMax: number;
}

interface SetSpeedLimitsAction {
    type: 'SET_SPEED_LIMITS';
    speedMax: number;
    speedMaxReverse: number;
}

interface SetOrientationAction {
    type: 'SET_ORIENTATION';
    w: number;
    x: number;
    y: number;
    z: number;
}

interface SetRotationRatesAction {
    type: 'SET_ROTATION_RATES';
    pitchRate: number;
    yawRate: number;
    rollRate: number;
}

interface SetTranslationRatesAction {
    type: 'SET_TRANSLATION_RATES';
    translationRateX: number;
    translationRateY: number;
    translationRateForward: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetManoeveringLimitsAction | SetSpeedLimitsAction | SetOrientationAction | SetRotationRatesAction | SetTranslationRatesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setManoeveringLimits: (pitch: number, yaw: number, roll: number, translationX: number, translationY: number) => <SetManoeveringLimitsAction>{
        type: 'SET_MANOEVERING_LIMITS',
        pitchRateMax: pitch,
        yawRateMax: yaw,
        rollRateMax: roll,
        translationRateXMax: translationX,
        translationRateYMax: translationY,
    },
    setSpeedLimits: (speedMax: number, speedMaxReverse: number) => <SetSpeedLimitsAction>{
        type: 'SET_SPEED_LIMITS',
        speedMax: speedMax,
        speedMaxReverse: speedMaxReverse,
    },
    setOrientation: (w: number, x: number, y: number, z: number) => <SetOrientationAction>{
        type: 'SET_ORIENTATION',
        w: w,
        x: x,
        y: y,
        z: z,
    },
    setRotationRates: (pitch: number, yaw: number, roll: number) => <SetRotationRatesAction>{
        type: 'SET_ROTATION_RATES',
        pitchRate: pitch,
        yawRate: yaw,
        rollRate: roll,
    },
    setTranslationRates: (translationRateX: number, translationRateY: number, translationRateForward: number) => <SetTranslationRatesAction>{
        type: 'SET_TRANSLATION_RATES',
        translationRateX: translationRateX,
        translationRateY: translationRateY,
        translationRateForward: translationRateForward,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HelmState = {
    orientation: new Quaternion(0, 0, 0, 0),
    pitchRate: 0,
    yawRate: 0,
    rollRate: 0,
    pitchRateMax: 1,
    yawRateMax: 1,
    rollRateMax: 1,
    translationRateX: 0,
    translationRateY: 0,
    translationRateXMax: 1,
    translationRateYMax: 1,
    translationRateForward: 0,
    translationRateForwardMax: 1,
    translationRateReverseMax: 1,
};

export const reducer: Reducer<HelmState> = (state: HelmState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'SET_MANOEVERING_LIMITS':
            return {
                ...state,
                pitchRateMax: action.pitchRateMax,
                yawRateMax: action.yawRateMax,
                rollRateMax: action.rollRateMax,
                translationRateXMax: action.translationRateXMax,
                translationRateYMax: action.translationRateYMax,
            };
        case 'SET_SPEED_LIMITS':
            return {
                ...state,
                translationRateForwardMax: action.speedMax,
                translationRateReverseMax: action.speedMaxReverse,
            };
        case 'SET_ORIENTATION':
            return {
                ...state,
                orientation: new Quaternion(action.w, action.x, action.y, action.z),
            };
        case 'SET_ROTATION_RATES':
            return {
                ...state,
                pitchRate: action.pitchRate,
                yawRate: action.yawRate,
                rollRate: action.rollRate,
            };
        case 'SET_TRANSLATION_RATES':
            return {
                ...state,
                translationRateX: action.translationRateX,
                translationRateY: action.translationRateY,
                translationRateForward: action.translationRateForward,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
