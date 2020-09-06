import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';
import { Waypoint } from '../../common/data/Waypoint';
import { addWaypoint } from '../tickState/updateShipPosition';

export function moveShip(state: GameState, client: string, waypoint: Waypoint) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Helm) {
        return;
    }

    addWaypoint(ship, waypoint);
}