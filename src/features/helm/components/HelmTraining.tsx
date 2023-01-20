import produce from 'immer';
import { useEffect, useReducer } from 'react';
import { ShipState } from 'src/types/ShipState';
import { ShipSystem } from 'src/types/ShipSystem';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { helmTrainingReducer } from '../utils/helmTrainingReducer';
import { Helm } from './Helm';

interface Props {
    getInitialState: () => ShipState;
    //customRender?: (dispatch: Dispatch<HelmAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

export const HelmTraining: React.FC<Props> = (props) => {
    const { getInitialState } = props;

    const [state, dispatch] = useReducer(produce(helmTrainingReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

        return () => clearInterval(interval);
    });

    const { power, health } = state.systems.get(ShipSystem.Engines);

    // TODO: get this from ... ship state?
    const shipPosition = [{
        time: getTime(),
        val: {
            x: 0, y: 0, angle: 0
        }
    }, {
        time: getTime() + durationToTicks(1000),
        val: {
            x: 100, y: 0, angle: 0
        }
    }];

    const defaultRender = () => (
        <Helm
            {...state.helm}
            power={power}
            health={health}
            shipPosition={shipPosition}
            shipDestroyed={state.destroyed}
            setDestination={destination => dispatch({ type: 'set destination', destination })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};