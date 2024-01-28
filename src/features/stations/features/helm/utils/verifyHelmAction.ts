import { HelmAction } from '../types/HelmState';

export function verifyHelmAction(action: object): action is HelmAction {
    // These types represent all the "user action" types in sensorsReducer.
    switch ((action as { type: string }).type) {
        case 'stop':
        case 'set destination':
        case 'discard':
        case 'maneuver':
            return true;
        default:
            return false;
    }
}
