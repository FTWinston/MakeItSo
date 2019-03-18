import { store } from '~/index';
import { actionCreators, TargetingFace, TargetingSolutionType, TargetingDifficulty, ITargetingSolution } from './store';

export const msgPrefix = 'wpn_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'wpn_target': {
            const targetID = parseInt(data);
            store.dispatch(actionCreators.setSelectedTarget(targetID));
            break;
        }
        case 'wpn_solutions': {
            const solutions = data === ''
                ? []
                : data
                    .split('/')
                    .map(s => s.split(' ').map(v => parseInt(v)))
                    .map(s => parseSolution(s));

            store.dispatch(actionCreators.setTargetingSolutions(solutions));
            break;
        }
        case 'wpn_solution_add': {
            const solution = parseSolution(data.split(' ').map(v => parseInt(v)));
            store.dispatch(actionCreators.setTargetingSolution(solution));
            break;
        }
        case 'wpn_solution_rem': {
            const type = parseInt(data) as TargetingSolutionType;
            store.dispatch(actionCreators.removeTargetingSolution(type));
            break;
        }
        case 'wpn_solution': {
            const type = data === ''
                ? TargetingSolutionType.None
                : parseInt(data) as TargetingSolutionType;

            store.dispatch(actionCreators.selectTargetingSolution(type));
            break;
        }
        case 'wpn_facing': {
            const face = parseInt(data) as TargetingFace;
            store.dispatch(actionCreators.setCurrentlyFacing(face));
            break;
        }
        case 'wpn_orientation': {
            const vals = data.split(' ');

            const pitch = parseInt(vals[0]);
            const yaw = parseInt(vals[1]);
            const roll = parseInt(vals[2]);

            store.dispatch(actionCreators.setTargetOrientation(pitch, yaw, roll));
            break;
        }
        default:
            return false;
    }

    return true;
}

function parseSolution(vals: number[]): ITargetingSolution {
    return {
        type: vals[0] as TargetingSolutionType,
        difficulty: vals[1] as TargetingDifficulty,
        bestFacing: vals[2] as TargetingFace,
        polygonsByFace: determineTheseSomehow,
    };
}