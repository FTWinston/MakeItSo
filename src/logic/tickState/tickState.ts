import { GameState } from '../../data/GameState';
import { removeExpiredEffects } from '../../data/SystemState';
import { progressEngineeringCardDraft } from './progressEngineeringCardDraft';
import { System } from '../../data/System';
import { updatePowerLevel } from './updatePowerLevel';
import { updateCardAllowedSystems } from './updateCardAllowedSystems';

export function tickState(state: GameState, interval: number) {
    if (state.paused) {
        return;
    }

    for (const shipId in state.ships) {
        const ship = state.ships[shipId];

        let anyModified = false;
        for (const systemId in ship.systemInfo) {
            const system = systemId as unknown as System;
            const systemState = ship.systemInfo[system];

            updatePowerLevel(systemState);
            removeExpiredEffects(systemState);

            if (systemState.modified) {
                systemState.modified = false;
                anyModified = true;
            }
        }

        if (anyModified) {
            updateCardAllowedSystems(ship);
        }

        progressEngineeringCardDraft(ship);
    }
}
