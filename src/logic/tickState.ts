import { GameState } from '../data/GameState';
import { System } from '../data/System';
import { removeExpiredEffects } from '../data/SystemState';

export function tickState(state: GameState, interval: number) {
    if (state.paused) {
        return;
    }

    for (const shipId in state.ships) {
        const ship = state.ships[shipId];

        for (const systemId in ship.systemInfo) {
            const system = systemId as unknown as System;
            const systemState = ship.systemInfo[system];
            removeExpiredEffects(systemState);
        }
    }
}