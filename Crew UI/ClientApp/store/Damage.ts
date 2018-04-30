import { Action, Reducer, ActionCreator } from 'redux';
import { ShipSystem, TextLocalisation } from "~/functionality";

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

export const maxHandSize = 8;

export const enum DamageCardRarity {
    Common,
    Rare,
    Epic,
}

export interface DamageSystem {
    type: DamageSystemType;
    damage: number;
}

export interface DamageCardInfo {
    name: string;
    desc: string;
    rarity: DamageCardRarity;
}

export interface DamageState {
    systems: DamageSystem[];
    choiceCardIDs: number[];
    handCardIDs: number[];
    queueSize: number;
    selectedHandPos?: number;
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

interface SetHandAction {
    type: 'HAND';
    cardIDs: number[];
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

interface SelectCardAction {
    type: 'SEL_CARD';
    handPos?: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SortSystemsAction | SetAllDamageAction | SetDamageAction | SetChoiceAction | SetHandAction
    | SetQueueAction | AddCardAction | RemoveCardAction | SelectCardAction;

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
    setChoice: (cardIDs: number[]) => <SetChoiceAction>{
        type: 'CHOICE',
        cardIDs: cardIDs,
    },
    setHand: (cardIDs: number[]) => <SetHandAction>{
        type: 'HAND',
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
        { type: DamageSystemType.Torpedoes, damage: 0, },
        { type: DamageSystemType.Sensors, damage: 0, },
        { type: DamageSystemType.Shields, damage: 0, },
        { type: DamageSystemType.Comms, damage: 0, },
    ],
    choiceCardIDs: [],
    handCardIDs: [],
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
                choiceCardIDs: action.cardIDs,
            };
        }
        case 'HAND': {
            return {
                ...state,
                handCardIDs: action.cardIDs,
            };
        }
        case 'QUEUE': {
            return {
                ...state,
                queueSize: action.size,
            };
        }
        case 'ADD_CARD': {
            let hand = state.handCardIDs.slice();
            hand.push(action.cardID);

            return {
                ...state,
                handCardIDs: hand,
            };
        }
        case 'REM_CARD': {
            let selectedHandPos = state.selectedHandPos;
            if (selectedHandPos !== undefined) {
                if (action.handPos === selectedHandPos) {
                    selectedHandPos = undefined;
                }
                else if (action.handPos < selectedHandPos) {
                    selectedHandPos--;
                }
            }

            let hand = state.handCardIDs.slice().splice(action.handPos, 1);

            return {
                ...state,
                handCardIDs: hand,
                selectedHandPos: selectedHandPos,
            };
        }
        case 'SEL_CARD': {
            return {
                ...state,
                selectedHandPos: action.handPos,
            }
        }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};

export function getDamageCardInfo(id: number, text: TextLocalisation): DamageCardInfo | null {
    switch (id) {
        case 0:
            return {
                name: text.systems.damage.minorFix,
                desc: text.systems.damage.minorFixDesc,
                rarity: DamageCardRarity.Common,
            };
        case 1:
            return {
                name: text.systems.damage.moderateFix,
                desc: text.systems.damage.moderateFixDesc,
                rarity: DamageCardRarity.Rare,
            };
        case 2:
            return {
                name: text.systems.damage.majorFix,
                desc: text.systems.damage.majorFixDesc,
                rarity: DamageCardRarity.Epic,
            };
        default:
            return null;
    }
}