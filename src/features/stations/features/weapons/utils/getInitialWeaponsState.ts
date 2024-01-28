import { ShipType } from 'src/types/ShipType';
import { WeaponsState } from '../types/WeaponsState';
import { WeaponsConfiguration } from '../types/WeaponsConfiguration';
import { Random } from 'src/utils/random';

export function getInitialWeaponsState(shipType: ShipType, configuration: WeaponsConfiguration, random: Random): WeaponsState {
    // TODO: use configuration & ship type
    
    return {
        configuration,
    };
}