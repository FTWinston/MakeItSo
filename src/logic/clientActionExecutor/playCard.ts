import { GameState } from '../../data/GameState';
import { System } from '../../data/System';

export function playCard(state: GameState, client: string, cardId: number, system: System) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Engineering) {
        return;
    }

    const handIndex = ship.power.hand.findIndex(card => card.id === cardId);

    if (handIndex === -1) {
        return;
    }

    const card = ship.power.hand[handIndex];

    if (card.play(ship, system) !== false) {
        ship.power.hand.splice(handIndex, 1);
    }
}