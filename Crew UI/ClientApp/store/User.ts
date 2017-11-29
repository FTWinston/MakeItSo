import { Action, Reducer, ActionCreator } from 'redux';
import { InputMode } from '../functionality/InputMode';
import { Localisation, Localisations, TextLocalisation } from '../functionality/Localisation';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
    inputMode: InputMode;
    localisation: Localisation;
    text: TextLocalisation;
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetInputModeAction | SetLocalisationAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setInputMode: (inputMode: InputMode) => <SetInputModeAction>{ type: 'INPUT_MODE', inputMode: inputMode },
    setLocalisation: (localisation: Localisation) => <SetLocalisationAction>{ type: 'LOCALISATION', localisation: localisation },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = { inputMode: InputMode.Touchscreen, localisation: Localisations[0], text: Localisations[0].load() };

export const reducer: Reducer<UserState> = (state: UserState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'INPUT_MODE':
            return {
                inputMode: action.inputMode,
                localisation: state.localisation,
                text: state.text,
            };
        case 'LOCALISATION':
            return {
                inputMode: state.inputMode,
                localisation: action.localisation,
                text: action.localisation.load(),
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
