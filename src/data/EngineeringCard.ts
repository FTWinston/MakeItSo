import { System } from './System';
import { ShipState } from './ShipState';

export enum EngineeringCardRarity {
    Common,
    Uncommon,
    Rare,
    Epic,
}

export enum EngineeringCardType {
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

    SwapSystems,
    Purge,
    ColdRestart,
    HotSwap,
    Supercharge,
}

export interface EngineeringCardInfo {
    id: number;
    type: EngineeringCardType;
    name: string;
    description: string;
    rarity: EngineeringCardRarity;
    allowedSystems?: System;
}

export interface EngineeringCardData extends EngineeringCardInfo {
    play: (ship: ShipState, system: System) => void | false;
    determineAllowedSystems?: (ship: ShipState) => System;
}

export function getRarityName(rarity: EngineeringCardRarity) {
    switch (rarity) {
        case EngineeringCardRarity.Common:
            return 'Common';
        case EngineeringCardRarity.Uncommon:
            return 'Uncommon';
        case EngineeringCardRarity.Rare:
            return 'Rare';
        case EngineeringCardRarity.Epic:
            return 'Epic';
    }
}
