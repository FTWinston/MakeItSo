import { store } from '~/index';
import { actionCreators, TargetingFace, TargetingSolutionType, TargetingDifficulty } from './store';

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
                ? [] : data.split(' ').map(v => parseInt(v));

            const solutions = [];
            for (let i=2; i<vals.length; i += 3) {
                solutions.push({
                    type: vals[i-2] as TargetingSolutionType,
                    difficulty: vals[i-1] as TargetingDifficulty,
                    bestFacing: vals[i] as TargetingFace,
                })
            }

            store.dispatch(actionCreators.setTargetingSolutions(solutions));
            break;
        }
        case 'wpn_solution': {
            const index = parseInt(data);
            store.dispatch(actionCreators.setSelectedTargetingSolution(index));
            break;
        }
        case 'wpn_puzzle': {
            const vals = data.split(' ');

            const width = parseInt(vals[0]);
            const height = parseInt(vals[1]);
            const startCell = parseInt(vals[2]);
            const cells = vals.slice(3).map(v => v === '1');

            store.dispatch(actionCreators.setTargetingPuzzle(width, height, startCell, cells));
            break;
        }
        case 'wpn_facing': {
            const face = parseInt(data) as TargetingFace;
            store.dispatch(actionCreators.setCurrentlyFacing(face));
        }
        case 'wpn_orientation': {
            const vals = data.split(' ');

            const pitch = parseInt(vals[0]);
            const yaw = parseInt(vals[1]);
            const roll = parseInt(vals[2]);

            store.dispatch(actionCreators.setTargetOrientation(pitch, yaw, roll));
        }
        default:
            return false;
    }

    return true;
}