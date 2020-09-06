import { GameState } from '../../common/data/server/GameState';
import { removeExpiredEffects } from '../../common/data/server/SystemState';
import { progressEngineeringCardDraft } from './progressEngineeringCardDraft';
import { System } from '../../common/data/System';
import { updatePowerLevel } from './updatePowerLevel';
import { updateCardAllowedSystems } from './updateCardAllowedSystems';
import { getTime } from '../../common/data/Progression';
import { updateShipPosition } from './updateShipPosition';

export function tickState(state: GameState, interval: number) {
    if (state.paused) {
        return;
    }

    const tickTime = getTime();

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

        if (ship.position.length === 0 || ship.position[ship.position.length - 1].time < tickTime) {
            updateShipPosition(ship);
        }

        if (anyModified) {
            updateCardAllowedSystems(ship);
        }

        progressEngineeringCardDraft(ship);
    }
}
