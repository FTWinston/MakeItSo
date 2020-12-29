import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';

export function draftCard(state: GameState, client: string, cardId: number) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return;
    }

    const ship = state.ships[shipId]!;
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Engineering || ship.engineering.draftChoices.length === 0) {
        return;
    }

    const chosen = ship.engineering.draftChoices[0].find(card => card.id === cardId);

    if (chosen === undefined) {
        return; // TODO: ability to specify "no card" somehow?
    }

    if (chosen.determineAllowedSystems) {
        chosen.allowedSystems = chosen.determineAllowedSystems(ship);
    }
    ship.engineering.hand.push(chosen);

    const draftChoices = ship.engineering.draftChoices.slice();
    draftChoices.shift();
    ship.engineering.draftChoices = draftChoices;
}