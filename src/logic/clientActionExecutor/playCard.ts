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

    const handIndex = ship.engineering.hand.findIndex(card => card.id === cardId);

    if (handIndex === -1) {
        return;
    }

    const card = ship.engineering.hand[handIndex];

    if (card.play(ship, system) !== false) {
        ship.engineering.hand.splice(handIndex, 1);
    }
}