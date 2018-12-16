import { store } from '~/index';
import { actionCreators, Operator, WarpJumpStatus } from './store';

export const msgPrefix = 'warp_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'warp_ship_pos': {
            const vals = data.split(' ').map(v => parseInt(v));
            store.dispatch(actionCreators.setShipPosition(vals[0], vals[1], vals[2]));
            break;
        }
        case 'warp_positions': {
            const vals = data.split(' ').map(v => parseInt(v));
            store.dispatch(actionCreators.setJumpPositions(vals[0], vals[1], vals[2], vals[3], vals[5], vals[5]));
            break;
        }
        case 'warp_charge': {
            const vals = data.split(' ');
            const completion = parseInt(vals[0]);
            const secsRemaining = 20; // parseInt(vals[1]); TODO: have server include this parameter

            store.dispatch(actionCreators.chargeJump(secsRemaining, completion));
            break;
        }
        case 'warp_state': {
            const state = parseInt(data) as WarpJumpStatus;
            store.dispatch(actionCreators.setJumpState(state));
            break;
        }
        case 'warp_puzzle': {
            // TODO: read data for this
            const puzzleSize = 2;
            const cellGroups = [1, 1, 1, 2];
            const groupTargets = [4, 1];
            const groupOperators = [Operator.Multiply, Operator.Add];
            
            store.dispatch(actionCreators.setPuzzle(puzzleSize, cellGroups, groupTargets, groupOperators));
            break;
        }
        case 'warp_results': {
            const values = data.split(' ').map(d => d === '1');
            store.dispatch(actionCreators.setPuzzleResults(values));
            break;
        }
        default:
            return false;
    }

    return true;
}