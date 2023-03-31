import produce from 'immer';
import { useReducer } from 'react';
import { GameObject } from 'src/classes/GameObject';
import { Ship } from 'src/classes/Ship';
import { useInterval } from 'src/hooks/useInterval';
import { ShipSystem } from 'src/types/ShipSystem';
import { getTime } from 'src/utils/timeSpans';
import { helmTrainingReducer } from '../utils/helmTrainingReducer';
import { otherObjectsTrainingReducer } from '../utils/otherObjectsTrainingReducer';
import { Helm } from './Helm';

interface Props {
    getInitialState: () => Ship;
    getOtherObjects: () => GameObject[]
    //customRender?: (dispatch: Dispatch<HelmAction>, defaultRender: () => JSX.Element) => JSX.Element;
    renderMenuItems?: () => JSX.Element;
}

export const HelmTraining: React.FC<Props> = (props) => {
    const [ship, helmDispatch] = useReducer(produce(helmTrainingReducer), undefined, props.getInitialState);
    const [otherObjects, otherDispatch] = useReducer(produce(otherObjectsTrainingReducer), undefined, props.getOtherObjects);

    // Run tick actions at a regular interval.
    useInterval(() => {
        const tick = { type: 'tick', currentTime: getTime() } as const;
        helmDispatch(tick);
        otherDispatch(tick);
    }, 200);

    const { power, health } = ship.systems.get(ShipSystem.Engines);

    const defaultRender = () => (
        <Helm
            power={power}
            health={health}
            evasion={ship.evasionChance}
            ship={ship}
            shipDestroyed={ship.destroyed}
            otherObjects={otherObjects}
            stop={() => helmDispatch({ type: 'stop' })}
            discardManeuverCard={() => helmDispatch({ type: 'discard' })}
            maneuvers={ship.helm.maneuvers}
            maneuverChoice={ship.helm.maneuverChoice}
            speed={ship.helm.speed}
            speedWhileRotating={ship.helm.speedWhileRotating}
            rotationalSpeed={ship.helm.rotationalSpeed}
            destination={ship.helm.destination?.val ?? null}
            setDestination={destination => helmDispatch({ type: 'set destination', destination })}
            maneuver={choice => helmDispatch({ type: 'maneuver', choice })}
            renderMenuItems={props.renderMenuItems}
        />
    );

    return /*props.customRender?.(dispatch, defaultRender) ??*/ defaultRender();
};