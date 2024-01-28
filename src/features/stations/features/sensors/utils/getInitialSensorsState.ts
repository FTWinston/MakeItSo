import { Reference } from 'src/classes/Reference';
import { SensorsState } from '../types/SensorsState';
import { ShipType } from 'src/types/ShipType';
import { SensorsConfiguration } from '../types/SensorsConfiguration';

export function getInitialSensorsState(shipType: ShipType, configuration: SensorsConfiguration): SensorsState {
    // TODO: use configuration & ship type

    return {
        configuration,
        possibleTargets: [],
        currentTarget: Reference.empty(),
    };
}