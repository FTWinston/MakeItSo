import { SystemStatusEffectType, SystemStatusEffectData } from './SystemStatusEffect';
import { ShipState } from './ShipState';
import { System } from './System';

const allEffects: SystemStatusEffectData[] = [
    {
        type: SystemStatusEffectType.Boost1,
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
        type: SystemStatusEffectType.Boost2,
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
        type: SystemStatusEffectType.Boost3,
        positive: true,
        duration: 8,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system] += 3;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system] -= 3;
        }
    },
    
    {
        type: SystemStatusEffectType.Reduce1,
        positive: false,
        duration: 15,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system]--;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system]++;
        }
    },

    {
        type: SystemStatusEffectType.Reduce2,
        positive: false,
        duration: 12,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system] -= 2;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system] += 2;
        }
    },

    {
        type: SystemStatusEffectType.Reduce3,
        positive: false,
        duration: 8,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system] -= 3;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system] += 3;
        }
    },

    {
        type: SystemStatusEffectType.Overload,
        positive: false,
        duration: 12,
        apply: (ship: ShipState, system: System) => {
            ship.powerLevels[system] += 3;
        },
        remove: (ship: ShipState, system: System) => {
            ship.powerLevels[system] -= 3;
            // TODO: deal damage
        }
    },

    {
        type: SystemStatusEffectType.Damage,
        positive: false,
        duration: 1,
        apply: (ship: ShipState, system: System) => {},
        remove: (ship: ShipState, system: System) => {}
    },

    {
        type: SystemStatusEffectType.Repair,
        positive: true,
        duration: 1,
        apply: (ship: ShipState, system: System) => {},
        remove: (ship: ShipState, system: System) => {}
    },
];

const effects: Map<SystemStatusEffectType, SystemStatusEffectData> = new Map();
for (const effect of allEffects) {
    effects.set(effect.type, effect);
}

export function createEffect(effect: SystemStatusEffectType): SystemStatusEffectData {
    const effectData =  effects.get(effect)!;
    return { ...effectData };
}
