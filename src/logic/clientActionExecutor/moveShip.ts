import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';
import { Vector2D } from '../../common/data/Vector2D';
import { addToMovement } from '../tickState/updateShipPosition';

export function moveShip(state: GameState, client: string, target: Vector2D, angle?: number) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Helm) {
        return;
    }

    addToMovement(ship, target, angle);
}