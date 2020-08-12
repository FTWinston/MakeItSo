import { PowerEffectType, PowerEffectData } from './PowerEffect';
import { ShipState } from './ShipState';
import { System } from './System';

const allEffects: PowerEffectData[] = [
    {
        type: PowerEffectType.Boost1,
        positive: true,
        duration: 15,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system]++;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system]--;
        }
    },

    {
        type: PowerEffectType.Boost2,
        positive: true,
        duration: 12,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system] += 2;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system] -= 2;
        }
    },

    {
        type: PowerEffectType.Boost3,
        positive: false,
        duration: 10,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system] += 3;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system] -= 3;
        }
    },
];

const effects: Map<PowerEffectType, PowerEffectData> = new Map();
for (const effect of allEffects) {
    effects.set(effect.type, effect);
}

export function createEffect(effect: PowerEffectType): PowerEffectData {
    const effectData =  effects.get(effect)!;
    return { ...effectData };
}
