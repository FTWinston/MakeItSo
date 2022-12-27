import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';

export enum EngineeringCardRarity {
    Common = 1,
    Uncommon = 2,
    Rare = 3,
    Epic = 4,
}

export enum EngineeringCardType {
    AuxPower = 'auxPower',
    StoreCharge = 'storeCharge',
    StoredCharge = 'storedCharge',
    Relocate = 'relocate',
    RelocateHere = 'relocateHere',


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
    play: (system: SystemState, ship: ShipState) => void | false;
    determineAllowedSystems?: (ship: ShipState) => ShipSystem;
}
