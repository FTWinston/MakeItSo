import { Action, Reducer, ActionCreator } from 'redux';
import { JumpPath, JumpPathStatus } from '~/functionality/sensors';
import { ShipSystem, TextLocalisation, Vector3 } from "~/functionality";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum PowerSystemType {
    Helm = 1,
    Warp,
    BeamWeapons,
    Sensors,
    Shields,
    DamageControl,
    Comms,
}

const numDamageSystems = PowerSystemType.Comms as number;

export const maxHandSize = 8;

export interface PowerSystem {
    type: PowerSystemType;
    damage: number;
}

export const enum PowerCardRarity {
    Common,
    Rare,
    Epic,
}

export const enum PowerTargetingMode {
    Untargetted,
    TargetSingleSystem,
}


export interface PowerCardInfo {
    name: string;
    desc: string;
    rarity: PowerCardRarity;
    targetingMode: PowerTargetingMode;
}

export interface PowerState {
    systems: PowerSystem[];
    choiceCards: PowerCard[];
    handCards: PowerCard[];
    queueSize: number;
    selectedHandPos?: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetAllPowerAction {
    type: 'POWER_SYSTEMS';
    power: number[];
}

interface SetPowerAction {
    type: 'POWER_SYSTEM';
    system: PowerSystemType;
    power: number;
}

interface SetChoiceAction {
    type: 'CHOICE';
    cardIDs: number[];
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
type KnownAction = SetAllPowerAction | SetPowerAction | SetChoiceAction | SetHandAction
    | SetQueueAction | AddCardAction | RemoveCardAction | SelectCardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setAllPower: (power: number[]) => <SetAllPowerAction>{
        type: 'POWER_SYSTEMS',
        power: power,
    },
    setPower: (system: PowerSystemType, power: number) => <SetPowerAction>{
        type: 'POWER_SYSTEM',
        system: system,
        power: power,
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

const unloadedState: PowerState = {
    systems: [
        { type: PowerSystemType.Helm, damage: 0, },
        { type: PowerSystemType.Warp, damage: 0, },
        { type: PowerSystemType.BeamWeapons, damage: 0, },
        { type: PowerSystemType.Sensors, damage: 0, },
        { type: PowerSystemType.Shields, damage: 0, },
        { type: PowerSystemType.DamageControl, damage: 0, },
        { type: PowerSystemType.Comms, damage: 0, },
    ],
    choiceCards: [],
    handCards: [],
    queueSize: 0,
};

export const reducer: Reducer<PowerState> = (state: PowerState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'POWER_SYSTEMS': {
            let systems = state.systems.slice();
            
            action.power.map((val, index) => {
                let type = index as PowerSystemType;
                systems.filter(s => s.type === type)[0].damage = val;
            });

            return {
                ...state,
                systems: systems,
            };
        }
        case 'POWER_SYSTEM': {
            let systems = state.systems.slice();

            let system = systems.filter(s => s.type === action.system)[0];
            system.damage = action.power;

            return {
                ...state,
                systems: systems,
            };
        }
        case 'CHOICE': {
            return {
                ...state,
                choiceCards: action.cardIDs,
            };
        }
        case 'HAND': {
            return {
                ...state,
                handCards: action.cardIDs,
            };
        }
        case 'QUEUE': {
            return {
                ...state,
                queueSize: action.size,
            };
        }
        case 'ADD_CARD': {
            let hand = state.handCards.slice();
            hand.push(action.cardID);

            return {
                ...state,
                handCards: hand,
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

            let hand = state.handCards.slice();
            hand.splice(action.handPos, 1);

            return {
                ...state,
                handCards: hand,
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

export const enum PowerCard {
    BoostHelm = 0,
    BoostWarp,
    BoostWeapons,
    BoostSensors,
    BoostShields,
    BoostDamageControl,
    BoostComms,
    BoostSelectable,
    
    OverloadHelm,
    OverloadWarp,
    OverloadWeapons,
    OverloadSensors,
    OverloadShields,
    OverloadDamageControl,
    OverloadComms,
    OverloadSelectable,
}


export function getPowerCardInfo(card: PowerCard, text: TextLocalisation): PowerCardInfo | null {
    switch (card) {
        case PowerCard.BoostHelm:
            return {
                name: text.systems.power.boostHelm,
                desc: text.systems.power.boostHelmDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostWarp:
            return {
                name: text.systems.power.boostWarp,
                desc: text.systems.power.boostWarpDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostWeapons:
            return {
                name: text.systems.power.boostWeapons,
                desc: text.systems.power.boostWeaponsDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostSensors:
            return {
                name: text.systems.power.boostSensors,
                desc: text.systems.power.boostSensorsDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostShields:
            return {
                name: text.systems.power.boostShields,
                desc: text.systems.power.boostShieldsDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostDamageControl:
            return {
                name: text.systems.power.boostDamageControl,
                desc: text.systems.power.boostDamageControlDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostComms:
            return {
                name: text.systems.power.boostComms,
                desc: text.systems.power.boostCommsDesc,
                rarity: PowerCardRarity.Common,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.BoostSelectable:
            return {
                name: text.systems.power.boostSelectable,
                desc: text.systems.power.boostSelectableDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.TargetSingleSystem,
            };
        case PowerCard.OverloadHelm:
            return {
                name: text.systems.power.overloadHelm,
                desc: text.systems.power.overloadHelmDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadWarp:
            return {
                name: text.systems.power.overloadWarp,
                desc: text.systems.power.overloadWarpDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadWeapons:
            return {
                name: text.systems.power.overloadWeapons,
                desc: text.systems.power.overloadWeaponsDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadSensors:
            return {
                name: text.systems.power.overloadSensors,
                desc: text.systems.power.overloadSensorsDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadShields:
            return {
                name: text.systems.power.overloadShields,
                desc: text.systems.power.overloadShieldsDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadDamageControl:
            return {
                name: text.systems.power.overloadDamageControl,
                desc: text.systems.power.overloadDamageControlDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadComms:
            return {
                name: text.systems.power.overloadComms,
                desc: text.systems.power.overloadCommsDesc,
                rarity: PowerCardRarity.Rare,
                targetingMode: PowerTargetingMode.Untargetted,
            };
        case PowerCard.OverloadSelectable:
            return {
                name: text.systems.power.overloadSelectable,
                desc: text.systems.power.overloadSelectableDesc,
                rarity: PowerCardRarity.Epic,
                targetingMode: PowerTargetingMode.TargetSingleSystem,
            };
        default:
            return null;
    }
}