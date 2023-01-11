import { BaseStatusEffect, PrimaryEffectLink, PrimaryStatusEffect, SecondaryEffectLink, SecondaryStatusEffect, SystemStatusEffect, SystemStatusEffectType } from '../types/SystemStatusEffect';
import { SystemState } from 'src/types/SystemState';
import { durationToTicks, getTime, hasCompleted } from 'src/utils/timeSpans';
import { EngineeringCardRarity } from '../features/Cards/types/EngineeringCard';
import { ShipState } from 'src/types/ShipState';
import { createEffect, isPrimary, isSecondary, ticks } from './SystemStatusEffects';
import { PowerLevel, ShipDestroyingSystem, ShipDestroyingSystems } from 'src/types/ShipSystem';
import { LogEvent } from '../features/SystemTiles';

export const maxSystemHealth = 100;
export const maxRestorationValue = 100;
export const defaultPowerLevel = 2;
export const maxPowerLevel = 4;
export const effectTickInterval = durationToTicks(1);

const maxEventLogEntries = 15;
export function logEvent(system: SystemState, event: Omit<LogEvent, 'id'>) {
    system.eventLog.push({ ...event, id: system.nextEventId });

    if (system.eventLog.length > maxEventLogEntries) {
        system.eventLog.shift();
    }

    if (system.nextEventId > maxEventLogEntries) {
        system.nextEventId = 1;
    }
    else {
        system.nextEventId++;
    }
}

export function adjustPower(system: SystemState, adjustment: number) {
    system.unconstrainedPower += adjustment;
    
    const before = system.power;
    const after = Math.max(Math.min(system.unconstrainedPower, maxPowerLevel), 0) as PowerLevel;
    system.power = after;
    adjustment = system.power - before;

    if (adjustment !== 0) {
        system.powerLevelChanged = true;

        if (adjustment > 0) {
            logEvent(system, {
                identifier: 'power increase',
                parameters: {
                    before,
                    after,
                }
            });
        }
        else {
            logEvent(system, {
                identifier: 'power decrease',
                parameters: {
                    before,
                    after,
                }
            });
        }
    }

    return adjustment;
}

function destroyShip(ship: ShipState, destroyedVia: ShipDestroyingSystem) {
    ship.destroyed = destroyedVia;

    for (const system of ship.systems.values()) {
        // Clear all effects immediately, without letting them remove themselves.
        // (This is really just so they don't show in system logs.)
        system.effects = [];

        // Also remove all power from all systems.
        system.power = 0;
        system.unconstrainedPower = 0;
        system.powerLevelChanged = true;
    }
}

export function adjustHealth(system: SystemState, ship: ShipState, adjustment: number) {
    const hadHealth = system.health > 0;

    const newHealth = Math.max(Math.min(system.health + adjustment, maxSystemHealth), 0);
    system.health = newHealth;

    if (!hadHealth) {
        if (adjustment < 0) {
            // Damage affects restoration even more than health
            adjustment *= 2.5;
        }
        adjustRestoration(system, adjustment);
    }
    else if (system.health === 0) {
        logEvent(system, {
            identifier: 'damage disable',
            parameters: {
                damage: -adjustment,
            }
        });

        system.restoration = 0;

        adjustPower(system, -system.power);

        // When health is reduced to zero for a "ship destroying" system, the whole ship is destroyed.
        if ((system.system & ShipDestroyingSystems) !== 0) {
            destroyShip(ship, system.system as ShipDestroyingSystem);
        }
        // Only remove effects "normally" if the whole ship wasn't destroyed.
        else if (system.effects.length > 0) {
            for (const effect of system.effects) {
                removeEffectInstance(system, ship, effect, 'zeroHealth');
            }

            system.effects = [];
        }
    }
    else if (adjustment > 0) {
        logEvent(system, {
            identifier: 'heal',
            parameters: {
                heal: adjustment,
                health: newHealth,
            }
        });
    }
    else {
        logEvent(system, {
            identifier: 'damage',
            parameters: {
                damage: -adjustment,
                health: newHealth,
            }
        });
    }
}

export function adjustRestoration(system: SystemState, adjustment: number) {
    const newRestorationValue = Math.max(0, Math.min(maxRestorationValue, (system.restoration ?? 0) + adjustment));

    if (system.restoration === newRestorationValue) {
        return;
    }
    else if (newRestorationValue >= maxRestorationValue) {
        delete system.restoration;

        logEvent(system, {
            identifier: 'restore finished',
            parameters: {
                restoration: maxRestorationValue,
                health: 1,
            }
        });
        
        system.health = 1;
        adjustPower(system, defaultPowerLevel - system.power);
    }
    else {
        system.restoration = newRestorationValue;

        if (adjustment > 0) {
            logEvent(system, {
                identifier: 'restore',
                parameters: {
                    change: adjustment,
                    restoration: newRestorationValue,
                }
            });
        }
        else {
            logEvent(system, {
                identifier: 'damage restore',
                parameters: {
                    change: -adjustment,                    
                    restoration: newRestorationValue,
                }
            });
        }
    }
}

