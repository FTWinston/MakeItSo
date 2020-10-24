import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';
import { clearMovement } from '../tickState/updateShipPosition';

export function maneuverShip(state: GameState, client: string, pattern: string) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Helm) {
        return;
    }

    switch (pattern) {
        case 'stop':
            clearMovement(ship);
            break;
        case 'alpha': // TODO: implement these
        case 'beta':
        default:
            return;
    }
}