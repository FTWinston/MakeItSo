import type { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { durationToTicks } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { applySingleEffect, getRandomSystem } from './systemActions';

function scaleNumber(input: number, inputStart: number, inputEnd: number, outputStart: number, outputEnd: number) {
    const fraction = (input - inputStart) / (inputEnd - inputStart);
    return outputStart + fraction * (outputEnd - outputStart);
}

function getReactorDamageEffectApplicationInterval(reactorHealth: number) {
    let interval: number;

    if (reactorHealth > 80) {
        return;
    }
    else if (reactorHealth > 50) {
        // Apply every 45 seconds at 80% health
        // Apply every 10 seconds at 50% health
        interval = scaleNumber(reactorHealth, 50, 80, 10, 45);
    }
    else if (reactorHealth > 15) {
        // Apply every 10 seconds at 50% health
        // Apply every 5 seconds at 15% health
        interval = scaleNumber(reactorHealth, 15, 50, 5, 10);
    }
    else if (reactorHealth > 1) {
        // Apply every 5 seconds at 15% health
        // Apply every 1 seconds at 1% health
        interval = scaleNumber(reactorHealth, 1, 15, 1, 5);
    }
    else {
        // Apply every 1 seconds at 1% health
        interval = 1;
    }
    
    return durationToTicks(interval);
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

