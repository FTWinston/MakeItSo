import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HelmState {
    // rotation feedback info
    pitchRateMax: number;
    yawRateMax: number;
    rollRateMax: number;

    // translation feedback info
    translationRateHorizontalMax: number;
    translationRateVerticalMax: number;

    // forward/back speed info (separate from sideways motion)
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetManoeveringLimitsAction | SetSpeedLimitsAction;

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
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HelmState = {
    pitchRateMax: 1,
    yawRateMax: 1,
    rollRateMax: 1,
    translationRateHorizontalMax: 1,
    translationRateVerticalMax: 1,
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
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};