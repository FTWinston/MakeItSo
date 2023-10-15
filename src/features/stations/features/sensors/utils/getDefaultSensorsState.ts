import { Reference } from 'src/classes/Reference';
import { SensorsState } from '../types/SensorsState';

export const getDefaultSensorsState: () => SensorsState = () => ({
    possibleTargets: [],
    currentTarget: Reference.empty(),
});
