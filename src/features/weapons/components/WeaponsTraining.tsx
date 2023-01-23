import produce from 'immer';
import { useEffect, useReducer } from 'react';
import { Ship } from 'src/types/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { weaponsTrainingReducer } from '../utils/weaponsTrainingReducer';
import { Weapons } from './Weapons';

interface Props {
    getInitialState: () => Ship;
    //customRender?: (dispatch: Dispatch<WeaponsAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

export const WeaponsTraining: React.FC<Props> = (props) => {
    const { getInitialState } = props;

    const [state, dispatch] = useReducer(produce(weaponsTrainingReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

        return () => clearInterval(interval);
    });

    const { power, health } = state.systems.get(ShipSystem.Weapons);

    const defaultRender = () => (
        <Weapons
            {...state.weapons}
            power={power}
            health={health}
            shipDestroyed={state.destroyed}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};