function applyEffect(system: SystemState, ship: ShipState, effect: SystemStatusEffect) {
    logEvent(system, {
        identifier: 'effect add',
        parameters: {
            effect: effect.type,
        }
    });

    system.effects.push(effect);
    effect.apply(system, ship);
}

export function applySingleEffect(
    id: number,
    type: SystemStatusEffectType,
    targetSystem: SystemState,
    ship: ShipState,
    startTime = getTime()
): BaseStatusEffect {
    const effect = createEffect(id, type, startTime);

    applyEffect(targetSystem, ship, effect);

    return effect;
}

export function applyPrimaryEffect(
    id: number,
    type: SystemStatusEffectType,
    targetSystem: SystemState,
    ship: ShipState,
    startTime = getTime()
): PrimaryStatusEffect {
    const link: PrimaryEffectLink = {
        link: 'primary',
        secondaryEffects: [],
    };

    const effect = createEffect(id, type, startTime, link);

    applyEffect(targetSystem, ship, effect);

    return effect;
}

export function applySecondaryEffect(
    id: number,
    type: SystemStatusEffectType,
    targetSystem: SystemState,
    ship: ShipState,
    primaryEffect: PrimaryStatusEffect,
    primarySystem: SystemState,
    startTime = getTime()
): SecondaryStatusEffect {
    const link: SecondaryEffectLink = {
        link: 'secondary',
        primaryEffect: {
            effectId: primaryEffect.id,
            effectType: primaryEffect.type,
            system: primarySystem.system,
        },
    };

    const secondaryEffect = createEffect(id, type, startTime, link);

    primaryEffect.secondaryEffects.push({
        effectId: secondaryEffect.id,
        effectType: secondaryEffect.type,
        system: targetSystem.system,
    });

    applyEffect(targetSystem, ship, secondaryEffect);

    return secondaryEffect;
}

export function removeEffectInstance(system: SystemState, ship: ShipState, effect: SystemStatusEffect, removalType: 'complete' | 'early' | 'link' | 'zeroHealth') {
    if (isPrimary(effect) && removalType !== 'complete') {
        // Primary effects must also remove their linked secondary effects when they are removed.
        // (Just needed for forced removal, unless we have secondary effects that would last longer than their primary.)
        for (const secondaryEffect of effect.secondaryEffects) {
            const secondarySystem = ship.systems.get(secondaryEffect.system);

            const secondaryEffectIndex = secondarySystem.effects.findIndex(effect => effect.id === secondaryEffect.effectId);

            if (secondaryEffectIndex !== -1) {
                const secondaryEffectInstance = secondarySystem.effects[secondaryEffectIndex];
                removeEffectInstance(secondarySystem, ship, secondaryEffectInstance, 'link');
                secondarySystem.effects.splice(secondaryEffectIndex, 1);
            }
        }
    }
    else if (isSecondary(effect) && removalType === 'early') {
        // You can't remove a secondary effect early.
        return; 
    }

    logEvent(system, {
        identifier: `effect remove ${removalType}`,
        parameters: {
            effect: effect.type
        }
    });

    effect.remove(system, ship, removalType !== 'complete');
}

export function removeEffect(system: SystemState, ship: ShipState, effectType: SystemStatusEffectType) {
    const toRemove = system.effects
        .filter(instance => instance.type === effectType);

    if (toRemove.length === 0) {
        return;
    }

    for (const effect of toRemove) {
        removeEffectInstance(system, ship, effect, 'early');
    }

    system.effects = system.effects
        .filter(instance => instance.type !== effectType);
}

export function removeExpiredEffects(system: SystemState, ship: ShipState, currentTime = getTime()) {
    const filteredEffects = system.effects.filter(effect => {
        if (hasCompleted(effect, currentTime)) {
            removeEffectInstance(system, ship, effect, 'complete');
            return false;
        }

        return true;
    });
    
    if (filteredEffects.length < system.effects.length) {
        system.effects = filteredEffects;
    }
}

export function tickOngoingEffects(system: SystemState, ship: ShipState, currentTime = getTime()) {
    for (const effect of system.effects) {
        if (!ticks(effect) || effect.nextTick > currentTime) {
            continue;
        }

        effect.tick(system, ship);
        effect.nextTick += effectTickInterval;
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

export function determineCardGenerationDuration(power: PowerLevel): number {
    switch (power) {
        case 0:
            return 60;
        case 1:
            return 35;
        case 2:
            return 15;
        case 3:
            return 10;
        case 4:
            return 5;
    }
}