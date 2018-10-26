import { store } from '~/index';
import { actionCreators } from './store';

export const msgPrefix = 'helm_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        
        case 'helm_manoever_limits': {
            let vals = data.split(' ');
            let pitch = parseFloat(vals[0]);
            let yaw = parseFloat(vals[1]);
            let roll = parseFloat(vals[2]);
            let translationX = parseFloat(vals[3]);
            let translationY = parseFloat(vals[4]);
            store.dispatch(actionCreators.setManoeveringLimits(pitch, yaw, roll, translationX, translationY));
            break;
        }
        case 'helm_speed_limits': {
            let vals = data.split(' ');
            let forwardMax = parseFloat(vals[0]);
            let revMax = parseFloat(vals[1]);
            store.dispatch(actionCreators.setSpeedLimits(forwardMax, revMax));
            break;
        }
        case 'helm_rotation': {
            let vals = data.split(' ');
            let pitch = parseFloat(vals[0]);
            let yaw = parseFloat(vals[1]);
            let roll = parseFloat(vals[2]);
            let pitchRate = parseFloat(vals[3]);
            let yawRate = parseFloat(vals[4]);
            let rollRate = parseFloat(vals[5]);
            store.dispatch(actionCreators.setOrientation(pitch, yaw, roll));
            store.dispatch(actionCreators.setRotationRates(pitchRate, yawRate, rollRate));
            break;
        }
        case 'helm_translation_rates': {
            let vals = data.split(' ');
            let forward = parseFloat(vals[0]);
            let horiz = parseFloat(vals[1]);
            let vert = parseFloat(vals[2]);
            store.dispatch(actionCreators.setTranslationRates(horiz, vert, forward));
            break;
        }
        default:
            return false;
    }

    return true;
}