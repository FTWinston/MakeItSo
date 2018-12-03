import { Action, Reducer } from 'redux';
import { SensorTarget, Vector3 } from '~/functionality';
import { exhaustiveActionCheck } from './exhaustiveActionCheck';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EnvironmentState {
    targets: SensorTarget[];
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetTargetAction | MoveTargetAction | RemoveTargetAction | RemoveAllAction;

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
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EnvironmentState = {
    targets: [],
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
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};
