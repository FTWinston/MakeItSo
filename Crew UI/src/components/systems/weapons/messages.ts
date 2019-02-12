import { store } from '~/index';
import { actionCreators, TargetingFace, TargetingSolutionType, TargetingDifficulty, ElementColor, ElementShape } from './store';

export const msgPrefix = 'wpn_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'wpn_target': {
            const targetID = parseInt(data);
            store.dispatch(actionCreators.setSelectedTarget(targetID));
            break;
        }
        case 'wpn_solutions': {
            const solutionVals = data === ''
                ? [] : data.split('/').map(s => s.split(' ').map(v => parseInt(v)));

            const solutions = [];
            for (const solution of solutionVals) {
                
                solutions.push({
                    type: solution[0] as TargetingSolutionType,
                    difficulty: solution[1] as TargetingDifficulty,
                    bestFacing: solution[2] as TargetingFace,
                    sequence: solution.slice(3).map(i => parseTargetingElement(i)),
                });
            }

            store.dispatch(actionCreators.setTargetingSolutions(solutions));
            break;
        }
        case 'wpn_targeting': {
            const vals = data.split(' ').map(v => parseTargetingElement(parseInt(v)));
            store.dispatch(actionCreators.setTargetingElements(vals));
            break;
        }
        case 'wpn_fire': {
            const solution = parseInt(data) as TargetingSolutionType;
            store.dispatch(actionCreators.fire(solution));
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

function parseTargetingElement(index: number) {
    return {
        color: Math.floor(index / ElementColor.NUM_COLORS) as ElementColor,
        shape: (index % ElementShape.NUM_SHAPES) as ElementShape,
    }
}