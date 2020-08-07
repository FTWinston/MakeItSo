import { GameState } from '../../data/GameState';
import { System } from '../../data/System';

export function draftCard(state: GameState, client: string, cardId: number) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Engineering || ship.power.draftChoices.length === 0) {
        return;
    }

    const chosen = ship.power.draftChoices[0].find(card => card.id === cardId);

    if (chosen === undefined) {
        return; // TODO: ability to specify "no card" somehow?
    }

    ship.power.hand.push(chosen);

    const draftChoices = ship.power.draftChoices.slice();
    draftChoices.shift();
    ship.power.draftChoices = draftChoices;
}