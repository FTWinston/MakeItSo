import { store } from '~/Client';
import { Vector3 } from '~/functionality';
import { JumpPathStatus } from '~/functionality/sensors';
import { actionCreators, WarpScreenStatus } from './store';

export const msgPrefix = 'warp_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        
        case 'warp_clear': {
            store.dispatch(actionCreators.clearAll());
            break;
        }
        case 'warp_add_path': {
            let vals = data.split(' ');
            let id = parseInt(vals[0]);
            let status = parseInt(vals[1]) as JumpPathStatus;
            let power = parseFloat(vals[2]);

            let points: Vector3[] = [];
            for (let i=5; i<vals.length; i+=3) {
                points.push(new Vector3(
                    parseFloat(vals[i-2]),
                    parseFloat(vals[i-1]),
                    parseFloat(vals[i])
                ));
            }

            store.dispatch(actionCreators.addPath(id, status, points, power));
            break;
        }
        case 'warp_ext_path': {
            let vals = data.split(' ');
            let id = parseInt(vals[0]);

            let points: Vector3[] = [];
            for (let i=3; i<vals.length; i+=3) {
                points.push(new Vector3(
                    parseFloat(vals[i-2]),
                    parseFloat(vals[i-1]),
                    parseFloat(vals[i])
                ));
            }

            store.dispatch(actionCreators.extendPath(id, points));
            break;
        }
        case 'warp_rem_path': {
            let vals = data.split(' ');
            let id = parseInt(vals[0]);
            let displayInvalid = parseInt(vals[1]) === 1;

            if (displayInvalid) {
                // mark invalid now, then remove after 2 secs
                store.dispatch(actionCreators.setPathStatus(id, JumpPathStatus.Invalid));
                setTimeout(() => store.dispatch(actionCreators.removePath(id)), 2000);
            } else {
                // remove immediately
                store.dispatch(actionCreators.removePath(id));
            }
            break;
        }
        case 'warp_charge_jump': {
            let vals = data.split(' ');
            let id = parseInt(vals[0]);
            let secsRemaining = parseInt(vals[1]);
            let completion = parseInt(vals[2]);

            store.dispatch(actionCreators.chargeJump(id, secsRemaining, completion));
            break;
        }
        case 'warp_cancel_jump': {
            store.dispatch(actionCreators.setScreenStatus(WarpScreenStatus.Viewing));
            break;
        }
        case 'warp_jump_failed': {
            // TODO: handle "jump failed" better, idk...
            store.dispatch(actionCreators.setScreenStatus(WarpScreenStatus.Charging));
            break;
        }
        case 'warp_ship_pos': {
            let vals = data.split(' ');
            let x = parseInt(vals[0]);
            let y = parseInt(vals[1]);
            let z = parseInt(vals[2]);
            store.dispatch(actionCreators.setShipPosition(x, y, z));
            break;
        }
        case 'warp_jump': {
            let vals = data.split(' ');
            let id = parseInt(vals[0]);
            let secsRemaining = parseInt(vals[1]);

            store.dispatch(actionCreators.performJump(id, secsRemaining));
            break;
        }
        default:
            return false;
    }

    return true;
}