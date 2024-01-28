import { EngineeringAction } from '../types/EngineeringState';

export function verifyEngineeringAction(action: object): action is EngineeringAction {
    // These types represent all the "user action" types in engineeringReducer.
    switch ((action as { type: string }).type) {
        case 'play':
        case 'draw':
            return true;
        default:
            return false;
    }
}
