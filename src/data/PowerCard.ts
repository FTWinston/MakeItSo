import { System } from './System';

export enum CardRarity {
    Common,
    Uncommon,
    Rare,
    Epic,
}

export interface PowerCardInfo {
    id: number;
    name: string;
    description: string;
    rarity: CardRarity;
}

export interface PowerCardData extends PowerCardInfo {
    play: (system: System) => void;
}

export function getRarityName(rarity: CardRarity) {
    switch (rarity) {
        case CardRarity.Common:
            return 'Common';
        case CardRarity.Uncommon:
            return 'Uncommon';
        case CardRarity.Rare:
            return 'Rare';
        case CardRarity.Epic:
            return 'Epic';
    }
}
