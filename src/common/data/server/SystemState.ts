import { PowerLevel } from '../PowerLevel';
import { SystemStatusEffectInstance, SystemStatusEffectType } from '../SystemStatusEffect';
import { createEffect } from './SystemStatusEffects';
import { getTime, hasCompleted } from '../Progression';

export interface SystemState {
    power: PowerLevel;
    basePower: number;
    prevPower: number;
    health: number;
    effects: SystemStatusEffectInstance[];
    modified: boolean;
}

export function adjustPower(system: SystemState, adjustment: number) {
    system.basePower += adjustment;
    system.modified = true;
}

export function adjustHealth(system: SystemState, adjustment: number) {
    system.health = Math.max(Math.min(system.health + adjustment, 100), 0);
    system.modified = true;
}

export function applyEffect(system: SystemState, effect: SystemStatusEffectType) {
    const effectInstance = createEffect(effect);
    system.effects.push(effectInstance);
    effectInstance.apply(system);
    system.modified = true;
}

export function removeExpiredEffects(systemState: SystemState) {
    const currentTime = getTime();
        
    const filteredEffects = systemState.effects.filter(effect => {
        if (hasCompleted(effect, currentTime)) {
            effect.remove(systemState, false);
            systemState.modified = true;
            return false;
        }

        return true;
    });
    
    if (filteredEffects.length < systemState.effects.length) {
        systemState.effects = filteredEffects;
    }
}
