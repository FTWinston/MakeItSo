import { EngineeringCard, EngineeringCardType, EngineeringCardRarity } from '../types/EngineeringCard';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { adjustHealth, adjustPower, applyEffect, maxSystemHealth, removeEffect } from '../../../utils/systemActions';
import { createEffect, createPrimaryEffect, createSecondaryEffect } from '../../../utils/SystemStatusEffects';
import { getRandomInt } from 'src/utils/random';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { DefiniteMap } from 'src/types/DefiniteMap';

const onlyDamagedSystems = (ship: ShipState) =>
    [...ship.systems.values()]
        .filter(system => system.health < maxSystemHealth)
        .reduce((prev, current) => prev | current.system, 0 as ShipSystem);

const onlyNegativeAffectedSystems = (ship: ShipState) =>
    [...ship.systems.values()]
        .filter(system => system.effects.some(effect => effect.positive === false))
        .reduce((prev, current) => prev | current.system, 0 as ShipSystem);
    
const onlyOnlineSystems = (ship: ShipState) =>
    [...ship.systems.values()]
        .filter(system => system.health > 0)
        .reduce((prev, current) => prev | current.system, 0 as ShipSystem);

const onlyPoweredSystems = (ship: ShipState) =>
    [...ship.systems.values()]
        .filter(system => system.power > 0)
        .reduce((prev, current) => prev | current.system, 0 as ShipSystem);

const getAdjacentIndices = (index: number) => {
    switch (index) {
        case 0:
            return [1, 2];
        case 1:
            return [0, 3];
        case 2:
            return [0, 3, 4];
        case 3:
            return [1, 2, 5];
        case 4:
            return [2, 5];
        case 5:
            return [3, 4];
        default:
            return [];
    }
}

type CardBehavior = Omit<EngineeringCard, 'id' | 'type' | 'rarity'>;

function createDivertBehavior(fromSystem: ShipSystem): CardBehavior {
    return {
        play: (system, ship) => {
            const fromSystemInfo = ship.systems.get(fromSystem);
            
            let reduceEffectType: SystemStatusEffectType;
            let boostEffectType: SystemStatusEffectType;

            switch (fromSystemInfo.power) {
                case 0:
                    return false;
                case 1:
                    reduceEffectType = SystemStatusEffectType.Reduce1;
                    boostEffectType = SystemStatusEffectType.Boost1;
                    break;
                case 2:
                    reduceEffectType = SystemStatusEffectType.Reduce2;
                    boostEffectType = SystemStatusEffectType.Boost2;
                    break;
                default:
                    reduceEffectType = SystemStatusEffectType.Reduce3;
                    boostEffectType = SystemStatusEffectType.Boost3;
                    break;
            }
            
            const reduceEffect = createPrimaryEffect(ship.engineering.nextEffectId++, reduceEffectType);
            const boostEffect = createSecondaryEffect(ship.engineering.nextEffectId++, boostEffectType, reduceEffect.id);

            applyEffect(fromSystemInfo, ship, reduceEffect);
            applyEffect(system, ship, boostEffect);
        },
        determineAllowedSystems: ship => [...ship.systems.values()]
            .filter(system => system.system !== fromSystem && system.health > 0)
            .reduce((prev, current) => prev | current.system, 0 as ShipSystem),
    }
}

