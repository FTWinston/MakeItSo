import { Action, Reducer/*, ActionCreator*/ } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum DamageSystemType {
    Empty = 0,
    Power,
    Helm,
    Warp,
    BeamWeapons,
    Torpedoes,
    Sensors,
    Shields,
    Comms,
}

export const enum DiceComboType {
    None = 0,
    Aces,
    Twos,
    Threes,
    Fours,
    Fives,
    Sixes,
    ThreeOfAKind,
    FourOfAKind,
    FullHouse,
    SmallStraight,
    LargeStraight,
    Yahtzee,
}

// const numDamageSystems = DamageSystemType.Comms as number;

export interface DamageSystem {
    type: DamageSystemType;
    damage: number;
    combo?: DiceComboType;
}

export interface DamageState {
    systems: DamageSystem[];
    dice: [number, number, number, number, number];
    lockedDice: [boolean, boolean, boolean, boolean, boolean];
    numReRolls: number;
    hasRolled: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetDiceAction {
    type: 'SET_DICE';
    values: [number, number, number, number, number];
    numReRolls: number;
}

interface ClearDiceAction {
    type: 'CLEAR_DICE';
    numReRolls: number;
}

interface ToggleDiceLockAction {
    type: 'LOCK_DICE';
    index: number;
}

interface SetSystemDamageAction {
    type: 'SET_SYSTEM';
    system: DamageSystemType;
    damage: number;
    combo: DiceComboType;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetDiceAction | ClearDiceAction | ToggleDiceLockAction | SetSystemDamageAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    rollDice: (values: [number, number, number, number, number], numReRolls: number) => <SetDiceAction>{
        type: 'SET_DICE',
        values,
        numReRolls,
    },
    clearDice: (numReRolls: number) => <ClearDiceAction>{
        type: 'CLEAR_DICE',
        numReRolls,
    },
    toggleDice: (index: number) => <ToggleDiceLockAction>{
        type: 'LOCK_DICE',
        index,
    },
    setSystem: (system: DamageSystemType, damage: number, combo: DiceComboType | undefined) => <SetSystemDamageAction>{
        type: 'SET_SYSTEM',
        system,
        damage,
        combo,
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DamageState = {
    systems: [
        { type: DamageSystemType.Power, damage: 0, },
        { type: DamageSystemType.Helm, damage: 0, },
        { type: DamageSystemType.Warp, damage: 0, },
        { type: DamageSystemType.BeamWeapons, damage: 0, },
        { type: DamageSystemType.Empty, damage: 0, },
        { type: DamageSystemType.Torpedoes, damage: 0, },
        { type: DamageSystemType.Sensors, damage: 0, },
        { type: DamageSystemType.Shields, damage: 0, },
        { type: DamageSystemType.Comms, damage: 0, },
    ],
    dice: [0, 0, 0, 0, 0],
    lockedDice: [false, false, false, false, false],
    numReRolls: 3,
    hasRolled: false,
};

export const reducer: Reducer<DamageState> = (state: DamageState, rawAction: Action) => {
    const action = rawAction as KnownAction;

    switch (action.type) {
        case 'SET_DICE': {
            return {
                ...state,
                dice: action.values,
                numReRolls: action.numReRolls,
                hasRolled: true,
            }
        }
        case 'CLEAR_DICE': {
            return {
                ...state,
                dice: [0, 0, 0, 0, 0],
                lockedDice: [false, false, false, false, false],
                numReRolls: action.numReRolls,
                hasRolled: false,
            }
        }
        case 'LOCK_DICE': {
            const lockedDice = state.lockedDice.slice() as [boolean, boolean, boolean, boolean, boolean];
            lockedDice[action.index] = !lockedDice[action.index];
            return {
                ...state,
                lockedDice,
            }
        }
        case 'SET_SYSTEM': {
            const systems = state.systems.slice();
            const system = systems[action.type];
            system.damage = action.damage;
            system.combo = action.combo;

            return {
                ...state,
                systems,
            }
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};
