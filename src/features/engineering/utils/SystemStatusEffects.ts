import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { determineEndTime, getTime } from 'src/utils/timeSpans';
import { createCard } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardRarity, EngineeringCardType } from '../features/Cards/types/EngineeringCard';
import { EffectBehavior, EffectLinkInfo, SystemStatusEffect, SystemStatusEffectType } from '../types/SystemStatusEffect';
import { adjustHealth, adjustPower } from './systemActions';

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
        SystemStatusEffectType.Boost1,
        {
            positive: true,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, 1),
            remove: (system: SystemState) => adjustPower(system, -1),
        }
    ],
    [
        SystemStatusEffectType.Boost2,
        {
            positive: true,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, 2),
            remove: (system: SystemState) => adjustPower(system, -2),
        }
    ],
    [
        SystemStatusEffectType.Boost3,
        {
            positive: true,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, 3),
            remove: (system: SystemState) => adjustPower(system, -3),
        }
    ],
    [
        SystemStatusEffectType.Reduce1,
        {
            positive: false,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, -1),
            remove: (system: SystemState) => adjustPower(system, 1),
        }
    ],
    [
        SystemStatusEffectType.Reduce2,
        {
            positive: false,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, -2),
            remove: (system: SystemState) => adjustPower(system, 2),
        },
    ],
    [
        SystemStatusEffectType.Reduce3,
        {
            positive: false,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, -3),
            remove: (system: SystemState) => adjustPower(system, 3),
        },
    ],
    [
        SystemStatusEffectType.Overcharge,
        {
            positive: false,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 2),
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, -2);

                // TODO: damage over time?
                if (!forced) {
                    adjustHealth(system, -25);
                }
            },
        },
    ],
    [
        SystemStatusEffectType.ReactorOverload,
        {
            positive: false,
            duration: 15,
            apply: (system: SystemState) => {
                adjustPower(system, 1);
                adjustHealth(system, -10);
            },
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, -1);

                // TODO: damage over time?
                if (!forced) {
                    adjustHealth(system, -50);
                }
            },
        },
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
                    system.effects = [];
                }
            },
        },
    ],

    
    [
        SystemStatusEffectType.Overload,
        {
            positive: false,
            duration: 12,
            apply: (system: SystemState) => adjustPower(system, 3),
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, -3);

                if (!forced) {
                    adjustHealth(system, -50);
                }
            },
        },
    ],
    [
        SystemStatusEffectType.Supercharge,
        {
            positive: false,
            duration: 10,
            apply: (system: SystemState) => adjustPower(system, 4),
            remove: (system: SystemState, ship: ShipState, forced: boolean) => {
                adjustPower(system, -4);

                if (!forced) {
                    adjustHealth(system, -80);
                }
            },
        },
    ],
    [
        SystemStatusEffectType.Damage,
        {
            positive: false,
            duration: 1,
            apply: () => {},
            remove: () => {}
        },
    ],
    [
        SystemStatusEffectType.Repair,
        {
            positive: true,
            duration: 1,
            apply: () => {},
            remove: () => {}
        },
    ],
    [
        SystemStatusEffectType.SwapHorizontal,
        {
            positive: true,
            duration: 1,
            apply: () => {},
            remove: () => {}
        },
    ],
    [
        SystemStatusEffectType.SwapVertical,
        {
            positive: true,
            duration: 1,
            apply: () => {},
            remove: () => {}
        },
    ],
    [
        SystemStatusEffectType.Offline,
        {
            positive: false,
            duration: 12,
            apply: system => adjustPower(system, -100),
            remove: (system, ship) => adjustPower(system, 100),
        },
    ],
    [
        SystemStatusEffectType.HotSwap,
        {
            positive: true,
            duration: 3,
            apply: system => adjustPower(system, -100),
            remove: (system, forced) => {
                adjustPower(system, 100);

                if (!forced) {
                    adjustHealth(system, 30);
                }
            },
        }
    ],
]);

export function createEffect(id: number, type: SystemStatusEffectType, startTime = getTime(), link: EffectLinkInfo | undefined = undefined): SystemStatusEffect {
    const behavior = effectBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Effect not found: ${type}`);
    }

    return {
        id,
        type,
        startTime,
        endTime: determineEndTime(behavior.duration),
        ...behavior,
        ...link,
    };
}

export function createPrimaryEffect(id: number, type: SystemStatusEffectType, startTime = getTime()): SystemStatusEffect {
    const link: EffectLinkInfo = { link: 'primary' };

    return createEffect(id, type, startTime, link);
}

export function createSecondaryEffect(id: number, type: SystemStatusEffectType, primaryEffectId: number, startTime = getTime()): SystemStatusEffect {
    const link: EffectLinkInfo = { link: 'secondary', primaryEffectId: primaryEffectId };

    return createEffect(id, type, startTime, link);
}
