import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';
import { clampAngle } from '../../common/data/Vector2D';
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

    if (waypoint.angle !== undefined) {
        waypoint = {
            x: waypoint.x,
            y: waypoint.y,
            angle: clampAngle(waypoint.angle),
        };
    }

    addWaypoint(ship, waypoint);
}