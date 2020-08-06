import { GameState } from '../../data/GameState';
import { System } from '../../data/System';

export function draftCard(state: GameState, client: string, cardId: number) {
    const shipId = state.shipsByClient[client];
    if (shipId === undefined) {
        return state;
    }

    const ship = state.ships[shipId];
    const currentSystem = ship.systemsByClient[client];

    if (currentSystem !== System.Engineering || ship.power.draftChoices.length === 0) {
        return state;
    }

    const chosen = ship.power.draftChoices[0].find(card => card.id === cardId);

    if (chosen === undefined) {
        return state; // TODO: ability to specify "no card" somehow?
    }

    const hand = [
        ...ship.power.hand,
        chosen
    ];

    const draftChoices = ship.power.draftChoices.slice();
    draftChoices.shift();

    return {
        ...state,
        ships: {
            ...state.ships,
            [shipId]: {
                ...ship,
                power: {
                    ...ship.power,
                    hand,
                    draftChoices,
                }
            }
        }
    };
}