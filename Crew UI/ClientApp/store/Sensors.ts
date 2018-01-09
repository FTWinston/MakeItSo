import { Action, Reducer, ActionCreator } from 'redux';
import { SensorTarget, Vector3 } from '../functionality';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SensorState {
    targets: SensorTarget[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AddTargetAction {
    type: 'ADD_TARGET';
    targetID: number;
    targetType: number; // ??? should we just pass the object here or what?
    position: Vector3;
}

interface MoveTargetAction {
    type: 'MOVE_TARGET';
    targetID: number;
    position: Vector3;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = AddTargetAction | MoveTargetAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addTarget: (id: number, type: number, position: Vector3) => <AddTargetAction>{
        type: 'ADD_TARGET',
        targetID: id,
        targetType: type,
        position: position,
    },
    setSpeedLimits: (id: number, position: Vector3) => <MoveTargetAction>{
        type: 'MOVE_TARGET',
        targetID: id,
        position: position,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SensorState = {
    targets: [],
};

export const reducer: Reducer<SensorState> = (state: SensorState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'ADD_TARGET': {
            let targets = state.targets;
            // TODO: argh, this is abstract so instantiating one needs to know what class to create for each type
            // ...should that really be here?
            // targets.push(new SensorTarget())
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
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
