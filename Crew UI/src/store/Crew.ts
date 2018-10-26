import { Reducer } from 'redux';
import { ShipSystem } from '~/functionality';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CrewState {
    players: CrewPlayer[];
    localPlayerID?: number;
    playerInSetup?: number;
}

export interface CrewPlayer {
    id: number;
    name: string;
    selectedSystems: ShipSystem;
    activeSystem?: ShipSystem;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RemovePlayerAction {
    type: 'REMOVE_PLAYER';
    playerID: number;
}

interface UpdatePlayerAction {
    type: 'UPDATE_PLAYER';
    playerID: number;
    name: string;
}

interface SetPlayerSystemsAction {
    type: 'SET_PLAYER_SYSTEMS';
    playerID: number;
    systems: ShipSystem;
}

interface SetLocalPlayerAction {
    type: 'SET_LOCAL_PLAYER';
    playerID: number;
}

interface SetSetupPlayerAction {
    type: 'SET_SETUP_PLAYER';
    playerID?: number;
}

interface SetActiveSystemAction {
    type: 'SET_ACTIVE_SYSTEM';
    playerID: number;
    system: ShipSystem;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RemovePlayerAction | UpdatePlayerAction | SetPlayerSystemsAction | SetLocalPlayerAction | SetSetupPlayerAction | SetActiveSystemAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updatePlayer: (playerID: number, name: string) => <UpdatePlayerAction>{ type: 'UPDATE_PLAYER', playerID: playerID, name: name },
    removePlayer: (playerID: number) => <RemovePlayerAction>{ type: 'REMOVE_PLAYER', playerID: playerID },
    setPlayerSystems: (playerID: number, systems: ShipSystem) => <SetPlayerSystemsAction>{ type: 'SET_PLAYER_SYSTEMS', playerID: playerID, systems: systems },
    setLocalPlayer: (playerID: number) => <SetLocalPlayerAction>{ type: 'SET_LOCAL_PLAYER', playerID: playerID },
    setSetupPlayer: (playerID?: number) => <SetSetupPlayerAction>{ type: 'SET_SETUP_PLAYER', playerID: playerID },
    setActiveSystem: (playerID: number, system?: ShipSystem) => <SetActiveSystemAction>{ type: 'SET_ACTIVE_SYSTEM', playerID: playerID, system: system },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CrewState = { players: [] };

export const reducer: Reducer<CrewState> = (state: CrewState, action: KnownAction) => {
    switch (action.type) {
        case 'REMOVE_PLAYER':
            return {
                ...state,
                players: state.players.filter(p => p.id !== action.playerID),
            };
        case 'UPDATE_PLAYER':
            let existing = false;
            let players = state.players.map((player, index) => {
                if (player.id === action.playerID) {
                    existing = true;
                    return Object.assign({}, player, {
                        name: action.name
                    });
                }
                return player;
            });

            if (!existing) {
                players.push({
                    id: action.playerID,
                    name: action.name,
                    selectedSystems: 0,
                });
            }

            return {
                ...state,
                players: players,
            };
        case 'SET_PLAYER_SYSTEMS':
            return {
                ...state,
                players: state.players.map((player, index) => {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            selectedSystems: action.systems
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
        case 'SET_ACTIVE_SYSTEM':
            return {
                ...state,
                players: state.players.map((player, index) => {
                    if (player.id === action.playerID) {
                        return Object.assign({}, player, {
                            activeSystem: action.system
                        });
                    }
                    return player;
                }),
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
    }

    return state || unloadedState;
};
