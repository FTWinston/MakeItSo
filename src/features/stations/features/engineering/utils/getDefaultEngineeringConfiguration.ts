import { EngineeringCardType } from '../features/Cards';
import { EngineeringConfiguration } from '../types/EngineeringConfiguration';

export function getDefaultEngineeringConfiguration(): EngineeringConfiguration {
    return {
        activeCards: [
            EngineeringCardType.AuxPower,
            EngineeringCardType.AuxPower,
            EngineeringCardType.AuxPower,
            EngineeringCardType.StoreCharge,
            EngineeringCardType.StoreCharge,
            EngineeringCardType.StoreCharge,
            EngineeringCardType.Relocate,
            EngineeringCardType.DivertShields,
            EngineeringCardType.DivertSensors,
            EngineeringCardType.DivertWeapons,
            EngineeringCardType.DivertEngines,
            EngineeringCardType.DivertReactor,
            EngineeringCardType.Overcharge,
            EngineeringCardType.Purge,
            EngineeringCardType.FocusShields,
        ],
        inactiveCards: [],
    }
}