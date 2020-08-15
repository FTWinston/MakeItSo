import { GameState } from '../../data/GameState';
import { removeExpiredEffects } from './removeExpiredSystemEffects';
import { progressEngineeringCardDraft } from './progressEngineeringCardDraft';
import { System } from '../../data/System';
import { updatePowerLevel } from './updatePowerLevel';

export function tickState(state: GameState, interval: number) {
    if (state.paused) {
        return;
    }

    for (const shipId in state.ships) {
        const ship = state.ships[shipId];

        for (const systemId in ship.systemInfo) {
            const system = systemId as unknown as System;
            const systemState = ship.systemInfo[system];

            updatePowerLevel(systemState);
            removeExpiredEffects(systemState);
        }

        progressEngineeringCardDraft(ship);
    }
}
