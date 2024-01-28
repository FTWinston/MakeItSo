import type { SensorsAction } from '../types/SensorsState';

export function verifySensorsAction(action: object): action is SensorsAction {
    // These types represent all the "user action" types in sensorsReducer.
    switch ((action as { type: string }).type) {
        case 'view':
        case 'target':
        case 'scan':
        case 'reveal':
        case 'flag':
            return true;
        default:
            return false;
    }
}
