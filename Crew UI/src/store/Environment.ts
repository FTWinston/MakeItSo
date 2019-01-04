import { Action, Reducer } from 'redux';
import { SensorTarget, Vector3 } from '~/functionality';
import { exhaustiveActionCheck } from './exhaustiveActionCheck';
import { Rotator } from '~/functionality/math/Rotator';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EnvironmentState {
    targets: SensorTarget[];

    shipPos: Vector3;
    shipVel: Vector3;

    shipRotation: Rotator;
    shipRotationRate: Rotator;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetTargetAction {
    type: 'SET_TARGET';
    target: SensorTarget;
}

interface MoveTargetAction {
    type: 'MOVE_TARGET';
    targetID: number;
    position: Vector3;
}

interface RemoveTargetAction {
    type: 'REMOVE_TARGET';
    targetID: number;
}

interface RemoveAllAction {
    type: 'REMOVE_ALL';
}

interface SetPositionAction {
    type: 'SHIP_POS';
    x: number;
    y: number;
    z: number;
}

interface SetVelocityAction {
    type: 'SHIP_VEL';
    x: number;
    y: number;
    z: number;
}

interface SetOrientationAction {
    type: 'SHIP_ORIENT';
    pitch: number;
    yaw: number;
    roll: number;
}

interface SetOrientationRateAction {
    type: 'SHIP_ORIENT_RATE';
    pitch: number;
    yaw: number;
    roll: number;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetTargetAction | MoveTargetAction | RemoveTargetAction | RemoveAllAction
    | SetOrientationAction | SetOrientationRateAction | SetPositionAction | SetVelocityAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addOrUpdateTarget: (target: SensorTarget) => <SetTargetAction>{
        type: 'SET_TARGET',
        target: target,
    },
    moveTarget: (id: number, position: Vector3) => <MoveTargetAction>{
        type: 'MOVE_TARGET',
        targetID: id,
        position: position,
    },
    removeTarget: (id: number) => <RemoveTargetAction>{
        type: 'REMOVE_TARGET',
        targetID: id,
    },
    removeAllTargets: () => <RemoveAllAction>{
        type: 'REMOVE_ALL',
    },
    setShipPosition: (x: number, y: number, z: number) => <SetPositionAction>{
        type: 'SHIP_POS',
        x: x,
        y: y,
        z: z,
    },
    setShipVelocity: (x: number, y: number, z: number) => <SetVelocityAction>{
        type: 'SHIP_VEL',
        x: x,
        y: y,
        z: z,
    },
    setShipOrientation: (pitch: number, yaw: number, roll: number) => <SetOrientationAction>{
        type: 'SHIP_ORIENT',
        pitch: pitch,
        yaw: yaw,
        roll: roll,
    },
    setShipOrientationRate: (pitch: number, yaw: number, roll: number) => <SetOrientationRateAction>{
        type: 'SHIP_ORIENT_RATE',
        pitch: pitch,
        yaw: yaw,
        roll: roll,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EnvironmentState = {
    targets: [],

    shipPos: new Vector3(0, 0, 0),
    shipVel: new Vector3(0, 0, 0),

    shipRotation: new Rotator(0, 0, 0),
    shipRotationRate: new Rotator(0, 0, 0),
};

export const reducer: Reducer<EnvironmentState> = (state: EnvironmentState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'SET_TARGET': {
            const targets = state.targets.slice();
            const existingIndex = targets.findIndex(t => t.id === action.target.id);
            
            if (existingIndex === -1) {
                targets.push(action.target);
            }
            else {
                targets[existingIndex] = action.target;
            }

            return {
                ...state,
                targets: targets,
            };
        }
        case 'MOVE_TARGET': {
            let targets = state.targets.map((target, index) => {
                if (target.id === action.targetID) {
                    return Object.assign({}, target, {
                        position: action.position,
                    });
                }
                return target;
            });

            return {
                ...state,
                targets: targets,
            };
        }
        case 'REMOVE_TARGET': {
            let targets = state.targets.filter(target => target.id !== action.targetID);

            return {
                ...state,
                targets: targets,
            };
        }
        case 'REMOVE_ALL': {
            return {
                ...state,
                targets: [],
            };
        }
        case 'SHIP_ORIENT': {
            return {
                ...state,
                shipRotation: new Rotator(action.pitch, action.yaw, action.roll),
            };
        }
        case 'SHIP_ORIENT_RATE': {
            return {
                ...state,
                shipRotationRate: new Rotator(action.pitch, action.yaw, action.roll),
            };
        }
        case 'SHIP_POS': {
            return {
                ...state,
                shipPos: new Vector3(action.x, action.y, action.z),
            };
        }
        case 'SHIP_VEL': {
            return {
                ...state,
                shipVel: new Vector3(action.x, action.y, action.z),
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};
