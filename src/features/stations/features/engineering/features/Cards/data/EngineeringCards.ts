import { EngineeringCard, EngineeringCardType, EngineeringCardRarity } from '../types/EngineeringCard';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { applyPrimaryEffect, applySecondaryEffect, applySingleEffect, removeEffect } from '../../../utils/systemActions';
import { Random } from 'src/utils/random';
import { ShipInfo } from 'src/types/ShipInfo';
import { ShipSystem, ShipSystemWithNone } from 'src/types/ShipSystem';
import { maxSystemHealth, SystemState } from 'src/types/SystemState';
import { DefiniteMap } from 'src/types/DefiniteMap';
import { getTime } from 'src/utils/timeSpans';

function filterSystems(filter: (system: SystemState) => boolean) {
    return (ship: ShipInfo) =>
        [...ship.systems.values()]
        .filter(filter)
        .reduce((prev, current) => prev | current.system, 0 as ShipSystemWithNone);
}

const onlyDamagedSystems = filterSystems(system => system.health < maxSystemHealth);
const onlyOnlineSystemsWithEffects = filterSystems(system => system.health > 0 && system.effects.length > 0);
const onlyOnlineSystemsWithNegativeEffects = filterSystems(system => system.health > 0 && system.effects.some(effect => effect.positive === false));
const onlyOnlineSystems = filterSystems(system => system.health > 0);
const onlyPoweredSystems = filterSystems(system => system.power > 0);
const onlySystemsWithEffect = (effectType: SystemStatusEffectType) => filterSystems(system => system.effects.find(effect => effect.type === effectType) !== undefined);
const notHullOrShields = filterSystems(system => system.system !== ShipSystem.Hull && system.system !== ShipSystem.Shields);

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

type CardBehavior = Omit<EngineeringCard, 'id' | 'type'>;

function createDivertBehavior(fromSystem: ShipSystem): CardBehavior {
    return {
        rarity: EngineeringCardRarity.Uncommon,
        play: (system, ship) => {
            const fromSystemState = ship.systems.get(fromSystem);
            
            const boostEffect = applyPrimaryEffect(SystemStatusEffectType.DivertTo, system, ship);
            applySecondaryEffect(SystemStatusEffectType.DivertFrom, fromSystemState, ship, boostEffect, system);
        },
        determineAllowedSystems: ship => ship.systems.get(fromSystem).power >= 2
            ? [...ship.systems.values()]
                .filter(system => system.system !== fromSystem && system.health > 0)
                .reduce((prev, current) => prev | current.system, 0 as ShipSystemWithNone)
            : 0,
        descParams: {
            power: 2,
            duration: 15,
        }
    }
}

function createReplaceBehavior(system: ShipSystem): CardBehavior {
    return {
        rarity: EngineeringCardRarity.Epic,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.Replace, system, ship);
        },
        determineAllowedSystems: () => system,
        descParams: {
            duration: 5,
        }
    }
}

