import { SystemStatusEffect, SystemStatusEffectType } from '../types/SystemStatusEffect';
import { PowerLevel, SystemState } from 'src/types/SystemState';
import { createEffect } from './SystemStatusEffects';
import { getTime, hasCompleted } from 'src/utils/timeSpans';
import { EngineeringCardRarity } from '../features/Cards/types/EngineeringCard';
import { ShipState } from 'src/types/ShipState';

export const maxSystemHealth = 100;
export const maxRestorationValue = 100;
export const maxPowerLevel = 4;

export function adjustPower(system: SystemState, adjustment: number) {
    system.unconstrainedPower += adjustment;
    
    const before = system.power;
    system.power = Math.max(Math.min(system.unconstrainedPower, maxPowerLevel), 0) as PowerLevel;

    return system.power - before;
}

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

export function applyEffect(system: SystemState, ship: ShipState, effect: SystemStatusEffect) {
    system.effects.push(effect);
    effect.apply(system, ship);
}

// TODO: can this method be removed in favor of one that does it by ID?
export function removeEffect(system: SystemState, ship: ShipState, effectType: SystemStatusEffectType, forced: boolean = true) {
    const toRemove = system.effects
        .filter(instance => instance.type === effectType);

    if (toRemove.length === 0) {
        return;
    }

    for (const effect of toRemove) {
        effect.remove(system, ship, forced);
    }

    system.effects = system.effects
        .filter(instance => instance.type !== effectType);
}

export function removeExpiredEffects(systemState: SystemState, ship: ShipState, currentTime = getTime()) {
    const filteredEffects = systemState.effects.filter(effect => {
        if (hasCompleted(effect, currentTime)) {
            effect.remove(systemState, ship, false);
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
