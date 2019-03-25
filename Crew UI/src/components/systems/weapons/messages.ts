import { store } from '~/index';
import { actionCreators, TargetingFace, TargetingSolutionType, TargetingDifficulty, ITargetingSolution } from './store';
import { Polygon } from './Polygon';

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
                    .map(s => parseSolution(s));

            store.dispatch(actionCreators.setTargetingSolutions(solutions));
            break;
        }
        /*
        case 'wpn_solution_add': {
            const solution = parseSolution(data);
            store.dispatch(actionCreators.setTargetingSolution(solution));
            break;
        }
        case 'wpn_solution_rem': {
            const type = parseInt(data) as TargetingSolutionType;
            store.dispatch(actionCreators.removeTargetingSolution(type));
            break;
        }
        */
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

function parseSolution(data: string): ITargetingSolution {
    const parts = data.split('|');

    const vals = parts.shift()!
        .split(' ')
        .map(v => parseInt(v));

    const type = vals[0] as TargetingSolutionType;
    const difficulty = vals[1] as TargetingDifficulty;
    const bestFacing = vals[2] as TargetingFace;

    // each value remaining in parts is a polygon
    const allPolygons = parts.map(p => parsePolygon(p));

    const polygonsByFace: { [key: number]: Polygon } = {};

    if (bestFacing === TargetingFace.None && allPolygons.length >= 1) {
        // all the same
        polygonsByFace[TargetingFace.Front] = 
        polygonsByFace[TargetingFace.Rear] = 
        polygonsByFace[TargetingFace.Top] = 
        polygonsByFace[TargetingFace.Bottom] = 
        polygonsByFace[TargetingFace.Left] = 
        polygonsByFace[TargetingFace.Right] = allPolygons[0];
    }
    else if (allPolygons.length === 0) {
        // this shouldn't happen, but do nothing cos that's all we can do
    }
    else if (allPolygons.length === 1) {
        // only the best face can be targeted
        polygonsByFace[bestFacing] = allPolygons[0];
    }
    else {
        // initially all the the second polygon
        polygonsByFace[TargetingFace.Front] = 
        polygonsByFace[TargetingFace.Rear] = 
        polygonsByFace[TargetingFace.Top] = 
        polygonsByFace[TargetingFace.Bottom] = 
        polygonsByFace[TargetingFace.Left] = 
        polygonsByFace[TargetingFace.Right] = allPolygons[1];

        // then set the best face to the first one
        polygonsByFace[bestFacing] = allPolygons[0];

        if (allPolygons.length === 2) {
            // unset the "opposite" one
            delete polygonsByFace[-bestFacing]
        }
        else {
            // use the third for the "opposite" face
            polygonsByFace[-bestFacing] = allPolygons[2];
        }
    }

    return {
        type,
        difficulty,
        bestFacing,
        polygonsByFace,
    };
}

function parsePolygon(data: string) {
    const numbers = data
        .split(' ')
        .map(s => parseInt(s));

    const poly = new Polygon();

    for (let i = 1; i < numbers.length; i++) {
        poly.points.push({
            x: numbers[i - 1],
            y: numbers[i],
        });
    }

    return poly;
}