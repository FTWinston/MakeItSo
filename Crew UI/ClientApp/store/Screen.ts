import { Action, Reducer, ActionCreator } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ScreenState {
    display: ClientScreen;
    gameInProgress: boolean;
    errorMessage?: string;
}

export enum ClientScreen {
    Connecting,
    UserSettings,
    WaitingForPlayers,
    SelectingRoles,
    SetupGame,
    ActiveGame,
    WaitingForGame,
    Paused,
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

interface SetGameInProgressAction {
    type: 'GAME_IN_PROGRESS';
    inProgress: boolean;
}

interface ShowErrorAction {
    type: 'SHOW_ERROR';
    message: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ShowScreenAction | SetGameInProgressAction | ShowErrorAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    showUserSettings: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.UserSettings },
    showWaitingForPlayers: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForPlayers },
    showRoleSelection: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SelectingRoles },
    showGameSetup: () => { /* sendEnterSetup(); */ return <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SetupGame }},
    showGame: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.ActiveGame },
    showWaitingForGame: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForGame },
    showPause: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.Paused },
    showFinish: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.Finished },
    
    setGameInProgress: (inProgress: boolean) => <SetGameInProgressAction>{ type: 'GAME_IN_PROGRESS', inProgress: inProgress },
    showError: (message: string) => <ShowErrorAction>{ type: 'SHOW_ERROR', message: message },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ScreenState = { display: ClientScreen.Connecting, gameInProgress: false };

export const reducer: Reducer<ScreenState> = (state: ScreenState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'SHOW_SCREEN':
            return {
                display: action.display,
                gameInProgress: state.gameInProgress,
            };
        case 'GAME_IN_PROGRESS':
            return {
                display: state.display,
                gameInProgress: action.inProgress,
                errorMessage: state.errorMessage,
            };
        case 'SHOW_ERROR':
            return {
                display: ClientScreen.Error,
                gameInProgress: state.gameInProgress,
                errorMessage: action.message,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
