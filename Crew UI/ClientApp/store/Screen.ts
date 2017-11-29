import { Action, Reducer, ActionCreator } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ScreenState {
    display: ClientScreen;
    canCancelSettings: boolean;
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
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ShowScreenAction {
    type: 'SHOW_SCREEN';
    display: ClientScreen;
}

interface ShowSettingScreenAction {
    type: 'SHOW_SETTINGS';
    canCancel: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ShowScreenAction | ShowSettingScreenAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    showUserSettings: (canCancel: boolean) => <ShowSettingScreenAction>{ type: 'SHOW_SETTINGS', canCancel: canCancel },
    showWaitingForPlayers: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForPlayers },
    showRoleSelection: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SelectingRoles },
    showGameSetup: () => { /* sendEnterSetup(); */ return <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.SetupGame }},
    showGame: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.ActiveGame },
    showWaitingForGame: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.WaitingForGame },
    showPause: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.Paused },
    showFinish: () => <ShowScreenAction>{ type: 'SHOW_SCREEN', display: ClientScreen.Finished },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ScreenState = { display: ClientScreen.Connecting, canCancelSettings: false };

export const reducer: Reducer<ScreenState> = (state: ScreenState, rawAction: Action) => {
    let action = rawAction as KnownAction;
    switch (action.type) {
        case 'SHOW_SCREEN':
            return {
                display: action.display,
                canCancelSettings: state.canCancelSettings,
            };
        case 'SHOW_SETTINGS':
            return {
                display: ClientScreen.UserSettings,
                canCancelSettings: action.canCancel,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
