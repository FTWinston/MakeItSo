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

            for (let i=2; i<ids.length; i += 2) {
                systems.push(ids[i-1] as SensorSystemType);
                levels.push(ids[i]);
            }
            
            store.dispatch(actionCreators.setTargetSystems(systems, levels));
            break;
        }
        case 'sensor_system': {
            const iSystem = parseInt(data);
            const system = iSystem <= 0 ? null : iSystem as SensorSystemType;
            store.dispatch(actionCreators.openTargetSystem(system));
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