const cardBehaviorByIdentifier: Map<EngineeringCardType, CardBehavior> = new Map([
    [EngineeringCardType.AuxPower, {
        rarity: EngineeringCardRarity.Common,
        play: (system, ship) => {
            for (const otherSystemState of ship.systems.values()) {
                removeEffect(otherSystemState, ship, SystemStatusEffectType.AuxPower);
            }

            applySingleEffect(SystemStatusEffectType.AuxPower, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
        descParams: {
            power: 1,
            duration: 60,
        }
    }],

    [EngineeringCardType.StoreCharge, {
        rarity: EngineeringCardRarity.Common,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.StoreCharge, system, ship);
        },
        determineAllowedSystems: onlyPoweredSystems,
        descParams: {
            power: 1,
            duration: 30,
        }
    }],

    [EngineeringCardType.StoredCharge, {
        rarity: EngineeringCardRarity.Uncommon,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.StoredCharge, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
        descParams: {
            power: 1,
            duration: 10,
        }
    }],

    [EngineeringCardType.Relocate, {
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.Relocating, system, ship);

            const newCard = createCard(ship.engineering.nextCardId++, EngineeringCardType.RelocateHere);
            ship.engineering.handCards.push(newCard);
        },
        determineAllowedSystems: onlyOnlineSystems,
    }],

    [EngineeringCardType.RelocateHere, {
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            // Find the system with the "relocating" effect.
            const swapWithSystem = [...ship.systems.values()]
                .find(system => system.effects.find(effect => effect.type === SystemStatusEffectType.Relocating))
                ?.system

            if (!swapWithSystem) {
                return;
            }

            // Swap places with that system.
            const systemOrder = ship.engineering.systemOrder;
            const firstIndex = systemOrder.indexOf(system.system);
            const secondIndex = systemOrder.indexOf(swapWithSystem);
            if (firstIndex === -1 || secondIndex === -1) {
                return;
            }

            const firstSystem = systemOrder[firstIndex];
            const secondSystem = systemOrder[secondIndex];
            systemOrder[firstIndex] = secondSystem;
            systemOrder[secondIndex] = firstSystem;

            // Apply a temporary effect to both.
            const firstState = ship.systems.get(firstSystem);
            applySingleEffect(SystemStatusEffectType.Relocated, firstState, ship);

            const secondState = ship.systems.get(secondSystem);
            applySingleEffect(SystemStatusEffectType.Relocated, secondState, ship);

            // Remove the "Relocating" effect from the swapped system.
            removeEffect(secondState, ship, SystemStatusEffectType.Relocating);
        },
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .filter(system => ship.systems.get(system).effects.some(effect => effect.type === SystemStatusEffectType.Relocating)) // systems with effect
            .map(system => ship.engineering.systemOrder.indexOf(system)) // indexes with effect
            .flatMap(index => getAdjacentIndices(index)) // adjacent indexes to effect
            .map(index => ship.engineering.systemOrder[index]) // adjacent systems to effect
            .reduce((prev, current) => prev | current, 0 as ShipSystemWithNone)
    }],

    [EngineeringCardType.DivertHull, createDivertBehavior(ShipSystem.Hull)],
    [EngineeringCardType.DivertShields, createDivertBehavior(ShipSystem.Shields)],
    [EngineeringCardType.DivertSensors, createDivertBehavior(ShipSystem.Sensors)],
    [EngineeringCardType.DivertWeapons, createDivertBehavior(ShipSystem.Weapons)],
    [EngineeringCardType.DivertEngines, createDivertBehavior(ShipSystem.Engines)],
    [EngineeringCardType.DivertReactor, createDivertBehavior(ShipSystem.Reactor)],

    [EngineeringCardType.ReplaceHull, createReplaceBehavior(ShipSystem.Hull)],
    [EngineeringCardType.ReplaceShields, createReplaceBehavior(ShipSystem.Shields)],
    [EngineeringCardType.ReplaceSensors, createReplaceBehavior(ShipSystem.Sensors)],
    [EngineeringCardType.ReplaceWeapons, createReplaceBehavior(ShipSystem.Weapons)],
    [EngineeringCardType.ReplaceEngines, createReplaceBehavior(ShipSystem.Engines)],
    [EngineeringCardType.ReplaceReactor, createReplaceBehavior(ShipSystem.Reactor)],

    [EngineeringCardType.Overcharge, {
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.Overcharge, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
        descParams: {
            power: 2,
            duration: 10,
            damage: 25,
        }
    }],
    [EngineeringCardType.ReactorOverload, {
        rarity: EngineeringCardRarity.Epic,
        play: (system, ship) => {
            const reactorEffect = applyPrimaryEffect(SystemStatusEffectType.ReactorOverload, system, ship);

            for (const otherSystem of ship.systems.values()) {
                if (otherSystem.system !== ShipSystem.Reactor) {
                    applySecondaryEffect(SystemStatusEffectType.ReactorSurplus, otherSystem, ship, reactorEffect, system);
                }
            }
        },
        determineAllowedSystems: ship => ship.systems.get(ShipSystem.Reactor).health > 0 ? ShipSystem.Reactor : 0,
        descParams: {
            power: 1,
            duration: 12,
            damage: 50,
        }
    }],
    [EngineeringCardType.Purge, {
        rarity: EngineeringCardRarity.Uncommon,
        play: (system, ship) => {
            const removeIndex = system.effects.findIndex(effect => effect.positive === false);
            system.effects.splice(removeIndex, 1);
        },
        determineAllowedSystems: onlyOnlineSystemsWithNegativeEffects,
    }],
    [EngineeringCardType.Reset, {
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.Reset, system, ship);
        },
        determineAllowedSystems: onlyOnlineSystems,
        descParams: {
            duration: 2,
        }
    }],
    [EngineeringCardType.Rebuild, {
        rarity: EngineeringCardRarity.Rare,
        play: (system, ship) => {
            applySingleEffect(SystemStatusEffectType.Rebuild, system, ship);
        },
        determineAllowedSystems: onlyDamagedSystems,
        descParams: {
            duration: 10,
            damage: 50,
        }
    }],
    [EngineeringCardType.Rewind, {
        rarity: EngineeringCardRarity.Rare,
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
        rarity: EngineeringCardRarity.Uncommon,
        play: (system, ship) => {
            const targetSystemIndex = ship.engineering.systemOrder.indexOf(system.system);
            
            const poweredAdjacentSystems = getAdjacentIndices(targetSystemIndex)
                .map(index => ship.systems.get(ship.engineering.systemOrder[index]))
                .filter(system => system.power > 0);

            let boostEffectType;
            switch (poweredAdjacentSystems.length) {
                case 0:
                    return;
                case 1:
                    boostEffectType = SystemStatusEffectType.DrawPower1;
                    break;
                case 2:
                    boostEffectType = SystemStatusEffectType.DrawPower2;
                    break;
                default:
                    boostEffectType = SystemStatusEffectType.DrawPower3;
                    break;
            }

            const boostEffect = applyPrimaryEffect(boostEffectType, system, ship);
            
            for (const adjacentSystem of poweredAdjacentSystems) {
                applySecondaryEffect(SystemStatusEffectType.DrawnPower, adjacentSystem, ship, boostEffect, system);
            }
        },
        determineAllowedSystems: onlyOnlineSystems,
        descParams: {
            power: 1,
            duration: 10,
        }
    }],
    [EngineeringCardType.FocusShields, {
        rarity: EngineeringCardRarity.Common,
        play: (system, ship) => {
            for (const otherSystemState of ship.systems.values()) {
                removeEffect(otherSystemState, ship, SystemStatusEffectType.ShieldFocus);
            }

            applySingleEffect(SystemStatusEffectType.ShieldFocus, system, ship);
            
            const newCard = createCard(ship.engineering.nextCardId++, EngineeringCardType.BalanceShields);
            ship.engineering.handCards.push(newCard);
        },
        determineAllowedSystems: notHullOrShields,
    }],
    [EngineeringCardType.BalanceShields, {
        rarity: EngineeringCardRarity.Common,
        play: (system, ship) => {
            removeEffect(system, ship, SystemStatusEffectType.ShieldFocus);
        },
        determineAllowedSystems: onlySystemsWithEffect(SystemStatusEffectType.ShieldFocus),
    }],
]);

