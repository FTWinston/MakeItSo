import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';

export enum EngineeringCardRarity {
    Common = 1,
    Uncommon = 2,
    Rare = 3,
    Epic = 4,
}

export enum EngineeringCardType {
    Boost1 = 'boost1',
    BoostHelm = 'boostHelm',
    BoostWeapons = 'boostWeapons',
    BoostSensors = 'boostSensors',
    BoostEngineering = 'boostReactor',
    BoostShields = 'boostShields',
    Boost2 = 'boost2',
    RepairSmall = 'repairSmall',
    RepairMedium = 'repairMedium',
    RepairLarge = 'repairLarge',
    Overload = 'overload',

    SwapSystems = 'swapSystems',
    Purge = 'purge',
    ColdRestart = 'coldRestart',
    HotSwap = 'hotSwap',
    Supercharge = 'superCharge',
}

export interface EngineeringCardInfo {
    id: number;
    type: EngineeringCardType;
    rarity: EngineeringCardRarity;
    allowedSystems?: ShipSystem;
}

export interface EngineeringCard extends EngineeringCardInfo {
    play: (ship: ShipState, system: ShipSystem) => void | false;
    determineAllowedSystems?: (ship: ShipState) => ShipSystem;
}
