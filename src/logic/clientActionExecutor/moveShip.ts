import { GameState } from '../../data/GameState';
import { System } from '../../data/System';
import { Vector2D } from '../../data/Vector2D';
import { replaceMovement, addToMovement } from '../tickState/updateShipPosition';

export function moveShip(state: GameState, client: string, target: Vector2D, append: boolean) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Helm) {
        return;
    }

    if (append) {
        addToMovement(ship, target);
    }
    else {
        replaceMovement(ship, target);
    }
}