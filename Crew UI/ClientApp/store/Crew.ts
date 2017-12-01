import { Action, Reducer, ActionCreator } from 'redux';

type SystemFlags = number; // TODO: flags enum

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CrewState {
    players: CrewPlayer[];
    localPlayerID?: number;
    selectSystemsDirectly: boolean;
    playerInSetup?: number;
}

export interface CrewPlayer {
    id: number;
    name?: string;
    flags: SystemFlags;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AddPlayersAction {
    type: 'ADD_PLAYERS';
    players: CrewPlayer[];
}

interface RemovePlayerAction {
    type: 'REMOVE_PLAYER';
    playerID: number;
}

interface ChangePlayerNameAction {
    type: 'CHANGE_PLAYER_NAME';
    playerID: number;
    name?: string;
}

interface SetPlayerSystemsAction {
    type: 'SET_PLAYER_SYSTEMS';
    playerID: number;
    flags: SystemFlags;
}

interface SetLocalPlayerAction {
    type: 'SET_LOCAL_PLAYER';
    playerID: number;
}

interface SetSetupPlayerAction {
    type: 'SET_SETUP_PLAYER';
    playerID?: number;
}

interface SetSelectionModeAction {
    type: 'SET_SELECTION_MODE';
    selectSystemsDirectly: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = AddPlayersAction | RemovePlayerAction | ChangePlayerNameAction | SetPlayerSystemsAction | SetLocalPlayerAction | SetSetupPlayerAction | SetSelectionModeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addPlayers: (players: CrewPlayer[]) => <AddPlayersAction>{ type: 'ADD_PLAYERS', players: players },
    removePlayer: (playerID: number) => <RemovePlayerAction>{ type: 'REMOVE_PLAYER', playerID: playerID },
    changePlayerName: (playerID: number, name: string) => <ChangePlayerNameAction>{ type: 'CHANGE_PLAYER_NAME', playerID: playerID, name: name },
    setPlayerSystems: (playerID: number, flags: SystemFlags) => <SetPlayerSystemsAction>{ type: 'SET_PLAYER_SYSTEMS', playerID: playerID, flags: flags },
    etLocalPlayer: (playerID: number) => <SetLocalPlayerAction>{ type: 'SET_LOCAL_PLAYER', playerID: playerID },
    setSetupPlayer: (playerID: number | undefined) => <SetSetupPlayerAction>{ type: 'SET_SETUP_PLAYER', playerID: playerID },
    setSelectionMode: (selectSystems: boolean) => <SetSelectionModeAction>{ type: 'SET_SELECTION_MODE', selectSystemsDirectly: selectSystems },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CrewState = { players: [], selectSystemsDirectly: false };

export const reducer: Reducer<CrewState> = (state: CrewState, action: KnownAction) => {
    switch (action.type) {
        case 'ADD_PLAYERS':
            return {
                ...state,
                players: state.players.concat(action.players),
            };
        case 'REMOVE_PLAYER':
            return {
                ...state,
                players: state.players.filter(p => p.id !== action.playerID),
            };
        case 'CHANGE_PLAYER_NAME':
            return {
                ...state,
                players: state.players.map((player, index) => {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            name: action.name
                        });
                    }
                    return player;
                }),
            };
        case 'SET_PLAYER_SYSTEMS':
            return {
                ...state,
                players: state.players.map((player, index) => {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            flags: action.flags
                        });
                    }
                    return player;
                }),
            };
        case 'SET_LOCAL_PLAYER':
            return {
                ...state,
                localPlayerID: action.playerID,
            };
        case 'SET_SETUP_PLAYER':
            return {
                ...state,
                playerInSetup: action.playerID,
            };
        case 'SET_SELECTION_MODE':
            return {
                ...state,
                selectSystemsDirectly: action.selectSystemsDirectly,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
