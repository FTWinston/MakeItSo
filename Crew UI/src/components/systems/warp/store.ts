import { Action, Reducer } from 'redux';
import { JumpPath, JumpPathStatus } from '~/functionality/sensors';
import { Vector3 } from '~/functionality/math/Vector3';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum WarpScreenStatus {
    Viewing,
    Plotting,
    Calculating,
    CalculationFailed,
    CalculationConfirm,
    Charging,
    Jumping,
}

export interface WarpState {
    paths: JumpPath[];
    status: WarpScreenStatus;
    activePath?: JumpPath;
    jumpEndTime?: Date;
    chargeCompletion: number;
    jumpStartEntranceRange: number;
    shipPosition: Vector3;
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

interface SetShipPositionAction {
    type: 'SET_SHIP_POSITION';
    pos: Vector3;
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
                   SetScreenStatusAction | SetShipPositionAction | ChargeJumpAction | PerformJumpAction | SelectPathAction;

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
    setShipPosition: (x: number, y: number, z: number) => <SetShipPositionAction> {
        type: 'SET_SHIP_POSITION',
        pos: new Vector3(x, y, z),
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
    selectPath: (pathID: number | undefined) => <SelectPathAction>{
        type: 'SELECT_PATH',
        pathID: pathID,
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WarpState = {
    paths: [],
    status: WarpScreenStatus.Viewing,
    chargeCompletion: 0,
    jumpStartEntranceRange: 100,
    shipPosition: new Vector3(0, 0, 0),
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
            // determine if path is in range of ship or not
            let pathStatus = action.status;
            if (pathStatus === JumpPathStatus.Plotted && isInJumpRange(state, action.points[0])) {
                pathStatus = JumpPathStatus.InRange;
            }

            let pathIsNew = true;
            let addingPath = new JumpPath(action.id, action.power, pathStatus, action.points);

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
                ? WarpScreenStatus.CalculationConfirm
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

            // if we just calculated this path, it was a failure
            let status = state.status === WarpScreenStatus.Calculating && action.status !== JumpPathStatus.Calculating
                ? WarpScreenStatus.CalculationFailed
                : state.status;

            return {
                ...state,
                paths: paths,
                status: status,
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

            if (state.activePath !== undefined) {
                state.activePath.highlighted = false;
            }
            if (path !== undefined) {
                path.highlighted = true;
            }

            return {
                ...state,
                activePath: path,
            };
        }
        case 'SET_SHIP_POSITION': {
            // update stored paths, indicating if they're in range or not
            let paths = state.paths.map((path, index) => updatePathStatus(path, state));

            let activePath = state.activePath;
            if (activePath !== undefined) { 
                const prev = activePath;
                activePath = paths.filter(p => p.id === prev.id)[0];
            }
            
            return {
                ...state,
                shipPosition: action.pos,
                paths: paths,
                activePath: activePath,
            }
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
    }

    return state || unloadedState;
};

function isInJumpRange(state: WarpState, point: Vector3) {
    let distSq = Vector3.distanceSq(state.shipPosition, point);
    return distSq < state.jumpStartEntranceRange * state.jumpStartEntranceRange;
}

function updatePathStatus(path: JumpPath, state: WarpState) {
    if (path.status !== JumpPathStatus.InRange && path.status !== JumpPathStatus.Plotted) {
        return path;
    }

    let status = isInJumpRange(state, path.points[0])
        ? JumpPathStatus.InRange : JumpPathStatus.Plotted;
    if (path.status === status) {
        return path;
    }

    return new JumpPath(path.id, path.power, status, path.points);
}