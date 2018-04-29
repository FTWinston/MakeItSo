import { Action, Reducer, ActionCreator } from 'redux';
import { ShipSystem } from "~/functionality";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum DamageSystemType {
    Power = 0,
    Helm,
    Warp,
    BeamWeapons,
    Torpedoes,
    Sensors,
    Shields,
    Comms,
}

const numDamageSystems = DamageSystemType.Comms as number;

export const enum PowerCardRarity {
    Common,
    Rare,
    Epic,
}

export interface DamageSystem {
    type: DamageSystemType;
    damage: number;
}

export interface DamageCard {
    name: string;
    desc: string;
    rarity: PowerCardRarity;
}

export interface DamageState {
    systems: DamageSystem[];
    choice: DamageCard[];
    hand: DamageCard[];
    queueSize: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SortSystemsAction {
    type: 'SORT_SYSTEMS';
    order: DamageSystemType[];
}

interface SetAllDamageAction {
    type: 'DAMAGE_SYSTEMS';
    damage: number[];
}

interface SetDamageAction {
    type: 'DAMAGE_SYSTEM';
    system: DamageSystemType;
    damage: number;
}

interface SetChoiceAction {
    type: 'CHOICE';
    cardIDs: [number, number, number];
}

interface SetQueueAction {
    type: 'QUEUE';
    size: number;
}

interface AddCardAction {
    type: 'ADD_CARD';
    cardID: number;
}

interface RemoveCardAction {
    type: 'REM_CARD';
    handPos: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SortSystemsAction | SetAllDamageAction | SetDamageAction | SetChoiceAction | SetQueueAction | AddCardAction | RemoveCardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    sortSystems: (order: DamageSystemType[]) => <SortSystemsAction>{
        type: 'SORT_SYSTEMS',
        order: order,
    },
    setAllDamage: (damage: number[]) => <SetAllDamageAction>{
        type: 'DAMAGE_SYSTEMS',
        damage: damage,
    },
    setDamage: (system: DamageSystemType, damage: number) => <SetDamageAction>{
        type: 'DAMAGE_SYSTEM',
        system: system,
        damage: damage,
    },
    setChoice: (cardIDs: [number, number, number]) => <SetChoiceAction>{
        type: 'CHOICE',
        cardIDs: cardIDs,
    },
    setQueueSize: (size: number) => <SetQueueAction>{
        type: 'QUEUE',
        size: size,
    },
    addCardToHand: (cardID: number) => <AddCardAction>{
        type: 'ADD_CARD',
        cardID: cardID,
    },
    removeCardFromHand: (handPos: number) => <RemoveCardAction>{
        type: 'REM_CARD',
        handPos: handPos,
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DamageState = {
    systems: [
        { type: DamageSystemType.Power, damage: 0, },
        { type: DamageSystemType.Helm, damage: 0, },
        { type: DamageSystemType.Warp, damage: 0, },
        { type: DamageSystemType.BeamWeapons, damage: 0, },
        { type: DamageSystemType.Torpedoes, damage: 0, },
        { type: DamageSystemType.Sensors, damage: 0, },
        { type: DamageSystemType.Shields, damage: 0, },
        { type: DamageSystemType.Comms, damage: 0, },
    ],
    choice: [],
    hand: [],
    queueSize: 0,
};

export const reducer: Reducer<DamageState> = (state: DamageState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'SORT_SYSTEMS': {
            let systems = action.order.map((val, index) => {
                let type = val as DamageSystemType;
                return state.systems.filter(s => s.type === type)[0];
            });

            return {
                ...state,
                systems: systems,
            };
        }
        case 'DAMAGE_SYSTEMS': {
            let systems = state.systems.slice();

            action.damage.map((val, index) => {
                let type = index as DamageSystemType;
                systems.filter(s => s.type === type)[0].damage = val;
            });

            return {
                ...state,
                systems: systems,
            };
        }
        case 'DAMAGE_SYSTEM': {
            let systems = state.systems.slice();

            let system = systems.filter(s => s.type === action.system)[0];
            system.damage = action.damage;

            return {
                ...state,
                systems: systems,
            };
        }
        case 'CHOICE': {
            return {
                ...state,
                choice: action.cardIDs.map(id => allDamageCards[id]),
            };
        }
        case 'QUEUE': {
            return {
                ...state,
                queueSize: action.size,
            };
        }
        case 'ADD_CARD': {
            let hand = state.hand.slice();
            hand.push(allDamageCards[action.cardID]);

            return {
                ...state,
                hand: hand,
            };
        }
        case 'REM_CARD': {
            let hand = state.hand.slice().splice(action.handPos, 1);

            return {
                ...state,
                hand: hand,
            };
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};

const allDamageCards: DamageCard[] = [
    {
        name: 'Minor fix',
        desc: 'Restore a small amount of damage to one system',
        rarity: PowerCardRarity.Common,
    },
    {
        name: 'Moderate fix',
        desc: 'Restore a moderate amount of damage to one system',
        rarity: PowerCardRarity.Rare,
    },
    {
        name: 'Major fix',
        desc: 'Restore a large amount of damage to one system',
        rarity: PowerCardRarity.Epic,
    },
];