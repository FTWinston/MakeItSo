import { produce } from 'immer';
import { useReducer } from 'react';
import { Ship } from 'src/classes/Ship';
import { crewActionReducer } from 'src/features/stations';
import { useInterval } from 'src/hooks/useInterval';
import { CrewStation, ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { WeaponsAction } from '../types/WeaponsState';
import { Weapons } from './Weapons';

interface Props {
    getInitialState: () => Ship;
    //customRender?: (dispatch: Dispatch<WeaponsAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

const weaponsActionReducer = (ship: Ship, action: WeaponsAction) => crewActionReducer(ship, { station: CrewStation.Weapons, action });

export const WeaponsTraining: React.FC<Props> = (props) => {
    const { getInitialState } = props;

    const [state, dispatch] = useReducer(produce(weaponsActionReducer), undefined, getInitialState);

    // Run tick action at a regular interval.
    useInterval(() => dispatch({ type: 'tick', currentTime: getTime() }), 200);

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