import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { SystemState } from 'src/types/SystemState';
import { createEffect } from './SystemStatusEffects';
import { getTime, hasCompleted } from 'src/utils/timeSpans';

export function adjustPower(system: SystemState, adjustment: number) {
    system.power += adjustment;
}

export const maxSystemHealth = 100;

export function adjustHealth(system: SystemState, adjustment: number) {
    system.health = Math.max(Math.min(system.health + adjustment, maxSystemHealth), 0);
}

export function applyEffect(system: SystemState, effect: SystemStatusEffectType) {
    const effectInstance = createEffect(effect);
    system.effects.push(effectInstance);
    effectInstance.apply(system);
}

export function removeExpiredEffects(systemState: SystemState, currentTime = getTime()) {
    const filteredEffects = systemState.effects.filter(effect => {
        if (hasCompleted(effect, currentTime)) {
            effect.remove(systemState, false);
            return false;
        }

        return true;
    });
    
    if (filteredEffects.length < systemState.effects.length) {
        systemState.effects = filteredEffects;
    }
}
