import { GameState } from '../../data/GameState';
import { removeExpiredEffects } from './removeExpiredSystemEffects';
import { progressEngineeringCardDraft } from './progressEngineeringCardDraft';

export function tickState(state: GameState, interval: number) {
    if (state.paused) {
        return;
    }

    for (const shipId in state.ships) {
        const ship = state.ships[shipId];

        removeExpiredEffects(ship);
        progressEngineeringCardDraft(ship, interval);
    }
}