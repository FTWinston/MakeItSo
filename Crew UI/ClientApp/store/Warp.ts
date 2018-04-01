import { Action, Reducer, ActionCreator } from 'redux';
import { Vector3 } from '~/functionality';
import { JumpPath, JumpPathStatus } from '~/functionality/sensors';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum WarpScreenStatus {
    Viewing,
    Plotting,
    Calculating,
    Charging,
    Jumping,
}

export interface WarpState {
    paths: JumpPath[];
    status: WarpScreenStatus;
    activePath?: JumpPath;
    jumpEndTime?: Date;
    chargeCompletion: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ClearPathsAction {
    type: 'CLEAR_PATHS';
}

interface AddPathAction {
    type: 'ADD_PATH';
    id: number;
    status: JumpPathStatus;
    points: Vector3[];
    power: number;
}

interface ExtendPathAction {
    type: 'EXTEND_PATH';
    id: number;
    points: Vector3[];
}

interface SetPathStatusAction {
    type: 'SET_PATH_STATUS';
    id: number;
    status: JumpPathStatus;
}

interface RemovePathAction {
    type: 'REMOVE_PATH';
    id: number;
}

interface SetScreenStatusAction {
    type: 'SET_WARP_STATUS';
    status: WarpScreenStatus;
}

interface ChargeJumpAction {
    type: 'CHARGE_JUMP';
    pathID: number;
    endTime: Date;
    completion: number;
}

interface PerformJumpAction {
    type: 'DO_JUMP';
    pathID: number;
    endTime: Date;
}

interface SelectPathAction {
    type: 'SELECT_PATH';
    pathID: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ClearPathsAction | AddPathAction | ExtendPathAction | SetPathStatusAction | RemovePathAction |
                   SetScreenStatusAction | ChargeJumpAction | PerformJumpAction | SelectPathAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    clearAll: () => <ClearPathsAction>{
        type: 'CLEAR_PATHS',
    },
    addPath: (id: number, status: JumpPathStatus, points: Vector3[], power: number) => <AddPathAction>{
        type: 'ADD_PATH',
        id: id,
        status: status,
        points: points,
        power: power,
    },
    extendPath: (id: number, points: Vector3[]) => <ExtendPathAction>{
        type: 'EXTEND_PATH',
        id: id,
        points: points,
    },
    setPathStatus: (id: number, status: JumpPathStatus) => <SetPathStatusAction>{
        type: 'SET_PATH_STATUS',
        id: id,
        status: status,
    },
    removePath: (id: number) => <RemovePathAction>{
        type: 'REMOVE_PATH',
        id: id,
    },
    setScreenStatus: (status: WarpScreenStatus) => <SetScreenStatusAction>{
        type: 'SET_WARP_STATUS',
        status: status,
    },
    chargeJump: (pathID: number, duration: number, completion: number) => {
        let endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + duration);

        return <ChargeJumpAction> {
            type: 'CHARGE_JUMP',
            pathID: pathID,
            endTime: endTime,
            completion: completion,
        };
    },
    performJump: (pathID: number, duration: number) => {
        let endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + duration);

        return <PerformJumpAction> {
            type: 'DO_JUMP',
            pathID: pathID,
            endTime: endTime,
        };
    },
    selectPath: (pathID: number | undefined) => {
        return <SelectPathAction> {
            type: 'SELECT_PATH',
            pathID: pathID,
        };
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WarpState = {
    paths: [],
    status: WarpScreenStatus.Viewing,
    chargeCompletion: 0,
};

export const reducer: Reducer<WarpState> = (state: WarpState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'CLEAR_PATHS': {
            let retVal = {
                ...state,
                paths: [],
            };

            delete retVal.jumpEndTime;
            delete retVal.activePath;
            return retVal;
        }
        case 'ADD_PATH': {
            let addingPath = new JumpPath(action.id, action.power, action.status, action.points);
            let pathIsNew = true;

            // if path ID already exists, overwrite. Otherwise, add.
            let paths = state.paths.map((path, index) => {
                if (path.id === action.id) {
                    pathIsNew = false;
                    return addingPath;
                }
                return path;
            });

            if (pathIsNew) {
                paths.push(addingPath);
            }

            // when path is sent again when it finishes calculating, switch screen status
            let status = state.status === WarpScreenStatus.Calculating && action.status !== JumpPathStatus.Calculating
                ? WarpScreenStatus.Viewing
                : state.status;

            return {
                ...state,
                paths: paths,
                status: status,
            };
        }
        case 'EXTEND_PATH': {
            let paths = state.paths.map((path, index) => {
                if (path.id === action.id) {
                    return new JumpPath(path.id, path.power, path.status, [...path.points, ...action.points]);
                }
                return path;
            });
            
            return {
                ...state,
                paths: paths,
            };
        }
        case 'SET_PATH_STATUS': {
            let paths = state.paths.map((path, index) => {
                if (path.id === action.id) {
                    return Object.assign({}, path, {
                        status: action.status,
                    });
                }
                return path;
            });

            return {
                ...state,
                targets: paths,
            };
        }
        case 'REMOVE_PATH': {
            let paths = state.paths.filter(paths => paths.id !== action.id);

            let retVal = {
                ...state,
                paths: paths,
            };

            if (retVal.activePath !== undefined && retVal.activePath.id === action.id) {
                delete retVal.activePath;
            }

            return retVal;
        }
        case 'SET_WARP_STATUS': {
            let retVal = {
                ...state,
                status: action.status,
            };

            delete retVal.jumpEndTime;
            delete retVal.activePath;
            return retVal;
        }
        case 'CHARGE_JUMP': {
            let paths = state.paths.filter(p => p.id === action.pathID);
            let path = paths.length > 0 ? paths[0] : undefined;

            return {
                ...state,
                status: WarpScreenStatus.Charging,
                activePath: path,
                jumpEndTime: action.endTime,
                chargeCompletion: action.completion,
            };
        }
        case 'DO_JUMP': {
            let paths = state.paths.filter(p => p.id === action.pathID);
            let path = paths.length > 0 ? paths[0] : undefined;

            return {
                ...state,
                status: WarpScreenStatus.Jumping,
                activePath: path,
                jumpEndTime: action.endTime,
                chargeCompletion: 100,
            };
        }
        case 'SELECT_PATH': {
            let path: JumpPath | undefined;
            if (action.pathID !== undefined) {
                let paths = state.paths.filter(p => p.id === action.pathID);
                path = paths.length > 0 ? paths[0] : undefined;
            }

            return {
                ...state,
                activePath: path,
            };
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
