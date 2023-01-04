import { EngineeringCard, EngineeringCardType, EngineeringCardRarity } from '../types/EngineeringCard';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { applyPrimaryEffect, applySecondaryEffect, applySingleEffect, maxSystemHealth, removeEffect } from '../../../utils/systemActions';
import { getRandomInt } from 'src/utils/random';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { DefiniteMap } from 'src/types/DefiniteMap';
import { getTime } from 'src/utils/timeSpans';

function filterSystems(filter: (system: SystemState) => boolean) {
    return (ship: ShipState) =>
        [...ship.systems.values()]
        .filter(filter)
        .reduce((prev, current) => prev | current.system, 0 as ShipSystem);
}

const onlyDamagedSystems = filterSystems(system => system.health < maxSystemHealth);
const onlyOnlineSystemsWithEffects = filterSystems(system => system.health > 0 && system.effects.length > 0);
const onlyOnlineSystemsWithNegativeEffects = filterSystems(system => system.health > 0 && system.effects.some(effect => effect.positive === false));
const onlyOnlineSystems = filterSystems(system => system.health > 0);
const onlyPoweredSystems = filterSystems(system => system.power > 0);

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

function getBoostEffectType(quantity: number) {
    switch (quantity) {
        case 0:
        case 1:
            return SystemStatusEffectType.Boost1;
        case 2:
            return SystemStatusEffectType.Boost2;
        default:
            return SystemStatusEffectType.Boost3;
    }
}

function getReduceEffectType(quantity: number) {
    switch (quantity) {
        case 0:
        case 1:
            return SystemStatusEffectType.Reduce1;
        case 2:
            return SystemStatusEffectType.Reduce2;
        default:
            return SystemStatusEffectType.Reduce3;
    }
}

function createDivertBehavior(fromSystem: ShipSystem): CardBehavior {
    return {
        play: (system, ship) => {
            const fromSystemState = ship.systems.get(fromSystem);
            
            if (fromSystemState.power === 0) {
                return false;
            }

            const boostEffectType = getBoostEffectType(fromSystemState.power);
            const reduceEffectType = getReduceEffectType(fromSystemState.power);

            const reduceEffect = applyPrimaryEffect(ship.engineering.nextEffectId++, reduceEffectType, fromSystemState, ship);
            applySecondaryEffect(ship.engineering.nextEffectId++, boostEffectType, system, ship, reduceEffect, fromSystemState);
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

            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.AuxPower, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],

    [EngineeringCardType.StoreCharge, {
        play: (system, ship) => {
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.StoreCharge, system, ship);
        },
        determineAllowedSystems: onlyPoweredSystems,
    }],

    [EngineeringCardType.StoredCharge, {
        play: (system, ship) => {
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.StoredCharge, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],

    [EngineeringCardType.Relocate, {
        play: (system, ship) => {
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Relocating, system, ship);

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
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Relocated, firstState, ship);

            const secondState = ship.systems.get(secondSystem);
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Relocated, secondState, ship);

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
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Overcharge, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],
    [EngineeringCardType.ReactorOverload, {
        play: (system, ship) => {
            const reactorEffect = applyPrimaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.ReactorOverload, system, ship);

            for (const otherSystem of ship.systems.values()) {
                if (otherSystem.system !== ShipSystem.Reactor) {
                    applySecondaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Boost1, otherSystem, ship, reactorEffect, system);
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
        determineAllowedSystems: onlyOnlineSystemsWithNegativeEffects,
    }],
    [EngineeringCardType.Reset, {
        play: (system, ship) => {
            applySingleEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Reset, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],
    [EngineeringCardType.Rewind, {
        play: (system, ship) => {
            const currentTime = getTime();
            for (const effect of system.effects) {
                const duration = effect.endTime - effect.startTime;
                effect.startTime = currentTime;
                effect.endTime = currentTime + duration;
            }
        },
        determineAllowedSystems: onlyOnlineSystemsWithEffects,
    }],
    [EngineeringCardType.DrawPower, {
        play: (system, ship) => {
            const targetSystemIndex = ship.engineering.systemOrder.indexOf(system.system);
            
            const poweredAdjacentSystems = getAdjacentIndices(targetSystemIndex)
                .map(index => ship.systems.get(ship.engineering.systemOrder[index]))
                .filter(system => system.power > 0);

            const boostEffectType = getBoostEffectType(poweredAdjacentSystems.length);
            const boostEffect = applyPrimaryEffect(ship.engineering.nextEffectId++, boostEffectType, system, ship);

            for (const adjacentSystem of poweredAdjacentSystems) {
                applySecondaryEffect(ship.engineering.nextEffectId++, SystemStatusEffectType.Reduce1, adjacentSystem, ship, boostEffect, system);
            }
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],
]);

export const cardsByRarity = new Map<EngineeringCardRarity, EngineeringCardType[]>([
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
            EngineeringCardType.DrawPower,
        ]
    ],
    [
        EngineeringCardRarity.Rare,
        [
            EngineeringCardType.Relocate,
            EngineeringCardType.Overcharge,
            EngineeringCardType.Reset,
            EngineeringCardType.Rewind,
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
