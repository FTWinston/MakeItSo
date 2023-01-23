import produce from 'immer';
import { useEffect, useReducer } from 'react';
import { ShipInfo } from 'src/types/ShipInfo';
import { ShipSystem } from 'src/types/ShipSystem';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { helmTrainingReducer } from '../utils/helmTrainingReducer';
import { Helm } from './Helm';

interface Props {
    getInitialState: () => ShipInfo;
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

    const defaultRender = () => (
        <Helm
            {...state.helm}
            power={power}
            health={health}
            shipMotion={state.motion}
            shipDestroyed={state.destroyed}
            setDestination={destination => dispatch({ type: 'set destination', destination })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};