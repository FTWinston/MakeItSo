import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ViewscreenState {
    lockedTargetID?: number;
    chase: boolean;
    pitch: number;
    yaw: number;
    zoom: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetLockedTargetAction {
    type: 'VIEW_LOCK';
    targetID: number;
}

interface ClearLockedTargetAction {
    type: 'VIEW_UNLOCK';
}

interface SetAngleAction {
    type: 'VIEW_ANGLE';
    pitch: number;
    yaw: number;
}

interface SetZoomAction {
    type: 'VIEW_ZOOM';
    zoom: number;
}

interface SetChaseAction {
    type: 'VIEW_CHASE';
    chase: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetLockedTargetAction | ClearLockedTargetAction | SetAngleAction | SetZoomAction | SetChaseAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setLockedTarget: (targetID: number) => <SetLockedTargetAction>{
        type: 'VIEW_LOCK',
        targetID,
    },
    clearLockedTarget: () => <ClearLockedTargetAction>{
        type: 'VIEW_UNLOCK',
    },
    setAngle: (pitch: number, yaw: number) => <SetAngleAction>{
        type: 'VIEW_ANGLE',
        pitch,
        yaw,
    },
    setZoom: (zoom: number) => <SetZoomAction>{
        type: 'VIEW_ZOOM',
        zoom,
    },
    setChase: (chase: boolean) => <SetChaseAction>{
        type: 'VIEW_CHASE',
        chase,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ViewscreenState = {
    chase: false,
    pitch: 0,
    yaw: 0,
    zoom: 1,
};

export const reducer: Reducer<ViewscreenState> = (state: ViewscreenState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'VIEW_LOCK': {
            return {
                ...state,
                lockedTargetID: action.targetID,
            }
        }
        case 'VIEW_UNLOCK': {
            return {
                ...state,
                lockedTargetID: undefined,
            };
        }
        case 'VIEW_ANGLE': {
            return {
                ...state,
                pitch: action.pitch,
                yaw: action.yaw,
            };
        }
        case 'VIEW_ZOOM': {
            return {
                ...state,
                zoom: action.zoom,
            };
        }
        case 'VIEW_CHASE': {
            return {
                ...state,
                chase: action.chase,
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};