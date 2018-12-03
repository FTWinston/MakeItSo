import { store } from '~/index';
import { actionCreators, SensorSystemType, SensorTargetCellType } from './store';

export const msgPrefix = 'sensor_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'sensor_target': {
            const id = parseInt(data);
            store.dispatch(actionCreators.setSelectedTarget(id));
            break;
        }
        case 'sensor_systems': { // TODO: actually call this
            const systems = data.length === 0 ? [] : data.split(' ').map(str => parseInt(str) as SensorSystemType);
            store.dispatch(actionCreators.setTargetSystems(systems));
        }
        case 'sensor_cells': { // TODO: actually call this
            const cells = data.length === 0 ? [] : data.split(' ').map(str => parseInt(str) as SensorTargetCellType);
            store.dispatch(actionCreators.setTargetCells(cells));
        }
        case 'sensor_cell': { // TODO: actually call this
            const parts = data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setTargetCell(parts[0], parts[1] as SensorTargetCellType));
        }
        default:
            return false;
    }

    return true;
}