const cardBehaviorByIdentifier: Map<EngineeringCardType, CardBehavior> = new Map([
    [EngineeringCardType.AuxPower, {
        play: (system, ship) => {
            for (const otherSystemState of ship.systems.values()) {
                removeEffect(otherSystemState, ship, SystemStatusEffectType.AuxPower);
            }

            const effect = createEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.AuxPower);
            applyEffect(system, ship, effect);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],

    [EngineeringCardType.StoreCharge, {
        play: (system, ship) => {
            const effect = createEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.StoreCharge);
            applyEffect(system, ship, effect);
        },
        determineAllowedSystems: onlyPoweredSystems,
    }],

    [EngineeringCardType.StoredCharge, {
        play: (system, ship) => {
            const effect = createEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.StoredCharge);
            applyEffect(system, ship, effect);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],

    [EngineeringCardType.Relocate, {
        play: (system, ship) => {
            const effect = createEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Relocating);
            applyEffect(system, ship, effect);

            const newCard = createCard(ship.engineering.nextCardId++, EngineeringCardType.RelocateHere, EngineeringCardRarity.Rare);
            ship.engineering.handCards.push(newCard);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],

    [EngineeringCardType.RelocateHere, {
        play: (system, ship) => {
            // Find the system with the "relocating" effect.
            const swapWithSystem = [...ship.systems.values()]
                .find(system => system.effects.find(effect => effect.type === SystemStatusEffectType.Relocating))
                ?.system

            if (!swapWithSystem) {
                return false;
            }

            // Swap places with that system.
            const systemOrder = ship.engineering.systemOrder;
            const firstIndex = systemOrder.indexOf(system.system);
            const secondIndex = systemOrder.indexOf(swapWithSystem);
            if (firstIndex === -1 || secondIndex === -1) {
                return false;
            }

            const firstSystem = systemOrder[firstIndex];
            const secondSystem = systemOrder[secondIndex];
            systemOrder[firstIndex] = secondSystem;
            systemOrder[secondIndex] = firstSystem;

            // Apply a temporary effect to both.
            const firstState = ship.systems.get(firstSystem);
            const firstEffect = createPrimaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Relocated);
            applyEffect(firstState, ship, firstEffect);

            const secondState = ship.systems.get(secondSystem);
            const secondEffect = createSecondaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Relocated, firstEffect.id);
            applyEffect(secondState, ship, secondEffect);

            // Remove the "Relocating" effect from the swapped system.
            removeEffect(secondState, ship, SystemStatusEffectType.Relocating);
        },
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .filter(system => ship.systems.get(system).effects.some(effect => effect.type === SystemStatusEffectType.Relocating)) // systems with effect
            .map(system => ship.engineering.systemOrder.indexOf(system)) // indexes with effect
            .flatMap(index => getAdjacentIndices(index)) // adjacent indexes to effect
            .map(index => ship.engineering.systemOrder[index]) // adjacent systems to effect
            .reduce((prev, current) => prev | current, 0 as ShipSystem)
    }],

    [EngineeringCardType.DivertHull, createDivertBehavior(ShipSystem.Hull)],
    [EngineeringCardType.DivertShields, createDivertBehavior(ShipSystem.Shields)],
    [EngineeringCardType.DivertSensors, createDivertBehavior(ShipSystem.Sensors)],
    [EngineeringCardType.DivertWeapons, createDivertBehavior(ShipSystem.Weapons)],
    [EngineeringCardType.DivertEngines, createDivertBehavior(ShipSystem.Engines)],
    [EngineeringCardType.DivertReactor, createDivertBehavior(ShipSystem.Reactor)],

    [EngineeringCardType.Overcharge, {
        play: (system, ship) => {
            const effect = createEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Overcharge);
            applyEffect(system, ship, effect);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],
    [EngineeringCardType.ReactorOverload, {
        play: (system, ship) => {
            const reactorEffect = createPrimaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.ReactorOverload);
            applyEffect(system, ship, reactorEffect);

            for (const otherSystem of ship.systems.values()) {
                if (otherSystem.system !== ShipSystem.Reactor) {
                    const effect = createSecondaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Boost1, reactorEffect.id);
                    applyEffect(otherSystem, ship, effect);
                }
            }
        },
        determineAllowedSystems: ship => ship.systems.get(ShipSystem.Reactor).health > 0 ? ShipSystem.Reactor : 0,
    }],
    [EngineeringCardType.Purge, {
        play: (system, ship) => {
            const removeIndex = system.effects.findIndex(effect => effect.positive === false);
            system.effects.splice(removeIndex, 1);
        },
        determineAllowedSystems: onlyNegativeAffectedSystems,
    }],
    [EngineeringCardType.Reset, {
        play: (system, ship) => {
            const effect = createEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Reset);
            applyEffect(system, ship, effect);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],
]);

const cardsByRarity = new Map<EngineeringCardRarity, EngineeringCardType[]>([
    [
        EngineeringCardRarity.Common,
        [
            EngineeringCardType.AuxPower,
            EngineeringCardType.StoreCharge,
        ]
    ],
    [
        EngineeringCardRarity.Uncommon,
        [
            EngineeringCardType.DivertHull,
            EngineeringCardType.DivertShields,
            EngineeringCardType.DivertSensors,
            EngineeringCardType.DivertWeapons,
            EngineeringCardType.DivertEngines,
            EngineeringCardType.DivertReactor,
            EngineeringCardType.Purge,
        ]
    ],
    [
        EngineeringCardRarity.Rare,
        [
            EngineeringCardType.Relocate,
            EngineeringCardType.Overcharge,
            EngineeringCardType.Reset,
        ]
    ],
    [
        EngineeringCardRarity.Epic,
        [
            EngineeringCardType.ReactorOverload,
        ]
    ],
]) as DefiniteMap<EngineeringCardRarity, EngineeringCardType[]>;

