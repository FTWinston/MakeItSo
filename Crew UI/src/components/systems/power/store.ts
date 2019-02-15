import { Action, Reducer } from 'redux';
import { TextLocalisation, ShipSystem } from "~/functionality";
import { exhaustiveActionCheck, ApplicationState } from '~/store';

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
    numEffects: number;
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
    ignoreSystem?: PowerSystemType;
}

export interface PowerState {
    systems: PowerSystem[];
    choiceCards: PowerCard[];
    handCards: PowerCard[];
    numChoices: number;
    generationProgress: number;
    overallPower: number;
    selectedHandPos?: number;
    maxHandSize: number;
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

interface SetNumEffectsAction {
    type: 'EFFECTS';
    system: PowerSystemType;
    effects: number;
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
type KnownAction = SetAllPowerAction | SetPowerAction | SetNumEffectsAction | SetChoiceAction | SetHandAction | SetNumChoicesAction
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
    setNumEffects: (system: PowerSystemType, effects: number) => <SetNumEffectsAction>{
        type: 'EFFECTS',
        system: system,
        effects: effects,
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
        { type: PowerSystemType.Helm, power: 0, numEffects: 0, },
        { type: PowerSystemType.Warp, power: 0, numEffects: 0, },
        { type: PowerSystemType.Weapons, power: 0, numEffects: 0, },
        { type: PowerSystemType.Sensors, power: 0, numEffects: 0, },
        { type: PowerSystemType.Shields, power: 0, numEffects: 0, },
        { type: PowerSystemType.DamageControl, power: 0, numEffects: 0, },
        { type: PowerSystemType.Comms, power: 0, numEffects: 0, },
    ],
    choiceCards: [],
    handCards: [],
    numChoices: 0,
    generationProgress: 0,
    overallPower: 0,
    maxHandSize: 6,
};

export const reducer: Reducer<PowerState> = (state: PowerState, rawAction: Action) => {
    const action = rawAction as KnownAction;
    switch (action.type) {
        case 'POWER_SYSTEMS': {
            let systems = state.systems.slice();
            
            action.power.map((val, index) => {
                let type = index as PowerSystemType;
                systems.find(s => s.type === type)!.power = val;
            });

            return {
                ...state,
                systems,
            };
        }
        case 'POWER_SYSTEM': {
            let systems = state.systems.slice();

            const system = systems.find(s => s.type === action.system)!;
            system.power = action.power;

            return {
                ...state,
                systems,
            };
        }
        case 'EFFECTS': {
            let systems = state.systems.slice();

            const system = systems.find(s => s.type === action.system)!;
            system.numEffects = action.effects;

            return {
                ...state,
                systems,
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

    RerouteHelm,
    RerouteWarp,
    RerouteWeapons,
    RerouteSensors,
    RerouteShields,
    RerouteDamageControl,
    RerouteComms,

    BypassSafeties,
    FocusPower,
    Recalibrate,
}


export function getPowerCardInfo(card: PowerCard, text: TextLocalisation): PowerCardInfo | null {
    switch (card) {
        case PowerCard.BoostHelm:
            return {
                name: text.systems.power.cards.boostHelm.name,
                desc: text.systems.power.cards.boostHelm.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Helm,
            };
        case PowerCard.BoostWarp:
            return {
                name: text.systems.power.cards.boostWarp.name,
                desc: text.systems.power.cards.boostWarp.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Warp,
            };
        case PowerCard.BoostWeapons:
            return {
                name: text.systems.power.cards.boostWeapons.name,
                desc: text.systems.power.cards.boostWeapons.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Weapons,
            };
        case PowerCard.BoostSensors:
            return {
                name: text.systems.power.cards.boostSensors.name,
                desc: text.systems.power.cards.boostSensors.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Sensors,
            };
        case PowerCard.BoostShields:
            return {
                name: text.systems.power.cards.boostShields.name,
                desc: text.systems.power.cards.boostShields.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Shields,
            };
        case PowerCard.BoostDamageControl:
            return {
                name: text.systems.power.cards.boostDamageControl.name,
                desc: text.systems.power.cards.boostDamageControl.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.DamageControl,
            };
        case PowerCard.BoostComms:
            return {
                name: text.systems.power.cards.boostComms.name,
                desc: text.systems.power.cards.boostComms.desc,
                rarity: PowerCardRarity.Common,
                targetSystem: PowerSystemType.Comms,
            };
        case PowerCard.BoostSelectable:
            return {
                name: text.systems.power.cards.boostSelectable.name,
                desc: text.systems.power.cards.boostSelectable.desc,
                rarity: PowerCardRarity.Rare,
            };
        case PowerCard.OverloadHelm:
            return {
                name: text.systems.power.cards.overloadHelm.name,
                desc: text.systems.power.cards.overloadHelm.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Helm,
            };
        case PowerCard.OverloadWarp:
            return {
                name: text.systems.power.cards.overloadWarp.name,
                desc: text.systems.power.cards.overloadWarp.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Warp,
            };
        case PowerCard.OverloadWeapons:
            return {
                name: text.systems.power.cards.overloadWeapons.name,
                desc: text.systems.power.cards.overloadWeapons.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Weapons,
            };
        case PowerCard.OverloadSensors:
            return {
                name: text.systems.power.cards.overloadSensors.name,
                desc: text.systems.power.cards.overloadSensors.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Sensors,
            };
        case PowerCard.OverloadShields:
            return {
                name: text.systems.power.cards.overloadShields.name,
                desc: text.systems.power.cards.overloadShields.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Shields,
            };
        case PowerCard.OverloadDamageControl:
            return {
                name: text.systems.power.cards.overloadDamageControl.name,
                desc: text.systems.power.cards.overloadDamageControl.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.DamageControl,
            };
        case PowerCard.OverloadComms:
            return {
                name: text.systems.power.cards.overloadComms.name,
                desc: text.systems.power.cards.overloadComms.desc,
                rarity: PowerCardRarity.Rare,
                targetSystem: PowerSystemType.Comms,
            };
        case PowerCard.OverloadSelectable:
            return {
                name: text.systems.power.cards.overloadSelectable.name,
                desc: text.systems.power.cards.overloadSelectable.desc,
                rarity: PowerCardRarity.Epic,
            };
        case PowerCard.RerouteHelm:
            return {
                name: text.systems.power.cards.rerouteHelm.name,
                desc: text.systems.power.cards.rerouteHelm.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.Helm,
            };
        case PowerCard.RerouteWarp:
            return {
                name: text.systems.power.cards.rerouteWarp.name,
                desc: text.systems.power.cards.rerouteWarp.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.Warp,
            };
        case PowerCard.RerouteWeapons:
            return {
                name: text.systems.power.cards.rerouteWeapons.name,
                desc: text.systems.power.cards.rerouteWeapons.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.Weapons,
            };
        case PowerCard.RerouteSensors:
            return {
                name: text.systems.power.cards.rerouteSensors.name,
                desc: text.systems.power.cards.rerouteSensors.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.Sensors,
            };
        case PowerCard.RerouteShields:
            return {
                name: text.systems.power.cards.rerouteShields.name,
                desc: text.systems.power.cards.rerouteShields.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.Shields,
            };
        case PowerCard.RerouteDamageControl:
            return {
                name: text.systems.power.cards.rerouteDamageControl.name,
                desc: text.systems.power.cards.rerouteDamageControl.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.DamageControl,
            };
        case PowerCard.RerouteComms:
            return {
                name: text.systems.power.cards.rerouteComms.name,
                desc: text.systems.power.cards.rerouteComms.desc,
                rarity: PowerCardRarity.Rare,
                ignoreSystem: PowerSystemType.Comms,
            };
        case PowerCard.BypassSafeties:
            return {
                name: text.systems.power.cards.bypassSafeties.name,
                desc: text.systems.power.cards.bypassSafeties.desc,
                rarity: PowerCardRarity.Epic,
            };
        case PowerCard.FocusPower:
            return {
                name: text.systems.power.cards.focusPower.name,
                desc: text.systems.power.cards.focusPower.desc,
                rarity: PowerCardRarity.Epic,
            };
        case PowerCard.Recalibrate:
            return {
                name: text.systems.power.cards.recalibrate.name,
                desc: text.systems.power.cards.recalibrate.desc,
                rarity: PowerCardRarity.Epic,
            };
        default:
            return null;
    }
}

export function getSystemPower(system: ShipSystem, state: ApplicationState) {
    let powerSystem: PowerSystemType;

    switch (system) {
        case ShipSystem.Helm:
            powerSystem = PowerSystemType.Helm;
            break;
        case ShipSystem.Warp:
            powerSystem = PowerSystemType.Warp;
            break;
        case ShipSystem.Weapons:
            powerSystem = PowerSystemType.Weapons;
            break;
        case ShipSystem.Sensors:
            powerSystem = PowerSystemType.Sensors;
            break;
        case ShipSystem.PowerManagement:
            return state.power.overallPower;
        case ShipSystem.DamageControl:
            powerSystem = PowerSystemType.DamageControl;
            break;
        case ShipSystem.Communications:
            powerSystem = PowerSystemType.Comms;
            break;
        /*
        case ShipSystem.Shields:
            powerSystem = PowerSystemType.Shields;
            break;
        */
        default:
            return undefined;
    }

    return state.power.systems.find(s => s.type === powerSystem)!.power;
}