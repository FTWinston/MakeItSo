import { System } from './System';
import { ShipState } from './ShipState';

export enum CardRarity {
    Common,
    Uncommon,
    Rare,
    Epic,
}

export enum PowerCardType {
    Card1,
    Card2,
    Card3,
    Card4,
}

export interface PowerCardInfo {
    id: number;
    type: PowerCardType;
    name: string;
    description: string;
    rarity: CardRarity;
    allowedSystems?: System;
}

export interface PowerCardData extends PowerCardInfo {
    play: (ship: ShipState, system: System) => void;
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
