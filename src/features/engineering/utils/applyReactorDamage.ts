import type { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { durationToTicks } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { applySingleEffect, getRandomSystem } from './systemActions';

function getReactorDamageEffectApplicationInterval(reactorHealth: number) {
    if (reactorHealth > 80) {
        return;
    }
    
    // TODO: calculate this based on health

    // Apply every 45 seconds at 80% health
    // Apply every 5 seconds at 10% health
    // Apply every 2 seconds at 1% health
    return durationToTicks(45);
}

export function applyReactorDamage(state: ShipState, currentTime: number) {
    const reactorHealth = state.systems.get(ShipSystem.Reactor).health;
    
    const interval = getReactorDamageEffectApplicationInterval(reactorHealth);

    if (!interval) {
        return;
    }

    const lastReactorDamageEffect = state.engineering.lastReactorDamageEffect;

    if (lastReactorDamageEffect !== undefined && lastReactorDamageEffect >= currentTime - interval) {
        return;
    }

    const system = getRandomSystem();

    // TODO: create a new effect type for this
    applySingleEffect(SystemStatusEffectType.DrawnPower, state.systems.get(system), state);

    state.engineering.lastReactorDamageEffect = currentTime;
}

