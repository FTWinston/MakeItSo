import { store } from '~/index';
import { actionCreators, SensorSystemType, SensorTargetCellType } from './store';

export const msgPrefix = 'sensor_';

export function receiveMessage(cmd: string, data: string) {
    switch (cmd) {
        case 'sensor_target': {
            const ids = data.split(' ').map(str => parseInt(str));

            if (ids.length === 0)
                break;

            store.dispatch(actionCreators.setSelectedTarget(ids[0]));

            const systems: SensorSystemType[] = [];
            const levels: number[] = [];
            const sizes: number[] = [];

            for (let i=3; i<ids.length; i += 3) {
                systems.push(ids[i-2] as SensorSystemType);
                levels.push(ids[i-1]);
                sizes.push(ids[i]);
            }
            
            store.dispatch(actionCreators.setTargetSystems(systems, levels, sizes));
            break;
        }
        case 'sensor_selectable': {
            const system = parseInt(data) as SensorSystemType;
            store.dispatch(actionCreators.setSystemSelectable(system, true));
            break;
        }
        case 'sensor_cells': {
            const cells = data.length === 0 ? [] : data.split('').map(str => parseInt(str) as SensorTargetCellType);
            store.dispatch(actionCreators.setTargetCells(cells));
            break;
        }
        case 'sensor_cell': {
            const parts = data.split(' ').map(str => parseInt(str));
            store.dispatch(actionCreators.setTargetCell(parts[0], parts[1] as SensorTargetCellType));
            break;
        }
        default:
            return false;
    }

    return true;
}