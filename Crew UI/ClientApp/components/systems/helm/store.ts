import { Action, Reducer, ActionCreator } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HelmState {
    // navball info
    pitch: number;
    yaw: number;
    roll: number;

    // rotation feedback info
    pitchRate: number;
    yawRate: number;
    rollRate: number;
    pitchRateMax: number;
    yawRateMax: number;
    rollRateMax: number;

    // translation feedback info
    translationRateHorizontal: number;
    translationRateVertical: number;
    translationRateHorizontalMax: number;
    translationRateVerticalMax: number;

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
    translationRateHorizontalMax: number;
    translationRateVerticalMax: number;
}

interface SetSpeedLimitsAction {
    type: 'SET_SPEED_LIMITS';
    speedMax: number;
    speedMaxReverse: number;
}

interface SetOrientationAction {
    type: 'SET_ORIENTATION';
    pitch: number;
    yaw: number;
    roll: number;
}

interface SetOrientationRatesAction {
    type: 'SET_ORIENTATION_RATES';
    pitchRate: number;
    yawRate: number;
    rollRate: number;
}

interface SetTranslationRatesAction {
    type: 'SET_TRANSLATION_RATES';
    translationRateHorizontal: number;
    translationRateVertical: number;
    translationRateForward: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetManoeveringLimitsAction | SetSpeedLimitsAction | SetOrientationAction | SetOrientationRatesAction | SetTranslationRatesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setManoeveringLimits: (pitch: number, yaw: number, roll: number, translationHorizonta: number, translationVertical: number) => <SetManoeveringLimitsAction>{
        type: 'SET_MANOEVERING_LIMITS',
        pitchRateMax: pitch,
        yawRateMax: yaw,
        rollRateMax: roll,
        translationRateHorizontalMax: translationHorizonta,
        translationRateVerticalMax: translationVertical,
    },
    setSpeedLimits: (speedMax: number, speedMaxReverse: number) => <SetSpeedLimitsAction>{
        type: 'SET_SPEED_LIMITS',
        speedMax: speedMax,
        speedMaxReverse: speedMaxReverse,
    },
    setOrientation: (pitch: number, yaw: number, roll: number) => <SetOrientationAction>{
        type: 'SET_ORIENTATION',
        pitch: pitch,
        yaw: yaw,
        roll: roll,
    },
    setRotationRates: (pitch: number, yaw: number, roll: number) => <SetOrientationRatesAction>{
        type: 'SET_ORIENTATION_RATES',
        pitchRate: pitch,
        yawRate: yaw,
        rollRate: roll,
    },
    setTranslationRates: (translationRateHorizontal: number, translationRateVertical: number, translationRateForward: number) => <SetTranslationRatesAction>{
        type: 'SET_TRANSLATION_RATES',
        translationRateHorizontal: translationRateHorizontal,
        translationRateVertical: translationRateVertical,
        translationRateForward: translationRateForward,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HelmState = {
    pitch: 0,
    yaw: 0,
    roll: 0,
    pitchRate: 0,
    yawRate: 0,
    rollRate: 0,
    pitchRateMax: 1,
    yawRateMax: 1,
    rollRateMax: 1,
    translationRateHorizontal: 0,
    translationRateVertical: 0,
    translationRateHorizontalMax: 1,
    translationRateVerticalMax: 1,
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
                translationRateHorizontalMax: action.translationRateHorizontalMax,
                translationRateVerticalMax: action.translationRateVerticalMax,
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
                pitch: action.pitch,
                yaw: action.yaw,
                roll: action.roll,
            };
        case 'SET_ORIENTATION_RATES':
            return {
                ...state,
                pitchRate: action.pitchRate,
                yawRate: action.yawRate,
                rollRate: action.rollRate,
            };
        case 'SET_TRANSLATION_RATES':
            return {
                ...state,
                translationRateHorizontal: action.translationRateHorizontal,
                translationRateVertical: action.translationRateVertical,
                translationRateForward: action.translationRateForward,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
