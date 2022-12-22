import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { SystemState } from 'src/types/SystemState';
import { createEffect } from './SystemStatusEffects';
import { getTime, hasCompleted } from 'src/utils/timeSpans';
import { EngineeringCardRarity } from '../features/Cards/types/EngineeringCard';

export function adjustPower(system: SystemState, adjustment: number) {
    system.power += adjustment;
}

export const maxSystemHealth = 100;
export const maxRestorationValue = 100;
export const maxPowerLevel = 4;

export function adjustHealth(system: SystemState, adjustment: number) {
    const hadHealth = system.health > 0;

    system.health = Math.max(Math.min(system.health + adjustment, maxSystemHealth), 0);

    if (!hadHealth) {
        if (adjustment < 0) {
            // Damage affects restoration even more than health
            adjustRestoration(system, adjustment * 2.5);
        }
    }
    else if (system.health === 0) {
        system.restoration = 0;
    }
}

export function adjustRestoration(system: SystemState, adjustment: number) {
    const newRestorationValue = Math.max(0, Math.min(maxRestorationValue, (system.restoration ?? 0) + adjustment));

    if (newRestorationValue >= maxRestorationValue) {
        system.health = 1;
        delete system.restoration;
    }
    else {
        system.restoration = newRestorationValue;
    }
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

export function determineRestoreAmount(cardRarity: EngineeringCardRarity) {
    switch (cardRarity) {
        case EngineeringCardRarity.Common:
            return 10;
        case EngineeringCardRarity.Uncommon:
            return 20;
        case EngineeringCardRarity.Rare:
            return 30;
        case EngineeringCardRarity.Epic:
            return 40;
    }
}
