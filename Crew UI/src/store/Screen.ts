import { Action, Reducer } from 'redux';
import { exhaustiveActionCheck } from './exhaustiveActionCheck';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export enum GameState {
    Setup,
    Paused,
    Active,
    Finished,
}

export interface ScreenState {
    display: ClientScreen;
    gameState: GameState;
    errorMessage?: string;
}

export enum ClientScreen {
    Connecting,
    UserSettings,
    SelectingSystems,
    SetupGame,
    SystemView,
    SystemHelp,
    GameMenu,
    WaitingForGame,
    Finished,
    Error,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ShowScreenAction {
    type: 'SHOW_SCREEN';
    display: ClientScreen;
}

interface SetGameStateAction {
    type: 'GAME_STATE';
    state: GameState;
}

interface ShowErrorAction {
    type: 'SHOW_ERROR';
    message: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ShowScreenAction | SetGameStateAction | ShowErrorAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    showUserSettings: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.UserSettings },
    showSystemSelection: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SelectingSystems },
    showGameSetup: () => { /* sendEnterSetup(); */ return <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SetupGame }},
    showSystemView: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SystemView },
    showWaitingForGame: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForGame },
    showFinish: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.Finished },
    showGameMenu: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.GameMenu },
    showSystemHelp: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SystemHelp },
    setGameActive: () => <SetGameStateAction>{ type: 'GAME_STATE', state: GameState.Active },
    setGamePaused: () => <SetGameStateAction>{ type: 'GAME_STATE', state: GameState.Paused },
    setGameFinished: () => <SetGameStateAction>{ type: 'GAME_STATE', state: GameState.Finished },
    showError: (message: string) => <ShowErrorAction>{ type: 'SHOW_ERROR', message: message },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ScreenState = { display: ClientScreen.Connecting, gameState: GameState.Setup };

export const reducer: Reducer<ScreenState> = (state: ScreenState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'SHOW_SCREEN':
            return {
                ...state,
                display: action.display,
            };
        case 'GAME_STATE':
            return {
                ...state,
                gameState: action.state,
            };
        case 'SHOW_ERROR':
            return {
                ...state,
                display: ClientScreen.Error,
                errorMessage: action.message,
            };
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};
