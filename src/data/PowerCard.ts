import { System } from './System';
import { ShipState } from './ShipState';

export enum CardRarity {
    Common,
    Uncommon,
    Rare,
    Epic,
}

export enum PowerCardType {
    Boost1,
    BoostHelm,
    BoostFTL,
    BoostWeapons,
    BoostSensors,
    BoostEngineering,
    BoostShields,
    Boost2,
    RepairSmall,
    RepairMedium,
    RepairLarge,
    Overload,
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
    play: (ship: ShipState, system: System) => void | false;
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
