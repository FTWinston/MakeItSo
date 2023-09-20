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
            {...state.sensors}
            power={power}
            health={health}
            shipDestroyed={state.destroyed}
            targets={state.sensors.possibleTargets}
            scanTarget={state.sensors.currentTarget}
            viewTarget={state.viewTarget}
            setScanTarget={target => dispatch({ type: 'target', target })}
            setViewTarget={target => dispatch({ type: 'view', target })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};