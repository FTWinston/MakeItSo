import { Action, Reducer, ActionCreator } from 'redux';
import { InputMode } from '../functionality/InputMode';
import { Localisation, Localisations, TextLocalisation } from '../functionality/Localisation';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
    inputMode: InputMode;
    localisation: Localisation;
    text: TextLocalisation;
    showHotkeys: boolean;
    screenWidth: number;
    screenHeight: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SetInputModeAction {
    type: 'INPUT_MODE';
    inputMode: InputMode;
}

interface SetLocalisationAction {
    type: 'LOCALISATION';
    localisation: Localisation;
}

interface ShowHotkeysAction {
    type: 'SHOW_HOTKEYS';
    show: boolean;
}

interface SetScreenSizeAction {
    type: 'SET_SCREEN_SIZE';
    width: number;
    height: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetInputModeAction | SetLocalisationAction | ShowHotkeysAction | SetScreenSizeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setInputMode: (inputMode: InputMode) => <SetInputModeAction>{ type: 'INPUT_MODE', inputMode: inputMode },
    setLocalisation: (localisation: Localisation) => <SetLocalisationAction>{ type: 'LOCALISATION', localisation: localisation },
    showHotkeys: (show: boolean) => <ShowHotkeysAction>{ type: 'SHOW_HOTKEYS', show: show },
    setScreenSize: (width: number, height: number) => <SetScreenSizeAction>{ type: 'SET_SCREEN_SIZE', width: width, height: height },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = {
    inputMode: InputMode.Touchscreen,
    localisation: Localisations[0],
    text: Localisations[0].load(),
    showHotkeys: false,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
};

export const reducer: Reducer<UserState> = (state: UserState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'INPUT_MODE':
            return {
                ...state,
                inputMode: action.inputMode,
            };
        case 'LOCALISATION':
            return {
                ...state,
                localisation: action.localisation,
                text: action.localisation.load(),
            };
        case 'SHOW_HOTKEYS':
            return {
                ...state,
                showHotkeys: action.show,
            };
        case 'SET_SCREEN_SIZE':
            return {
                ...state,
                screenWidth: action.width,
                screenHeight: action.height,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
