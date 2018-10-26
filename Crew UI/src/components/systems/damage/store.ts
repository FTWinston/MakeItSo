import { Action, Reducer/*, ActionCreator*/ } from 'redux';
// import { ShipSystem, TextLocalisation } from "~/functionality";

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

// const numDamageSystems = DamageSystemType.Comms as number;

export interface DamageSystem {
    type: DamageSystemType;
    damage: number;
}

export interface DamageState {
    systems: DamageSystem[];
    dice: number[];
    numReRolls: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SelectCardAction {
    type: 'SEL_CARD';
    handPos?: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
// type KnownAction = SelectCardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    selectCard: (handPos?: number) => <SelectCardAction>{
        type: 'SEL_CARD',
        handPos: handPos,
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
    dice: [],
    numReRolls: 3,
};

export const reducer: Reducer<DamageState> = (state: DamageState, rawAction: Action) => {
/*
    const action = rawAction as KnownAction;

    switch (action.type) {
        case 'SEL_CARD': {
            return {
                ...state,
                selectedHandPos: action.handPos,
            }
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
    }
*/
    return state || unloadedState;
};

export const enum DamageCard {
    RepairSmall = 0,
    RepairMed,
    RepairLarge,
    SwapLeft,
    SwapRight,
    SwapUp,
    SwapDown,
    DistributeRow,
    RepairRowSmall,
    DivertCol,
}
