import { store } from '~/index';
import { actionCreators, DamageSystemType, DiceComboType } from './store';

export const msgPrefix = 'dmg_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'dmg_system': {
            const system = parseInt(data) as DamageSystemType;
            store.dispatch(actionCreators.setSelectedSystem(system));
            break;
        }
        case 'dmg_health': {
            const values = data.split(' ').map(v => parseInt(v));
            store.dispatch(actionCreators.setHealth(values));
            break;
        }
        case 'dmg_combos': {
            const combos = data.split(' ').map(v => parseInt(v) as DiceComboType);
            store.dispatch(actionCreators.setAvailableCombos(combos));
            break;
        }
        case 'dmg_dice': {
            const vals = data.split(' ');
            
            const dice = [
                parseInt(vals[0]),
                parseInt(vals[1]),
                parseInt(vals[2]),
                parseInt(vals[3]),
                parseInt(vals[4])
            ] as [number, number, number, number, number];

            const fixed = [
                vals[5] === '0',
                vals[6] === '0',
                vals[7] === '0',
                vals[8] === '0',
                vals[9] === '0'
            ] as [boolean, boolean, boolean, boolean, boolean];

            store.dispatch(actionCreators.setDice(dice, fixed));
            break;
        }
        case 'dmg_rolls': {
            const rerolls = parseInt(data);
            store.dispatch(actionCreators.setRolls(rerolls));
            break;
        }
        default:
            return false;
    }

    return true;
}