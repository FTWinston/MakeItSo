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
    DivertHull = 'divertHull',
    DivertShields = 'divertShields',
    DivertSensors = 'divertSensors',
    DivertWeapons = 'divertWeapons',
    DivertEngines = 'divertEngines',
    DivertReactor = 'divertReactor',
    ReplaceHull = 'replaceHull',
    ReplaceShields = 'replaceShields',
    ReplaceSensors = 'replaceSensors',
    ReplaceWeapons = 'replaceWeapons',
    ReplaceEngines = 'replaceEngines',
    ReplaceReactor = 'replaceReactor',
    Overcharge = 'overcharge',
    ReactorOverload = 'reactorOverload',
    Purge = 'purge',
    Reset = 'reset',
    Rebuild = 'rebuild',
    Rewind = 'rewind',
    DrawPower = 'drawPower',
    FocusShields = 'focusShields',
    BalanceShields = 'balanceShields',
}

export interface EngineeringCardInfo {
    id: number;
    type: EngineeringCardType;
    rarity: EngineeringCardRarity;
    allowedSystems?: ShipSystem;
    descParams?: Partial<Record<string, number | string>>;
}

export interface EngineeringCard extends EngineeringCardInfo {
    play: (system: SystemState, ship: ShipState) => void | false;
    determineAllowedSystems?: (ship: ShipState) => ShipSystem;
}