export function createCard(id: number, type: EngineeringCardType, rarity: EngineeringCardRarity): EngineeringCard {
    const behavior = cardBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Card not found: ${type}`);
    }

    return {
        id,
        type,
        rarity,
        ...behavior,
    };
}

/*
const commonCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Boost1,
        rarity: EngineeringCardRarity.Common,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost1);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairSmall,
        rarity: EngineeringCardRarity.Common,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Repair);
            adjustHealth(system, 10);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),
];

const uncommonCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.BoostHelm,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Engines,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostWeapons,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Weapons,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostSensors,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Sensors,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostEngineering,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Reactor,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostShields,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Shields,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.ColdRestart,
        rarity: EngineeringCardRarity.Uncommon,
        play: (system, ship) => {
            adjustHealth(system, 75);
            applyEffect(system, ship, SystemStatusEffectType.Offline);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.HotSwap,
        rarity: EngineeringCardRarity.Uncommon,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.HotSwap);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),
];

const rareCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Boost2,
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Boost2);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairMedium,
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Repair);
            adjustHealth(system, 25);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.Purge,
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            const effects = system.effects
                .filter(effect => {
                    if (effect.positive === false) {
                        effect.remove(system, ship, true);
                        return false;
                    }
                    return true;
                });

            if (effects.length !== system.effects.length) {
                system.effects = effects;
            }
        },
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .filter(system => ship.systems.get(system).effects.some(effect => effect.positive === false))
            .reduce((prev, current) => prev | current, 0 as ShipSystem),
    }),
];

const epicCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Overload,
        rarity: EngineeringCardRarity.Epic,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Overload);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }),
    
    id => ({
        id,
        type: EngineeringCardType.Supercharge,
        rarity: EngineeringCardRarity.Epic,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Supercharge);

            const systemOrder = ship.engineering.systemOrder;
            const index = systemOrder.indexOf(system.system);

            const adjacentSystems: SystemState[] = [];
            if (index > 1) {
                const adjacentSystem = systemOrder[index - 2];
                adjacentSystems.push(ship.systems.get(adjacentSystem));
            }
            if (index < systemOrder.length - 1) {
                const adjacentSystem = systemOrder[index + 2];
                adjacentSystems.push(ship.systems.get(adjacentSystem));
            }
            if (index % 2 === 0) {
                const adjacentSystem = systemOrder[index + 1];
                adjacentSystems.push(ship.systems.get(adjacentSystem));
            }
            else {
                const adjacentSystem = systemOrder[index - 1];
                adjacentSystems.push(ship.systems.get(adjacentSystem));
            }

            for (const adjacentSystem of adjacentSystems) {
                adjustHealth(adjacentSystem, 20);
                applyEffect(adjacentSystem, ship, SystemStatusEffectType.Damage);
            }
        },
        determineAllowedSystems: onlyOnlineSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairLarge,
        rarity: EngineeringCardRarity.Epic,
        play: (system, ship) => {
            applyEffect(system, ship, SystemStatusEffectType.Repair);
            adjustHealth(system, 50);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),
];
*/

export function createCardByRarity(id: number, rarity: EngineeringCardRarity) {
    const possibleCards = cardsByRarity.get(rarity);
    const index = getRandomInt(possibleCards.length);
    const type = possibleCards[index];
    return createCard(id, type, rarity);
}

const commonChance = 0.5;
const uncommonChance = 0.33;
const rareChance = 0.15;
const epicChance = 0.02;

const cumulativeCommonChance = commonChance;
const cumulativeUncommonChance = cumulativeCommonChance + uncommonChance;
const cumulativeRareChance = cumulativeUncommonChance + rareChance;
const cumulativeTotalChance = cumulativeRareChance + epicChance;

export function createRandomCard(id: number): EngineeringCard {
    const randomValue = Math.random() * cumulativeTotalChance;
    let rarity: EngineeringCardRarity;

    if (randomValue < cumulativeCommonChance) {
        rarity = EngineeringCardRarity.Common;
    }
    else if (randomValue < cumulativeUncommonChance) {
        rarity = EngineeringCardRarity.Uncommon;
    }
    else if (randomValue < cumulativeRareChance) {
        rarity = EngineeringCardRarity.Rare;
    }
    else {
        rarity = EngineeringCardRarity.Epic;
    }

    return createCardByRarity(id, rarity);
}

export function createCards(ids: number[]): EngineeringCard[] {
    const results: EngineeringCard[] = [];

    for (const id of ids) {
        let newCard: EngineeringCard;

        do {
            newCard = createRandomCard(id);
        } while (results.some(card => card.type === newCard.type));

        results.push(newCard);
    }

    return results;
}
