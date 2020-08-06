import { GameState } from '../../data/GameState';
import { System } from '../../data/System';

export function selectSystem(state: GameState, client: string, selectedSystem?: System) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return state;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem === selectedSystem) {
        return state;
    }

    const systemsByClient = {
        ...ship.systemsByClient,
    };

    const clientsBySystem = {
        ...ship.clientsBySystem,
    };

    if (selectedSystem !== undefined) {
        systemsByClient[client] = selectedSystem;
        clientsBySystem[selectedSystem] = client;
    }
    else {
        delete systemsByClient[client];
    }

    if (currentSystem !== undefined) {
        delete clientsBySystem[currentSystem];
    }

    return {
        ...state,
        ships: {
            ...state.ships,
            [shipId]: {
                ...ship,
                systemsByClient,
                clientsBySystem,
            }
        }
    };
}