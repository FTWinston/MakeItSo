import type { ShipInfo } from 'src/types/ShipInfo';
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

    if (reactorHealth > 90) {
        return;
    }
    else if (reactorHealth > 60) {
        // Apply every 45 seconds at 90% health
        // Apply every 10 seconds at 60% health
        interval = scaleNumber(reactorHealth, 60, 90, 10, 45);
    }
    else if (reactorHealth > 20) {
        // Apply every 10 seconds at 60% health
        // Apply every 5 seconds at 20% health
        interval = scaleNumber(reactorHealth, 20, 60, 5, 10);
    }
    else if (reactorHealth > 1) {
        // Apply every 5 seconds at 20% health
        // Apply every 1 seconds at 1% health
        interval = scaleNumber(reactorHealth, 1, 20, 1, 5);
    }
    else {
        // Apply every 1 seconds at 1% health
        interval = 1;
    }

    return durationToTicks(interval);
}

export function applyReactorDamage(state: ShipInfo, currentTime: number) {
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

    applySingleEffect(SystemStatusEffectType.ReactorDamage, state.systems.get(system), state);

    state.engineering.lastReactorDamageEffect = currentTime;
}

