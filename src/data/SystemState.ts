import { PowerLevel } from './PowerLevel';
import { SystemStatusEffectInstance, SystemStatusEffectType } from './SystemStatusEffect';
import { createEffect } from './SystemStatusEffects';

export interface SystemState {
    power: PowerLevel;
    basePower: number;
    prevPower: number;
    health: number;
    effects: SystemStatusEffectInstance[];
}

export function adjustPower(system: SystemState, adjustment: number) {
    system.basePower += adjustment;
}

export function adjustHealth(system: SystemState, adjustment: number) {
    system.health = Math.max(Math.min(system.health + adjustment, 100), 0);
}

export function applyEffect(system: SystemState, effect: SystemStatusEffectType) {
    const effectInstance = createEffect(effect);
    system.effects.push(effectInstance);
    effectInstance.apply(system);
}
