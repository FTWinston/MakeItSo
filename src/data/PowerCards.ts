import { PowerCardData, PowerCardType, CardRarity } from './PowerCard';
import { System } from './System';
import { createEffect } from './PowerEffects';
import { PowerEffectType } from './PowerEffect';

const commonCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Boost1,
        name: 'Boost +1',
        description: "Boosts a system's power by 1 for 15s",
        rarity: CardRarity.Common,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost1);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.RepairSmall,
        name: 'Repair 1',
        description: "Increases a system's health by 10%",
        rarity: CardRarity.Common,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Repair);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);

            // TODO: restore health
            // ship.systemHealth[system] += 10;
        },
    }),
];

const uncommonCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.BoostHelm,
        name: 'Boost Helm',
        description: "Boosts helm power by 2 for 12s",
        rarity: CardRarity.Uncommon,
        allowedSystems: System.Helm,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.BoostFTL,
        name: 'Boost FTL',
        description: "Boosts FTL power by 2 for 12s",
        rarity: CardRarity.Uncommon,
        allowedSystems: System.FTL,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.BoostWeapons,
        name: 'Boost Weapons',
        description: "Boosts weapons power by 2 for 12s",
        rarity: CardRarity.Uncommon,
        allowedSystems: System.Weapons,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.BoostSensors,
        name: 'Boost Sensors',
        description: "Boosts sensor power by 2 for 12s",
        rarity: CardRarity.Uncommon,
        allowedSystems: System.Sensors,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.BoostEngineering,
        name: 'Boost Engineering',
        description: "Boosts engineering power by 2 for 12s",
        rarity: CardRarity.Uncommon,
        allowedSystems: System.Engineering,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.BoostShields,
        name: 'Boost Shields',
        description: "Boosts shield power by 2 for 12s",
        rarity: CardRarity.Uncommon,
        // allowedSystems: System.Shields,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),
];

const rareCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Boost2,
        name: 'Boost +2',
        description: "Boosts a system's power by 2 for 12s",
        rarity: CardRarity.Epic,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost2);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),

    id => ({
        id,
        type: PowerCardType.RepairMedium,
        name: 'Repair 2',
        description: "Increases a system's health by 25%",
        rarity: CardRarity.Rare,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Repair);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);

            // TODO: restore health
            // ship.systemHealth[system] += 25;
        },
    }),
];

const epicCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Overload,
        name: 'Overload',
        description: "Boosts a system's power by 3 for 12s, then damages it",
        rarity: CardRarity.Epic,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Overload);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),
    
    id => ({
        id,
        type: PowerCardType.RepairLarge,
        name: 'Repair 3',
        description: "Increases a system's health by 50%",
        rarity: CardRarity.Epic,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Repair);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);

            // TODO: restore health
            // ship.systemHealth[system] += 50;
        },
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

export function createCard(id: number): PowerCardData {
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