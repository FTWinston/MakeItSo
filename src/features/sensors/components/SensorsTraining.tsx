import produce from 'immer';
import { useEffect, useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
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
    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

        return () => clearInterval(interval);
    });

    const { power, health } = state.systems.get(ShipSystem.Sensors);

    const defaultRender = () => (
        <Sensors
            {...state.sensors}
            power={power}
            health={health}
            shipDestroyed={state.destroyed}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};