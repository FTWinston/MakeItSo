import { SystemStatusEffectType, SystemStatusEffectData, SystemStatusEffectInstance } from '../SystemStatusEffect';
import { SystemState, adjustPower, adjustHealth } from './SystemState';
import { determineEndTime } from '../Progression';

const allEffects: SystemStatusEffectData[] = [
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
        type: SystemStatusEffectType.Boost3,
        positive: true,
        duration: 8,
        apply: (system: SystemState) => adjustPower(system, 3),
        remove: (system: SystemState) => adjustPower(system, -3),
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
        type: SystemStatusEffectType.Reduce3,
        positive: false,
        duration: 8,
        apply: (system: SystemState) => adjustPower(system, -3),
        remove: (system: SystemState) => adjustPower(system, 3),
    },

    {
        type: SystemStatusEffectType.Overload,
        positive: false,
        duration: 12,
        apply: (system: SystemState) => adjustPower(system, 3),
        remove: (system: SystemState, forced: boolean) => {
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
        remove: (system: SystemState, forced: boolean) => {
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
        type: SystemStatusEffectType.Swap,
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

const effects: Map<SystemStatusEffectType, SystemStatusEffectData> = new Map();
for (const effect of allEffects) {
    effects.set(effect.type, effect);
}

export function createEffect(effect: SystemStatusEffectType): SystemStatusEffectInstance {
    const effectData =  effects.get(effect)!;

    return {
        ...effectData,
        endTime: determineEndTime(effectData.duration),
    };
}
