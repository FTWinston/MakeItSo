import { EngineeringCard, EngineeringCardType, EngineeringCardRarity } from '../types/EngineeringCard';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
// import { applyEffect, adjustHealth } from '../../../common/data/server/SystemState';

const onlyDamagedSystems = (ship: ShipState) => ShipSystem.Hull;
/*
    ship.engineering.systemOrder
    .filter(system => ship.systemInfo[system].health < 100)
    .reduce((prev, current) => prev | current, 0 as System);
*/

const commonCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Boost1,
        name: 'Boost +1',
        description: "Boosts a system's power by 1 for 15s",
        rarity: EngineeringCardRarity.Common,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost1);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairSmall,
        name: 'Repair 1',
        description: "Restores 10% of a system's health",
        rarity: EngineeringCardRarity.Common,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Repair);
            adjustHealth(systemState, 10);
            */
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),
];

const uncommonCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.BoostHelm,
        name: 'Boost Helm',
        description: "Boosts helm power by 2 for 12s",
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Engines,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostWeapons,
        name: 'Boost Weapons',
        description: "Boosts weapons power by 2 for 12s",
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Weapons,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostSensors,
        name: 'Boost Sensors',
        description: "Boosts sensor power by 2 for 12s",
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Sensors,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostEngineering,
        name: 'Boost Engineering',
        description: "Boosts engineering power by 2 for 12s",
        rarity: EngineeringCardRarity.Uncommon,
        determineAllowedSystems: () => ShipSystem.Reactor,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.BoostShields,
        name: 'Boost Shields',
        description: "Boosts shield power by 2 for 12s",
        rarity: EngineeringCardRarity.Uncommon,
        // determineAllowedSystems: () => System.Shields,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.ColdRestart,
        name: 'Cold Restart',
        description: "Repair 75 damage, but drain all power from target system for 12 seconds",
        rarity: EngineeringCardRarity.Uncommon,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            adjustHealth(systemState, 75);
            applyEffect(systemState, SystemStatusEffectType.Offline);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.HotSwap,
        name: 'Hot Swap',
        description: "Drain all power from target system for 3 seconds, then repair 30 damage",
        rarity: EngineeringCardRarity.Uncommon,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.HotSwap);
            */
        },
    }),
];

const rareCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Boost2,
        name: 'Boost +2',
        description: "Boosts a system's power by 2 for 12s",
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Boost2);
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairMedium,
        name: 'Repair 2',
        description: "Restores 25% of a system's health",
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Repair);
            adjustHealth(systemState, 25);
            */
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),

    id => ({
        id,
        type: EngineeringCardType.SwapSystems,
        name: 'Swap Systems',
        description: 'Swaps the position of the selected system with the one below it',
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            /*
            const systemOrder = ship.engineering.systemOrder;
            const firstIndex = systemOrder.indexOf(system);
            if (firstIndex === -1 || firstIndex === systemOrder.length - 1) {
                return false;
            }

            const secondIndex = firstIndex + 1;

            const firstSystem = systemOrder[firstIndex];
            const secondSystem = systemOrder[secondIndex];

            const firstState = ship.systemInfo[firstSystem];
            applyEffect(firstState, SystemStatusEffectType.Swap);

            const secondState = ship.systemInfo[secondSystem];
            applyEffect(secondState, SystemStatusEffectType.Swap);

            systemOrder[firstIndex] = secondSystem;
            systemOrder[secondIndex] = firstSystem;

            firstState.modified = true;
            secondState.modified = true;
            */
        },
        /*
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .slice(0, ship.engineering.systemOrder.length - 1)
            .reduce((prev, current) => prev | current, 0 as System),
        */
    }),

    id => ({
        id,
        type: EngineeringCardType.Purge,
        name: 'Purge',
        description: 'Removes all negative effects from a system',
        rarity: EngineeringCardRarity.Rare,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
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
            */
        },
        /*
        determineAllowedSystems: ship => ship.engineering.systemOrder
            .filter(system => ship.systemInfo[system].effects.some(effect => effect.positive === false))
            .reduce((prev, current) => prev | current, 0 as System),
        */
    }),
];

const epicCards: Array<(id: number) => EngineeringCard> = [
    id => ({
        id,
        type: EngineeringCardType.Overload,
        name: 'Overload',
        description: "Boosts a system's power by 3 for 12s, then damages it",
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Overload);
            */
        },
    }),
    
    id => ({
        id,
        type: EngineeringCardType.Supercharge,
        name: 'Supercharge',
        description: "Damages adjacent systems, boosts a system's power by 4 for 10s, then damages it",
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Supercharge);

            const systemOrder = ship.engineering.systemOrder;
            const index = systemOrder.indexOf(system);

            if (index > 0) {
                const prevSystem = systemOrder[index - 1];
                const prevSystemState = ship.systemInfo[prevSystem];
                
                adjustHealth(prevSystemState, 20);
                applyEffect(prevSystemState, SystemStatusEffectType.Damage);
            }
            
            if (index < systemOrder.length - 1) {
                const nextSystem = systemOrder[index + 1];
                const nextSystemState = ship.systemInfo[nextSystem];
                
                adjustHealth(nextSystemState, 20);
                applyEffect(nextSystemState, SystemStatusEffectType.Damage);
            }
            */
        },
    }),

    id => ({
        id,
        type: EngineeringCardType.RepairLarge,
        name: 'Repair 3',
        description: "Restores 50% of a system's health",
        rarity: EngineeringCardRarity.Epic,
        play: (ship, system) => {
            /*
            const systemState = ship.systemInfo[system];
            applyEffect(systemState, SystemStatusEffectType.Repair);
            adjustHealth(systemState, 50);
            */
        },
        determineAllowedSystems: onlyDamagedSystems,
    }),
];

function getRandomInt(maxExclusive: number) {
    return Math.floor(Math.random() * maxExclusive);
}

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