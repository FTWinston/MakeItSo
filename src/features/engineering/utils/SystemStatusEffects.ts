import { ShipState } from 'src/types/ShipState';
import { SystemState } from 'src/types/SystemState';
import { determineEndTime, getTime } from 'src/utils/timeSpans';
import { SystemStatusEffect, SystemStatusEffectInstance, SystemStatusEffectType } from '../types/SystemStatusEffect';
import { adjustHealth, adjustPower } from './systemActions';

const allEffects: SystemStatusEffect[] = [
    {
        type: SystemStatusEffectType.AuxPower,
        positive: true,
        duration: 60,
        apply: (system: SystemState) => adjustPower(system, 1),
        remove: (system: SystemState) => adjustPower(system, -1),
    },
    {
        type: SystemStatusEffectType.StoreCharge,
        positive: false,
        duration: 30,
        apply: (system: SystemState) => adjustPower(system, -1),
        remove: (system: SystemState, ship: ShipState) => {
            adjustPower(system, 1);

            // TODO: create StoredCharge card, which is a type that isn't available otherwise. It's a special type?
            // ship.engineering.handCards.push()
        }
    },
    {
        type: SystemStatusEffectType.StoredCharge,
        positive: true,
        duration: 10,
        apply: (system: SystemState) => adjustPower(system, 1),
        remove: (system: SystemState) => adjustPower(system, -1),
    },




    {
        type: SystemStatusEffectType.Boost1,
        positive: true,
        duration: 15,
        apply: (system: SystemState) => adjustPower(system, 1),
        remove: (system: SystemState) => adjustPower(system, -1),
    },

    {
        type: SystemStatusEffectType.Boost2,
        positive: true,
        duration: 12,
        apply: (system: SystemState) => adjustPower(system, 2),
        remove: (system: SystemState) => adjustPower(system, -2),
    },

    {
        type: SystemStatusEffectType.Reduce1,
        positive: false,
        duration: 15,
        apply: (system: SystemState) => adjustPower(system, -1),
        remove: (system: SystemState) => adjustPower(system, 1),
    },

    {
        type: SystemStatusEffectType.Reduce2,
        positive: false,
        duration: 12,
        apply: (system: SystemState) => adjustPower(system, -2),
        remove: (system: SystemState) => adjustPower(system, 2),
    },

    {
        type: SystemStatusEffectType.Overload,
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

    {
        type: SystemStatusEffectType.Supercharge,
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

    {
        type: SystemStatusEffectType.Damage,
        positive: false,
        duration: 1,
        apply: () => {},
        remove: () => {}
    },

    {
        type: SystemStatusEffectType.Repair,
        positive: true,
        duration: 1,
        apply: () => {},
        remove: () => {}
    },

    {
        type: SystemStatusEffectType.SwapHorizontal,
        positive: true,
        duration: 1,
        apply: () => {},
        remove: () => {}
    },

    {
        type: SystemStatusEffectType.SwapVertical,
        positive: true,
        duration: 1,
        apply: () => {},
        remove: () => {}
    },

    {
        type: SystemStatusEffectType.Offline,
        positive: false,
        duration: 12,
        apply: system => adjustPower(system, -100),
        remove: system => adjustPower(system, 100),
    },

    {
        type: SystemStatusEffectType.HotSwap,
        positive: true,
        duration: 3,
        apply: system => adjustPower(system, -100),
        remove: (system, forced) => {
             adjustPower(system, 100);

             if (!forced) {
                adjustHealth(system, 30);
             }
        },
    },
];

const effects: Map<SystemStatusEffectType, SystemStatusEffect> = new Map();
for (const effect of allEffects) {
    effects.set(effect.type, effect);
}

export function createEffect(effect: SystemStatusEffectType, startTime = getTime()): SystemStatusEffectInstance {
    const effectData =  effects.get(effect)!;

    return {
        startTime,
        endTime: determineEndTime(effectData.duration),
        type: effectData.type,
        positive: effectData.positive,
        apply: effectData.apply,
        remove: effectData.remove,
    };
}
