import { SensorsState } from '../types/SensorsState';

export const getDefaultSensorsState: () => SensorsState = () => ({
    possibleTargets: [],
    scanTreesByTarget: new Map(),
});
