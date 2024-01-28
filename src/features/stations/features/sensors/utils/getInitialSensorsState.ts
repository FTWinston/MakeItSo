import { Reference } from 'src/classes/Reference';
import { SensorsState } from '../types/SensorsState';
import { ShipType } from 'src/types/ShipType';
import { SensorsConfiguration } from '../types/SensorsConfiguration';
import { Random } from 'src/utils/random';

export function getInitialSensorsState(shipType: ShipType, configuration: SensorsConfiguration, random: Random): SensorsState {
    // TODO: use configuration & ship type

    return {
        configuration,
        possibleTargets: [],
        currentTarget: Reference.empty(),
    };
}