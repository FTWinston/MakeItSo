import { ShipState } from 'src/types/ShipState';
import { maxSystemHealth, SystemState } from 'src/types/SystemState';
import { determineEndTime, getTime } from 'src/utils/timeSpans';
import { createCard } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardRarity, EngineeringCardType } from '../features/Cards/types/EngineeringCard';
import { BaseStatusEffect, EffectBehavior, PrimaryEffectLink, PrimaryStatusEffect, SecondaryEffectLink, SecondaryStatusEffect, SystemStatusEffect, SystemStatusEffectType, TickingStatusEffect } from '../types/SystemStatusEffect';
import { adjustHealth, adjustPower, effectTickInterval, removeEffectInstance } from './systemActions';

type EffectBehaviorWithoutType = Omit<EffectBehavior, 'type'>;

const effectBehaviorByIdentifier: Map<SystemStatusEffectType, EffectBehaviorWithoutType> = new Map([
    [
        SystemStatusEffectType.AuxPower,
        {
            positive: true,
            duration: 60,
            apply: (system: SystemState) => adjustPower(system, 1),
            remove: (system: SystemState) => adjustPower(system, -1),
        }
    ],
    [
        SystemStatusEffectType.StoreCharge,
        {
            positive: false,
            duration: 20,
            apply: (system: SystemState) => adjustPower(system, -1),
            remove: (system: SystemState, ship: ShipState) => {
                adjustPower(system, 1);

                const newCard = createCard(ship.engineering.nextCardId++, EngineeringCardType.StoredCharge, EngineeringCardRarity.Uncommon);
                ship.engineering.handCards.push(newCard);
            }
        }
    ],
    [
        SystemStatusEffectType.StoredCharge,
        {
            positive: true,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 1),
            remove: (system: SystemState) => adjustPower(system, -1),
        }
    ],
    [
        SystemStatusEffectType.DivertFrom,
        {
            positive: false,
            duration: 20,
            apply: (system: SystemState) => adjustPower(system, -2),
            remove: (system: SystemState) => adjustPower(system, 2),
        }
    ],
    [
        SystemStatusEffectType.DivertTo,
        {
            positive: true,
            duration: 20,
            apply: (system: SystemState) => adjustPower(system, 2),
            remove: (system: SystemState) => adjustPower(system, -2),
        }
    ],
    [
        SystemStatusEffectType.Relocating,
        {
            positive: true,
            duration: 20,
            apply: () => {},
            remove: (system, ship, forced) => {
                /* A Reset card might force remove this effect. Don't want to leave the card in play!
                if (forced) {
                    return;
                }
                */

                // Remove the RelocateHere card from play.
                const removeIndex = ship.engineering.handCards.findIndex(card => card.type === EngineeringCardType.RelocateHere);
                if (removeIndex !== -1) {
                    ship.engineering.handCards.splice(removeIndex, 1);
                }
            },
        }
    ],
    [
        SystemStatusEffectType.Relocated,
        {
            positive: true,
            duration: 1,
            apply: () => {},
            remove: () => {},
        }
    ],
    [
        SystemStatusEffectType.Overcharge,
        {
            positive: false,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 2),
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, -2);
            },
            tick: (system: SystemState, ship: ShipState) => {
                adjustHealth(system, ship, -2);
            }
        },
    ],
    [
        SystemStatusEffectType.ReactorOverload,
        {
            positive: false,
            duration: 15,
            apply: (system: SystemState, ship: ShipState) => {
                adjustPower(system, 1);
                adjustHealth(system, ship, -10);
            },
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, -1);

                if (!forced) {
                    adjustHealth(system, ship, -50);
                }
            },
            tick: (system: SystemState, ship: ShipState) => {
                adjustHealth(system, ship, -1);
            },
            nextTick: 0
        },
    ],
    [
        SystemStatusEffectType.ReactorSurplus,
        {
            positive: true,
            duration: 15,
            apply: (system: SystemState) => adjustPower(system, 1),
            remove: (system: SystemState) => adjustPower(system, -1),
        }
    ],
    [
        SystemStatusEffectType.DrawPower1,
        {
            positive: true,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 1),
            remove: (system: SystemState) => adjustPower(system, -1),
        }
    ],
    [
        SystemStatusEffectType.DrawPower2,
        {
            positive: true,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 2),
            remove: (system: SystemState) => adjustPower(system, -2),
        }
    ],
    [
        SystemStatusEffectType.DrawPower3,
        {
            positive: true,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 3),
            remove: (system: SystemState) => adjustPower(system, -3),
        }
    ],
    [
        SystemStatusEffectType.DrawnPower,
        {
            positive: false,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, -1),
            remove: (system: SystemState) => adjustPower(system, 1),
        }
    ],
    [
        SystemStatusEffectType.Reset,
        {
            positive: true,
            duration: 2,
            apply: (system: SystemState) => {
                adjustPower(system, -10);
            },
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, 10);

                if (!forced) {
                    for (const effect of system.effects) {
                        if (effect.type !== SystemStatusEffectType.Reset) {
                            removeEffectInstance(system, ship, effect, 'early');
                        }
                    }
                    system.effects = [];
                }
            },
        },
    ],
    [
        SystemStatusEffectType.Rebuild,
        {
            positive: true,
            duration: 10,
            apply: (system: SystemState) => {
                adjustPower(system, -10);
            },
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, 10);

                if (!forced) {
                    adjustHealth(system, ship, 50);
                }
            },
        },
    ],
    [
        SystemStatusEffectType.Replace,
        {
            positive: true,
            duration: 5,
            apply: (system: SystemState) => {
                adjustPower(system, -10);
            },
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, 10);

                if (!forced) {
                    adjustHealth(system, ship, maxSystemHealth);
                    
                    for (const effect of system.effects) {
                        if (effect.type !== SystemStatusEffectType.Replace) {
                            removeEffectInstance(system, ship, effect, 'early');
                        }
                    }
                    system.effects = [];
                }
            },
        },
    ],
    [
        SystemStatusEffectType.ReactorDamage,
        {
            positive: false,
            duration: 20,
            apply: (system: SystemState) => {
                adjustPower(system, -1);
            },
            remove: (system: SystemState) => {
                adjustPower(system, 1);
            },
        },
    ],
]);

