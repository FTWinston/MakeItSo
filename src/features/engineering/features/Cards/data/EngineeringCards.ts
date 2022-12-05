import { EngineeringCard, EngineeringCardType, EngineeringCardRarity } from '../types/EngineeringCard';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { adjustHealth, applyEffect, maxSystemHealth } from '../../../utils/systemActions';
import { getRandomInt } from 'src/utils/random';
import { SystemState } from 'src/types/SystemState';

const onlyDamagedSystems = (ship: ShipState) =>
    Object.values(ship.systems)
        .filter(system => system.health < maxSystemHealth)
        .reduce((prev, current) => prev | current.system, 0 as ShipSystem);

const commonCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Boost1,
        rarity: EngineeringCardRarity.Common,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost1);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairSmall,
        rarity: EngineeringCardRarity.Common,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Repair);
            adjustHealth(systemState, 10);
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
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostWeapons,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Weapons,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostSensors,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Sensors,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostEngineering,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Reactor,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostShields,
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Shields,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.ColdRestart,
        rarity: EngineeringCardRarity.Uncommon,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            adjustHealth(systemState, 75);
            applyEffect(systemState, SystemStatusEffectType.Offline);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.HotSwap,
        rarity: EngineeringCardRarity.Uncommon,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.HotSwap);
        },
    }),
];

const rareCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Boost2,
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairMedium,
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Repair);
            adjustHealth(systemState, 25);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.SwapSystems,
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            const systemOrder = ship.engineering.systemOrder;
            const firstIndex = systemOrder.indexOf(system);
            if (firstIndex === -1 || firstIndex === systemOrder.length - 1) {
                return false;
            }

            const secondIndex = firstIndex + 2;

            const firstSystem = systemOrder[firstIndex];
            const secondSystem = systemOrder[secondIndex];

            const firstState = ship.systems[firstSystem];
            applyEffect(firstState, SystemStatusEffectType.SwapVertical);

            const secondState = ship.systems[secondSystem];
            applyEffect(secondState, SystemStatusEffectType.SwapVertical);

            systemOrder[firstIndex] = secondSystem;
            systemOrder[secondIndex] = firstSystem;
        },
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .slice(0, ship.engineering.systemOrder.length - 2)
            .reduce((prev, current) => prev | current, 0 as ShipSystem),
    }),

    id => ({
        id,
        type: EngineeringCardType.Purge,
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            const effects = systemState.effects
                .filter(effect => {
                    if (effect.positive === false) {
                        effect.remove(systemState, true);
                        return false;
                    }
                    return true;
                });

            if (effects.length !== systemState.effects.length) {
                systemState.effects = effects;
            }
        },
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .filter(system => ship.systems[system].effects.some(effect => effect.positive === false))
            .reduce((prev, current) => prev | current, 0 as ShipSystem),
    }),
];

const epicCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Overload,
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Overload);
        },
    }),
    
    id => ({
        id,
        type: EngineeringCardType.Supercharge,
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Supercharge);

            const systemOrder = ship.engineering.systemOrder;
            const index = systemOrder.indexOf(system);

            const adjacentSystems: SystemState[] = [];
            if (index > 1) {
                const adjacentSystem = systemOrder[index - 2];
                adjacentSystems.push(ship.systems[adjacentSystem]);
            }
            if (index < systemOrder.length - 1) {
                const adjacentSystem = systemOrder[index + 2];
                adjacentSystems.push(ship.systems[adjacentSystem]);
            }
            if (index % 2 === 0) {
                const adjacentSystem = systemOrder[index + 1];
                adjacentSystems.push(ship.systems[adjacentSystem]);
            }
            else {
                const adjacentSystem = systemOrder[index - 1];
                adjacentSystems.push(ship.systems[adjacentSystem]);
            }

            for (const adjacentSystem of adjacentSystems) {
                adjustHealth(adjacentSystem, 20);
                applyEffect(adjacentSystem, SystemStatusEffectType.Damage);
            }
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairLarge,
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            const systemState = ship.systems[system];
            applyEffect(systemState, SystemStatusEffectType.Repair);
            adjustHealth(systemState, 50);
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),
];

export function createCommonCard(id: number) {
    const index = getRandomInt(commonCards.length);

    return commonCards[index](id);
}

export function createUncommonCard(id: number) {
    const index = getRandomInt(uncommonCards.length);

    return uncommonCards[index](id);
}

export function createRareCard(id: number) {
    const index = getRandomInt(rareCards.length);

    return rareCards[index](id);
}

export function createEpicCard(id: number) {
    const index = getRandomInt(epicCards.length);

    return epicCards[index](id);
}

const commonChance = 0.5;
const uncommonChance = 0.33;
const rareChance = 0.15;
const epicChance = 0.02;

const cumulativeCommonChance = commonChance;
const cumulativeUncommonChance = cumulativeCommonChance + uncommonChance;
const cumulativeRareChance = cumulativeUncommonChance + rareChance;
const cumulativeTotalChance = cumulativeRareChance + epicChance;

export function createCard(id: number): EngineeringCard {
    const randomValue = Math.random() * cumulativeTotalChance;

    if (randomValue < cumulativeCommonChance) {
        return createCommonCard(id);
    }
    else if (randomValue < cumulativeUncommonChance) {
        return createUncommonCard(id);
    }
    else if (randomValue < cumulativeRareChance) {
        return createRareCard(id);
    }
    else {
        return createEpicCard(id);
    }
}