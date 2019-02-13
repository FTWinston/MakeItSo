import { Reducer } from 'redux';
import { ShipSystem } from '~/functionality';
import { exhaustiveActionCheck } from './exhaustiveActionCheck';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CrewState {
    players: CrewPlayer[];
    playersBySystem: { [key: number]: CrewPlayer };
    localPlayerID?: number;
    playerInSetup?: number;
}

export interface CrewPlayer {
    id: number;
    name: string;
    activeSystem?: ShipSystem;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AddPlayerAction {
    type: 'ADD_PLAYER';
    playerID: number;
    name: string;
}

interface RemovePlayerAction {
    type: 'REMOVE_PLAYER';
    playerID: number;
}

interface SetLocalPlayerAction {
    type: 'SET_LOCAL_PLAYER';
    playerID: number;
}

interface SetSetupPlayerAction {
    type: 'SET_SETUP_PLAYER';
    playerID?: number;
}

interface SetPlayerSystemAction {
    type: 'SET_PLAYER_SYSTEM';
    playerID: number;
    system: ShipSystem;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = AddPlayerAction | RemovePlayerAction | SetPlayerSystemAction | SetLocalPlayerAction | SetSetupPlayerAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addPlayer: (playerID: number, name: string) => <AddPlayerAction>{ type: 'ADD_PLAYER', playerID: playerID, name: name },
    removePlayer: (playerID: number) => <RemovePlayerAction>{ type: 'REMOVE_PLAYER', playerID: playerID },
    setLocalPlayer: (playerID: number) => <SetLocalPlayerAction>{ type: 'SET_LOCAL_PLAYER', playerID: playerID },
    setSetupPlayer: (playerID?: number) => <SetSetupPlayerAction>{ type: 'SET_SETUP_PLAYER', playerID: playerID },
    setPlayerSystem: (playerID: number, system?: ShipSystem) => <SetPlayerSystemAction>{ type: 'SET_PLAYER_SYSTEM', playerID: playerID, system: system },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CrewState = {
    players: [],
    playersBySystem: {},
};

export const reducer: Reducer<CrewState> = (state: CrewState, action: KnownAction) => {
    switch (action.type) {
        case 'ADD_PLAYER': {
            const players = state.players.slice();

            const existingIndex = players.findIndex(p => p.id === action.playerID);
            if (existingIndex !== -1) {
                players[existingIndex] = Object.assign({}, players[existingIndex], { name: action.name });
            }
            else {
                players.push({
                    id: action.playerID,
                    name: action.name,
                });
            }

            return {
                ...state,
                players: players,
            };
        }
        case 'REMOVE_PLAYER': {
            const playerIndex = state.players.findIndex(p => p.id === action.playerID);
            if (playerIndex === -1) {
                return state;
            }

            const player = state.players[playerIndex];
            let playersBySystem;

            if (player.activeSystem === undefined) {
                playersBySystem = state.playersBySystem;
            }
            else {
                playersBySystem = {...state.playersBySystem};
                delete playersBySystem[player.activeSystem];
            }

            return {
                ...state,
                players: state.players.slice().splice(playerIndex, 1),
                playersBySystem: playersBySystem,
            };
        }
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
        case 'SET_PLAYER_SYSTEM': {
            const players = state.players.slice();
            const playerIndex = players.findIndex(p => p.id === action.playerID);

            if (playerIndex === -1) {
                return state;
            }

            const prevPlayer = players[playerIndex];
            const newPlayer = Object.assign({}, prevPlayer, { activeSystem: action.system });

            players[playerIndex] = newPlayer;

            const playersBySystem = {...state.playersBySystem};

            if (prevPlayer.activeSystem !== undefined) {
                delete playersBySystem[prevPlayer.activeSystem];
            }
            
            playersBySystem[newPlayer.activeSystem] = newPlayer;

            return {
                ...state,
                players: players,
                playersBySystem: playersBySystem,
            };
        }
        default:
            exhaustiveActionCheck(action);
            break;
    }

    return state || unloadedState;
};
