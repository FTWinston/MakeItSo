import produce from 'immer';
import { useEffect, useReducer } from 'react';
import { GameObject } from 'src/classes/GameObject';
import { Ship } from 'src/classes/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { helmTrainingReducer } from '../utils/helmTrainingReducer';
import { otherObjectsTrainingReducer } from '../utils/otherObjectsTrainingReducer';
import { Helm } from './Helm';

interface Props {
    getInitialState: () => Ship;
    getOtherObjects: () => GameObject[]
    //customRender?: (dispatch: Dispatch<HelmAction>, defaultRender: () => JSX.Element) => JSX.Element;
}

export const HelmTraining: React.FC<Props> = (props) => {
    const [ship, helmDispatch] = useReducer(produce(helmTrainingReducer), undefined, props.getInitialState);
    const [otherObjects, otherDispatch] = useReducer(produce(otherObjectsTrainingReducer), undefined, props.getOtherObjects);

    // Run tick actions at a regular interval.
    useEffect(() => {
        const interval = setInterval(() => {
            const tick = { type: 'tick', currentTime: getTime() } as const;
            helmDispatch(tick);
            otherDispatch(tick);
        }, 200);

        return () => clearInterval(interval);
    });

    const { power, health } = ship.systems.get(ShipSystem.Engines);

    const defaultRender = () => (
        <Helm
            {...ship.helm}
            power={power}
            health={health}
            ship={ship}
            shipDestroyed={ship.destroyed}
            otherObjects={otherObjects}
            stop={() => helmDispatch({ type: 'stop' })}
            discardManeuverCard={() => helmDispatch({ type: 'discard' })}
            maneuvers={ship.helm.maneuvers}
            maneuverChoice={ship.helm.maneuverChoice}
            speedToManeuver={ship.helm.speed}
            destination={ship.helm.destination?.val ?? null}
            setDestination={destination => helmDispatch({ type: 'set destination', destination })}
            maneuver={choice => helmDispatch({ type: 'maneuver', choice })}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};