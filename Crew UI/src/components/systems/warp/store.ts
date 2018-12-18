import { Action, Reducer } from 'redux';
import { Vector3 } from '~/functionality/math/Vector3';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum WarpJumpStatus {
    Idle = 0,
    Charging,
    Ready,
    Jumping,
}

export const enum Operator {
    Add = 1,
    Multiply,
    Subtract,
    Divide,
}

export interface WarpState {
    status: WarpJumpStatus;
    shipPosition: Vector3;

    jumpStartPosition?: Vector3;
    jumpTargetPosition?: Vector3;
    jumpEndTime?: Date;
    chargeCompletion: number;

    puzzleSize: number;
    puzzleValues: number[];
    puzzleCellGroups: number[];
    puzzleGroupTargets: number[];
    puzzleGroupOperators: Operator[];
    puzzleGroupValidity?: boolean[];

// TODO: populate / use this fields
    jumpStartEntranceRange: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetJumpPositionsAction {
    type: 'JUMP_POSITIONS';
    startPos: Vector3;
    targetPos: Vector3;
}

interface SetShipPositionAction {
    type: 'SET_SHIP_POSITION';
    pos: Vector3;
}

interface SetJumpStateAction {
    type: 'SET_STATE';
    state: WarpJumpStatus;
}

interface SetPuzzleAction {
    type: 'PUZZLE';
    puzzleSize: number;
    cellGroups: number[];
    groupTargets: number[];
    groupOperators: Operator[];
}

interface SetPuzzleResults {
    type: 'PUZZLE_RESULTS';
    groupValidity: boolean[];
}

interface ChargeJumpAction {
    type: 'CHARGE_JUMP';
    endTime: Date;
    completion: number;
}

interface ChargeJumpAction {
    type: 'CHARGE_JUMP';
    endTime: Date;
    completion: number;
}

interface SetPuzzleValueAction {
    type: 'PUZZLE_VALUE';
    index: number;
    value: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetJumpPositionsAction | SetJumpStateAction | SetPuzzleAction | SetPuzzleResults
                    | SetShipPositionAction | ChargeJumpAction | SetPuzzleValueAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setJumpPositions: (startX: number, startY: number, startZ: number, targetX: number, targetY: number, targetZ: number) => <SetJumpPositionsAction>{
        type: 'JUMP_POSITIONS',
        startPos: new Vector3(startX, startY, startZ),
        targetPos: new Vector3(targetX, targetY, targetZ),
    },
    setJumpState: (state: WarpJumpStatus) => <SetJumpStateAction>{
        type: 'SET_STATE',
        state: state,
    },
    setPuzzle: (puzzleSize: number, cellGroups: number[], groupTargets: number[], groupOperators: Operator[]) => <SetPuzzleAction>{
        type: 'PUZZLE',
        puzzleSize: puzzleSize,
        cellGroups: cellGroups,
        groupTargets: groupTargets,
        groupOperators: groupOperators,
    },
    setPuzzleResults: (groupValidity: boolean[]) => <SetPuzzleResults>{
        type: 'PUZZLE_RESULTS',
        groupValidity: groupValidity,
    },
    setShipPosition: (x: number, y: number, z: number) => <SetShipPositionAction> {
        type: 'SET_SHIP_POSITION',
        pos: new Vector3(x, y, z),
    },
    chargeJump: (duration: number, completion: number) => {
        let endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + duration);

        return <ChargeJumpAction> {
            type: 'CHARGE_JUMP',
            endTime: endTime,
            completion: completion,
        };
    },
    setPuzzleValue: (cellIndex: number, value: number) => <SetPuzzleValueAction> {
        type: 'PUZZLE_VALUE',
        index: cellIndex,
        value: value,
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WarpState = {
    status: WarpJumpStatus.Idle,
    shipPosition: new Vector3(0, 0, 0),
    chargeCompletion: 0,
    jumpStartEntranceRange: 100,

    puzzleSize: 0,
    puzzleValues: [],
    puzzleCellGroups: [],
    puzzleGroupTargets: [],
    puzzleGroupOperators: [],
};

export const reducer: Reducer<WarpState> = (state: WarpState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'JUMP_POSITIONS': {
            return {
                ...state,
                jumpStartPosition: action.startPos,
                jumpTargetPosition: action.targetPos,
            }
        }
        case 'SET_SHIP_POSITION': {
            return {
                ...state,
                shipPosition: action.pos,
            }
        }
        case 'SET_STATE': {
            const retVal = {
                ...state,
                status: action.state,
            };

            if (action.state === WarpJumpStatus.Idle) {
                retVal.puzzleSize = 0;
                retVal.puzzleValues = [];
                retVal.puzzleCellGroups = [];
                retVal.puzzleGroupTargets = [];
                retVal.puzzleGroupOperators = [];
                delete retVal.jumpStartPosition;
                delete retVal.jumpTargetPosition;
                delete retVal.jumpEndTime;
                delete retVal.puzzleGroupValidity;
            }
            return retVal;
        }
        case 'PUZZLE': {
            const values = [];
            for (let i = action.puzzleSize * action.puzzleSize; i > 0; i--) {
                values.push(0);
            }

            return {
                ...state,
                puzzleSize: action.puzzleSize,
                puzzleCellGroups: action.cellGroups,
                puzzleGroupTargets: action.groupTargets,
                puzzleGroupOperators: action.groupOperators,
                puzzleValues: values,
            }
        }
        case 'PUZZLE_RESULTS': {
            return {
                ...state,
                puzzleGroupValidity: action.groupValidity,
            }
        }
        case 'CHARGE_JUMP': {
            return {
                ...state,
                jumpEndTime: action.endTime,
                chargeCompletion: action.completion,
            };
        }
        case 'PUZZLE_VALUE': {
            const values = state.puzzleValues.slice();
            values[action.index] = action.value;
            
            return {
                ...state,
                puzzleValues: values,
            }
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};

export function isInJumpRange(state: WarpState, point: Vector3) {
    let distSq = Vector3.distanceSq(state.shipPosition, point);
    return distSq < state.jumpStartEntranceRange * state.jumpStartEntranceRange;
}