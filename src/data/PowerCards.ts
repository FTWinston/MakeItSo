import { PowerCardData, PowerCardType, CardRarity } from './PowerCard';
import { System } from './System';
import { createEffect } from './PowerEffects';
import { PowerEffectType } from './PowerEffect';

const commonCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Card1,
        name: 'Boost +1',
        description: "Boosts a system's power by 1 level for 15s",
        rarity: CardRarity.Common,
        play: (ship, system) => {
            const effect = createEffect(PowerEffectType.Boost1);
            ship.power.effects[system].push(effect);
            effect.apply(ship, system);
        },
    }),
];

const uncommonCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Card1,
        name: 'Card 1',
        description: 'Does something',
        rarity: CardRarity.Common,
        allowedSystems: System.Helm | System.FTL,
        play: (ship, system) => {
            // TODO
        },
    }),
];

const rareCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Card1,
        name: 'Card 1',
        description: 'Does something',
        rarity: CardRarity.Common,
        allowedSystems: System.Helm | System.FTL,
        play: (ship, system) => {
            // TODO
        },
    }),
];

const epicCards: Array<(id: number) => PowerCardData> = [
    id => ({
        id,
        type: PowerCardType.Card1,
        name: 'Card 1',
        description: 'Does something',
        rarity: CardRarity.Common,
        allowedSystems: System.Helm | System.FTL,
        play: (ship, system) => {
            // TODO
        },
    }),
];

function getRandomInt(maxExclusive: number) {
    return Math.floor(Math.random() * maxExclusive);
}

function createCommonCard(id: number) {
    const index = getRandomInt(commonCards.length);

    return commonCards[index](id);
}

function createUncommonCard(id: number) {
    const index = getRandomInt(uncommonCards.length);

    return uncommonCards[index](id);
}

function createRareCard(id: number) {
    const index = getRandomInt(rareCards.length);

    return rareCards[index](id);
}

function createEpicCard(id: number) {
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