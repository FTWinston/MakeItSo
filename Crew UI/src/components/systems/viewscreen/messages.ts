import { store } from '~/index';
import { actionCreators } from './store';

export const msgPrefix = 'view_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'view_target': {
            if(data === '') {
                store.dispatch(actionCreators.clearLockedTarget());
            }
            else {
                const id = parseInt(data);
                store.dispatch(actionCreators.setLockedTarget(id));
            }
            break;
        }
        case 'view_angle': {
            const vals = data.split(' ').map(str => parseFloat(str));

            if (vals.length < 2)
                break;

            store.dispatch(actionCreators.setAngle(vals[0], vals[1]));
            break;
        }
        case 'view_zoom': {
            const val = parseInt(data);
            store.dispatch(actionCreators.setZoom(val));
            break;
        }
        case 'view_chase': {
            const val = data === '1';
            store.dispatch(actionCreators.setChase(val));
            break;
        }
        default:
            return false;
    }

    return true;
}