import { Reference } from 'src/classes/Reference';
import { SensorsState } from '../types/SensorsState';
import { ShipType } from 'src/types/ShipType';
import { SensorsConfiguration } from '../types/SensorsConfiguration';
import { Random } from 'src/utils/random';
import { getBoostInstance } from './getBoostInstance';

export function getInitialSensorsState(shipType: ShipType, configuration: SensorsConfiguration, random: Random): SensorsState {
    // TODO: use ship type

    return {
        configuration,
        possibleTargets: [],
        boosts: configuration.activeBoosts.map(getBoostInstance),
        currentTarget: Reference.empty(),
    };
}