export function createEffect(id: number, type: SystemStatusEffectType): BaseStatusEffect;
export function createEffect(id: number, type: SystemStatusEffectType, startTime: number): BaseStatusEffect;
export function createEffect(id: number, type: SystemStatusEffectType, startTime: number, link: PrimaryEffectLink): PrimaryStatusEffect;
export function createEffect(id: number, type: SystemStatusEffectType, startTime: number, link: SecondaryEffectLink): SecondaryStatusEffect;
export function createEffect(id: number, type: SystemStatusEffectType, startTime = getTime(), link: PrimaryEffectLink | SecondaryEffectLink | undefined = undefined): SystemStatusEffect {
    const behavior = effectBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Effect not found: ${type}`);
    }

    const effect: SystemStatusEffect = {
        id,
        type,
        startTime,
        endTime: determineEndTime(behavior.duration),
        ...behavior,
        ...link,
    };

    if (ticks(effect)) {
        effect.nextTick = startTime + effectTickInterval;
    }

    return effect;
}

function hasLink(effect: SystemStatusEffect): effect is PrimaryStatusEffect | SecondaryStatusEffect {
    return Object.hasOwn(effect, 'link');
}

export function isPrimary(effect: SystemStatusEffect): effect is PrimaryStatusEffect {
    return hasLink(effect) && effect.link === 'primary';
}

export function isSecondary(effect: SystemStatusEffect): effect is SecondaryStatusEffect {
    return hasLink(effect) && effect.link === 'secondary';
}

export function ticks(effect: SystemStatusEffect): effect is TickingStatusEffect {
    return Object.hasOwn(effect, 'tick');
}
