import { CardRarity, PowerCardInfo } from '../../data/PowerCard';

let nextCardId = 1;

export const commonCard: () => PowerCardInfo = () => ({
    name: 'Common card',
    description: 'This is an example card that does nothing.',
    rarity: CardRarity.Common,
    id: ++nextCardId,
});

export const uncommonCard: () => PowerCardInfo = () => ({
    name: 'Uncommon card with long name',
    description: 'This is an example card that does nothing.',
    rarity: CardRarity.Uncommon,
    id: ++nextCardId,
});

export const rareCard: () => PowerCardInfo = () => ({
    name: 'Rare card',
    description: 'This is an example card.',
    rarity: CardRarity.Rare,
    id: ++nextCardId,
});

export const epicCard: () => PowerCardInfo = () => ({
    name: 'Epic card',
    description: 'This is an example card that does nothing, with longer text.',
    rarity: CardRarity.Epic,
    id: ++nextCardId,
});
