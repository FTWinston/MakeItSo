import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';

export function selectSystem(state: GameState, client: string, selectedSystem?: System) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem === selectedSystem) {
        return;
    }

    if (selectedSystem !== undefined) {
        ship.systemsByClient[client] = selectedSystem;
        ship.clientsBySystem[selectedSystem] = client;
    }
    else {
        delete ship.systemsByClient[client];
    }

    if (currentSystem !== undefined) {
        delete ship.clientsBySystem[currentSystem];
    }
}