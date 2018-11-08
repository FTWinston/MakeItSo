import { Action, Reducer } from 'redux';
import { TextLocalisation } from "~/functionality";
import { exhaustiveActionCheck } from '~/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const enum PowerSystemType {
    Helm = 0,
    Warp,
    Weapons,
    Sensors,
    Shields,
    DamageControl,
    Comms,
}

export const maxHandSize = 8;

export interface PowerSystem {
    type: PowerSystemType;
    power: number;
}

export const enum PowerCardRarity {
    Common,
    Rare,
    Epic,
}


export interface PowerCardInfo {
    name: string;
    desc: string;
    rarity: PowerCardRarity;
    targetSystem?: PowerSystemType;
}

export interface PowerState {
    systems: PowerSystem[];
    choiceCards: PowerCard[];
    handCards: PowerCard[];
    numChoices: number;
    generationProgress: number;
    overallPower: number;
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

interface SetNumChoicesAction {
    type: 'CHOICES';
    number: number;
}

interface SetGenerationProgressAction {
    type: 'GENERATION';
    fraction: number;
}

interface SetOverallPowerAction {
    type: 'OVERALL';
    value: number;
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
type KnownAction = SetAllPowerAction | SetPowerAction | SetChoiceAction | SetHandAction | SetNumChoicesAction
    | SetGenerationProgressAction | SetOverallPowerAction | AddCardAction | RemoveCardAction | SelectCardAction;

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
    setNumChoices: (size: number) => <SetNumChoicesAction>{
        type: 'CHOICES',
        number: size,
    },
    setGenerationProgress: (fraction: number) => <SetGenerationProgressAction>{
        type: 'GENERATION',
        fraction: fraction,
    },
    setOverallPower: (value: number) => <SetOverallPowerAction>{
        type: 'OVERALL',
        value: value,
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
        { type: PowerSystemType.Helm, power: 0, },
        { type: PowerSystemType.Warp, power: 0, },
        { type: PowerSystemType.Weapons, power: 0, },
        { type: PowerSystemType.Sensors, power: 0, },
        { type: PowerSystemType.Shields, power: 0, },
        { type: PowerSystemType.DamageControl, power: 0, },
        { type: PowerSystemType.Comms, power: 0, },
    ],
    choiceCards: [],
    handCards: [],
    numChoices: 0,
    generationProgress: 0,
    overallPower: 0,
};

export const reducer: Reducer<PowerState> = (state: PowerState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'POWER_SYSTEMS': {
            let systems = state.systems.slice();
            
            action.power.map((val, index) => {
                let type = index as PowerSystemType;
                systems.filter(s => s.type === type)[0].power = val;
            });

            return {
                ...state,
                systems: systems,
            };
        }
        case 'POWER_SYSTEM': {
            let systems = state.systems.slice();

            let system = systems.filter(s => s.type === action.system)[0];
            system.power = action.power;

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
        case 'CHOICES': {
            return {
                ...state,
                numChoices: action.number,
            };
        }
        case 'GENERATION': {
            return {
                ...state,
                generationProgress: action.fraction,
            };
        }
        case 'OVERALL': {
            return {
                ...state,
                overallPower: action.value,
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
            exhaustiveActionCheck(action);
            break;
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
                targetSystem: PowerSystemType.Helm,
            };
        case PowerCard.BoostWarp:
            return {
                name: text.systems.power.boostWarp,
                desc: text.systems.power.boostWarpDesc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Warp,
            };
        case PowerCard.BoostWeapons:
            return {
                name: text.systems.power.boostWeapons,
                desc: text.systems.power.boostWeaponsDesc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Weapons,
            };
        case PowerCard.BoostSensors:
            return {
                name: text.systems.power.boostSensors,
                desc: text.systems.power.boostSensorsDesc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Sensors,
            };
        case PowerCard.BoostShields:
            return {
                name: text.systems.power.boostShields,
                desc: text.systems.power.boostShieldsDesc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Shields,
            };
        case PowerCard.BoostDamageControl:
            return {
                name: text.systems.power.boostDamageControl,
                desc: text.systems.power.boostDamageControlDesc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.DamageControl,
            };
        case PowerCard.BoostComms:
            return {
                name: text.systems.power.boostComms,
                desc: text.systems.power.boostCommsDesc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Comms,
            };
        case PowerCard.BoostSelectable:
            return {
                name: text.systems.power.boostSelectable,
                desc: text.systems.power.boostSelectableDesc,
                rarity: PowerCardRarity.Rare,
            };
        case PowerCard.OverloadHelm:
            return {
                name: text.systems.power.overloadHelm,
                desc: text.systems.power.overloadHelmDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Helm,
            };
        case PowerCard.OverloadWarp:
            return {
                name: text.systems.power.overloadWarp,
                desc: text.systems.power.overloadWarpDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Warp,
            };
        case PowerCard.OverloadWeapons:
            return {
                name: text.systems.power.overloadWeapons,
                desc: text.systems.power.overloadWeaponsDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Weapons,
            };
        case PowerCard.OverloadSensors:
            return {
                name: text.systems.power.overloadSensors,
                desc: text.systems.power.overloadSensorsDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Sensors,
            };
        case PowerCard.OverloadShields:
            return {
                name: text.systems.power.overloadShields,
                desc: text.systems.power.overloadShieldsDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Shields,
            };
        case PowerCard.OverloadDamageControl:
            return {
                name: text.systems.power.overloadDamageControl,
                desc: text.systems.power.overloadDamageControlDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.DamageControl,
            };
        case PowerCard.OverloadComms:
            return {
                name: text.systems.power.overloadComms,
                desc: text.systems.power.overloadCommsDesc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Comms,
            };
        case PowerCard.OverloadSelectable:
            return {
                name: text.systems.power.overloadSelectable,
                desc: text.systems.power.overloadSelectableDesc,
                rarity: PowerCardRarity.Epic,
            };
        default:
            return null;
    }
}