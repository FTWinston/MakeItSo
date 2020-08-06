import { CardRarity, PowerCardData, PowerCardType } from '../../data/PowerCard';

let nextCardId = 1;

export const commonCard: () => PowerCardData = () => ({
    type: PowerCardType.Card1,
    name: 'Common card',
    description: 'This is an example card that does nothing.',
    rarity: CardRarity.Common,
    id: ++nextCardId,
    play: () => {},
});

export const uncommonCard: () => PowerCardData = () => ({
    type: PowerCardType.Card2,
    name: 'Uncommon card with long name',
    description: 'This is an example card that does nothing.',
    rarity: CardRarity.Uncommon,
    id: ++nextCardId,
    play: () => {},
});

export const rareCard: () => PowerCardData = () => ({
    type: PowerCardType.Card3,
    name: 'Rare card',
    description: 'This is an example card.',
    rarity: CardRarity.Rare,
    id: ++nextCardId,
    play: () => {},
});

export const epicCard: () => PowerCardData = () => ({
    type: PowerCardType.Card4,
    name: 'Epic card',
    description: 'This is an example card that does nothing, with longer text.',
    rarity: CardRarity.Epic,
    id: ++nextCardId,
    play: () => {},
});
