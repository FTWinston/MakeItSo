import { Action, Reducer/*, ActionCreator*/ } from 'redux';
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum DamageSystemType {
    Empty = 0,
    Power,
    Helm,
    Warp,
    Weapons,
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
    Chance,
}

export interface DamageSystem {
    type: DamageSystemType;
    health: number;
    combo: DiceComboType;
}

export interface DamageState {
    systems: DamageSystem[];
    dice: [number, number, number, number, number];
    lockedDice: [boolean, boolean, boolean, boolean, boolean];
    numReRolls: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetDiceAction {
    type: 'SET_DICE';
    values: [number, number, number, number, number];
}

interface SetRollsAction {
    type: 'SET_ROLLS';
    rollsRemaining: number;
}

interface ToggleDiceLockAction {
    type: 'LOCK_DICE';
    index: number;
}

interface UnlockDiceAction {
    type: 'UNLOCK_ALL';
}

interface SetSystemDamageAction {
    type: 'SET_SYSTEM';
    system: DamageSystemType;
    health: number;
    combo: DiceComboType;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetDiceAction | SetRollsAction | ToggleDiceLockAction | UnlockDiceAction | SetSystemDamageAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setDice: (values: [number, number, number, number, number]) => <SetDiceAction>{
        type: 'SET_DICE',
        values,
    },
    setRolls: (rollsRemaining: number) => <SetRollsAction>{
        type: 'SET_ROLLS',
        rollsRemaining,
    },
    toggleDice: (index: number) => <ToggleDiceLockAction>{
        type: 'LOCK_DICE',
        index,
    },
    unlockDice: () => <UnlockDiceAction>{
        type: 'UNLOCK_ALL',
    },
    setSystem: (system: DamageSystemType, health: number, combo: DiceComboType | undefined) => <SetSystemDamageAction>{
        type: 'SET_SYSTEM',
        system,
        health,
        combo,
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DamageState = {
    systems: [
        { type: DamageSystemType.Power, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Helm, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Warp, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Weapons, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Empty, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Sensors, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Shields, health: 0, combo: DiceComboType.None },
        { type: DamageSystemType.Comms, health: 0, combo: DiceComboType.None },
    ],
    dice: [0, 0, 0, 0, 0],
    lockedDice: [false, false, false, false, false],
    numReRolls: 3,
};

export const reducer: Reducer<DamageState> = (state: DamageState, rawAction: Action) => {
    const action = rawAction as KnownAction;

    switch (action.type) {
        case 'SET_DICE': {
            return {
                ...state,
                dice: action.values,
            }
        }
        case 'SET_ROLLS': {
            return {
                ...state,
                numReRolls: action.rollsRemaining,
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
        case 'UNLOCK_ALL': {
            return {
                ...state,
                lockedDice: [false, false, false, false, false],
            }
        }
        case 'SET_SYSTEM': {
            const systems = state.systems.slice();
            const system = systems[action.system];
            system.health = action.health;
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
