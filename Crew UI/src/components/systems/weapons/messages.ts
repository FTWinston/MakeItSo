import { store } from '~/index';
import { actionCreators, TargetingSolution } from './store';

export const msgPrefix = 'wpn_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'wpn_target': {
            const targetID = parseInt(data);
            store.dispatch(actionCreators.setSelectedTarget(targetID));
            break;
        }
        case 'wpn_solutions': {
            const vals = data === ''
                ? [] : data.split(' ').map(v => parseInt(v) as TargetingSolution);
            store.dispatch(actionCreators.setTargetingSolutions(vals));
            break;
        }
        case 'wpn_solution': {
            const val = parseInt(data) as TargetingSolution;
            store.dispatch(actionCreators.setSelectedTargetingSolution(val));
            break;
        }
        case 'wpn_puzzle': {
            const vals = data.split(' ');

            const width = parseInt(vals[0]);
            const startCell = parseInt(vals[1]);
            const cells = vals.slice(2).map(v => v === '1');

            store.dispatch(actionCreators.setTargetingPuzzle(width, startCell, cells));
            break;
        }
        default:
            return false;
    }

    return true;
}