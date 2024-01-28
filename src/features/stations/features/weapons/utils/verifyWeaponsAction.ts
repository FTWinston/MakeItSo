import { WeaponsAction } from '../types/WeaponsState';

export function verifyWeaponsAction(action: object): action is WeaponsAction {
    // These types represent all the "user action" types in weaponsReducer.
    switch ((action as { type: string }).type) {
        default:
            return false;
    }
}
