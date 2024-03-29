import type { ShipInfo } from 'src/types/ShipInfo';
import { createCards } from '../features/Cards';

export function drawCard(state: ShipInfo, drawCardId: number) {
    if (state.engineering.handCards.length >= state.engineering.maxHandSize) {
        return;
    }

    const card = state.engineering.choiceCards.find(card => card.id === drawCardId);

    if (!card || state.engineering.numChoices <= 0) {
        return;
    }

    state.engineering.handCards.push(card);

    if (card.determineAllowedSystems) {
        card.allowedSystems = card.determineAllowedSystems(state);
    }

    if (state.engineering.numChoices > 0) {
        state.engineering.choiceCards = state.engineering.numChoices > 1
            ? createCards([state.engineering.nextCardId++, state.engineering.nextCardId++, state.engineering.nextCardId++])
            : [];

        state.engineering.numChoices --;
    }
}
