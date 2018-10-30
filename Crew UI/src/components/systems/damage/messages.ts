import { store } from '~/index';
import { actionCreators, DamageSystemType, DiceComboType } from './store';

export const msgPrefix = 'dmg_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        
        case 'dmg_dice': {
            const vals = data.split(' ');
            const dice = [
                parseInt(vals[0]),
                parseInt(vals[1]),
                parseInt(vals[2]),
                parseInt(vals[3]),
                parseInt(vals[4])
            ] as [number, number, number, number, number];
            store.dispatch(actionCreators.setDice(dice));
            break;
        }
        case 'dmg_clear': {
            const rerolls = parseInt(data);
            store.dispatch(actionCreators.clearDice(rerolls));
            break;
        }
        case 'dmg_system': {
            const vals = data.split(' ');
            const system = parseInt(vals[0]) as DamageSystemType;
            const damage = parseInt(vals[1]);
            const combo = parseInt(vals[2]) as DiceComboType;

            store.dispatch(actionCreators.setSystem(system, damage, combo));
            break;
        }
        default:
            return false;
    }

    return true;
}