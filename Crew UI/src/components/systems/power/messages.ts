import { store } from '~/index';
import { actionCreators, PowerSystemType } from './store';

export const msgPrefix = 'power_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'power_levels': {
            const levels = data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setAllPower(levels));
            break;
        }
        case 'power_level': {
            const parts = data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setPower(parts[0] as PowerSystemType, parts[1]));
            break;
        }
        case 'power_choice': {
            const cardIDs = data.length === 0 ? [] : data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setChoice(cardIDs));
            break;
        }
        case 'power_choices': {
            const size = parseInt(data);
            store.dispatch(actionCreators.setNumChoices(size));
            break;
        }
        case 'power_gen': {
            const fraction = parseInt(data);
            store.dispatch(actionCreators.setGenerationProgress(fraction));
            break;
        }
        case 'power_all': {
            const value = parseInt(data);
            store.dispatch(actionCreators.setOverallPower(value));
            break;
        }
        case 'power_hand': {
            const cardIDs = data.length === 0 ? [] :data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setHand(cardIDs));
            break;
        }
        case 'power_add': {
            const cardID = parseInt(data);
            store.dispatch(actionCreators.addCardToHand(cardID));
            break;
        }
        case 'power_rem': {
            const pos = parseInt(data);
            store.dispatch(actionCreators.removeCardFromHand(pos));
            break;
        }
        default:
            return false;
    }

    return true;
}