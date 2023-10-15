import { produce } from 'immer';
import { useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { useInterval } from 'src/hooks/useInterval';
import { ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { sensorsTrainingReducer } from '../utils/sensorsTrainingReducer';
import { Sensors } from './Sensors';

interface Props {
    getInitialState: () => Ship;
    //customRender?: (dispatch: Dispatch<SensorsAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

export const SensorsTraining: React.FC<Props> = (props) => {
    const { getInitialState } = props;

    const [state, dispatch] = useReducer(produce(sensorsTrainingReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

    const { power, health } = state.systems.get(ShipSystem.Sensors);
    
    const defaultRender = () => (
        <Sensors
            power={power}
            health={health}
            shipDestroyed={state.destroyed}
            targets={state.sensors.possibleTargets}
            viewTarget={state.viewTarget}
            setViewTarget={target => dispatch({ type: 'view', target })}
            scanTarget={state.sensors.currentTarget?.id}
            setScanTarget={target => dispatch({ type: 'target', target })}
            scanTargetTree={state.sensors.currentTarget?.scanTree}
            scanSystem={state.sensors.currentTarget?.currentScan}
            setScanSystem={scan => dispatch({ type: 'scan', scan })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};