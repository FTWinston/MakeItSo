import { CardRarity, PowerCardInfo } from '../../data/PowerCard';

export const commonCard: PowerCardInfo = {
    name:"Common card",
    description:"This is an example card that does nothing.",
    rarity:CardRarity.Common,
};

export const uncommonCard: PowerCardInfo = {
    name:"Uncommon card with long name",
    description:"This is an example card that does nothing.",
    rarity:CardRarity.Uncommon,
};

export const rareCard: PowerCardInfo = {
    name:"Rare card",
    description:"This is an example card.",
    rarity:CardRarity.Rare,
};

export const epicCard: PowerCardInfo = {
    name:"Epic card",
    description:"This is an example card that does nothing, with longer text.",
    rarity:CardRarity.Epic,
};