const cardsToCreateRandomlyByRarity = new Map<EngineeringCardRarity, EngineeringCardType[]>([
    [ EngineeringCardRarity.Common, []],
    [ EngineeringCardRarity.Uncommon, []],
    [ EngineeringCardRarity.Rare, []],
    [ EngineeringCardRarity.Epic, []],
]) as DefiniteMap<EngineeringCardRarity, EngineeringCardType[]>;

// This list of cards are the ones that can be created randomly. Put them in the right bucket of the above map.
[
    EngineeringCardType.AuxPower,
    EngineeringCardType.StoreCharge,
    EngineeringCardType.DivertHull,
    EngineeringCardType.DivertShields,
    EngineeringCardType.DivertSensors,
    EngineeringCardType.DivertWeapons,
    EngineeringCardType.DivertEngines,
    EngineeringCardType.DivertReactor,
    EngineeringCardType.Purge,
    EngineeringCardType.DrawPower,
    EngineeringCardType.Relocate,
    EngineeringCardType.Overcharge,
    EngineeringCardType.Reset,
    EngineeringCardType.Rebuild,
    EngineeringCardType.Rewind,
    EngineeringCardType.ReactorOverload,
    EngineeringCardType.ReplaceHull,
    EngineeringCardType.ReplaceShields,
    EngineeringCardType.ReplaceSensors,
    EngineeringCardType.ReplaceWeapons,
    EngineeringCardType.ReplaceEngines,
    EngineeringCardType.ReplaceReactor,
].forEach(identifier => {
    const rarity = cardBehaviorByIdentifier.get(identifier)?.rarity ?? EngineeringCardRarity.Common;
    cardsToCreateRandomlyByRarity.get(rarity).push(identifier);
});

export function createCard(id: number, type: EngineeringCardType): EngineeringCard {
    const behavior = cardBehaviorByIdentifier.get(type);

    if (behavior === undefined) {
        throw new Error(`Card not found: ${type}`);
    }

    return {
        id,
        type,
        ...behavior,
    };
}

export function createCardByRarity(random: Random, id: number, rarity: EngineeringCardRarity) {
    const possibleCards = cardsToCreateRandomlyByRarity.get(rarity);
    const type = random.pick(possibleCards);
    return createCard(id, type);
}

const commonChance = 0.5;
const uncommonChance = 0.33;
const rareChance = 0.15;
const epicChance = 0.02;

const cumulativeCommonChance = commonChance;
const cumulativeUncommonChance = cumulativeCommonChance + uncommonChance;
const cumulativeRareChance = cumulativeUncommonChance + rareChance;
const cumulativeTotalChance = cumulativeRareChance + epicChance;

export function createRandomCard(random: Random, id: number): EngineeringCard {
    const randomValue = random.getFloat() * cumulativeTotalChance;
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

    return createCardByRarity(random, id, rarity);
}

export function createCards(ids: number[]): EngineeringCard[] {
    const results: EngineeringCard[] = [];
    const random = new Random();

    for (const id of ids) {
        let newCard: EngineeringCard;

        do {
            newCard = createRandomCard(random, id);
        } while (results.some(card => card.type === newCard.type));

        results.push(newCard);
    }

    return results;
}
