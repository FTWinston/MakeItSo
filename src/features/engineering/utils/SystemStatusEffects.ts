import { ShipState } from 'src/types/ShipState';
import { SystemState } from 'src/types/SystemState';
import { determineEndTime, getTime } from 'src/utils/timeSpans';
import { createCard } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardRarity, EngineeringCardType } from '../features/Cards/types/EngineeringCard';
import { SystemStatusEffect, SystemStatusEffectInstance, SystemStatusEffectType } from '../types/SystemStatusEffect';
import { adjustHealth, adjustPower } from './systemActions';

type EffectBehavior = Omit<SystemStatusEffect, 'type'>;

const effectBehaviorByIdentifier: Map<SystemStatusEffectType, EffectBehavior> = new Map([
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
            duration: 15,
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
        SystemStatusEffectType.Reduce1,
        {
            positive: false,
            duration: 15,
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

export function createEffect(type: SystemStatusEffectType, startTime = getTime()): SystemStatusEffectInstance {
    const behavior = effectBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Effect not found: ${type}`);
    }

    return {
        type,
        startTime,
        endTime: determineEndTime(behavior.duration),
        ...behavior,
    };
}
