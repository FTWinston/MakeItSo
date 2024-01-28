import { ShipType } from 'src/types/ShipType';
import { WeaponsState } from '../types/WeaponsState';
import { WeaponsConfiguration } from '../types/WeaponsConfiguration';

export function getInitialWeaponsState(shipType: ShipType, configuration: WeaponsConfiguration): WeaponsState {
    // TODO: use configuration & ship type
    
    return {
        configuration,
    };
}