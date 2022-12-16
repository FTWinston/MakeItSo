import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { SystemState } from 'src/types/SystemState';
import { createEffect } from './SystemStatusEffects';
import { getTime, hasCompleted } from 'src/utils/timeSpans';
import { EngineeringCardRarity } from '../features/Cards/types/EngineeringCard';

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

export function determineRepairAmount(currentHealth: number, cardRarity: EngineeringCardRarity) {
    if (currentHealth >= maxSystemHealth) {
        return 0;
    }

    let repairAmount: number;

    switch (cardRarity) {
        case EngineeringCardRarity.Common:
            repairAmount = 3; break;
        case EngineeringCardRarity.Uncommon:
            repairAmount = 6; break;
        case EngineeringCardRarity.Rare:
            repairAmount = 10; break;
        case EngineeringCardRarity.Epic:
            repairAmount = 15; break;
    }

    // Repair more when system is more damaged.
    repairAmount *= 1 + 0.7 * (1 - currentHealth / maxSystemHealth);
    repairAmount = Math.round(repairAmount);

    return Math.min(repairAmount, maxSystemHealth - currentHealth);
}