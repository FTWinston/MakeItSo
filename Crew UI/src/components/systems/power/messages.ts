import { store } from '~/index';
import { actionCreators, PowerSystemType } from './store';

export const msgPrefix = 'power_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'power_levels': {
            let levels = data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setAllPower(levels));
            break;
        }
        case 'power_level': {
            let parts = data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setPower(parts[0] as PowerSystemType, parts[1]));
            break;
        }
        case 'power_choice': {
            let cardIDs = data.length === 0 ? [] : data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setChoice(cardIDs));
            break;
        }
        case 'power_choices': {
            let size = parseInt(data);
            store.dispatch(actionCreators.SetNumChoices(size));
            break;
        }
        case 'power_gen': {
            let fraction = parseInt(data);
            store.dispatch(actionCreators.SetGenerationProgress(fraction));
            break;
        }
        case 'power_hand': {
            let cardIDs = data.length === 0 ? [] :data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setHand(cardIDs));
            break;
        }
        case 'power_add': {
            let cardID = parseInt(data);
            store.dispatch(actionCreators.addCardToHand(cardID));
            break;
        }
        case 'power_rem': {
            let pos = parseInt(data);
            store.dispatch(actionCreators.removeCardFromHand(pos));
            break;
        }
        default:
            return false;
    }

    return true;
}